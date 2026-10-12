import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { makeVerificationId } from "../lib/ids";
import { clearState, initialState, loadState, saveState } from "../lib/storage";
import {
  defenseIssues,
  deriveStatus,
  isCurrentApproval,
  projectIssues,
  LIMITS,
  reviewIssues,
  revisionOpen,
  traceIssues,
} from "../lib/status";
import type { DecisionTrace, DemoState, DefenseAnswers, ReviewDraft, Role, RubricScores, WorkAnswers } from "../types";

interface DemoContextValue {
  state: DemoState;
  status: ReturnType<typeof deriveStatus>;
  approved: boolean;
  setRole: (role: Role) => void;
  setParticipantName: (name: string) => void;
  acceptScope: (accepted: boolean) => void;
  updateAnswers: (patch: Partial<WorkAnswers>) => void;
  saveAnswers: () => void;
  submitProject: () => string | null;
  resubmitPackage: () => string | null;
  updateTrace: (patch: Partial<DecisionTrace>) => void;
  submitTrace: () => string | null;
  updateDefense: (patch: Partial<DefenseAnswers>) => void;
  submitDefense: () => string | null;
  updateReviewDraft: (patch: Partial<ReviewDraft>) => void;
  setScore: (key: keyof RubricScores, value: number) => void;
  submitReview: () => string | null;
  setRecordHidden: (hidden: boolean) => void;
  requestFeedbackReview: (note: string) => string | null;
  resetDemo: () => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

function resubmit(state: DemoState, setState: Dispatch<SetStateAction<DemoState>>): string | null {
  if (!revisionOpen(state)) return "No hay una solicitud de cambios vigente.";
  const issues = [...projectIssues(state), ...traceIssues(state), ...defenseIssues(state)];
  if (issues.length > 0) return issues[0];
  const now = new Date().toISOString();
  setState((prev) => ({
    ...prev,
    answersSavedAt: now,
    projectSubmittedAt: now,
    traceSubmittedAt: now,
    defenseSubmittedAt: now,
  }));
  return null;
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(() => loadState());

  useEffect(() => {
    try {
      saveState(state);
    } catch {
      // Si el navegador bloquea el almacenamiento, la demo sigue en memoria.
    }
  }, [state]);

  const status = deriveStatus(state);
  const approved = isCurrentApproval(state);

  const value: DemoContextValue = {
    state,
    status,
    approved,
    setRole: (role) => setState((prev) => ({ ...prev, role })),
    setParticipantName: (name) => setState((prev) => ({ ...prev, participantName: name.slice(0, 80) })),
    acceptScope: (accepted) => setState((prev) => ({ ...prev, scopeAccepted: accepted })),
    updateAnswers: (patch) =>
      setState((prev) => ({ ...prev, answers: { ...prev.answers, ...patch } })),
    saveAnswers: () =>
      setState((prev) => ({
        ...prev,
        answersSavedAt: new Date().toISOString(),
      })),
    submitProject: () => {
      if (state.projectSubmittedAt && !revisionOpen(state)) return "El proyecto ya fue enviado.";
      if (revisionOpen(state)) return resubmit(state, setState);
      const issues = projectIssues(state);
      if (issues.length > 0) return issues[0];
      const now = new Date().toISOString();
      setState((prev) => ({
        ...prev,
        answersSavedAt: now,
        projectSubmittedAt: now,
      }));
      return null;
    },
    resubmitPackage: () => resubmit(state, setState),
    updateTrace: (patch) => setState((prev) => ({ ...prev, trace: { ...prev.trace, ...patch } })),
    submitTrace: () => {
      if (revisionOpen(state)) return resubmit(state, setState);
      if (state.traceSubmittedAt) return "La traza ya fue enviada.";
      const issues = traceIssues(state);
      if (issues.length > 0) return issues[0];
      setState((prev) => ({ ...prev, traceSubmittedAt: new Date().toISOString() }));
      return null;
    },
    updateDefense: (patch) =>
      setState((prev) => ({ ...prev, defense: { ...prev.defense, ...patch } })),
    submitDefense: () => {
      if (revisionOpen(state)) return resubmit(state, setState);
      if (state.defenseSubmittedAt) return "La defensa simulada ya fue enviada.";
      const issues = defenseIssues(state);
      if (issues.length > 0) return issues[0];
      setState((prev) => ({ ...prev, defenseSubmittedAt: new Date().toISOString() }));
      return null;
    },
    updateReviewDraft: (patch) =>
      setState((prev) => ({ ...prev, reviewDraft: { ...prev.reviewDraft, ...patch } })),
    setScore: (key, score) =>
      setState((prev) => ({
        ...prev,
        reviewDraft: {
          ...prev.reviewDraft,
          scores: { ...prev.reviewDraft.scores, [key]: score },
        },
      })),
    submitReview: () => {
      const issues = reviewIssues(state);
      if (issues.length > 0) return issues[0];
      const now = new Date().toISOString();
      setState((prev) => {
        const approving = prev.reviewDraft.decision === "approve";
        return {
          ...prev,
          verificationId: approving ? prev.verificationId ?? makeVerificationId() : prev.verificationId,
          submittedReview: { ...prev.reviewDraft, submittedAt: now },
        };
      });
      return null;
    },
    setRecordHidden: (hidden) => setState((prev) => ({ ...prev, recordHidden: hidden })),
    requestFeedbackReview: (note) => {
      if (note.trim().length < LIMITS.reviewRequest) {
        return "Escribe al menos 15 caracteres para explicar qué quieres que se revise.";
      }
      setState((prev) => ({
        ...prev,
        feedbackReviewRequested: true,
        feedbackReviewNote: note.trim(),
        feedbackReviewAt: new Date().toISOString(),
      }));
      return null;
    },
    resetDemo: () => {
      clearState();
      setState(initialState);
    },
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoContextValue {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo debe usarse dentro de DemoProvider");
  return context;
}
