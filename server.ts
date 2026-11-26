import 'dotenv/config';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import express from 'express';
import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

function getAiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    throw new Error(
      'GEMINI_API_KEY is not configured. Please add your key in Settings > Secrets.'
    );
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function formatErrorMessage(err: unknown): { status: number; message: string } {
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.includes('GEMINI_API_KEY is not configured')) {
    return { status: 500, message: msg };
  }
  if (
    msg.includes('403') ||
    msg.includes('PERMISSION_DENIED') ||
    msg.includes('API_KEY_INVALID')
  ) {
    return {
      status: 403,
      message:
        'Gemini API key error or permission denied. Please check your key in Settings > Secrets.',
    };
  }
  if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
    return {
      status: 429,
      message: 'Rate limit reached. Please wait a moment and try again.',
    };
  }
  if (msg.includes('503') || msg.includes('UNAVAILABLE')) {
    return {
      status: 503,
      message:
        'AI service is momentarily busy due to high demand. Please tap Retry in a moment.',
    };
  }
  return { status: 500, message: msg || 'Unexpected server error.' };
}

async function generateContentWithFallback(
  ai: GoogleGenAI,
  params: {
    contents: string;
    thinkingLevel: ThinkingLevel;
    responseSchema: Record<string, unknown>;
  }
) {
  const tryFallback = async () =>
    ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: params.contents,
      config: {
        maxOutputTokens: 16384,
        responseMimeType: 'application/json',
        responseSchema: params.responseSchema,
      },
    });

  try {
    return await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: params.contents,
      config: {
        maxOutputTokens: 16384,
        thinkingConfig: { thinkingLevel: params.thinkingLevel },
        responseMimeType: 'application/json',
        responseSchema: params.responseSchema,
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn('[Gemini primary model fallback triggered]:', msg.slice(0, 220));
    if (
      msg.includes('GEMINI_API_KEY') ||
      msg.includes('403') ||
      msg.includes('PERMISSION_DENIED') ||
      msg.includes('API_KEY_INVALID')
    ) {
      throw err;
    }

    await new Promise((r) => setTimeout(r, 700));
    try {
      return await tryFallback();
    } catch (fallbackErr) {
      const fMsg =
        fallbackErr instanceof Error ? fallbackErr.message : String(fallbackErr);
      if (fMsg.includes('503') || fMsg.includes('UNAVAILABLE')) {
        await new Promise((r) => setTimeout(r, 1200));
        return await tryFallback();
      }
      throw fallbackErr;
    }
  }
}

const EXAM_TARGET_LABELS: Record<string, string> = {
  ALL: 'West Bengal Government Exams (WBCS, WBPSC Clerkship, WB Police, Food SI, Primary TET)',
  WBCS: 'WBCS (West Bengal Civil Service) Prelims & Mains',
  WBPSC_CLERKSHIP: 'WBPSC Clerkship & Miscellaneous Services',
  WB_POLICE: 'West Bengal Police SI & Constable (WBPRB)',
  PRIMARY_TET: 'West Bengal Primary TET (WBBPE)',
  FOOD_SI: 'WBPSC Food Sub-Inspector (Food SI)',
};

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '4mb' }));

  app.use('/api', (_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (_req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  // Generate unlimited fresh MCQs per subject & chapter
  app.post('/api/generate-mcqs', async (req, res) => {
    try {
      const {
        subjectId,
        subjectName,
        chapterId,
        chapterTitle,
        chapterTopics,
        examTarget = 'ALL',
        difficulty = 'Mixed',
        count = 10,
        language = 'English',
        excludeStems = [],
      } = req.body as {
        subjectId?: string;
        subjectName?: string;
        chapterId?: string;
        chapterTitle?: string;
        chapterTopics?: string;
        examTarget?: string;
        difficulty?: string;
        count?: number;
        language?: string;
        excludeStems?: string[];
      };

      if (!subjectId || !subjectName || !chapterId || !chapterTitle) {
        return res
          .status(400)
          .json({ error: 'Missing required subject or chapter details.' });
      }

      const safeCount = Math.min(Math.max(Number(count) || 10, 3), 20);
      const ai = getAiClient();
      const targetExamLabel =
        EXAM_TARGET_LABELS[examTarget] || EXAM_TARGET_LABELS.ALL;

      const exclusionBlock =
        Array.isArray(excludeStems) && excludeStems.length > 0
          ? `\nDo NOT repeat or closely paraphrase any of these already-practiced question topics/stems:\n- ${excludeStems
              .slice(-25)
              .map((s) => s.slice(0, 110))
              .join('\n- ')}`
          : '';

      const languageInstruction =
        language === 'Bengali'
          ? 'Write every question, all 4 options, the explanation, and the examHook in clear, natural standard Bengali (বাংলা) appropriate for West Bengal PSC/Police exams. Keep proper nouns or standard acronyms (e.g., RBI, Article 356, GDP) clear.'
          : 'Write every question, all 4 options, the explanation, and the examHook in crisp, formal competitive-exam English.';

      const difficultyInstruction =
        difficulty === 'Easy'
          ? 'Standard Foundation (Clerkship / Constable / Food SI level, still crisp and factual — never childish or obvious).'
          : difficulty === 'Hard'
            ? 'WBCS Prelims & Mains Analytical Standard (multi-statement "Consider statements 1, 2, 3", chronological ordering, match-the-pair, assertion-reason, constitutional/statutory distinctions, and multi-step quant/reasoning).'
            : 'Graduate WBCS / WBPSC / WB Police SI Standard (mix of statement-based questions, chronological/pair analysis, subtle constitutional/historical distinctions, and multi-step numerical/logical problems).';

      const prompt = `You are a senior paper setter for the West Bengal Public Service Commission (WBPSC — WBCS Prelims & Mains, Miscellaneous, Clerkship, Food SI) and WBPRB (WB Police SI).
Generate exactly ${safeCount} brand-new, graduate-level competitive exam MCQs.

Subject: ${subjectName}
Chapter: ${chapterTitle}
Key Syllabus Topics: ${chapterTopics || chapterTitle}
Target Exam Pattern: ${targetExamLabel}
Target Rigor: ${difficultyInstruction}
${languageInstruction}
${exclusionBlock}

CRITICAL QUALITY RULES (NEVER VIOLATE):
1. NO school/kid-level trivia (e.g., avoid basic "Who is the Father of the Nation?" or trivial definitions). Every question must test genuine graduate-level competitive preparation: include multi-statement items ("Consider the following statements: 1... 2... 3... Which of the above is/are correct?"), chronological ordering, exact Acts/Articles/Amendments/Committees, river-tributary-district precision, and multi-step arithmetic/mensuration/algebra.
2. Distractors must be plausible, closely related, and tricky (classic WBPSC examination traps), never silly or obviously wrong.
3. Every question must be factually verified and unambiguous with exactly ONE indisputably correct option out of 4.
4. Options must NOT contain prefix letters like "A)", "1.", etc. Provide only the option text.
5. For Quantitative Aptitude, Mensuration, or Reasoning, solve the problem step-by-step internally and double-check all arithmetic before setting correctIndex.
6. Provide a rich "explanation" explaining why the correct option is right AND why the closely competing distractors are wrong.
7. Provide a concise, high-yield "examHook" (exact constitutional article, year, committee, formula, or West Bengal PSC fact).
8. Set "examTag" to the most relevant WB exam (e.g., "WBCS Prelims", "WBCS Mains", "WBPSC Misc", "WB Police SI", "Food SI", "Primary TET").`;

      const response = await generateContentWithFallback(ai, {
        contents: prompt,
        thinkingLevel: ThinkingLevel.MEDIUM,
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  correctIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING },
                  examHook: { type: Type.STRING },
                  examTag: { type: Type.STRING },
                  difficulty: { type: Type.STRING },
                },
                required: [
                  'question',
                  'options',
                  'correctIndex',
                  'explanation',
                  'examHook',
                  'examTag',
                  'difficulty',
                ],
              },
            },
          },
          required: ['questions'],
        },
      });

      const parsed = JSON.parse((response.text ?? '{}').trim()) as {
        questions?: Array<{
          question?: string;
          options?: string[];
          correctIndex?: number;
          explanation?: string;
          examHook?: string;
          examTag?: string;
          difficulty?: string;
        }>;
      };

      const rawList = Array.isArray(parsed.questions) ? parsed.questions : [];
      const sanitized = rawList
        .filter(
          (q) =>
            q.question &&
            Array.isArray(q.options) &&
            q.options.length === 4 &&
            typeof q.correctIndex === 'number' &&
            q.correctIndex >= 0 &&
            q.correctIndex <= 3 &&
            q.explanation
        )
        .map((q, idx) => ({
          id: `ai-${chapterId}-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
          subjectId,
          chapterId,
          question: q.question!.trim(),
          options: q.options!.slice(0, 4).map((o) => String(o).trim()) as [
            string,
            string,
            string,
            string,
          ],
          correctIndex: q.correctIndex as 0 | 1 | 2 | 3,
          explanation: q.explanation!.trim(),
          examHook: (q.examHook || 'High-yield West Bengal exam concept.').trim(),
          examTag: (q.examTag || 'WBPSC').trim(),
          difficulty:
            q.difficulty === 'Easy' ||
            q.difficulty === 'Moderate' ||
            q.difficulty === 'Hard'
              ? q.difficulty
              : 'Moderate',
          source: 'ai' as const,
        }));

      if (sanitized.length === 0) {
        return res.status(502).json({
          error: 'Could not generate valid MCQs right now. Please try again.',
        });
      }

      res.json({ questions: sanitized });
    } catch (err) {
      const { status, message } = formatErrorMessage(err);
      res.status(status).json({ error: message });
    }
  });

  // Deeper step-by-step explanation when a student gets an answer wrong
  app.post('/api/explain-mcq', async (req, res) => {
    try {
      const {
        question,
        options,
        correctIndex,
        selectedIndex,
        existingExplanation,
        language = 'English',
        subjectName,
        chapterTitle,
      } = req.body as {
        question?: string;
        options?: string[];
        correctIndex?: number;
        selectedIndex?: number | null;
        existingExplanation?: string;
        language?: string;
        subjectName?: string;
        chapterTitle?: string;
      };

      if (
        !question ||
        !Array.isArray(options) ||
        options.length !== 4 ||
        typeof correctIndex !== 'number'
      ) {
        return res.status(400).json({ error: 'Invalid question payload.' });
      }

      const ai = getAiClient();
      const chosenText =
        typeof selectedIndex === 'number' && options[selectedIndex]
          ? options[selectedIndex]
          : 'No option selected (skipped)';
      const correctText = options[correctIndex];

      const langRule =
        language === 'Bengali'
          ? 'Respond in clear, encouraging Bengali (বাংলা) suitable for West Bengal govt exam aspirants.'
          : 'Respond in clear, encouraging, concise English suitable for West Bengal govt exam aspirants.';

      const prompt = `A student preparing for West Bengal government exams got this MCQ wrong and asked for a clear answer breakdown.
Subject: ${subjectName || 'General Studies'} · Chapter: ${chapterTitle || 'Practice'}
Question: ${question}
Options:
0) ${options[0]}
1) ${options[1]}
2) ${options[2]}
3) ${options[3]}

Student's selected wrong answer: ${chosenText}
Correct answer: ${correctText}
Base explanation: ${existingExplanation || ''}

${langRule}
Provide:
1. whyYourChoiceIsWrong: Specifically address why "${chosenText}" is incorrect or misleading here.
2. conceptBreakdown: Step-by-step concept or calculation showing how to arrive at "${correctText}".
3. shortcutOrMnemonic: A practical trick, formula, or memory hook so the student never misses this again.
4. relatedExamFact: One closely related West Bengal / Indian exam fact frequently asked alongside this topic.`;

      const response = await generateContentWithFallback(ai, {
        contents: prompt,
        thinkingLevel: ThinkingLevel.LOW,
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            whyYourChoiceIsWrong: { type: Type.STRING },
            conceptBreakdown: { type: Type.STRING },
            shortcutOrMnemonic: { type: Type.STRING },
            relatedExamFact: { type: Type.STRING },
          },
          required: [
            'whyYourChoiceIsWrong',
            'conceptBreakdown',
            'shortcutOrMnemonic',
            'relatedExamFact',
          ],
        },
      });

      const parsed = JSON.parse((response.text ?? '{}').trim());
      res.json(parsed);
    } catch (err) {
      const { status, message } = formatErrorMessage(err);
      res.status(status).json({ error: message });
    }
  });

  // Generate structured chapter study material before taking an exam
  app.post('/api/study-material', async (req, res) => {
    try {
      const {
        subjectName,
        chapterId,
        chapterTitle,
        chapterTopics,
        examTarget = 'ALL',
        language = 'English',
      } = req.body as {
        subjectName?: string;
        chapterId?: string;
        chapterTitle?: string;
        chapterTopics?: string;
        examTarget?: string;
        language?: string;
      };

      if (!subjectName || !chapterId || !chapterTitle) {
        return res
          .status(400)
          .json({ error: 'Missing subjectName, chapterId, or chapterTitle.' });
      }

      const ai = getAiClient();
      const targetExamLabel =
        EXAM_TARGET_LABELS[examTarget] || EXAM_TARGET_LABELS.ALL;
      const langRule =
        language === 'Bengali'
          ? 'Write all fields (overview, keyPoints titles, details & subPoints, referenceTable, workedExamples, comparisonPairs, commonTraps, mainsPerspective, mustRememberFacts, and examTips) in clear, academic standard Bengali (বাংলা) appropriate for WBCS/WBPSC graduate candidates. Retain standard technical terms/acronyms (e.g., RBI, CRR, Article 356) alongside Bengali where helpful.'
          : 'Write all fields in authoritative, textbook-grade competitive-exam English suitable for graduate WBCS Prelims & Mains candidates.';

      const prompt = `You are a senior WBCS (Executive) & WBPSC academic textbook author writing an exhaustive, graduate-level chapter treatise (comparable in depth and density to M. Laxmikanth, Rajiv Ahir Spectrum, Majid Husain, Ramesh Singh, and R.S. Aggarwal).
Subject: ${subjectName}
Chapter: ${chapterTitle}
Detailed Syllabus Modules: ${chapterTopics || chapterTitle}
Target Exam: ${targetExamLabel}
${langRule}

STRICT ACADEMIC RIGOR MANDATE (NEVER write short blog summaries, generic high-school notes, or vague 2-line descriptions):
1. overview: A 5-6 sentence scholarly framing covering structural/historical evolution, statutory or scientific backbone, and exact WBCS Prelims + Mains Paper weightage and PYQ patterns.
2. keyPoints: Exactly 9 to 10 exhaustive textbook sections covering EVERY module in "${chapterTopics || chapterTitle}". For EACH section:
   - "title": Formal academic sub-chapter heading.
   - "detail": 6 to 8 dense, rigorous textbook sentences explaining mechanisms, legislative evolution, exceptions, provisos, derivations, or regional geography in complete technical prose (NO filler phrases like "This is very important for exams").
   - "subPoints": 5 to 7 granular, data-rich bullets packing exact Constitutional Articles/Clauses/Amendments, exact dates/years, Committee names & recommendations, Supreme Court case laws, formulas/units, tributaries/dams, or West Bengal district specifics.
3. referenceTable: A dense 3-column comparative/reference matrix ("title", "columns" with exactly 3 headers, and "rows" with 8 to 10 information-packed rows of 3 cells each).
4. workedExamples: 3 to 4 rigorous WBCS Mains / Prelims-standard worked problems or statutory/analytical scenarios ("prompt" + complete step-by-step "solution" showing exact legal/mathematical/logical reasoning).
5. comparisonPairs: 6 confusing exam pairs with crisp, unambiguous technical distinctions.
6. commonTraps: 6 specific -0.33 negative-marking traps tested by WBPSC examiners.
7. mainsPerspective: 4 to 5 dense analytical sentences addressing WBCS Mains Paper III/IV/V/VI descriptive, policy, or case-law synthesis.
8. mustRememberFacts: 10 high-density Prelims & Mains rapid-revision facts (each containing exact year, article, committee, metric, or WB linkage).
9. examTips: Concrete elimination heuristics and revision sequencing for this chapter.`;

      const response = await generateContentWithFallback(ai, {
        contents: prompt,
        thinkingLevel: ThinkingLevel.MEDIUM,
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overview: { type: Type.STRING },
            keyPoints: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  detail: { type: Type.STRING },
                  subPoints: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ['title', 'detail', 'subPoints'],
              },
            },
            referenceTable: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                columns: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                rows: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
              },
              required: ['title', 'columns', 'rows'],
            },
            workedExamples: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  prompt: { type: Type.STRING },
                  solution: { type: Type.STRING },
                },
                required: ['prompt', 'solution'],
              },
            },
            comparisonPairs: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  term: { type: Type.STRING },
                  distinction: { type: Type.STRING },
                },
                required: ['term', 'distinction'],
              },
            },
            commonTraps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            mainsPerspective: { type: Type.STRING },
            mustRememberFacts: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            examTips: { type: Type.STRING },
          },
          required: [
            'overview',
            'keyPoints',
            'referenceTable',
            'workedExamples',
            'comparisonPairs',
            'commonTraps',
            'mainsPerspective',
            'mustRememberFacts',
            'examTips',
          ],
        },
      });

      const parsed = JSON.parse((response.text ?? '{}').trim()) as {
        overview?: string;
        keyPoints?: Array<{
          title: string;
          detail: string;
          subPoints?: string[];
        }>;
        referenceTable?: {
          title?: string;
          columns?: string[];
          rows?: string[][];
        };
        workedExamples?: Array<{ prompt: string; solution: string }>;
        comparisonPairs?: Array<{ term: string; distinction: string }>;
        commonTraps?: string[];
        mainsPerspective?: string;
        mustRememberFacts?: string[];
        examTips?: string;
      };

      const validTable =
        parsed.referenceTable &&
        parsed.referenceTable.title &&
        Array.isArray(parsed.referenceTable.columns) &&
        parsed.referenceTable.columns.length >= 3 &&
        Array.isArray(parsed.referenceTable.rows) &&
        parsed.referenceTable.rows.length > 0
          ? {
              title: parsed.referenceTable.title,
              columns: [
                String(parsed.referenceTable.columns[0]),
                String(parsed.referenceTable.columns[1]),
                String(parsed.referenceTable.columns[2]),
              ] as [string, string, string],
              rows: parsed.referenceTable.rows
                .filter((r) => Array.isArray(r) && r.length >= 3)
                .map(
                  (r) =>
                    [String(r[0]), String(r[1]), String(r[2])] as [
                      string,
                      string,
                      string,
                    ]
                ),
            }
          : undefined;

      res.json({
        chapterId,
        overview: parsed.overview || '',
        keyPoints: Array.isArray(parsed.keyPoints) ? parsed.keyPoints : [],
        referenceTable: validTable,
        workedExamples: Array.isArray(parsed.workedExamples)
          ? parsed.workedExamples
          : [],
        comparisonPairs: Array.isArray(parsed.comparisonPairs)
          ? parsed.comparisonPairs
          : [],
        commonTraps: Array.isArray(parsed.commonTraps) ? parsed.commonTraps : [],
        mainsPerspective: parsed.mainsPerspective || '',
        mustRememberFacts: Array.isArray(parsed.mustRememberFacts)
          ? parsed.mustRememberFacts
          : [],
        examTips: parsed.examTips || '',
        source: 'ai' as const,
      });
    } catch (err) {
      const { status, message } = formatErrorMessage(err);
      res.status(status).json({ error: message });
    }
  });

  // Expand study material endlessly with deeper subtopic treatises, extra table rows & Mains cases
  app.post('/api/study-material/expand', async (req, res) => {
    try {
      const {
        subjectName,
        chapterId,
        chapterTitle,
        chapterTopics,
        focusTopic,
        existingSectionTitles = [],
        examTarget = 'ALL',
        language = 'English',
      } = req.body as {
        subjectName?: string;
        chapterId?: string;
        chapterTitle?: string;
        chapterTopics?: string;
        focusTopic?: string;
        existingSectionTitles?: string[];
        examTarget?: string;
        language?: string;
      };

      if (!subjectName || !chapterId || !chapterTitle) {
        return res
          .status(400)
          .json({ error: 'Missing subjectName, chapterId, or chapterTitle.' });
      }

      const ai = getAiClient();
      const targetExamLabel =
        EXAM_TARGET_LABELS[examTarget] || EXAM_TARGET_LABELS.ALL;
      const langRule =
        language === 'Bengali'
          ? 'Write everything in rigorous, academic standard Bengali (বাংলা) appropriate for WBCS/WBPSC graduate candidates.'
          : 'Write everything in authoritative, graduate textbook-grade English suitable for WBCS Prelims & Mains.';

      const coveredList =
        Array.isArray(existingSectionTitles) && existingSectionTitles.length > 0
          ? `\nDo NOT repeat these already-covered sections—go DEEPER into untouched nuances, exceptions, statutory clauses, case laws, derivations, or regional data:\n- ${existingSectionTitles
              .slice(-20)
              .join('\n- ')}`
          : '';

      const focusInstruction = focusTopic
        ? `Zoom deeply into this specific subtopic: "${focusTopic}". Break down every technical nuance, exception, precedent, formula, or West Bengal-specific angle.`
        : `Expand the chapter "${chapterTitle}" with advanced Prelims & Mains depth, lesser-known statutory/historical details, and high-difficulty exam insights.`;

      const prompt = `You are a senior WBCS (Executive) & WBPSC textbook author expanding an existing study chapter with deeper graduate-level modules.
Subject: ${subjectName}
Chapter: ${chapterTitle}
Syllabus Scope: ${chapterTopics || chapterTitle}
Target Exam: ${targetExamLabel}
${langRule}
${focusInstruction}
${coveredList}

Generate strictly NEW, non-overlapping advanced material:
1. extraKeyPoints: 5 dense advanced textbook sections (each with a specific "title", 6-8 sentences of rigorous technical "detail", and 5-6 exact factual "subPoints" with dates, Articles, Amendments, Committees, or step-by-step formulas).
2. extraTableRows: 4 to 5 additional high-yield 3-column rows [col1, col2, col3] extending the chapter's reference matrix.
3. extraWorkedExamples: 2 high-difficulty WBCS Mains / Prelims analytical problems or worked numerical solutions ("prompt" + step-by-step "solution").
4. extraFacts: 5 advanced rapid-revision facts that distinguish top rankers.`;

      const response = await generateContentWithFallback(ai, {
        contents: prompt,
        thinkingLevel: ThinkingLevel.MEDIUM,
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            extraKeyPoints: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  detail: { type: Type.STRING },
                  subPoints: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ['title', 'detail', 'subPoints'],
              },
            },
            extraTableRows: {
              type: Type.ARRAY,
              items: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            extraWorkedExamples: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  prompt: { type: Type.STRING },
                  solution: { type: Type.STRING },
                },
                required: ['prompt', 'solution'],
              },
            },
            extraFacts: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: [
            'extraKeyPoints',
            'extraTableRows',
            'extraWorkedExamples',
            'extraFacts',
          ],
        },
      });

      const parsed = JSON.parse((response.text ?? '{}').trim()) as {
        extraKeyPoints?: Array<{
          title: string;
          detail: string;
          subPoints?: string[];
        }>;
        extraTableRows?: string[][];
        extraWorkedExamples?: Array<{ prompt: string; solution: string }>;
        extraFacts?: string[];
      };

      res.json({
        extraKeyPoints: Array.isArray(parsed.extraKeyPoints)
          ? parsed.extraKeyPoints
          : [],
        extraTableRows: Array.isArray(parsed.extraTableRows)
          ? parsed.extraTableRows
              .filter((r) => Array.isArray(r) && r.length >= 3)
              .map(
                (r) =>
                  [String(r[0]), String(r[1]), String(r[2])] as [
                    string,
                    string,
                    string,
                  ]
              )
          : [],
        extraWorkedExamples: Array.isArray(parsed.extraWorkedExamples)
          ? parsed.extraWorkedExamples
          : [],
        extraFacts: Array.isArray(parsed.extraFacts) ? parsed.extraFacts : [],
      });
    } catch (err) {
      const { status, message } = formatErrorMessage(err);
      res.status(status).json({ error: message });
    }
  });

  const server = http.createServer(app);

  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        ws: false,
      },
      appType: 'spa',
    });

    app.get('/@vite/client', async (_req, res, next) => {
      try {
        const result = await vite.transformRequest('/@vite/client');
        if (!result) return next();
        const patched = result.code.replace(
          /let\s+wsTransport\s*=\s*createWebSocketModuleRunnerTransport\s*\(\s*\{[\s\S]*?\}\s*\)\s*;?/g,
          'let wsTransport = { connect() {}, disconnect() {}, send() {} };'
        );
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        res.send(patched);
      } catch (err) {
        next(err);
      }
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      const indexFile = path.join(distPath, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found. Run npm run build.');
      }
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`BangaPrep server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start BangaPrep server:', err);
  process.exit(1);
});
