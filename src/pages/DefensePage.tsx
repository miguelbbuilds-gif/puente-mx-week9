import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { defenseQuestions } from "../data/content";
import { useDemo } from "../context/DemoContext";
import { formatDateTime } from "../lib/format";
import { LIMITS, canEditDefense, revisionOpen } from "../lib/status";
import { useDocumentTitle } from "../lib/title";
import type { DefenseAnswers } from "../types";
import { RevisionBanner } from "../components/RevisionBanner";
import { Alert, Button, ButtonLink, Card, PageIntro, TextArea } from "../components/ui";

export function DefensePage() {
  useDocumentTitle("Defensa simulada");
  const { state, updateDefense, submitDefense, setRole } = useDemo();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const editable = canEditDefense(state);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const wasRevision = revisionOpen(state);
    const result = submitDefense();
    if (result) {
      setError(result);
      setMessage(null);
      return;
    }
    setError(null);
    setMessage(
      wasRevision
        ? "Paquete reenviado. Completar esta simulación no verifica tu trabajo."
        : "Defensa simulada enviada. Esto no es una certificación ni una entrevista real.",
    );
  }

  if (!state.traceSubmittedAt) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-12 sm:px-6">
        <PageIntro title="La defensa espera a la traza" lede="Primero explica tus decisiones. Después vienen tres preguntas de seguimiento." />
        <ButtonLink to={state.projectSubmittedAt ? "/trazabilidad" : "/proyecto"}>Ir al paso anterior</ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6">
      <PageIntro
        eyebrow="Simulación"
        title="Defensa simulada"
        lede="Tres preguntas imitan el seguimiento de una persona supervisora. No es una entrevista de trabajo, no hay alguien del otro lado y completarlas no te certifica."
      />
      <RevisionBanner />
      <Alert tone="warning" title="No es una entrevista real">
        Nadie de una empresa está evaluándote en vivo. Tus respuestas se guardan para que el rol supervisor, operado en esta demo por ti, pueda leerlas después.
      </Alert>
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <Card className="space-y-5">
          {defenseQuestions.map((question, index) => (
            <TextArea
              key={question.id}
              id={question.id}
              label={`${index + 1}. ${question.prompt}`}
              min={LIMITS.defense}
              readOnly={!editable}
              value={state.defense[question.id]}
              onChange={(value) => updateDefense({ [question.id]: value } as Partial<DefenseAnswers>)}
            />
          ))}
          {error && <Alert tone="danger">{error}</Alert>}
          {message && <Alert tone="success">{message}</Alert>}
          <p className="text-xs text-slate-500">Enviada: {formatDateTime(state.defenseSubmittedAt)}</p>
          {editable && (
            <Button type="submit">{revisionOpen(state) ? "Reenviar evidencia" : "Enviar defensa simulada"}</Button>
          )}
        </Card>
      </form>
      {state.defenseSubmittedAt && !revisionOpen(state) && (
        <Card>
          <h2 className="font-serif text-2xl text-navy-950">Siguiente: una persona tiene que decidir</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Cambia al rol de supervisor simulado para leer este mismo envío y completar la rúbrica. La aplicación no puede aprobarte.
          </p>
          <Button
            className="mt-4"
            onClick={() => {
              setRole("supervisor");
              navigate("/supervisor/revision");
            }}
          >
            Revisar como supervisor
          </Button>
        </Card>
      )}
    </div>
  );
}
