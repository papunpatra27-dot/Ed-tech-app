import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  FileSpreadsheet,
  GitCompareArrows,
  GraduationCap,
  Infinity as InfinityIcon,
  Lightbulb,
  Loader2,
  Plus,
  RefreshCw,
  Scale,
} from 'lucide-react';
import { CURATED_CHAPTER_NOTES } from '../data/chapterNotes';
import {
  Chapter,
  ChapterStudyMaterial,
  ExamTarget,
  StudyLanguage,
  Subject,
} from '../types';
import {
  expandChapterStudyMaterial,
  fetchChapterStudyMaterial,
  normalizeStudyMaterial,
} from '../utils/api';

interface StudyMaterialViewProps {
  subject: Subject;
  chapter: Chapter;
  examTarget: ExamTarget;
  language: StudyLanguage;
  onStartDailyTest: () => void;
  onStartUnlimitedPractice: () => void;
  onBack: () => void;
}

const NOTES_CACHE_PREFIX = 'bangaprep_notes_cache_v4::';

function buildCacheKey(
  chapterId: string,
  language: StudyLanguage,
  examTarget: ExamTarget
): string {
  return `${NOTES_CACHE_PREFIX}${chapterId}::${language}::${examTarget}`;
}

function readCachedNotes(
  chapterId: string,
  language: StudyLanguage,
  examTarget: ExamTarget
): ChapterStudyMaterial | null {
  try {
    const raw = localStorage.getItem(
      buildCacheKey(chapterId, language, examTarget)
    );
    if (!raw) return null;
    return normalizeStudyMaterial(JSON.parse(raw), chapterId);
  } catch {
    return null;
  }
}

function saveCachedNotes(
  chapterId: string,
  language: StudyLanguage,
  examTarget: ExamTarget,
  data: ChapterStudyMaterial
): void {
  try {
    localStorage.setItem(
      buildCacheKey(chapterId, language, examTarget),
      JSON.stringify(data)
    );
  } catch {
    // ignore storage limits
  }
}

export const StudyMaterialView: React.FC<StudyMaterialViewProps> = ({
  subject,
  chapter,
  examTarget,
  language,
  onStartDailyTest,
  onStartUnlimitedPractice,
  onBack,
}) => {
  const [material, setMaterial] = useState<ChapterStudyMaterial | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [expanding, setExpanding] = useState(false);
  const [activeExpandTopic, setActiveExpandTopic] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const syllabusTopics = useMemo(
    () =>
      chapter.topics
        .split(/[,;]/)
        .map((t) => t.trim())
        .filter(Boolean),
    [chapter.topics]
  );

  const loadFullTextbookNotes = async (forceRefresh = false) => {
    if (!forceRefresh) {
      const cached = readCachedNotes(chapter.id, language, examTarget);
      if (cached) {
        setMaterial(cached);
        return;
      }
    }

    setLoadingAi(true);
    setErrorMsg(null);
    try {
      const fresh = await fetchChapterStudyMaterial({
        subjectName: subject.name,
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        chapterTopics: chapter.topics,
        examTarget,
        language,
      });
      setMaterial(fresh);
      saveCachedNotes(chapter.id, language, examTarget, fresh);
    } catch (err) {
      const fallback = CURATED_CHAPTER_NOTES[chapter.id] ?? null;
      if (fallback) {
        setMaterial(fallback);
      }
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Could not load the full textbook module right now.'
      );
    } finally {
      setLoadingAi(false);
    }
  };

  const handleExpandNotes = async (focusTopic?: string) => {
    if (!material || expanding) return;
    setExpanding(true);
    setActiveExpandTopic(focusTopic || null);
    setErrorMsg(null);
    try {
      const patch = await expandChapterStudyMaterial({
        subjectName: subject.name,
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        chapterTopics: chapter.topics,
        focusTopic,
        existingSectionTitles: (material.keyPoints ?? []).map((k) => k.title),
        examTarget,
        language,
      });

      setMaterial((prev) => {
        if (!prev) return prev;
        const mergedTable = prev.referenceTable
          ? {
              ...prev.referenceTable,
              rows: [...prev.referenceTable.rows, ...patch.extraTableRows],
            }
          : patch.extraTableRows.length > 0
            ? {
                title: `${chapter.title} — Reference Matrix`,
                columns: ['Topic / Provision', 'Key Specifications', 'Exam Linkage'] as [
                  string,
                  string,
                  string,
                ],
                rows: patch.extraTableRows,
              }
            : undefined;

        const existingFactsSet = new Set(prev.mustRememberFacts ?? []);
        const newFacts = patch.extraFacts.filter((f) => !existingFactsSet.has(f));

        const updated: ChapterStudyMaterial = {
          ...prev,
          keyPoints: [...(prev.keyPoints ?? []), ...patch.extraKeyPoints],
          referenceTable: mergedTable,
          workedExamples: [
            ...(prev.workedExamples ?? []),
            ...patch.extraWorkedExamples,
          ],
          mustRememberFacts: [...(prev.mustRememberFacts ?? []), ...newFacts],
          source: 'ai',
        };
        saveCachedNotes(chapter.id, language, examTarget, updated);
        return updated;
      });
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Could not load deeper modules right now.'
      );
    } finally {
      setExpanding(false);
      setActiveExpandTopic(null);
    }
  };

  useEffect(() => {
    setErrorMsg(null);
    const cached = readCachedNotes(chapter.id, language, examTarget);
    if (cached) {
      setMaterial(cached);
      setLoadingAi(false);
      return;
    }

    const curated = CURATED_CHAPTER_NOTES[chapter.id] ?? null;
    const isTextbookGrade = Boolean(
      curated?.referenceTable &&
        curated?.comparisonPairs?.length &&
        curated?.commonTraps?.length
    );

    if (curated && isTextbookGrade && language === 'English') {
      setMaterial(curated);
      setLoadingAi(false);
    } else {
      setMaterial(null);
      void loadFullTextbookNotes(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter.id, language, examTarget]);

  const isCuratedFallback = material?.source === 'curated';

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to chapters"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {subject.name} ·{' '}
              {isCuratedFallback
                ? 'Offline Quick Summary'
                : 'WBCS / WBPSC Textbook Module'}{' '}
              · {examTarget === 'ALL' ? 'Graduate Standard' : examTarget}
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              {language === 'Bengali' ? chapter.bengaliTitle : chapter.title}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => void loadFullTextbookNotes(true)}
            disabled={loadingAi}
            className="inline-flex items-center gap-1.5 min-h-[42px] px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60"
          >
            {loadingAi ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Compiling Textbook Chapter...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
                <span>
                  {language === 'Bengali'
                    ? 'বিস্তারিত টেক্সটবুক নোট রিফ্রেশ করুন'
                    : 'Regenerate Textbook Notes'}
                </span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onStartDailyTest}
            className="inline-flex items-center gap-1.5 min-h-[42px] px-4 py-2 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Start Daily Test</span>
          </button>
        </div>
      </div>

      {loadingAi && material && (
        <div className="rounded-xl border border-blue-200 dark:border-blue-900/70 bg-blue-50/70 dark:bg-blue-950/30 px-4 py-3 flex items-center gap-2.5 text-xs text-blue-950 dark:text-blue-200">
          <Loader2 className="w-4 h-4 animate-spin shrink-0 text-blue-700 dark:text-blue-400" />
          <span>
            Upgrading from quick summary to full 8–10 section graduate textbook chapter, reference matrix, and worked examples...
          </span>
        </div>
      )}

      {errorMsg && (
        <div className="rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 px-4 py-3 flex items-center justify-between gap-3 text-xs text-amber-950 dark:text-amber-200">
          <span>
            {errorMsg}
            {isCuratedFallback
              ? ' Showing offline quick-revision notes.'
              : ''}
          </span>
          <button
            type="button"
            onClick={() => void loadFullTextbookNotes(true)}
            className="font-semibold underline shrink-0 cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {loadingAi && !material ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-blue-700 dark:text-blue-400 animate-spin mx-auto" />
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
            Compiling Full Textbook Chapter...
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Building 8–10 detailed modules, a structured reference table, solved examples, comparative distinctions, and WBCS Mains analysis for {chapter.title}.
          </p>
        </div>
      ) : material ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Main Textbook Column */}
          <div className="lg:col-span-8 space-y-6">
            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-800 dark:text-blue-400">
                <BookOpen className="w-4 h-4" />
                <span>Chapter Scope, PYQ Trend &amp; Exam Weightage</span>
              </div>
              <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                {material.overview}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Tap any syllabus topic below to append a deep-dive treatise:
                </div>
                <div className="flex flex-wrap gap-2">
                  {syllabusTopics.map((topic) => {
                    const isThisLoading = expanding && activeExpandTopic === topic;
                    return (
                      <button
                        key={topic}
                        type="button"
                        disabled={expanding}
                        onClick={() => void handleExpandNotes(topic)}
                        className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-blue-600 dark:hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors cursor-pointer disabled:opacity-60"
                      >
                        {isThisLoading ? (
                          <Loader2 className="w-3 h-3 animate-spin text-blue-700 dark:text-blue-400" />
                        ) : (
                          <Plus className="w-3 h-3 text-blue-700 dark:text-blue-400" />
                        )}
                        <span>{topic}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Detailed Textbook Modules */}
            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">
                  Detailed Study Modules
                </h2>
                <span className="font-mono-tabular text-xs text-slate-500 dark:text-slate-400">
                  {(material.keyPoints ?? []).length} sections
                </span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {(material.keyPoints ?? []).map((pt, idx) => (
                  <div key={idx} className="py-5 first:pt-1 last:pb-1 space-y-2.5">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      <span className="font-mono-tabular text-xs text-blue-700 dark:text-blue-400 mr-2">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      {pt.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {pt.detail}
                    </p>
                    {Array.isArray(pt.subPoints) && pt.subPoints.length > 0 && (
                      <ul className="mt-2 space-y-1.5 pl-5 list-disc text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {pt.subPoints.map((sub, sIdx) => (
                          <li key={sIdx}>{sub}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Need deeper WBCS Mains / graduate coverage? Endless modules keep appending without repeating previous sections.
                </p>
                <button
                  type="button"
                  disabled={expanding}
                  onClick={() => void handleExpandNotes()}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-blue-800 hover:bg-blue-900 disabled:opacity-60 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {expanding && !activeExpandTopic ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Appending +5 Advanced Modules...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Load +5 Deeper Advanced Modules</span>
                    </>
                  )}
                </button>
              </div>
            </section>

            {/* High-Density 3-Column Reference Matrix */}
            {material.referenceTable &&
              Array.isArray(material.referenceTable.columns) &&
              material.referenceTable.columns.length >= 3 &&
              Array.isArray(material.referenceTable.rows) &&
              material.referenceTable.rows.length > 0 && (
                <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                    <h2 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">
                      {material.referenceTable.title}
                    </h2>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100">
                          {material.referenceTable.columns.map((col, cIdx) => (
                            <th
                              key={cIdx}
                              className="px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-slate-700"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {material.referenceTable.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                          >
                            <td className="px-3.5 py-2.5 font-semibold text-slate-900 dark:text-slate-100 align-top">
                              {row[0]}
                            </td>
                            <td className="px-3.5 py-2.5 text-slate-700 dark:text-slate-300 align-top">
                              {row[1]}
                            </td>
                            <td className="px-3.5 py-2.5 text-slate-600 dark:text-slate-300 align-top">
                              {row[2]}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

            {/* Worked Examples / Solved Exam Scenarios */}
            {Array.isArray(material.workedExamples) &&
              material.workedExamples.length > 0 && (
                <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                    <h2 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">
                      Solved Exam Applications &amp; Walkthroughs
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {material.workedExamples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 p-4 space-y-2"
                      >
                        <div className="text-xs font-mono-tabular font-semibold text-blue-700 dark:text-blue-400">
                          Application 0{idx + 1}
                        </div>
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                          {ex.prompt}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-2 border-t border-slate-200 dark:border-slate-800">
                          {ex.solution}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            {/* Comparative Distinctions */}
            {Array.isArray(material.comparisonPairs) &&
              material.comparisonPairs.length > 0 && (
                <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <GitCompareArrows className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                    <h2 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">
                      High-Yield Comparisons &amp; Confusing Pairs
                    </h2>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {material.comparisonPairs.map((pair, idx) => (
                      <div key={idx} className="py-3 first:pt-0 last:pb-0">
                        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {pair.term}
                        </div>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {pair.distinction}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            {/* WBCS Mains & Analytical Perspective */}
            {material.mainsPerspective && (
              <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-2.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  <Scale className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                  <span>WBCS Mains &amp; Descriptive Analytical Angle</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {material.mainsPerspective}
                </p>
              </section>
            )}
          </div>

          {/* Right Quick Revision Sidebar */}
          <aside className="lg:col-span-4 space-y-5">
            {Array.isArray(material.mustRememberFacts) &&
              material.mustRememberFacts.length > 0 && (
                <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Prelims &amp; Mains Rapid Facts</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc pl-4 leading-relaxed">
                    {material.mustRememberFacts.map((fact, idx) => (
                      <li key={idx}>{fact}</li>
                    ))}
                  </ul>
                </section>
              )}

            {Array.isArray(material.commonTraps) &&
              material.commonTraps.length > 0 && (
                <section className="rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/30 p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-800 dark:text-rose-300">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Common Negative-Marking Traps</span>
                  </div>
                  <ul className="space-y-2 text-xs leading-relaxed text-rose-950 dark:text-rose-200 list-disc pl-4">
                    {material.commonTraps.map((trap, idx) => (
                      <li key={idx}>{trap}</li>
                    ))}
                  </ul>
                </section>
              )}

            <section className="rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/30 p-5 space-y-2">
              <div className="text-xs font-semibold text-amber-900 dark:text-amber-300">
                Examiner Pattern &amp; Strategy
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-amber-950 dark:text-amber-200">
                {material.examTips}
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Ready to Test This Chapter?
              </div>
              <button
                type="button"
                onClick={onStartDailyTest}
                className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Take Daily Chapter Test</span>
              </button>
              <button
                type="button"
                onClick={onStartUnlimitedPractice}
                className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-semibold transition-colors cursor-pointer"
              >
                <InfinityIcon className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                <span>Unlimited Practice MCQs</span>
              </button>
            </section>
          </aside>
        </div>
      ) : null}
    </div>
  );
};
