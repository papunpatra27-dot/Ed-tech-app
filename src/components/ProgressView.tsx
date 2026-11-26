import React from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  RotateCcw,
  Target,
} from 'lucide-react';
import { EXAM_TARGETS, WB_SUBJECTS } from '../data/wbSyllabus';
import { ExamTarget, StudyLanguage, UserStudyState } from '../types';
import {
  calculateStreak,
  formatReadableDate,
  getTodayKey,
} from '../utils/storage';
import { PWAInstallButton } from './PWAInstallButton';

interface ProgressViewProps {
  state: UserStudyState;
  onUpdateSettings: (patch: Partial<UserStudyState>) => void;
  onResetProgress: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  state,
  onUpdateSettings,
  onResetProgress,
}) => {
  const todayKey = getTodayKey();
  const streak = calculateStreak(state);

  const allStats = Object.values(state.dailyStats);
  const totalSolved = allStats.reduce((sum, s) => sum + s.questionsSolved, 0);
  const totalCorrect = allStats.reduce((sum, s) => sum + s.correctCount, 0);
  const overallAccuracy =
    totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 0;

  const todayStats = allStats.filter((s) => s.date === todayKey);
  const todaySolved = todayStats.reduce((sum, s) => sum + s.questionsSolved, 0);
  const todayTests = todayStats.reduce((sum, s) => sum + s.testsCompleted, 0);

  const subjectBreakdown = WB_SUBJECTS.map((subj) => {
    const subjStats = allStats.filter((s) => s.subjectId === subj.id);
    const solved = subjStats.reduce((sum, s) => sum + s.questionsSolved, 0);
    const correct = subjStats.reduce((sum, s) => sum + s.correctCount, 0);
    const tests = subjStats.reduce((sum, s) => sum + s.testsCompleted, 0);
    const accuracy = solved > 0 ? Math.round((correct / solved) * 100) : 0;
    return {
      subject: subj,
      solved,
      correct,
      tests,
      accuracy,
    };
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Daily Progress &amp; Exam Settings
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Track your daily West Bengal chapter tests, subject accuracy, and target exam preferences.
          </p>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Solved Today
          </div>
          <div className="mt-2 font-mono-tabular text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            {todaySolved}
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-mono-tabular">
            Goal: {state.dailyGoalQuestions} Qs/day (No cap)
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Chapter Tests Today
          </div>
          <div className="mt-2 font-mono-tabular text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            {todayTests}
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-mono-tabular">
            Total tests: {state.testHistory.length}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Overall Accuracy
          </div>
          <div className="mt-2 font-mono-tabular text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            {overallAccuracy}%
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-mono-tabular">
            {totalCorrect} / {totalSolved} correct
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Study Streak
          </div>
          <div className="mt-2 font-mono-tabular text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            {streak} {streak === 1 ? 'day' : 'days'}
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Daily consistency
          </div>
        </div>
      </div>

      {/* Android PWA Install Card */}
      <PWAInstallButton variant="card" />

      {/* Subject-Wise Performance & Exam Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6">
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
            Subject-Wise Performance
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Cumulative accuracy and chapter tests completed across all {WB_SUBJECTS.length} subjects.
          </p>

          <div className="mt-5 space-y-4">
            {subjectBreakdown.map(
              ({ subject, solved, correct, tests, accuracy }) => (
                <div key={subject.id} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                      {subject.name}
                    </span>
                    <span className="font-mono-tabular text-xs text-slate-500 dark:text-slate-400 shrink-0">
                      {solved > 0
                        ? `${accuracy}% (${correct}/${solved}) · ${tests} tests`
                        : 'Not started'}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-700 dark:bg-blue-500 transition-all"
                      style={{ width: `${accuracy}%` }}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        <section className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-700 dark:text-blue-400" />
            <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
              Preparation Preferences
            </h2>
          </div>

          <div>
            <label
              htmlFor="target-exam-select"
              className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5"
            >
              Target West Bengal Exam
            </label>
            <select
              id="target-exam-select"
              value={state.examTarget}
              onChange={(e) =>
                onUpdateSettings({ examTarget: e.target.value as ExamTarget })
              }
              className="w-full min-h-[44px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
            >
              {EXAM_TARGETS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label} ({t.authority})
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
              Question &amp; Explanation Language
            </div>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
              {(['English', 'Bengali'] as StudyLanguage[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onUpdateSettings({ language: lang })}
                  className={`min-h-[40px] rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    state.language === lang
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {lang === 'Bengali' ? 'বাংলা (Bengali)' : 'English'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-1">
            <div>
              <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                WBPSC Negative Marking (-0.33)
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Apply 1/3rd penalty for wrong answers in chapter tests
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={state.negativeMarkingEnabled}
              onClick={() =>
                onUpdateSettings({
                  negativeMarkingEnabled: !state.negativeMarkingEnabled,
                })
              }
              className={`w-12 h-7 rounded-full transition-colors p-1 shrink-0 cursor-pointer ${
                state.negativeMarkingEnabled
                  ? 'bg-blue-700'
                  : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                  state.negativeMarkingEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div>
            <label
              htmlFor="daily-goal-input"
              className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5"
            >
              Daily Minimum Target (Questions/Day)
            </label>
            <select
              id="daily-goal-input"
              value={state.dailyGoalQuestions}
              onChange={(e) =>
                onUpdateSettings({ dailyGoalQuestions: Number(e.target.value) })
              }
              className="w-full min-h-[44px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 font-mono-tabular"
            >
              <option value={20}>20 Questions / Day</option>
              <option value={30}>30 Questions / Day</option>
              <option value={50}>50 Questions / Day</option>
              <option value={100}>100 Questions / Day</option>
            </select>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Clear local test &amp; mistake records
            </span>
            <button
              type="button"
              onClick={onResetProgress}
              className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900 text-xs font-semibold text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Progress</span>
            </button>
          </div>
        </section>
      </div>

      {/* Recent Chapter Test History */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <CalendarCheck className="w-5 h-5 text-blue-700 dark:text-blue-400" />
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
            Recent Daily Chapter Tests
          </h2>
        </div>

        {state.testHistory.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            No chapter tests completed yet. Pick any subject and chapter to complete your first daily test.
          </p>
        ) : (
          <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
            {state.testHistory.slice(0, 20).map((attempt) => {
              const pct =
                attempt.totalQuestions > 0
                  ? Math.round(
                      (attempt.correctCount / attempt.totalQuestions) * 100
                    )
                  : 0;
              return (
                <div
                  key={attempt.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {attempt.chapterTitle}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {attempt.subjectName} · {formatReadableDate(attempt.date)} ·{' '}
                      <span className="font-mono-tabular">
                        {Math.floor(attempt.durationSeconds / 60)}m{' '}
                        {attempt.durationSeconds % 60}s
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono-tabular shrink-0">
                    <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {attempt.correctCount}/{attempt.totalQuestions} ({pct}%)
                    </span>
                    <span className="text-slate-600 dark:text-slate-300">
                      Net: {attempt.netScore.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
