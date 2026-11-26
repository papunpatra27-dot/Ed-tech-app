import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Home,
  Infinity as InfinityIcon,
  Layers,
  Moon,
  Play,
  Search,
  Sun,
  X,
} from 'lucide-react';
import { MistakeVaultView } from './components/MistakeVaultView';
import {
  OfflineIndicator,
  PWAInstallButton,
} from './components/PWAInstallButton';
import { ProgressView } from './components/ProgressView';
import { StudyArena } from './components/StudyArena';
import { StudyMaterialView } from './components/StudyMaterialView';
import { EXAM_TARGETS, WB_SUBJECTS, getChapterById } from './data/wbSyllabus';
import {
  ExamTarget,
  MCQQuestion,
  StudyLanguage,
  TestAttemptRecord,
  UserStudyState,
} from './types';
import {
  DEFAULT_STUDY_STATE,
  calculateStreak,
  formatReadableDate,
  getRecentDays,
  getStatKey,
  getTodayKey,
  loadStudyState,
  recordCompletedTest,
  recordQuestionOutcome,
  saveStudyState,
  shiftDateKey,
} from './utils/storage';

type NavTab = 'today' | 'subjects' | 'mistakes' | 'progress';

interface ActiveSession {
  subjectId: string;
  chapterId: string;
  mode: 'study-material' | 'daily-test' | 'unlimited-practice';
}

const HERO_IMAGE_PATH = '/src/assets/images/hero_bengal_study_1795624938300.jpg';

export function App() {
  const [studyState, setStudyState] = useState<UserStudyState>(() =>
    loadStudyState()
  );
  const [activeTab, setActiveTab] = useState<NavTab>('today');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    WB_SUBJECTS[0].id
  );
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(
    null
  );
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [chapterQuery, setChapterQuery] = useState('');

  const totalChapterCount = useMemo(
    () => WB_SUBJECTS.reduce((sum, s) => sum + s.chapters.length, 0),
    []
  );

  const [todayKey, setTodayKey] = useState<string>(() => getTodayKey());
  const [selectedDayKey, setSelectedDayKey] = useState<string>(() =>
    getTodayKey()
  );
  const [calendarEndKey, setCalendarEndKey] = useState<string>(() =>
    getTodayKey()
  );

  useEffect(() => {
    const syncIstDate = () => {
      const liveToday = getTodayKey();
      setTodayKey((prevToday) => {
        if (prevToday !== liveToday) {
          setSelectedDayKey((prevSel) =>
            prevSel === prevToday ? liveToday : prevSel
          );
          setCalendarEndKey((prevEnd) =>
            prevEnd === prevToday ? liveToday : prevEnd
          );
        }
        return liveToday;
      });
    };
    const timer = window.setInterval(syncIstDate, 60000);
    window.addEventListener('focus', syncIstDate);
    document.addEventListener('visibilitychange', syncIstDate);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('focus', syncIstDate);
      document.removeEventListener('visibilitychange', syncIstDate);
    };
  }, []);

  const recentDays = useMemo(
    () => getRecentDays(7, calendarEndKey),
    [calendarEndKey]
  );

  const handleSelectDay = (nextDateKey: string) => {
    if (!nextDateKey) return;
    setSelectedDayKey(nextDateKey);
    const windowStart = shiftDateKey(calendarEndKey, -6);
    if (nextDateKey > calendarEndKey || nextDateKey < windowStart) {
      setCalendarEndKey(nextDateKey);
    }
  };

  useEffect(() => {
    saveStudyState(studyState);
  }, [studyState]);

  useEffect(() => {
    const root = document.documentElement;
    if (studyState.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [studyState.darkMode]);

  const activeMistakeCount = useMemo(
    () => studyState.mistakes.filter((m) => !m.mastered).length,
    [studyState.mistakes]
  );

  const daySummary = useMemo(() => {
    const entries = Object.values(studyState.dailyStats).filter(
      (s) => s.date === selectedDayKey
    );
    const solved = entries.reduce((sum, s) => sum + s.questionsSolved, 0);
    const correct = entries.reduce((sum, s) => sum + s.correctCount, 0);
    const tests = entries.reduce((sum, s) => sum + s.testsCompleted, 0);
    const accuracy = solved > 0 ? Math.round((correct / solved) * 100) : 0;
    return { solved, correct, tests, accuracy };
  }, [studyState.dailyStats, selectedDayKey]);

  const streak = useMemo(() => calculateStreak(studyState), [studyState]);

  const selectedSubject = useMemo(
    () =>
      WB_SUBJECTS.find((s) => s.id === selectedSubjectId) ?? WB_SUBJECTS[0],
    [selectedSubjectId]
  );

  const filteredSubjectChapters = useMemo(() => {
    const q = chapterQuery.trim().toLowerCase();
    if (!q) return selectedSubject.chapters;
    return selectedSubject.chapters.filter(
      (ch) =>
        ch.title.toLowerCase().includes(q) ||
        ch.bengaliTitle.toLowerCase().includes(q) ||
        ch.topics.toLowerCase().includes(q)
    );
  }, [selectedSubject, chapterQuery]);

  const handleLaunchSession = (
    subjectId: string,
    chapterId: string,
    mode: 'study-material' | 'daily-test' | 'unlimited-practice'
  ) => {
    setActiveSession({ subjectId, chapterId, mode });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickDailyTest = () => {
    const subj = selectedSubject;
    const untested = subj.chapters.find((ch) => {
      const stat =
        studyState.dailyStats[getStatKey(selectedDayKey, subj.id, ch.id)];
      return !stat || stat.testsCompleted === 0;
    });
    const targetChapter = untested ?? subj.chapters[0];
    handleLaunchSession(subj.id, targetChapter.id, 'daily-test');
  };

  const handleUpdateSettings = (patch: Partial<UserStudyState>) => {
    setStudyState((prev) => ({ ...prev, ...patch }));
  };

  const activeChapterPair = activeSession
    ? getChapterById(activeSession.subjectId, activeSession.chapterId)
    : undefined;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20 md:pb-10">
      {/* Top Bar: Strictly 3 Zones */}
      <header className="sticky top-0 z-30 h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Wordmark */}
          <button
            type="button"
            onClick={() => {
              setActiveSession(null);
              setActiveTab('today');
            }}
            className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0 cursor-pointer"
          >
            BangaPrep
          </button>

          {/* Zone 2: 4 Single-line Nav Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium"
          >
            {(
              [
                { id: 'today', label: 'Today' },
                { id: 'subjects', label: 'Subjects' },
                {
                  id: 'mistakes',
                  label:
                    activeMistakeCount > 0
                      ? `Mistake Vault (${activeMistakeCount})`
                      : 'Mistake Vault',
                },
                { id: 'progress', label: 'Progress' },
              ] as Array<{ id: NavTab; label: string }>
            ).map((nav) => {
              const isActive = !activeSession && activeTab === nav.id;
              return (
                <button
                  key={nav.id}
                  type="button"
                  onClick={() => {
                    setActiveSession(null);
                    setActiveTab(nav.id);
                  }}
                  className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'border-blue-700 dark:border-blue-400 text-slate-900 dark:text-slate-100 font-semibold'
                      : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {nav.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary CTA */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleQuickDailyTest}
              className="inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Daily Test</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {activeSession && activeChapterPair ? (
          activeSession.mode === 'study-material' ? (
            <StudyMaterialView
              subject={activeChapterPair.subject}
              chapter={activeChapterPair.chapter}
              examTarget={studyState.examTarget}
              language={studyState.language}
              onStartDailyTest={() =>
                handleLaunchSession(
                  activeChapterPair.subject.id,
                  activeChapterPair.chapter.id,
                  'daily-test'
                )
              }
              onStartUnlimitedPractice={() =>
                handleLaunchSession(
                  activeChapterPair.subject.id,
                  activeChapterPair.chapter.id,
                  'unlimited-practice'
                )
              }
              onBack={() => setActiveSession(null)}
            />
          ) : (
            <StudyArena
              subject={activeChapterPair.subject}
              chapter={activeChapterPair.chapter}
              initialMode={activeSession.mode}
              examTarget={studyState.examTarget}
              language={studyState.language}
              negativeMarkingEnabled={studyState.negativeMarkingEnabled}
              activeDateKey={selectedDayKey}
              seenStemsForChapterToday={
                studyState.seenQuestionStems[
                  `${selectedDayKey}::${activeChapterPair.chapter.id}`
                ] ?? []
              }
              onRecordPracticeAnswer={(
                question: MCQQuestion,
                selectedIdx: number
              ) =>
                setStudyState((prev) =>
                  recordQuestionOutcome(prev, {
                    question,
                    selectedIndex: selectedIdx,
                    subjectName: activeChapterPair.subject.name,
                    chapterTitle: activeChapterPair.chapter.title,
                    dateOverride: selectedDayKey,
                  })
                )
              }
              onCompleteDailyTest={(
                attempt: TestAttemptRecord,
                wrongItems: Array<{
                  question: MCQQuestion;
                  selectedIndex: number;
                }>
              ) =>
                setStudyState((prev) =>
                  recordCompletedTest(prev, attempt, wrongItems)
                )
              }
              onOpenStudyMaterial={() =>
                handleLaunchSession(
                  activeChapterPair.subject.id,
                  activeChapterPair.chapter.id,
                  'study-material'
                )
              }
              onExit={() => setActiveSession(null)}
            />
          )
        ) : activeTab === 'today' ? (
          <div className="space-y-8">
            {/* Hero Split Section */}
            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
                  <div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      West Bengal Government Exam Prep · WBCS · WBPSC · WB Police · Primary TET
                    </div>
                    <h1
                      className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight"
                      style={{ textWrap: 'balance' }}
                    >
                      Unlimited Daily MCQs &amp; Chapter Tests for West Bengal Aspirants
                    </h1>
                    <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                      Practice unlimited questions per subject every day, take daily chapter-wise tests, and review clear explanations whenever an answer goes wrong.
                    </p>
                  </div>

                  {/* Workspace Toolbar inside Hero (Target Exam, Language, Theme, Install) */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <select
                        aria-label="Target West Bengal Exam"
                        value={studyState.examTarget}
                        onChange={(e) =>
                          handleUpdateSettings({
                            examTarget: e.target.value as ExamTarget,
                          })
                        }
                        className="min-h-[42px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-100"
                      >
                        {EXAM_TARGETS.map((exam) => (
                          <option key={exam.id} value={exam.id}>
                            Target: {exam.shortLabel}
                          </option>
                        ))}
                      </select>

                      <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
                        {(['English', 'Bengali'] as StudyLanguage[]).map(
                          (lang) => (
                            <button
                              key={lang}
                              type="button"
                              onClick={() =>
                                handleUpdateSettings({ language: lang })
                              }
                              className={`min-h-[34px] px-3 py-1 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                studyState.language === lang
                                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                                  : 'text-slate-600 dark:text-slate-400'
                              }`}
                            >
                              {lang === 'Bengali' ? 'বাংলা' : 'English'}
                            </button>
                          )
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateSettings({
                            darkMode: !studyState.darkMode,
                          })
                        }
                        aria-label="Toggle dark mode"
                        className="min-h-[42px] min-w-[42px] flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                      >
                        {studyState.darkMode ? (
                          <Sun className="w-4 h-4" />
                        ) : (
                          <Moon className="w-4 h-4" />
                        )}
                      </button>

                      <PWAInstallButton variant="compact" />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={handleQuickDailyTest}
                        className="inline-flex items-center gap-2 min-h-[46px] px-5 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Play className="w-4 h-4" />
                        <span>Start Today&rsquo;s Chapter Test</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab('subjects')}
                        className="inline-flex items-center gap-2 min-h-[46px] px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <InfinityIcon className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                        <span>Browse All {WB_SUBJECTS.length} Subjects</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Media Panel */}
                <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full bg-slate-200 dark:bg-slate-800">
                  {!heroImgFailed ? (
                    <img
                      src={HERO_IMAGE_PATH}
                      alt="West Bengal civil service exam study desk in Kolkata with Constitution and History books"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImgFailed(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-900 to-slate-900 text-white text-center">
                      <BookOpen className="w-10 h-10 opacity-80" />
                      <div className="mt-2 font-display text-lg font-semibold">
                        West Bengal Exam Hub
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-5">
                    <div className="text-white">
                      <div className="text-xs font-medium text-slate-200">
                        Daily Target Progress
                      </div>
                      <div className="mt-0.5 font-mono-tabular text-base font-semibold">
                        {daySummary.solved} Qs solved · {daySummary.tests} chapter tests
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4-Column KPI Strip Below Hero */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  MCQs Solved (
                  {selectedDayKey === todayKey
                    ? `Today · ${formatReadableDate(selectedDayKey)}`
                    : formatReadableDate(selectedDayKey)}
                  )
                </div>
                <div className="mt-1.5 font-mono-tabular text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {daySummary.solved}
                </div>
                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Unlimited daily allowance
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Chapter Tests Given
                </div>
                <div className="mt-1.5 font-mono-tabular text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {daySummary.tests}
                </div>
                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-mono-tabular">
                  Accuracy: {daySummary.accuracy}%
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('mistakes')}
                className="text-left rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 hover:border-blue-400 dark:hover:border-blue-600 transition-colors cursor-pointer"
              >
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Wrong Answers to Review
                </div>
                <div className="mt-1.5 font-mono-tabular text-2xl font-bold text-rose-700 dark:text-rose-400">
                  {activeMistakeCount}
                </div>
                <div className="mt-1 text-xs font-medium text-blue-700 dark:text-blue-400">
                  View answers &amp; explanations
                </div>
              </button>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Daily Streak
                </div>
                <div className="mt-1.5 font-mono-tabular text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {streak} {streak === 1 ? 'day' : 'days'}
                </div>
                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Keep testing daily
                </div>
              </div>
            </section>

            {/* Horizontal 7-Day Date Scroller + Subject Selector */}
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100">
                    Daily Subject &amp; Chapter Study + Tests
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Read chapter study notes first, then take a daily test or practice unlimited fresh MCQs (built-in WB bank + on-demand Gemini AI generation).
                  </p>
                </div>

                {/* Calendar Stepper, Date Picker & 7-Day Date Scroller */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    <button
                      type="button"
                      onClick={() =>
                        handleSelectDay(shiftDateKey(selectedDayKey, -1))
                      }
                      aria-label="Previous calendar day"
                      title="Previous day"
                      className="min-h-[44px] min-w-[38px] px-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center shrink-0 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {recentDays.map((d) => {
                      const active = d.dateKey === selectedDayKey;
                      return (
                        <button
                          key={d.dateKey}
                          type="button"
                          onClick={() => handleSelectDay(d.dateKey)}
                          className={`min-h-[44px] min-w-[48px] px-2.5 py-1.5 rounded-xl text-center transition-colors shrink-0 cursor-pointer ${
                            active
                              ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <div className="text-[10px] font-medium opacity-75">
                            {d.isToday ? 'Today' : d.dayShort}
                          </div>
                          <div className="font-mono-tabular text-xs font-bold">
                            {d.dayNum} {d.monthShort}
                          </div>
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() =>
                        handleSelectDay(shiftDateKey(selectedDayKey, 1))
                      }
                      aria-label="Next calendar day"
                      title="Increase day (+1)"
                      className="min-h-[44px] min-w-[38px] px-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center shrink-0 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <input
                      type="date"
                      aria-label="Jump to calendar date"
                      value={selectedDayKey}
                      onChange={(e) => {
                        if (e.target.value) {
                          handleSelectDay(e.target.value);
                        }
                      }}
                      className="min-h-[44px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs font-mono-tabular text-slate-700 dark:text-slate-200 cursor-pointer"
                    />
                    {selectedDayKey !== todayKey && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDayKey(todayKey);
                          setCalendarEndKey(todayKey);
                        }}
                        className="min-h-[44px] px-3 py-1.5 rounded-xl border border-blue-700 dark:border-blue-500 text-blue-800 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Today
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Subject Filter Strip */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {WB_SUBJECTS.map((subj) => {
                  const isSel = subj.id === selectedSubject.id;
                  return (
                    <button
                      key={subj.id}
                      type="button"
                      onClick={() => setSelectedSubjectId(subj.id)}
                      className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isSel
                          ? 'bg-blue-800 text-white'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {studyState.language === 'Bengali'
                        ? subj.bengaliName
                        : subj.name}
                    </button>
                  );
                })}
              </div>

              {/* Chapter Cards for Selected Subject */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedSubject.chapters.map((chapter, idx) => {
                  const stat =
                    studyState.dailyStats[
                      getStatKey(
                        selectedDayKey,
                        selectedSubject.id,
                        chapter.id
                      )
                    ];
                  const solved = stat?.questionsSolved ?? 0;
                  const tests = stat?.testsCompleted ?? 0;
                  const acc =
                    solved > 0
                      ? Math.round(((stat?.correctCount ?? 0) / solved) * 100)
                      : 0;

                  return (
                    <div
                      key={chapter.id}
                      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className="font-mono-tabular">
                            Chapter {String(idx + 1).padStart(2, '0')} · {chapter.weightage}
                          </span>
                          <span className="font-mono-tabular">
                            {tests > 0
                              ? `${tests} test done · ${acc}% acc`
                              : `${solved} Qs practiced`}
                          </span>
                        </div>
                        <h3 className="mt-1.5 font-display text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                          {studyState.language === 'Bengali'
                            ? chapter.bengaliTitle
                            : chapter.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {chapter.topics}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <button
                          type="button"
                          onClick={() =>
                            handleLaunchSession(
                              selectedSubject.id,
                              chapter.id,
                              'study-material'
                            )
                          }
                          className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span>Study Notes</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleLaunchSession(
                              selectedSubject.id,
                              chapter.id,
                              'daily-test'
                            )
                          }
                          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Daily Test</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleLaunchSession(
                              selectedSubject.id,
                              chapter.id,
                              'unlimited-practice'
                            )
                          }
                          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <InfinityIcon className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
                          <span>Unlimited Practice</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        ) : activeTab === 'subjects' ? (
          /* SUBJECTS & CHAPTERS DIRECTORY */
          <div className="space-y-8">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                All West Bengal Exam Subjects
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {WB_SUBJECTS.length} complete subjects and {totalChapterCount} syllabus chapters calibrated to WBCS, WBPSC, Police &amp; TET standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {WB_SUBJECTS.map((subj) => {
                const isSelected = subj.id === selectedSubject.id;
                const todaySubjStats = Object.values(
                  studyState.dailyStats
                ).filter(
                  (s) => s.date === todayKey && s.subjectId === subj.id
                );
                const todaySolved = todaySubjStats.reduce(
                  (sum, s) => sum + s.questionsSolved,
                  0
                );

                return (
                  <button
                    key={subj.id}
                    type="button"
                    onClick={() => {
                      setSelectedSubjectId(subj.id);
                      setChapterQuery('');
                    }}
                    className={`text-left rounded-2xl border p-5 transition-colors flex flex-col justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-blue-700 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 ring-1 ring-blue-700 dark:ring-blue-500'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {subj.examFocus}
                      </div>
                      <h2 className="mt-1.5 font-display text-base font-bold text-slate-900 dark:text-slate-100">
                        {studyState.language === 'Bengali'
                          ? subj.bengaliName
                          : subj.name}
                      </h2>
                      <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                        {subj.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono-tabular text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span>{subj.chapters.length} Chapters</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-blue-700 dark:text-blue-400">
                        {todaySolved} Qs today
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Chapters of Selected Subject */}
            <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100">
                    {studyState.language === 'Bengali'
                      ? selectedSubject.bengaliName
                      : selectedSubject.name}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {selectedSubject.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 shrink-0">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={chapterQuery}
                      onChange={(e) => setChapterQuery(e.target.value)}
                      placeholder="Filter chapters or topics..."
                      aria-label="Filter chapters or topics"
                      className="min-h-[40px] w-full sm:w-64 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-9 pr-8 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {chapterQuery && (
                      <button
                        type="button"
                        onClick={() => setChapterQuery('')}
                        aria-label="Clear chapter filter"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <span className="text-xs font-mono-tabular text-slate-500 dark:text-slate-400 shrink-0">
                    {filteredSubjectChapters.length}/{selectedSubject.chapters.length} Chapters
                  </span>
                </div>
              </div>

              {filteredSubjectChapters.length === 0 ? (
                <div className="py-8 text-center space-y-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    No chapters match &ldquo;{chapterQuery}&rdquo; in {selectedSubject.name}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setChapterQuery('')}
                    className="text-xs font-semibold text-blue-700 dark:text-blue-400 underline cursor-pointer"
                  >
                    Show all {selectedSubject.chapters.length} chapters
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredSubjectChapters.map((ch) => {
                    const idx = selectedSubject.chapters.findIndex(
                      (item) => item.id === ch.id
                    );
                    const stat =
                      studyState.dailyStats[
                        getStatKey(todayKey, selectedSubject.id, ch.id)
                      ];
                    return (
                      <div
                        key={ch.id}
                        className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="text-xs font-mono-tabular text-slate-500 dark:text-slate-400">
                            Chapter {String(idx + 1).padStart(2, '0')} · {ch.weightage} · Today:{' '}
                            {stat?.questionsSolved ?? 0} Qs /{' '}
                            {stat?.testsCompleted ?? 0} tests
                          </div>
                          <h3 className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                            {studyState.language === 'Bengali'
                              ? ch.bengaliTitle
                              : ch.title}
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            {ch.topics}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                          <button
                            type="button"
                            onClick={() =>
                              handleLaunchSession(
                                selectedSubject.id,
                                ch.id,
                                'study-material'
                              )
                            }
                            className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                            <span>Study Material</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleLaunchSession(
                                selectedSubject.id,
                                ch.id,
                                'daily-test'
                              )
                            }
                            className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <CalendarDays className="w-3.5 h-3.5" />
                            <span>Daily Test</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleLaunchSession(
                                selectedSubject.id,
                                ch.id,
                                'unlimited-practice'
                              )
                            }
                            className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <InfinityIcon className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
                            <span>Unlimited Practice</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        ) : activeTab === 'mistakes' ? (
          <MistakeVaultView
            mistakes={studyState.mistakes}
            language={studyState.language}
            onMarkMastered={(id) =>
              setStudyState((prev) => ({
                ...prev,
                mistakes: prev.mistakes.map((m) =>
                  m.id === id ? { ...m, mastered: true } : m
                ),
              }))
            }
            onRemoveMistake={(id) =>
              setStudyState((prev) => ({
                ...prev,
                mistakes: prev.mistakes.filter((m) => m.id !== id),
              }))
            }
          />
        ) : (
          <ProgressView
            state={studyState}
            onUpdateSettings={handleUpdateSettings}
            onResetProgress={() => {
              setStudyState(DEFAULT_STUDY_STATE);
            }}
          />
        )}
      </main>

      {/* Mobile Fixed Bottom Thumb Navigation */}
      <nav
        aria-label="Mobile bottom navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe"
      >
        <div className="grid grid-cols-4 h-15 items-center">
          {(
            [
              { id: 'today', label: 'Today', icon: Home },
              { id: 'subjects', label: 'Subjects', icon: Layers },
              {
                id: 'mistakes',
                label:
                  activeMistakeCount > 0
                    ? `Mistakes (${activeMistakeCount})`
                    : 'Mistakes',
                icon: AlertTriangle,
              },
              { id: 'progress', label: 'Progress', icon: BarChart3 },
            ] as Array<{
              id: NavTab;
              label: string;
              icon: React.ComponentType<{ className?: string }>;
            }>
          ).map((tab) => {
            const Icon = tab.icon;
            const active = !activeSession && activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveSession(null);
                  setActiveTab(tab.id);
                }}
                className={`min-h-[44px] flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer ${
                  active
                    ? 'text-blue-700 dark:text-blue-400 font-semibold'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] tracking-tight truncate max-w-[84px]">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <OfflineIndicator />
    </div>
  );
}

export default App;
