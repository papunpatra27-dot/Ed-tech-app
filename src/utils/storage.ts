import {
  DailyChapterStat,
  MCQQuestion,
  MistakeEntry,
  TestAttemptRecord,
  UserStudyState,
} from '../types';

const STORAGE_KEY = 'bangaprep_study_state_v1';

export function getTodayKey(): string {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
  } catch {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}

export function shiftDateKey(dateStr: string, deltaDays: number): string {
  const parts = dateStr.split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return getTodayKey();
  }
  const dt = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] + deltaDays));
  const y = dt.getUTCFullYear();
  const m = String(dt.getUTCMonth() + 1).padStart(2, '0');
  const d = String(dt.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatReadableDate(dateStr: string): string {
  const parts = dateStr.split('-').map(Number);
  if (parts.length !== 3) return dateStr;
  const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2], 12, 0, 0));
  return date.toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getRecentDays(
  count = 7,
  anchorDateKey?: string
): Array<{
  dateKey: string;
  dayShort: string;
  dayNum: string;
  monthShort: string;
  isToday: boolean;
}> {
  const today = getTodayKey();
  const anchor = anchorDateKey || today;
  const parts = anchor.split('-').map(Number);
  const baseUtc =
    parts.length === 3 && !parts.some(Number.isNaN)
      ? new Date(Date.UTC(parts[0], parts[1] - 1, parts[2], 12, 0, 0))
      : new Date();

  const result = [];
  // Keep anchor visible near the end (or if anchor === today, today is the rightmost pill)
  const offsetEnd = anchor > today ? 0 : 0;
  for (let i = count - 1; i >= 0; i--) {
    const dt = new Date(baseUtc.getTime() - (i - offsetEnd) * 86400000);
    const y = dt.getUTCFullYear();
    const m = String(dt.getUTCMonth() + 1).padStart(2, '0');
    const d = String(dt.getUTCDate()).padStart(2, '0');
    const key = `${y}-${m}-${d}`;
    result.push({
      dateKey: key,
      dayShort: dt.toLocaleDateString('en-US', {
        timeZone: 'UTC',
        weekday: 'short',
      }).slice(0, 2),
      dayNum: d,
      monthShort: dt.toLocaleDateString('en-US', {
        timeZone: 'UTC',
        month: 'short',
      }),
      isToday: key === today,
    });
  }
  return result;
}

export const DEFAULT_STUDY_STATE: UserStudyState = {
  examTarget: 'ALL',
  language: 'English',
  darkMode: false,
  negativeMarkingEnabled: true,
  dailyGoalQuestions: 30,
  dailyStats: {},
  testHistory: [],
  mistakes: [],
  seenQuestionStems: {},
};

export function loadStudyState(): UserStudyState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STUDY_STATE;
    const parsed = JSON.parse(raw) as Partial<UserStudyState>;
    return {
      ...DEFAULT_STUDY_STATE,
      ...parsed,
      dailyStats: parsed.dailyStats ?? {},
      testHistory: Array.isArray(parsed.testHistory) ? parsed.testHistory : [],
      mistakes: Array.isArray(parsed.mistakes) ? parsed.mistakes : [],
      seenQuestionStems: parsed.seenQuestionStems ?? {},
    };
  } catch {
    return DEFAULT_STUDY_STATE;
  }
}

export function saveStudyState(state: UserStudyState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota errors
  }
}

export function getStatKey(
  date: string,
  subjectId: string,
  chapterId: string
): string {
  return `${date}::${subjectId}::${chapterId}`;
}

export function recordQuestionOutcome(
  prev: UserStudyState,
  params: {
    question: MCQQuestion;
    selectedIndex: number;
    subjectName: string;
    chapterTitle: string;
    dateOverride?: string;
  }
): UserStudyState {
  const targetDate = params.dateOverride || getTodayKey();
  const { question, selectedIndex, subjectName, chapterTitle } = params;
  const isCorrect = selectedIndex === question.correctIndex;
  const key = getStatKey(targetDate, question.subjectId, question.chapterId);

  const existingStat: DailyChapterStat = prev.dailyStats[key] || {
    date: targetDate,
    subjectId: question.subjectId,
    chapterId: question.chapterId,
    questionsSolved: 0,
    correctCount: 0,
    testsCompleted: 0,
  };

  const updatedStat: DailyChapterStat = {
    ...existingStat,
    questionsSolved: existingStat.questionsSolved + 1,
    correctCount: existingStat.correctCount + (isCorrect ? 1 : 0),
  };

  const stemKey = `${targetDate}::${question.chapterId}`;
  const currentStems = prev.seenQuestionStems[stemKey] || [];
  const nextStems = currentStems.includes(question.question)
    ? currentStems
    : [...currentStems, question.question].slice(-80);

  let nextMistakes = [...prev.mistakes];
  if (!isCorrect) {
    const existingIdx = nextMistakes.findIndex(
      (m) =>
        m.id === question.id || m.question.question === question.question
    );
    if (existingIdx >= 0) {
      const current = nextMistakes[existingIdx];
      nextMistakes[existingIdx] = {
        ...current,
        selectedWrongIndex: selectedIndex,
        dateAdded: targetDate,
        timesMissed: current.timesMissed + 1,
        mastered: false,
      };
    } else {
      const newMistake: MistakeEntry = {
        id: question.id,
        question,
        selectedWrongIndex: selectedIndex,
        subjectName,
        chapterTitle,
        dateAdded: targetDate,
        timesMissed: 1,
        mastered: false,
      };
      nextMistakes = [newMistake, ...nextMistakes].slice(0, 250);
    }
  }

  return {
    ...prev,
    dailyStats: {
      ...prev.dailyStats,
      [key]: updatedStat,
    },
    mistakes: nextMistakes,
    seenQuestionStems: {
      ...prev.seenQuestionStems,
      [stemKey]: nextStems,
    },
  };
}

export function recordCompletedTest(
  prev: UserStudyState,
  attempt: TestAttemptRecord,
  wrongItems: Array<{ question: MCQQuestion; selectedIndex: number }>
): UserStudyState {
  const key = getStatKey(attempt.date, attempt.subjectId, attempt.chapterId);
  const existingStat: DailyChapterStat = prev.dailyStats[key] || {
    date: attempt.date,
    subjectId: attempt.subjectId,
    chapterId: attempt.chapterId,
    questionsSolved: 0,
    correctCount: 0,
    testsCompleted: 0,
  };

  const updatedStat: DailyChapterStat = {
    ...existingStat,
    questionsSolved: existingStat.questionsSolved + attempt.attemptedCount,
    correctCount: existingStat.correctCount + attempt.correctCount,
    testsCompleted: existingStat.testsCompleted + 1,
  };

  let nextMistakes = [...prev.mistakes];
  for (const item of wrongItems) {
    const existingIdx = nextMistakes.findIndex(
      (m) =>
        m.id === item.question.id ||
        m.question.question === item.question.question
    );
    if (existingIdx >= 0) {
      const curr = nextMistakes[existingIdx];
      nextMistakes[existingIdx] = {
        ...curr,
        selectedWrongIndex: item.selectedIndex,
        dateAdded: attempt.date,
        timesMissed: curr.timesMissed + 1,
        mastered: false,
      };
    } else {
      nextMistakes = [
        {
          id: item.question.id,
          question: item.question,
          selectedWrongIndex: item.selectedIndex,
          subjectName: attempt.subjectName,
          chapterTitle: attempt.chapterTitle,
          dateAdded: attempt.date,
          timesMissed: 1,
          mastered: false,
        },
        ...nextMistakes,
      ];
    }
  }
  nextMistakes = nextMistakes.slice(0, 250);

  const stemKey = `${attempt.date}::${attempt.chapterId}`;
  const existingStems = prev.seenQuestionStems[stemKey] || [];

  return {
    ...prev,
    dailyStats: {
      ...prev.dailyStats,
      [key]: updatedStat,
    },
    testHistory: [attempt, ...prev.testHistory].slice(0, 120),
    mistakes: nextMistakes,
    seenQuestionStems: {
      ...prev.seenQuestionStems,
      [stemKey]: existingStems,
    },
  };
}

export function calculateStreak(state: UserStudyState): number {
  const activeDates = new Set<string>();
  Object.values(state.dailyStats).forEach((s) => {
    if (s.questionsSolved > 0 || s.testsCompleted > 0) {
      activeDates.add(s.date);
    }
  });
  let streak = 0;
  const today = getTodayKey();
  for (let i = 0; i < 365; i++) {
    const key = shiftDateKey(today, -i);
    if (activeDates.has(key)) {
      streak++;
    } else if (i === 0) {
      // Today not yet started; check yesterday before breaking
    } else {
      break;
    }
  }
  return streak;
}
