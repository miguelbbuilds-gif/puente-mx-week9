import {
  emptyAnswers,
  emptyDefense,
  emptyReviewDraft,
  emptyTrace,
} from "../data/project";
import type { DemoState, ReviewDraft } from "../types";

export const STORAGE_KEY = "puente-mx-demo-v1";

export const initialState: DemoState = {
  role: null,
  participantName: "Valeria Núñez",
  scopeAccepted: false,
  answers: emptyAnswers,
  answersSavedAt: null,
  projectSubmittedAt: null,
  trace: emptyTrace,
  traceSubmittedAt: null,
  defense: emptyDefense,
  defenseSubmittedAt: null,
  reviewDraft: emptyReviewDraft,
  submittedReview: null,
  recordHidden: false,
  feedbackReviewRequested: false,
  feedbackReviewNote: "",
  feedbackReviewAt: null,
  verificationId: null,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function loadState(): DemoState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return initialState;
    const answers = isRecord(parsed.answers) ? parsed.answers : {};
    const trace = isRecord(parsed.trace) ? parsed.trace : {};
    const defense = isRecord(parsed.defense) ? parsed.defense : {};
    const reviewDraft = isRecord(parsed.reviewDraft) ? parsed.reviewDraft : {};
    const draftScores = isRecord(reviewDraft.scores) ? reviewDraft.scores : {};
    const submitted = isRecord(parsed.submittedReview) ? parsed.submittedReview : null;
    const submittedScores = submitted && isRecord(submitted.scores) ? submitted.scores : {};

    const usedAI = trace.usedAI;
    const safeAI = usedAI === "no" || usedAI === "yes" || usedAI === "partial" ? usedAI : "";
    const role = parsed.role === "participant" || parsed.role === "supervisor" ? parsed.role : null;
    const decision = asDecision(reviewDraft.decision);

    const draft: ReviewDraft = {
      scores: {
        analytical: scoreOrNull(draftScores.analytical),
        recommendations: scoreOrNull(draftScores.recommendations),
        explanation: scoreOrNull(draftScores.explanation),
        communication: scoreOrNull(draftScores.communication),
        limitations: scoreOrNull(draftScores.limitations),
      },
      feedback: stringOr(reviewDraft.feedback, ""),
      decision,
      considerInterview:
        typeof reviewDraft.considerInterview === "boolean" ? reviewDraft.considerInterview : null,
    };

    return {
      role,
      participantName: stringOr(parsed.participantName, initialState.participantName).slice(0, 80),
      scopeAccepted: parsed.scopeAccepted === true,
      answers: {
        bestProduct: stringOr(answers.bestProduct, ""),
        areaToImprove: stringOr(answers.areaToImprove, ""),
        recommendation: stringOr(answers.recommendation, ""),
        evidence: stringOr(answers.evidence, ""),
      },
      answersSavedAt: stringOrNull(parsed.answersSavedAt),
      projectSubmittedAt: stringOrNull(parsed.projectSubmittedAt),
      trace: {
        why: stringOr(trace.why, ""),
        dataInfluenced: stringOr(trace.dataInfluenced, ""),
        usedAI: safeAI,
        aiDetails: stringOr(trace.aiDetails, ""),
        differently: stringOr(trace.differently, ""),
      },
      traceSubmittedAt: stringOrNull(parsed.traceSubmittedAt),
      defense: {
        followUp1: stringOr(defense.followUp1, ""),
        followUp2: stringOr(defense.followUp2, ""),
        followUp3: stringOr(defense.followUp3, ""),
      },
      defenseSubmittedAt: stringOrNull(parsed.defenseSubmittedAt),
      reviewDraft: draft,
      submittedReview: submitted
        ? {
            scores: {
              analytical: scoreOrNull(submittedScores.analytical),
              recommendations: scoreOrNull(submittedScores.recommendations),
              explanation: scoreOrNull(submittedScores.explanation),
              communication: scoreOrNull(submittedScores.communication),
              limitations: scoreOrNull(submittedScores.limitations),
            },
            feedback: stringOr(submitted.feedback, ""),
            decision: asDecision(submitted.decision),
            considerInterview:
              typeof submitted.considerInterview === "boolean" ? submitted.considerInterview : null,
            submittedAt: stringOr(submitted.submittedAt, ""),
          }
        : null,
      recordHidden: parsed.recordHidden === true,
      feedbackReviewRequested: parsed.feedbackReviewRequested === true,
      feedbackReviewNote: stringOr(parsed.feedbackReviewNote, ""),
      feedbackReviewAt: stringOrNull(parsed.feedbackReviewAt),
      verificationId: stringOrNull(parsed.verificationId),
    };
  } catch {
    return initialState;
  }
}

function asDecision(value: unknown): "" | "approve" | "revision" {
  if (value === "approve" || value === "revision") return value;
  return "";
}

function stringOr(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function stringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function scoreOrNull(value: unknown): number | null {
  return typeof value === "number" && value >= 1 && value <= 5 ? value : null;
}

export function saveState(state: DemoState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearState(): void {
  localStorage.removeItem(STORAGE_KEY);
}
