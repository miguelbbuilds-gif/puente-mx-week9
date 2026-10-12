export type Role = "participant" | "supervisor";

export type Status =
  | "not_started"
  | "in_progress"
  | "submitted"
  | "trace_complete"
  | "awaiting_review"
  | "revision_requested"
  | "approved";

export interface WorkAnswers {
  bestProduct: string;
  areaToImprove: string;
  recommendation: string;
  evidence: string;
}

export interface DecisionTrace {
  why: string;
  dataInfluenced: string;
  usedAI: "" | "no" | "yes" | "partial";
  aiDetails: string;
  differently: string;
}

export interface DefenseAnswers {
  followUp1: string;
  followUp2: string;
  followUp3: string;
}

export interface RubricScores {
  analytical: number | null;
  recommendations: number | null;
  explanation: number | null;
  communication: number | null;
  limitations: number | null;
}

export interface ReviewDraft {
  scores: RubricScores;
  feedback: string;
  decision: "" | "approve" | "revision";
  considerInterview: boolean | null;
}

export interface SubmittedReview extends ReviewDraft {
  submittedAt: string;
}

export interface DemoState {
  role: Role | null;
  participantName: string;
  scopeAccepted: boolean;
  answers: WorkAnswers;
  answersSavedAt: string | null;
  projectSubmittedAt: string | null;
  trace: DecisionTrace;
  traceSubmittedAt: string | null;
  defense: DefenseAnswers;
  defenseSubmittedAt: string | null;
  reviewDraft: ReviewDraft;
  submittedReview: SubmittedReview | null;
  recordHidden: boolean;
  feedbackReviewRequested: boolean;
  feedbackReviewNote: string;
  feedbackReviewAt: string | null;
  verificationId: string | null;
}
