import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  RotateCcw,
  Trash2,
  XCircle,
} from 'lucide-react';
import { WB_SUBJECTS } from '../data/wbSyllabus';
import { MistakeEntry, StudyLanguage } from '../types';
import { formatReadableDate } from '../utils/storage';
import { ExplanationCard } from './ExplanationCard';

interface MistakeVaultViewProps {
  mistakes: MistakeEntry[];
  language: StudyLanguage;
  onMarkMastered: (id: string) => void;
  onRemoveMistake: (id: string) => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export const MistakeVaultView: React.FC<MistakeVaultViewProps> = ({
  mistakes,
  language,
  onMarkMastered,
  onRemoveMistake,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [showMastered, setShowMastered] = useState<boolean>(false);
  const [retrySelection, setRetrySelection] = useState<Record<string, number>>(
    {}
  );

  const filteredMistakes = useMemo(() => {
    return mistakes.filter((m) => {
      if (!showMastered && m.mastered) return false;
      if (selectedSubject !== 'ALL' && m.question.subjectId !== selectedSubject) {
        return false;
      }
      return true;
    });
  }, [mistakes, selectedSubject, showMastered]);

  const activeCount = mistakes.filter((m) => !m.mastered).length;
  const masteredCount = mistakes.filter((m) => m.mastered).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Wrong Answers &amp; Explanations
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Every incorrect question from your chapter tests and daily practice is saved here for targeted revision.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400 font-mono-tabular shrink-0">
          <span>Active to review: {activeCount}</span>
          <span aria-hidden="true">·</span>
          <span>Mastered: {masteredCount}</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setSelectedSubject('ALL')}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              selectedSubject === 'ALL'
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Subjects
          </button>
          {WB_SUBJECTS.map((subj) => (
            <button
              key={subj.id}
              type="button"
              onClick={() => setSelectedSubject(subj.id)}
              className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedSubject === subj.id
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {subj.name.split('&')[0].trim()}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowMastered((v) => !v)}
          className="min-h-[40px] px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
        >
          {showMastered ? 'Hide Mastered Items' : `Show Mastered (${masteredCount})`}
        </button>
      </div>

      {filteredMistakes.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
          <h2 className="mt-3 font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
            No pending mistakes here
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            {mistakes.length === 0
              ? 'Take a daily chapter test or practice unlimited MCQs. Any wrong answers you select will appear here with full explanations.'
              : 'You have reviewed and mastered the questions in this filter.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMistakes.map((item) => {
            const retriedChoice = retrySelection[item.id];
            const hasRetried = typeof retriedChoice === 'number';
            const displayChoice = hasRetried
              ? retriedChoice
              : item.selectedWrongIndex;

            return (
              <article
                key={item.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {item.subjectName}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.chapterTitle}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.question.examTag}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular">
                      Missed {item.timesMissed}x · {formatReadableDate(item.dateAdded)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {!item.mastered && (
                      <button
                        type="button"
                        onClick={() => onMarkMastered(item.id)}
                        className="inline-flex items-center gap-1 min-h-[36px] px-3 py-1 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-xs font-semibold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Mastered</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onRemoveMistake(item.id)}
                      aria-label="Remove from Mistake Vault"
                      className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="mt-3 text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                  {item.question.question}
                </h3>

                {/* Interactive Retry Options */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {item.question.options.map((opt, idx) => {
                    const isCorrectOpt = idx === item.question.correctIndex;
                    const isSelectedWrong =
                      idx === displayChoice && !isCorrectOpt;
                    const isSelectedRight =
                      hasRetried && idx === retriedChoice && isCorrectOpt;

                    let stateClass =
                      'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 text-slate-800 dark:text-slate-200 hover:border-blue-400 dark:hover:border-blue-600';

                    if (isSelectedWrong) {
                      stateClass =
                        'border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100';
                    } else if (isSelectedRight) {
                      stateClass =
                        'border-emerald-400 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100';
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          setRetrySelection((prev) => ({
                            ...prev,
                            [item.id]: idx,
                          }))
                        }
                        className={`min-h-[48px] text-left rounded-xl border px-3.5 py-2.5 text-sm transition-colors flex items-center justify-between gap-2 cursor-pointer ${stateClass}`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="font-mono-tabular font-semibold text-xs mt-0.5 text-slate-500 dark:text-slate-400">
                            {OPTION_LETTERS[idx]}.
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isSelectedWrong && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 dark:text-rose-300 shrink-0">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Wrong</span>
                          </span>
                        )}
                        {isSelectedRight && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Right</span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {hasRetried && (
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>
                      {retriedChoice === item.question.correctIndex
                        ? 'Correct on retry — ready to mark mastered.'
                        : 'Still incorrect — open the explanation below to review.'}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setRetrySelection((prev) => {
                          const copy = { ...prev };
                          delete copy[item.id];
                          return copy;
                        })
                      }
                      className="inline-flex items-center gap-1 text-blue-700 dark:text-blue-400 font-medium hover:underline cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset retry</span>
                    </button>
                  </div>
                )}

                <ExplanationCard
                  question={item.question}
                  selectedIndex={displayChoice}
                  subjectName={item.subjectName}
                  chapterTitle={item.chapterTitle}
                  language={language}
                  defaultExpanded={false}
                />
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
