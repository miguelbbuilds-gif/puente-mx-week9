import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDemo } from "../context/DemoContext";
import { formatDateTime } from "../lib/format";
import { LIMITS, canEditTrace, revisionOpen } from "../lib/status";
import { useDocumentTitle } from "../lib/title";
import { RevisionBanner } from "../components/RevisionBanner";
import { Alert, Button, ButtonLink, Card, PageIntro, TextArea } from "../components/ui";

export function TracePage() {
  useDocumentTitle("Traza de decisiones");
  const { state, updateTrace, submitTrace } = useDemo();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const editable = canEditTrace(state);
  const needsAi = state.trace.usedAI === "yes" || state.trace.usedAI === "partial";

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const wasRevision = revisionOpen(state);
    const result = submitTrace();
    if (result) {
      setError(result);
      setMessage(null);
      return;
    }
    setError(null);
    if (wasRevision) {
      setMessage("Paquete reenviado. La revisión anterior quedó desactualizada.");
      return;
    }
    navigate("/defensa");
  }

  if (!state.projectSubmittedAt) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-12 sm:px-6">
        <PageIntro title="Primero envía el análisis" lede="La traza documenta decisiones de un trabajo que ya entregaste." />
        <ButtonLink to="/proyecto">Volver al proyecto</ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6">
      <PageIntro
        eyebrow="Evidencia"
        title="Traza de decisiones"
        lede="Cuéntanos cómo llegaste a la recomendación. Declarar el uso de IA no te penaliza: es parte de la confianza. Esta pantalla no certifica tu trabajo."
      />
      <RevisionBanner />
      <Alert tone="info" title="La asistencia de IA se declara, no se castiga">
        Puedes haber usado una herramienta para ordenar ideas o revisar redacción. Lo que importa es decir qué hiciste tú y qué hizo la herramienta.
      </Alert>
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <Card className="space-y-5">
          <TextArea
            id="porque"
            label="¿Por qué hiciste esa recomendación?"
            min={LIMITS.why}
            readOnly={!editable}
            value={state.trace.why}
            onChange={(value) => updateTrace({ why: value })}
          />
          <TextArea
            id="datos"
            label="¿Qué datos influyeron en la decisión?"
            min={LIMITS.data}
            readOnly={!editable}
            value={state.trace.dataInfluenced}
            onChange={(value) => updateTrace({ dataInfluenced: value })}
          />
          <fieldset>
            <legend className="text-sm font-semibold text-navy-950">¿Usaste asistencia de inteligencia artificial?</legend>
            <div className="mt-3 space-y-2">
              {[
                ["no", "No la usé"],
                ["partial", "Sí, de forma puntual"],
                ["yes", "Sí, me apoyé bastante"],
              ].map(([value, label]) => (
                <label key={value} className="flex items-center gap-3 rounded-2xl border border-slate-200 px-3 py-3 text-sm">
                  <input
                    type="radio"
                    name="uso-ia"
                    value={value}
                    disabled={!editable}
                    checked={state.trace.usedAI === value}
                    onChange={() => updateTrace({ usedAI: value as "no" | "yes" | "partial" })}
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
          {needsAi && (
            <TextArea
              id="detalle-ia"
              label="¿Qué hiciste tú y qué hizo la herramienta?"
              hint="Por ejemplo: la herramienta ordenó el texto y tú elegiste la recomendación."
              min={LIMITS.aiDetails}
              readOnly={!editable}
              value={state.trace.aiDetails}
              onChange={(value) => updateTrace({ aiDetails: value })}
            />
          )}
          <TextArea
            id="distinto"
            label="¿Qué harías distinto?"
            min={LIMITS.differently}
            readOnly={!editable}
            value={state.trace.differently}
            onChange={(value) => updateTrace({ differently: value })}
          />
          {error && <Alert tone="danger">{error}</Alert>}
          {message && <Alert tone="success">{message}</Alert>}
          <p className="text-xs text-slate-500">Enviada: {formatDateTime(state.traceSubmittedAt)}</p>
          {editable && <Button type="submit">{revisionOpen(state) ? "Reenviar evidencia" : "Enviar traza"}</Button>}
          {!editable && state.traceSubmittedAt && (
            <ButtonLink to="/defensa" variant="secondary">
              Continuar a la defensa simulada
            </ButtonLink>
          )}
        </Card>
      </form>
    </div>
  );
}
