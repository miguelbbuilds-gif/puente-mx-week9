import { PROJECT } from "../data/project";
import type { DemoState } from "../types";
import { formatDate } from "./format";

export function displayName(name: string): string {
  const trimmed = name.trim();
  return trimmed.length >= 2 ? trimmed : "Valeria Núñez";
}

export function aiUsageLabel(value: DemoState["trace"]["usedAI"]): string {
  if (value === "no") return "Declaró que no usó asistencia de IA";
  if (value === "partial") return "Declaró un uso puntual de IA";
  if (value === "yes") return "Declaró que se apoyó bastante en IA";
  return "Uso de IA sin declarar";
}

export function evidenceSummary(state: DemoState, detailUrl: string): string {
  const review = state.submittedReview;
  const interview =
    review?.considerInterview === true
      ? "Se registró una consideración de entrevista futura. No es una entrevista confirmada."
      : "No se registró consideración de entrevista.";
  return [
    "PUENTE MX — Constancia de demostración",
    "Aviso: No acredita empleo real, pago real, identidad ni validación de terceros.",
    `Participante (perfil ficticio): ${displayName(state.participantName)}`,
    `Empresa: ${PROJECT.company} (${PROJECT.companyNote.toLowerCase()})`,
    `Proyecto: ${PROJECT.title}`,
    `Fecha de la revisión: ${formatDate(review?.submittedAt ?? null)}`,
    `Estado: Verificado en esta demostración`,
    `ID de demostración: ${state.verificationId ?? "sin identificador"}`,
    interview,
    `Detalle local: ${detailUrl}`,
  ].join("\n");
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
