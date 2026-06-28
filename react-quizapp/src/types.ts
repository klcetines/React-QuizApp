// Central place for the shapes the app shares with the backend API.
// Defining them once means the compiler can check every usage against them.

// A single quiz question, exactly as GET /questions returns it.
export interface Question {
  id: number;
  question: string;
  answers: string[];
}

// The user's picks while taking the quiz: question id -> chosen answer text.
// Record<number, string> means "an object whose keys are numbers and values are strings".
export type AnswerMap = Record<number, string>;

// One entry in the body sent to POST /submissions.
export interface SubmissionItem {
  question_id: number;
  answer: string;
}

// What POST /submissions returns.
export interface ScoreResult {
  score: number;
  total: number;
}
