import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  CheckCircle2,
  Clock,
  Infinity as InfinityIcon,
  Loader2,
  Plus,
  RefreshCw,
  XCircle,
} from 'lucide-react';
import { STARTER_QUESTIONS } from '../data/starterQuestions';
import {
  Chapter,
  DifficultyLevel,
  ExamTarget,
  MCQQuestion,
  StudyLanguage,
  Subject,
  TestAttemptRecord,
} from '../types';
import { generateFreshMCQs } from '../utils/api';
import { getTodayKey } from '../utils/storage';
import { ExplanationCard } from './ExplanationCard';

interface StudyArenaProps {
  subject: Subject;
  chapter: Chapter;
  initialMode: 'daily-test' | 'unlimited-practice';
  examTarget: ExamTarget;
  language: StudyLanguage;
  negativeMarkingEnabled: boolean;
  activeDateKey?: string;
  seenStemsForChapterToday: string[];
  onRecordPracticeAnswer: (question: MCQQuestion, selectedIndex: number) => void;
  onCompleteDailyTest: (
    attempt: TestAttemptRecord,
    wrongItems: Array<{ question: MCQQuestion; selectedIndex: number }>
  ) => void;
  onOpenStudyMaterial?: () => void;
  onExit: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export const StudyArena: React.FC<StudyArenaProps> = ({
  subject,
  chapter,
  initialMode,
  examTarget,
  language,
  negativeMarkingEnabled,
  activeDateKey,
  seenStemsForChapterToday,
  onRecordPracticeAnswer,
  onCompleteDailyTest,
  onOpenStudyMaterial,
  onExit,
}) => {
  const [mode, setMode] = useState<'daily-test' | 'unlimited-practice'>(
    initialMode
  );
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Hard');
  const [testQuestionCount, setTestQuestionCount] = useState<number>(10);

  const [questions, setQuestions] = useState<MCQQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [markedIds, setMarkedIds] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Test submission state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'wrong' | 'all' | 'skipped'>(
    'wrong'
  );
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const recordedIdsRef = useRef<Set<string>>(new Set());
  const prefetchedForLenRef = useRef<number | null>(null);
  const appendInFlightRef = useRef<boolean>(false);
  const pendingAdvanceRef = useRef<boolean>(false);

  const loadInitialQuestions = async (
    targetMode: 'daily-test' | 'unlimited-practice',
    desiredCount: number,
    diff: DifficultyLevel
  ) => {
    setLoading(true);
    setErrorMsg(null);
    setIsSubmitted(false);
    setAnswers({});
    setMarkedIds({});
    setCurrentIdx(0);
    setElapsedSeconds(0);
    recordedIdsRef.current = new Set();
    prefetchedForLenRef.current = null;
    pendingAdvanceRef.current = false;

    const chapterMatches = STARTER_QUESTIONS.filter(
      (q) => q.chapterId === chapter.id
    );
    const localMatches =
      chapterMatches.length > 0
        ? chapterMatches
        : STARTER_QUESTIONS.filter((q) => q.subjectId === subject.id);

    try {
      const fresh = await generateFreshMCQs({
        subjectId: subject.id,
        subjectName: subject.name,
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        chapterTopics: chapter.topics,
        examTarget,
        difficulty: diff,
        count: desiredCount,
        language,
        excludeStems: seenStemsForChapterToday,
      });

      if (fresh.length > 0) {
        setQuestions(fresh);
      } else if (localMatches.length > 0) {
        setQuestions(localMatches);
      } else {
        setErrorMsg('No questions could be loaded. Please try again.');
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to connect to question generator.';
      if (localMatches.length > 0) {
        setQuestions(localMatches);
        setErrorMsg(
          chapterMatches.length > 0
            ? `${message} Loaded ${localMatches.length} offline starter questions for this chapter.`
            : `${message} Loaded ${localMatches.length} offline ${subject.name} starter questions.`
        );
      } else {
        setErrorMsg(message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadInitialQuestions(mode, testQuestionCount, difficulty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter.id]);

  // Timer
  useEffect(() => {
    if (loading || isSubmitted) return;
    const id = window.setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [loading, isSubmitted]);

  const appendUnlimitedBatch = async (advanceToNext: boolean) => {
    if (advanceToNext) {
      pendingAdvanceRef.current = true;
    }
    if (appendInFlightRef.current) return;

    appendInFlightRef.current = true;
    setLoadingMore(true);
    setErrorMsg(null);
    try {
      const existingSet = new Set(questions.map((q) => q.question));
      const exclude = [
        ...seenStemsForChapterToday,
        ...questions.map((q) => q.question),
      ];
      const more = await generateFreshMCQs({
        subjectId: subject.id,
        subjectName: subject.name,
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        chapterTopics: chapter.topics,
        examTarget,
        difficulty,
        count: 10,
        language,
        excludeStems: exclude,
      });

      const uniqueNew = more.filter((q) => !existingSet.has(q.question));
      const toAppend = uniqueNew.length > 0 ? uniqueNew : more;

      if (toAppend.length > 0) {
        const shouldAdvance = pendingAdvanceRef.current;
        pendingAdvanceRef.current = false;
        setQuestions((prev) => {
          const next = [...prev, ...toAppend];
          if (shouldAdvance) {
            setCurrentIdx(prev.length);
          }
          return next;
        });
      }
    } catch (err) {
      pendingAdvanceRef.current = false;
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Could not load another batch of questions.'
      );
    } finally {
      appendInFlightRef.current = false;
      setLoadingMore(false);
    }
  };

  // Automatically prefetch the next +10 fresh MCQs when nearing the end in Unlimited Practice
  useEffect(() => {
    if (
      mode !== 'unlimited-practice' ||
      loading ||
      isSubmitted ||
      loadingMore ||
      errorMsg ||
      questions.length === 0
    ) {
      return;
    }

    if (
      questions.length - currentIdx <= 3 &&
      prefetchedForLenRef.current !== questions.length
    ) {
      prefetchedForLenRef.current = questions.length;
      void appendUnlimitedBatch(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    mode,
    loading,
    isSubmitted,
    loadingMore,
    errorMsg,
    questions.length,
    currentIdx,
  ]);

  const currentQuestion = questions[currentIdx];

  const handleSelectOption = (optionIndex: number) => {
    if (!currentQuestion || isSubmitted) return;

    if (mode === 'unlimited-practice') {
      // Lock choice once answered in instant practice mode
      if (typeof answers[currentQuestion.id] === 'number') return;
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
      if (!recordedIdsRef.current.has(currentQuestion.id)) {
        recordedIdsRef.current.add(currentQuestion.id);
        onRecordPracticeAnswer(currentQuestion, optionIndex);
      }
    } else {
      // In Daily Test mode, allow changing choice before submitting
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
    }
  };

  const handleSubmitTest = () => {
    if (questions.length === 0 || isSubmitted) return;
    let correctCount = 0;
    let wrongCount = 0;
    let attemptedCount = 0;
    const wrongItems: Array<{ question: MCQQuestion; selectedIndex: number }> =
      [];

    for (const q of questions) {
      const chosen = answers[q.id];
      if (typeof chosen === 'number') {
        attemptedCount++;
        if (chosen === q.correctIndex) {
          correctCount++;
        } else {
          wrongCount++;
          wrongItems.push({ question: q, selectedIndex: chosen });
        }
      }
    }

    const negRate = negativeMarkingEnabled ? 0.33 : 0;
    const netScore = Math.max(0, correctCount - wrongCount * negRate);

    const attempt: TestAttemptRecord = {
      id: `test-${chapter.id}-${Date.now()}`,
      date: activeDateKey || getTodayKey(),
      timestamp: Date.now(),
      subjectId: subject.id,
      subjectName: subject.name,
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      examTarget,
      mode: 'daily-test',
      totalQuestions: questions.length,
      attemptedCount,
      correctCount,
      wrongCount,
      negativeMarking: negRate,
      netScore,
      durationSeconds: elapsedSeconds,
    };

    onCompleteDailyTest(attempt, wrongItems);
    setReviewFilter(wrongCount > 0 ? 'wrong' : 'all');
    setIsSubmitted(true);
  };

  const statsSummary = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    let skipped = 0;
    for (const q of questions) {
      const ans = answers[q.id];
      if (typeof ans !== 'number') skipped++;
      else if (ans === q.correctIndex) correct++;
      else wrong++;
    }
    const negRate = negativeMarkingEnabled && mode === 'daily-test' ? 0.33 : 0;
    const netScore = Math.max(0, correct - wrong * negRate);
    return { correct, wrong, skipped, netScore };
  }, [questions, answers, negativeMarkingEnabled, mode]);

  const formatTime = (secs: number) => {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const reviewQuestions = useMemo(() => {
    return questions.filter((q) => {
      const ans = answers[q.id];
      if (reviewFilter === 'wrong') {
        return typeof ans === 'number' && ans !== q.correctIndex;
      }
      if (reviewFilter === 'skipped') {
        return typeof ans !== 'number';
      }
      return true;
    });
  }, [questions, answers, reviewFilter]);

  return (
    <div className="space-y-6">
      {/* Top Arena Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={onExit}
            aria-label="Back to chapters"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {subject.name} ·{' '}
              {mode === 'daily-test'
                ? 'Daily Chapter Test'
                : 'Unlimited Practice'}
            </div>
            <h1 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              {language === 'Bengali' ? chapter.bengaliTitle : chapter.title}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => {
                if (mode !== 'daily-test') {
                  setMode('daily-test');
                  void loadInitialQuestions(
                    'daily-test',
                    testQuestionCount,
                    difficulty
                  );
                }
              }}
              className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                mode === 'daily-test'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Daily Test
            </button>
            <button
              type="button"
              onClick={() => {
                if (mode !== 'unlimited-practice') {
                  setMode('unlimited-practice');
                  void loadInitialQuestions(
                    'unlimited-practice',
                    10,
                    difficulty
                  );
                }
              }}
              className={`inline-flex items-center gap-1 min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                mode === 'unlimited-practice'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <InfinityIcon className="w-3.5 h-3.5" />
              <span>Unlimited MCQs</span>
            </button>
          </div>

          {/* Difficulty Filter */}
          <select
            aria-label="Difficulty filter"
            value={difficulty}
            onChange={(e) => {
              const nextDiff = e.target.value as DifficultyLevel;
              setDifficulty(nextDiff);
              void loadInitialQuestions(mode, testQuestionCount, nextDiff);
            }}
            className="min-h-[40px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200"
          >
            <option value="Hard">WBCS Prelims/Mains (Hard)</option>
            <option value="Mixed">Graduate Standard (Mixed)</option>
            <option value="Moderate">Moderate (Police SI / Misc)</option>
            <option value="Easy">Base (Clerkship / Constable)</option>
          </select>

          {mode === 'daily-test' && !isSubmitted && (
            <select
              aria-label="Question count"
              value={testQuestionCount}
              onChange={(e) => {
                const count = Number(e.target.value);
                setTestQuestionCount(count);
                void loadInitialQuestions('daily-test', count, difficulty);
              }}
              className="min-h-[40px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 font-mono-tabular"
            >
              <option value={10}>10 Questions</option>
              <option value={15}>15 Questions</option>
              <option value={20}>20 Questions</option>
              <option value={30}>30 Questions</option>
              <option value={50}>50 Questions</option>
            </select>
          )}

          <div className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-mono-tabular text-slate-700 dark:text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{formatTime(elapsedSeconds)}</span>
          </div>

          {onOpenStudyMaterial && (
            <button
              type="button"
              onClick={onOpenStudyMaterial}
              className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
              <span>Study Notes</span>
            </button>
          )}
        </div>
      </div>

      {errorMsg && (
        <div className="rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 px-4 py-3 flex items-center justify-between gap-3 text-xs text-amber-950 dark:text-amber-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button
            type="button"
            onClick={() =>
              void loadInitialQuestions(mode, testQuestionCount, difficulty)
            }
            className="inline-flex items-center gap-1 font-semibold underline shrink-0 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-blue-700 dark:text-blue-400 animate-spin mx-auto" />
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
            Preparing fresh West Bengal exam questions...
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Curating {chapter.title} MCQs calibrated to {examTarget === 'ALL' ? 'WBPSC & WBPRB' : examTarget} standards.
          </p>
        </div>
      ) : isSubmitted ? (
        /* POST-TEST SCORECARD & WRONG ANSWER REVIEW */
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Daily Chapter Test Complete · {formatTime(elapsedSeconds)}
                </div>
                <h2 className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Score:{' '}
                  <span className="font-mono-tabular">
                    {statsSummary.netScore.toFixed(2)} / {questions.length}
                  </span>
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    void loadInitialQuestions(
                      'daily-test',
                      testQuestionCount,
                      difficulty
                    )
                  }
                  className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Take Another Fresh Test</span>
                </button>
                <button
                  type="button"
                  onClick={onExit}
                  className="min-h-[44px] px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  All Chapters
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-3.5">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Correct
                </div>
                <div className="mt-1 font-mono-tabular text-xl font-bold text-emerald-700 dark:text-emerald-400">
                  {statsSummary.correct}
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-3.5">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Wrong
                </div>
                <div className="mt-1 font-mono-tabular text-xl font-bold text-rose-700 dark:text-rose-400">
                  {statsSummary.wrong}
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-3.5">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Skipped
                </div>
                <div className="mt-1 font-mono-tabular text-xl font-bold text-slate-700 dark:text-slate-300">
                  {statsSummary.skipped}
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-3.5">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Negative Penalty
                </div>
                <div className="mt-1 font-mono-tabular text-xl font-bold text-slate-700 dark:text-slate-300">
                  {negativeMarkingEnabled
                    ? `-${(statsSummary.wrong * 0.33).toFixed(2)}`
                    : 'Off'}
                </div>
              </div>
            </div>
          </section>

          {/* Review Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
              <button
                type="button"
                onClick={() => setReviewFilter('wrong')}
                className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  reviewFilter === 'wrong'
                    ? 'bg-white dark:bg-slate-900 text-rose-700 dark:text-rose-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Wrong Answers ({statsSummary.wrong})
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter('all')}
                className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  reviewFilter === 'all'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                All Questions ({questions.length})
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter('skipped')}
                className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  reviewFilter === 'skipped'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Skipped ({statsSummary.skipped})
              </button>
            </div>

            {statsSummary.wrong > 0 && (
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Wrong answers have been saved to your Mistake Vault. Tap &ldquo;View Answer &amp; Explanation&rdquo; below each item.
              </p>
            )}
          </div>

          {reviewQuestions.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h3 className="mt-2 font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                {reviewFilter === 'wrong'
                  ? 'Zero wrong answers in this test'
                  : 'No questions in this filter'}
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Switch to &ldquo;All Questions&rdquo; to inspect every question and explanation.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviewQuestions.map((q) => {
                const chosen = answers[q.id];
                const qIndex = questions.findIndex((item) => item.id === q.id);

                return (
                  <article
                    key={q.id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6"
                  >
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono-tabular">
                      Question {qIndex + 1} · {q.examTag} · {q.difficulty} ·{' '}
                      {q.source === 'ai' ? 'AI Generated MCQ' : 'Built-in WB Bank'}
                    </div>
                    <h3 className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                      {q.question}
                    </h3>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => {
                        const isYourWrong =
                          typeof chosen === 'number' &&
                          chosen === oIdx &&
                          oIdx !== q.correctIndex;
                        const isCorrectOpt = oIdx === q.correctIndex;

                        let optClass =
                          'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300';
                        if (isYourWrong) {
                          optClass =
                            'border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100';
                        } else if (isCorrectOpt && chosen === q.correctIndex) {
                          optClass =
                            'border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100';
                        }

                        return (
                          <div
                            key={oIdx}
                            className={`rounded-xl border px-3.5 py-2.5 text-sm flex items-center justify-between gap-2 ${optClass}`}
                          >
                            <span>
                              <strong className="font-mono-tabular mr-1.5">
                                {OPTION_LETTERS[oIdx]}.
                              </strong>
                              {opt}
                            </span>
                            {isYourWrong && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 dark:text-rose-300 shrink-0">
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Your Answer</span>
                              </span>
                            )}
                            {isCorrectOpt && chosen === q.correctIndex && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 shrink-0">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Correct</span>
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <ExplanationCard
                      question={q}
                      selectedIndex={typeof chosen === 'number' ? chosen : null}
                      subjectName={subject.name}
                      chapterTitle={chapter.title}
                      language={language}
                      defaultExpanded={false}
                    />
                  </article>
                );
              })}
            </div>
          )}
        </div>
      ) : currentQuestion ? (
        /* ACTIVE QUESTION STAGE + SIDEBAR PALETTE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Stage: Question & Options */}
          <div className="lg:col-span-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex flex-wrap items-center gap-2 font-mono-tabular">
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  Question {currentIdx + 1} of {questions.length}
                </span>
                <span aria-hidden="true">·</span>
                <span>{currentQuestion.examTag}</span>
                <span aria-hidden="true">·</span>
                <span>{currentQuestion.difficulty}</span>
                <span aria-hidden="true">·</span>
                <span>
                  {currentQuestion.source === 'ai'
                    ? 'Fresh AI MCQ'
                    : 'Built-in WB Bank'}
                </span>
              </div>

              {mode === 'daily-test' && (
                <button
                  type="button"
                  onClick={() =>
                    setMarkedIds((prev) => ({
                      ...prev,
                      [currentQuestion.id]: !prev[currentQuestion.id],
                    }))
                  }
                  className={`inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                    markedIds[currentQuestion.id]
                      ? 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>
                    {markedIds[currentQuestion.id] ? 'Marked' : 'Mark Review'}
                  </span>
                </button>
              )}
            </div>

            <h2 className="mt-4 text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* 4 Thumb-Friendly Options */}
            <div className="mt-5 space-y-3">
              {currentQuestion.options.map((opt, idx) => {
                const chosen = answers[currentQuestion.id];
                const isAnswered = typeof chosen === 'number';
                const isSelected = chosen === idx;
                const isUnlimited = mode === 'unlimited-practice';
                const isWrongSelected =
                  isUnlimited &&
                  isAnswered &&
                  isSelected &&
                  idx !== currentQuestion.correctIndex;
                const isRightSelected =
                  isUnlimited &&
                  isAnswered &&
                  isSelected &&
                  idx === currentQuestion.correctIndex;

                let btnStyle =
                  'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 text-slate-900 dark:text-slate-100 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-blue-950/20';

                if (mode === 'daily-test' && isSelected) {
                  btnStyle =
                    'border-blue-700 dark:border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100 ring-1 ring-blue-700 dark:ring-blue-500';
                } else if (isWrongSelected) {
                  btnStyle =
                    'border-rose-400 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100';
                } else if (isRightSelected) {
                  btnStyle =
                    'border-emerald-500 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full min-h-[52px] text-left rounded-xl border px-4 py-3 text-sm sm:text-base transition-colors flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono-tabular font-semibold text-sm text-slate-500 dark:text-slate-400 mt-0.5 shrink-0">
                        {OPTION_LETTERS[idx]}.
                      </span>
                      <span className="leading-snug">{opt}</span>
                    </div>

                    {isWrongSelected && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 dark:text-rose-300 shrink-0">
                        <XCircle className="w-4 h-4" />
                        <span>Wrong</span>
                      </span>
                    )}
                    {isRightSelected && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Correct</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Explanation Option when answered in Unlimited Practice Mode */}
            {mode === 'unlimited-practice' &&
              typeof answers[currentQuestion.id] === 'number' && (
                <ExplanationCard
                  key={currentQuestion.id}
                  question={currentQuestion}
                  selectedIndex={answers[currentQuestion.id]}
                  subjectName={subject.name}
                  chapterTitle={chapter.title}
                  language={language}
                  defaultExpanded={false}
                />
              )}

            {/* Navigation Footer */}
            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                  className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {mode === 'daily-test' &&
                  typeof answers[currentQuestion.id] === 'number' && (
                    <button
                      type="button"
                      onClick={() =>
                        setAnswers((prev) => {
                          const next = { ...prev };
                          delete next[currentQuestion.id];
                          return next;
                        })
                      }
                      className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
              </div>

              <div className="flex items-center gap-2">
                {currentIdx < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentIdx((i) =>
                        Math.min(questions.length - 1, i + 1)
                      )
                    }
                    className="inline-flex items-center gap-1.5 min-h-[44px] px-5 py-2 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : mode === 'unlimited-practice' ? (
                  <button
                    type="button"
                    onClick={() => void appendUnlimitedBatch(true)}
                    disabled={loadingMore}
                    className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2 rounded-xl bg-blue-800 hover:bg-blue-900 disabled:opacity-60 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Auto-Loading Next 10 MCQs...</span>
                      </>
                    ) : (
                      <>
                        <span>Next Question (Auto-Load +10)</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitTest}
                    className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Chapter Test</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Question Navigator & Controls */}
          <aside className="lg:col-span-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                Question Palette
              </h3>
              <span className="font-mono-tabular text-xs text-slate-500 dark:text-slate-400">
                {Object.keys(answers).length}/{questions.length} answered
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const ans = answers[q.id];
                const isCurrent = idx === currentIdx;
                const isMarked = markedIds[q.id];

                let cellClass =
                  'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300';

                if (mode === 'unlimited-practice' && typeof ans === 'number') {
                  cellClass =
                    ans === q.correctIndex
                      ? 'border-emerald-400 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300'
                      : 'border-rose-400 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300';
                } else if (typeof ans === 'number') {
                  cellClass =
                    'border-blue-600 bg-blue-700 text-white';
                } else if (isMarked) {
                  cellClass =
                    'border-amber-400 bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    className={`min-h-[42px] rounded-xl border font-mono-tabular text-xs font-semibold transition-transform active:scale-95 cursor-pointer ${cellClass} ${
                      isCurrent
                        ? 'ring-2 ring-slate-900 dark:ring-slate-100 ring-offset-1 dark:ring-offset-slate-900'
                        : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {mode === 'daily-test' ? (
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>Negative Marking</span>
                  <span className="font-mono-tabular font-semibold text-slate-800 dark:text-slate-200">
                    {negativeMarkingEnabled ? '-0.33 per wrong' : 'Disabled'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleSubmitTest}
                  className="w-full min-h-[46px] rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  Submit Daily Test
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between font-mono-tabular">
                  <span>Session Score</span>
                  <span>
                    {statsSummary.correct} Right · {statsSummary.wrong} Wrong
                  </span>
                </div>
                {loadingMore && (
                  <div className="text-[11px] text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                    <Loader2 className="w-3 h-3 animate-spin shrink-0" />
                    <span>Auto-prefetching next +10 unique MCQs...</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => void appendUnlimitedBatch(true)}
                  disabled={loadingMore}
                  className="w-full inline-flex items-center justify-center gap-2 min-h-[46px] rounded-xl border border-blue-700 dark:border-blue-500 text-blue-800 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-sm font-semibold transition-colors cursor-pointer"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Generate +10 Fresh MCQs</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </aside>
        </div>
      ) : null}
    </div>
  );
};
