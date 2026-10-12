import type { DemoState, ReviewDraft, RubricScores, Status } from "../types";

export const LIMITS = {
  bestProduct: 8,
  area: 20,
  recommendation: 40,
  evidence: 30,
  why: 30,
  data: 20,
  aiDetails: 15,
  differently: 20,
  defense: 20,
  feedback: 40,
  reviewRequest: 15,
} as const;

export function rubricValues(scores: RubricScores): (number | null)[] {
  return [
    scores.analytical,
    scores.recommendations,
    scores.explanation,
    scores.communication,
    scores.limitations,
  ];
}

export function rubricComplete(scores: RubricScores): boolean {
  return rubricValues(scores).every((value) => value !== null && value >= 1 && value <= 5);
}

export function rubricAverage(scores: RubricScores): number | null {
  if (!rubricComplete(scores)) return null;
  const values = rubricValues(scores).filter((value): value is number => value !== null);
  return Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 10) / 10;
}

export function isReviewCurrent(state: DemoState): boolean {
  const review = state.submittedReview;
  if (!review || !state.projectSubmittedAt || !state.traceSubmittedAt || !state.defenseSubmittedAt) {
    return false;
  }
  return (
    review.submittedAt >= state.projectSubmittedAt &&
    review.submittedAt >= state.traceSubmittedAt &&
    review.submittedAt >= state.defenseSubmittedAt
  );
}

export function isCurrentApproval(state: DemoState): boolean {
  const review = state.submittedReview;
  if (!review || review.decision !== "approve" || !isReviewCurrent(state)) return false;
  if (!rubricComplete(review.scores)) return false;
  if (review.feedback.trim().length < LIMITS.feedback) return false;
  if (review.considerInterview === null) return false;
  return true;
}

function hasDraftText(state: DemoState): boolean {
  return Object.values(state.answers).some((value) => value.trim().length > 0);
}

export function deriveStatus(state: DemoState): Status {
  if (isCurrentApproval(state)) return "approved";
  if (state.submittedReview?.decision === "revision" && isReviewCurrent(state)) {
    return "revision_requested";
  }
  if (state.defenseSubmittedAt && state.traceSubmittedAt && state.projectSubmittedAt) {
    return "awaiting_review";
  }
  if (state.traceSubmittedAt && state.projectSubmittedAt) return "trace_complete";
  if (state.projectSubmittedAt) return "submitted";
  if (state.scopeAccepted || state.answersSavedAt || hasDraftText(state)) return "in_progress";
  return "not_started";
}

export function revisionOpen(state: DemoState): boolean {
  return state.submittedReview?.decision === "revision" && isReviewCurrent(state);
}

export function canEditProject(state: DemoState): boolean {
  if (isCurrentApproval(state)) return false;
  if (!state.projectSubmittedAt) return true;
  return revisionOpen(state);
}

export function canEditTrace(state: DemoState): boolean {
  if (!state.projectSubmittedAt || isCurrentApproval(state)) return false;
  if (!state.traceSubmittedAt) return true;
  return revisionOpen(state);
}

export function canEditDefense(state: DemoState): boolean {
  if (!state.traceSubmittedAt || isCurrentApproval(state)) return false;
  if (!state.defenseSubmittedAt) return true;
  return revisionOpen(state);
}

export function projectIssues(state: DemoState): string[] {
  const issues: string[] = [];
  if (!state.scopeAccepted) issues.push("Acepta el alcance, el plazo y la compensación ilustrativa.");
  if (state.answers.bestProduct.trim().length < LIMITS.bestProduct) {
    issues.push("Indica qué producto se desempeñó mejor y por qué (mínimo 8 caracteres).");
  }
  if (state.answers.areaToImprove.trim().length < LIMITS.area) {
    issues.push("Describe el área que necesita mejora (mínimo 20 caracteres).");
  }
  if (state.answers.recommendation.trim().length < LIMITS.recommendation) {
    issues.push("Escribe una recomendación concreta (mínimo 40 caracteres).");
  }
  if (state.answers.evidence.trim().length < LIMITS.evidence) {
    issues.push("Señala la evidencia que sostiene tu recomendación (mínimo 30 caracteres).");
  }
  return issues;
}

export function traceIssues(state: DemoState): string[] {
  const issues: string[] = [];
  if (!state.projectSubmittedAt) issues.push("Primero envía el proyecto.");
  if (state.trace.why.trim().length < LIMITS.why) {
    issues.push("Explica por qué hiciste esa recomendación (mínimo 30 caracteres).");
  }
  if (state.trace.dataInfluenced.trim().length < LIMITS.data) {
    issues.push("Indica qué datos influyeron (mínimo 20 caracteres).");
  }
  if (!state.trace.usedAI) issues.push("Declara si usaste asistencia de IA.");
  if (
    (state.trace.usedAI === "yes" || state.trace.usedAI === "partial") &&
    state.trace.aiDetails.trim().length < LIMITS.aiDetails
  ) {
    issues.push("Describe qué hiciste tú y qué hizo la herramienta (mínimo 15 caracteres).");
  }
  if (state.trace.differently.trim().length < LIMITS.differently) {
    issues.push("Cuenta qué harías distinto (mínimo 20 caracteres).");
  }
  return issues;
}

export function defenseIssues(state: DemoState): string[] {
  const issues: string[] = [];
  if (!state.traceSubmittedAt) issues.push("Primero envía la traza de decisiones.");
  const fields: [string, string][] = [
    ["la primera pregunta", state.defense.followUp1],
    ["la segunda pregunta", state.defense.followUp2],
    ["la tercera pregunta", state.defense.followUp3],
  ];
  for (const [label, value] of fields) {
    if (value.trim().length < LIMITS.defense) issues.push(`Responde ${label} (mínimo 20 caracteres).`);
  }
  return issues;
}

export function reviewIssues(state: DemoState, draft: ReviewDraft = state.reviewDraft): string[] {
  const issues: string[] = [];
  if (state.role !== "supervisor") issues.push("Entra al rol de supervisor simulado para poder decidir.");
  if (!state.projectSubmittedAt) issues.push("Aún no hay un proyecto enviado.");
  if (!state.traceSubmittedAt) issues.push("Aún no hay traza de decisiones.");
  if (!state.defenseSubmittedAt) issues.push("Aún no hay defensa simulada.");
  if (!rubricComplete(draft.scores)) issues.push("Califica las cinco dimensiones de la rúbrica.");
  if (draft.feedback.trim().length < LIMITS.feedback) {
    issues.push("Escribe retroalimentación personalizada (mínimo 40 caracteres).");
  }
  if (draft.decision !== "approve" && draft.decision !== "revision") {
    issues.push("Elige aprobar o solicitar cambios.");
  }
  if (draft.considerInterview === null) {
    issues.push("Indica si se consideraría una entrevista futura.");
  }
  return issues;
}

export const statusLabel: Record<Status, string> = {
  not_started: "Sin iniciar",
  in_progress: "En progreso",
  submitted: "Proyecto enviado",
  trace_complete: "Traza enviada",
  awaiting_review: "En espera de revisión humana",
  revision_requested: "Cambios solicitados",
  approved: "Verificado en esta demostración",
};

export function nextAction(status: Status): {
  title: string;
  body: string;
  to: string;
  cta: string;
  switchTo?: "participant" | "supervisor";
} {
  switch (status) {
    case "not_started":
      return {
        title: "Acepta el encargo",
        body: "Lee la compensación ilustrativa, el plazo y el alcance antes de analizar los datos.",
        to: "/proyecto",
        cta: "Abrir el proyecto",
      };
    case "in_progress":
      return {
        title: "Termina el análisis",
        body: "Guarda tu avance cuando quieras. El envío pide las cuatro respuestas completas.",
        to: "/proyecto",
        cta: "Continuar el proyecto",
      };
    case "submitted":
      return {
        title: "Deja rastro de tus decisiones",
        body: "Explica por qué recomendaste eso, qué datos usaste y si te apoyaste en IA.",
        to: "/trazabilidad",
        cta: "Completar la traza",
      };
    case "trace_complete":
      return {
        title: "Responde la defensa simulada",
        body: "Son tres preguntas de seguimiento. No es una entrevista y no certifica tu trabajo.",
        to: "/defensa",
        cta: "Ir a la defensa simulada",
      };
    case "awaiting_review":
      return {
        title: "Hace falta una persona",
        body: "Cambia al rol de supervisor simulado, lee el trabajo real que guardaste y completa la rúbrica.",
        to: "/supervisor/revision",
        cta: "Revisar como supervisor",
        switchTo: "supervisor",
      };
    case "revision_requested":
      return {
        title: "Hay cambios por atender",
        body: "Lee la retroalimentación, ajusta tu entrega y vuelve a enviarla. La aprobación anterior no sigue vigente.",
        to: "/proyecto",
        cta: "Revisar comentarios",
      };
    case "approved":
      return {
        title: "Tu constancia ya puede verse",
        body: "Ábrela, imprímela si quieres y explora peldaños ilustrativos. No acredita un empleo.",
        to: "/constancia",
        cta: "Ver constancia",
        switchTo: "participant",
      };
  }
}
