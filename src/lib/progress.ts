import type { DemoState, Status } from "../types";

export interface ProgressStep {
  label: string;
  hint: string;
  to: string;
  phase: "done" | "current" | "todo" | "alert";
}

export function progressPercent(state: DemoState, status: Status): number {
  let score = 0;
  if (state.scopeAccepted) score += 1;
  if (state.projectSubmittedAt && status !== "revision_requested") score += 1;
  if (state.traceSubmittedAt && status !== "revision_requested") score += 1;
  if (state.defenseSubmittedAt && status !== "revision_requested") score += 1;
  if (status === "approved") score += 1;
  return Math.round((score / 5) * 100);
}

export function progressSteps(state: DemoState, status: Status): ProgressStep[] {
  const complete = [
    state.scopeAccepted,
    Boolean(state.projectSubmittedAt),
    Boolean(state.traceSubmittedAt),
    Boolean(state.defenseSubmittedAt),
    status === "approved",
    status === "approved",
  ];
  const firstOpen = complete.findIndex((item) => !item);
  const base: ProgressStep[] = [
    { label: "Alcance", hint: "Compensación y límites", to: "/proyecto", phase: "todo" },
    { label: "Análisis", hint: "Respuestas del encargo", to: "/proyecto", phase: "todo" },
    { label: "Traza", hint: "Por qué decidiste", to: "/trazabilidad", phase: "todo" },
    { label: "Defensa", hint: "Simulación, no entrevista", to: "/defensa", phase: "todo" },
    { label: "Revisión", hint: "Decisión humana", to: "/supervisor/revision", phase: "todo" },
    { label: "Constancia", hint: "Evidencia portable", to: "/constancia", phase: "todo" },
  ];

  return base.map((step, index) => {
    if (status === "revision_requested") {
      const phase = index === 0 ? "done" : index === 1 ? "current" : index < 5 ? "alert" : "todo";
      return { ...step, phase };
    }
    if (complete[index]) return { ...step, phase: "done" };
    if (index === firstOpen) return { ...step, phase: "current" };
    return step;
  });
}
