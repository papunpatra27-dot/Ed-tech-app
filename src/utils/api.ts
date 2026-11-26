import {
  ChapterStudyMaterial,
  DeepExplanation,
  DifficultyLevel,
  ExamTarget,
  MCQQuestion,
  StudyLanguage,
} from '../types';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export async function generateFreshMCQs(params: {
  subjectId: string;
  subjectName: string;
  chapterId: string;
  chapterTitle: string;
  chapterTopics: string;
  examTarget: ExamTarget;
  difficulty: DifficultyLevel;
  count: number;
  language: StudyLanguage;
  excludeStems: string[];
}): Promise<MCQQuestion[]> {
  const res = await fetch(`${API_BASE}/api/generate-mcqs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const data = (await res.json().catch(() => ({}))) as {
    questions?: MCQQuestion[];
    error?: string;
  };

  if (!res.ok) {
    throw new Error(
      data.error || `Failed to generate questions (${res.status}).`
    );
  }

  return data.questions ?? [];
}

export async function fetchDeepExplanation(params: {
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  selectedIndex: number | null;
  existingExplanation: string;
  language: StudyLanguage;
  subjectName: string;
  chapterTitle: string;
}): Promise<DeepExplanation> {
  const res = await fetch(`${API_BASE}/api/explain-mcq`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const data = (await res.json().catch(() => ({}))) as DeepExplanation & {
    error?: string;
  };

  if (!res.ok) {
    throw new Error(
      data.error || `Failed to fetch detailed breakdown (${res.status}).`
    );
  }

  return data;
}

export function normalizeStudyMaterial(
  raw: unknown,
  fallbackChapterId: string
): ChapterStudyMaterial | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as Record<string, unknown>;

  const overview = typeof obj.overview === 'string' ? obj.overview.trim() : '';
  const rawKeyPoints = Array.isArray(obj.keyPoints) ? obj.keyPoints : [];
  const keyPoints = rawKeyPoints
    .filter((pt): pt is Record<string, unknown> => Boolean(pt && typeof pt === 'object'))
    .map((pt) => ({
      title: typeof pt.title === 'string' ? pt.title : '',
      detail: typeof pt.detail === 'string' ? pt.detail : '',
      subPoints: Array.isArray(pt.subPoints)
        ? pt.subPoints.filter((s): s is string => typeof s === 'string')
        : [],
    }))
    .filter((pt) => pt.title || pt.detail);

  if (!overview && keyPoints.length === 0) {
    return null;
  }

  let referenceTable: ChapterStudyMaterial['referenceTable'];
  const rawTable = obj.referenceTable;
  if (rawTable && typeof rawTable === 'object') {
    const t = rawTable as Record<string, unknown>;
    const cols = Array.isArray(t.columns)
      ? t.columns.map((c) => String(c ?? ''))
      : [];
    const rows = Array.isArray(t.rows)
      ? t.rows
          .filter((r): r is unknown[] => Array.isArray(r) && r.length >= 3)
          .map(
            (r) =>
              [String(r[0] ?? ''), String(r[1] ?? ''), String(r[2] ?? '')] as [
                string,
                string,
                string,
              ]
          )
      : [];

    if (cols.length >= 3 && rows.length > 0) {
      referenceTable = {
        title: typeof t.title === 'string' && t.title ? t.title : 'Quick-Reference Matrix',
        columns: [cols[0], cols[1], cols[2]],
        rows,
      };
    }
  }

  const workedExamples = Array.isArray(obj.workedExamples)
    ? obj.workedExamples
        .filter((ex): ex is Record<string, unknown> => Boolean(ex && typeof ex === 'object'))
        .map((ex) => ({
          prompt: typeof ex.prompt === 'string' ? ex.prompt : '',
          solution: typeof ex.solution === 'string' ? ex.solution : '',
        }))
        .filter((ex) => ex.prompt && ex.solution)
    : [];

  const comparisonPairs = Array.isArray(obj.comparisonPairs)
    ? obj.comparisonPairs
        .filter((p): p is Record<string, unknown> => Boolean(p && typeof p === 'object'))
        .map((p) => ({
          term: typeof p.term === 'string' ? p.term : '',
          distinction: typeof p.distinction === 'string' ? p.distinction : '',
        }))
        .filter((p) => p.term && p.distinction)
    : [];

  const commonTraps = Array.isArray(obj.commonTraps)
    ? obj.commonTraps.filter((t): t is string => typeof t === 'string' && t.length > 0)
    : [];

  const mustRememberFacts = Array.isArray(obj.mustRememberFacts)
    ? obj.mustRememberFacts.filter((f): f is string => typeof f === 'string' && f.length > 0)
    : [];

  return {
    chapterId:
      typeof obj.chapterId === 'string' && obj.chapterId
        ? obj.chapterId
        : fallbackChapterId,
    overview,
    keyPoints,
    referenceTable,
    workedExamples,
    comparisonPairs,
    commonTraps,
    mainsPerspective:
      typeof obj.mainsPerspective === 'string' ? obj.mainsPerspective : '',
    mustRememberFacts,
    examTips: typeof obj.examTips === 'string' ? obj.examTips : '',
    source: obj.source === 'curated' ? 'curated' : 'ai',
  };
}

export async function fetchChapterStudyMaterial(params: {
  subjectName: string;
  chapterId: string;
  chapterTitle: string;
  chapterTopics: string;
  examTarget: ExamTarget;
  language: StudyLanguage;
}): Promise<ChapterStudyMaterial> {
  const res = await fetch(`${API_BASE}/api/study-material`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const data = (await res.json().catch(() => ({}))) as Partial<ChapterStudyMaterial> & {
    error?: string;
  };

  if (!res.ok) {
    throw new Error(
      data.error || `Failed to load study material (${res.status}).`
    );
  }

  const normalized = normalizeStudyMaterial(data, params.chapterId);
  if (!normalized) {
    throw new Error('Study material response was incomplete. Please try again.');
  }

  return normalized;
}

export interface ExpandedStudyMaterialPatch {
  extraKeyPoints: ChapterStudyMaterial['keyPoints'];
  extraTableRows: Array<[string, string, string]>;
  extraWorkedExamples: NonNullable<ChapterStudyMaterial['workedExamples']>;
  extraFacts: string[];
}

export async function expandChapterStudyMaterial(params: {
  subjectName: string;
  chapterId: string;
  chapterTitle: string;
  chapterTopics: string;
  focusTopic?: string;
  existingSectionTitles: string[];
  examTarget: ExamTarget;
  language: StudyLanguage;
}): Promise<ExpandedStudyMaterialPatch> {
  const res = await fetch(`${API_BASE}/api/study-material/expand`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const raw = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    throw new Error(
      (typeof raw.error === 'string' && raw.error) ||
        `Failed to expand study material (${res.status}).`
    );
  }

  const data = raw;

  const extraKeyPoints = Array.isArray(data.extraKeyPoints)
    ? data.extraKeyPoints
        .filter((pt): pt is Record<string, unknown> =>
          Boolean(pt && typeof pt === 'object')
        )
        .map((pt) => ({
          title: typeof pt.title === 'string' ? pt.title : '',
          detail: typeof pt.detail === 'string' ? pt.detail : '',
          subPoints: Array.isArray(pt.subPoints)
            ? pt.subPoints.filter((s): s is string => typeof s === 'string')
            : [],
        }))
        .filter((pt) => pt.title || pt.detail)
    : [];

  const extraTableRows = Array.isArray(data.extraTableRows)
    ? data.extraTableRows
        .filter((r): r is unknown[] => Array.isArray(r) && r.length >= 3)
        .map(
          (r) =>
            [String(r[0] ?? ''), String(r[1] ?? ''), String(r[2] ?? '')] as [
              string,
              string,
              string,
            ]
        )
    : [];

  const extraWorkedExamples = Array.isArray(data.extraWorkedExamples)
    ? data.extraWorkedExamples
        .filter((ex): ex is Record<string, unknown> =>
          Boolean(ex && typeof ex === 'object')
        )
        .map((ex) => ({
          prompt: typeof ex.prompt === 'string' ? ex.prompt : '',
          solution: typeof ex.solution === 'string' ? ex.solution : '',
        }))
        .filter((ex) => ex.prompt && ex.solution)
    : [];

  const extraFacts = Array.isArray(data.extraFacts)
    ? data.extraFacts.filter(
        (f): f is string => typeof f === 'string' && f.length > 0
      )
    : [];

  if (extraKeyPoints.length === 0 && extraTableRows.length === 0) {
    throw new Error('No additional study modules returned. Please try again.');
  }

  return {
    extraKeyPoints,
    extraTableRows,
    extraWorkedExamples,
    extraFacts,
  };
}


