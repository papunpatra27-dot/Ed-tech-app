export type ExamTarget =
  | 'ALL'
  | 'WBCS'
  | 'WBPSC_CLERKSHIP'
  | 'WB_POLICE'
  | 'PRIMARY_TET'
  | 'FOOD_SI';

export type StudyLanguage = 'English' | 'Bengali';

export type DifficultyLevel = 'Easy' | 'Moderate' | 'Hard' | 'Mixed';

export interface Chapter {
  id: string;
  subjectId: string;
  title: string;
  bengaliTitle: string;
  topics: string;
  weightage: string;
}

export interface Subject {
  id: string;
  name: string;
  bengaliName: string;
  description: string;
  examFocus: string;
  accentHex: string;
  chapters: Chapter[];
}

export interface MCQQuestion {
  id: string;
  subjectId: string;
  chapterId: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  examHook: string;
  examTag: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  source: 'curated' | 'ai';
}

export interface DeepExplanation {
  whyYourChoiceIsWrong: string;
  conceptBreakdown: string;
  shortcutOrMnemonic: string;
  relatedExamFact: string;
}

export interface TestAttemptRecord {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: number;
  subjectId: string;
  subjectName: string;
  chapterId: string;
  chapterTitle: string;
  examTarget: ExamTarget;
  mode: 'daily-test' | 'unlimited-practice';
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  wrongCount: number;
  negativeMarking: number; // e.g., 0 or 0.33
  netScore: number;
  durationSeconds: number;
}

export interface MistakeEntry {
  id: string; // matches question id or hash
  question: MCQQuestion;
  selectedWrongIndex: number;
  subjectName: string;
  chapterTitle: string;
  dateAdded: string;
  timesMissed: number;
  mastered: boolean;
}

export interface DailyChapterStat {
  date: string;
  subjectId: string;
  chapterId: string;
  questionsSolved: number;
  correctCount: number;
  testsCompleted: number;
}

export interface UserStudyState {
  examTarget: ExamTarget;
  language: StudyLanguage;
  darkMode: boolean;
  negativeMarkingEnabled: boolean;
  dailyGoalQuestions: number;
  dailyStats: Record<string, DailyChapterStat>; // key: `${date}::${subjectId}::${chapterId}`
  testHistory: TestAttemptRecord[];
  mistakes: MistakeEntry[];
  seenQuestionStems: Record<string, string[]>; // key: `${date}::${chapterId}` -> array of stems
}

export interface ChapterStudyMaterial {
  chapterId: string;
  overview: string;
  keyPoints: Array<{
    title: string;
    detail: string;
    subPoints?: string[];
  }>;
  referenceTable?: {
    title: string;
    columns: [string, string, string];
    rows: Array<[string, string, string]>;
  };
  workedExamples?: Array<{
    prompt: string;
    solution: string;
  }>;
  comparisonPairs?: Array<{ term: string; distinction: string }>;
  commonTraps?: string[];
  mainsPerspective?: string;
  mustRememberFacts: string[];
  examTips: string;
  source: 'curated' | 'ai';
}

