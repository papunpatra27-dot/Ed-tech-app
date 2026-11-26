import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Loader2,
  XCircle,
} from 'lucide-react';
import { DeepExplanation, MCQQuestion, StudyLanguage } from '../types';
import { fetchDeepExplanation } from '../utils/api';

interface ExplanationCardProps {
  question: MCQQuestion;
  selectedIndex: number | null;
  subjectName: string;
  chapterTitle: string;
  language: StudyLanguage;
  defaultExpanded?: boolean;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export const ExplanationCard: React.FC<ExplanationCardProps> = ({
  question,
  selectedIndex,
  subjectName,
  chapterTitle,
  language,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [deepData, setDeepData] = useState<DeepExplanation | null>(null);
  const [loadingDeep, setLoadingDeep] = useState(false);
  const [deepError, setDeepError] = useState<string | null>(null);

  const isCorrect = selectedIndex === question.correctIndex;
  const isSkipped = selectedIndex === null || selectedIndex === undefined;

  const handleLoadDeep = async () => {
    if (deepData || loadingDeep) return;
    setLoadingDeep(true);
    setDeepError(null);
    try {
      const result = await fetchDeepExplanation({
        question: question.question,
        options: question.options,
        correctIndex: question.correctIndex,
        selectedIndex,
        existingExplanation: question.explanation,
        language,
        subjectName,
        chapterTitle,
      });
      setDeepData(result);
    } catch (err) {
      setDeepError(
        err instanceof Error
          ? err.message
          : 'Could not load step-by-step explanation.'
      );
    } finally {
      setLoadingDeep(false);
    }
  };

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/70 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {isCorrect ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : isSkipped ? (
            <HelpCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
          )}
          <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
            {isCorrect
              ? 'Correct Answer'
              : isSkipped
                ? `Skipped · Correct Answer: Option ${OPTION_LETTERS[question.correctIndex]}`
                : `Incorrect · Correct Answer: Option ${OPTION_LETTERS[question.correctIndex]}`}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded((v) => !v)}
          className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
          <span>
            {isExpanded
              ? 'Hide Answer & Explanation'
              : 'View Answer & Explanation'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 p-3.5">
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
              Correct Option ({OPTION_LETTERS[question.correctIndex]})
            </div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              {question.options[question.correctIndex]}
            </p>
          </div>

          <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              Explanation:{' '}
            </span>
            {question.explanation}
          </div>

          {question.examHook && (
            <div className="rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 px-3.5 py-2.5 text-xs leading-relaxed text-amber-950 dark:text-amber-200">
              <span className="font-semibold">Exam Note: </span>
              {question.examHook}
            </div>
          )}

          {!deepData && (
            <div className="pt-1">
              <button
                type="button"
                onClick={handleLoadDeep}
                disabled={loadingDeep}
                className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 rounded-xl bg-blue-800 hover:bg-blue-900 disabled:opacity-60 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {loadingDeep ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Preparing step-by-step breakdown...</span>
                  </>
                ) : (
                  <span>Need Deeper Step-by-Step Breakdown?</span>
                )}
              </button>
              {deepError && (
                <p className="mt-2 text-xs text-rose-600 dark:text-rose-400">
                  {deepError}
                </p>
              )}
            </div>
          )}

          {deepData && (
            <div className="mt-2 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/30 p-4 space-y-2.5 text-sm">
              {!isCorrect && !isSkipped && (
                <div>
                  <div className="text-xs font-semibold text-rose-700 dark:text-rose-400">
                    Why Your Choice Was Incorrect
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">
                    {deepData.whyYourChoiceIsWrong}
                  </p>
                </div>
              )}
              <div>
                <div className="text-xs font-semibold text-blue-800 dark:text-blue-300">
                  Step-by-Step Breakdown
                </div>
                <p className="text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">
                  {deepData.conceptBreakdown}
                </p>
              </div>
              <div>
                <div className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                  Memory Hook / Shortcut
                </div>
                <p className="text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">
                  {deepData.shortcutOrMnemonic}
                </p>
              </div>
              <div>
                <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                  Related West Bengal Exam Fact
                </div>
                <p className="text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">
                  {deepData.relatedExamFact}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
