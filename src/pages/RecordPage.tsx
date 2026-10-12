import { useState } from "react";
import { Copy, Printer } from "lucide-react";
import { PROJECT } from "../data/project";
import { useDemo } from "../context/DemoContext";
import { LIMITS, statusLabel } from "../lib/status";
import { copyText, evidenceSummary } from "../lib/share";
import { useDocumentTitle } from "../lib/title";
import { ExperienceRecord } from "../components/ExperienceRecord";
import { Alert, Button, ButtonLink, Card, PageIntro, TextArea } from "../components/ui";

export function RecordPage() {
  useDocumentTitle("Constancia");
  const { state, approved, status, setRecordHidden, requestFeedbackReview } = useDemo();
  const [note, setNote] = useState(state.feedbackReviewNote);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fallback, setFallback] = useState<string | null>(null);
  const detailUrl = `${window.location.origin}/verificar/${state.verificationId ?? ""}`;

  async function onCopy() {
    const text = evidenceSummary(state, detailUrl);
    const ok = await copyText(text);
    if (ok) {
      setFallback(null);
      setMessage("Resumen copiado. Compártelo solo si quieres: sigue siendo una constancia de demostración.");
      return;
    }
    setMessage(null);
    setFallback(text);
  }

  if (!approved || !state.verificationId) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-12 sm:px-6">
        <PageIntro
          title="Aún no hay constancia"
          lede={`Estado actual: ${statusLabel[status]}. La constancia aparece solo después de que el rol supervisor complete la rúbrica y apruebe el trabajo.`}
        />
        <ButtonLink to="/participante">Volver al panel</ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6">
      <div className="no-print space-y-4">
        <PageIntro
          eyebrow="Evidencia portable"
          title="Tu constancia de demostración"
          lede="Puedes verla, imprimirla o copiar un resumen. Ocultarla no la borra de este navegador."
        />
        {state.recordHidden && (
          <Alert tone="warning" title="Oculta en el perfil">
            El panel ya no la muestra como experiencia visible. Esta página sigue disponible para ti.
          </Alert>
        )}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button onClick={() => window.print()}>
            <Printer className="h-4 w-4" aria-hidden="true" />
            Imprimir o guardar PDF
          </Button>
          <Button variant="secondary" onClick={onCopy}>
            <Copy className="h-4 w-4" aria-hidden="true" />
            Copiar resumen
          </Button>
          <Button variant="secondary" onClick={() => setRecordHidden(!state.recordHidden)}>
            {state.recordHidden ? "Mostrar en el perfil" : "Ocultar del perfil"}
          </Button>
          <ButtonLink to={`/verificar/${state.verificationId}`} variant="ghost">
            Abrir detalle de verificación
          </ButtonLink>
        </div>
        <p className="text-xs text-slate-500">
          En el diálogo de impresión del navegador elige “Guardar como PDF”. La barra de navegación no se incluye.
        </p>
        {message && <Alert tone="success">{message}</Alert>}
        {fallback && (
          <TextArea id="resumen-manual" label="Copia este resumen manualmente" value={fallback} onChange={() => undefined} readOnly />
        )}
      </div>
      <ExperienceRecord state={state} detailUrl={detailUrl} />
      <Card className="no-print space-y-4">
        <h2 className="font-serif text-2xl text-navy-950">Solicitar revisión de la retroalimentación</h2>
        <p className="text-sm leading-relaxed text-slate-600">
          Si el comentario del supervisor no te parece claro o justo, deja una nota. Queda guardada en esta demostración para el rol supervisor. No se envía a {PROJECT.company} ni a nadie fuera de este navegador.
        </p>
        <TextArea
          id="revision-feedback"
          label="¿Qué quieres que se revise?"
          min={LIMITS.reviewRequest}
          value={note}
          onChange={setNote}
        />
        {error && <Alert tone="danger">{error}</Alert>}
        {state.feedbackReviewRequested && (
          <Alert tone="success" title="Solicitud registrada en esta demo">
            {state.feedbackReviewNote}
          </Alert>
        )}
        <Button
          variant="secondary"
          onClick={() => {
            const result = requestFeedbackReview(note);
            setError(result);
          }}
        >
          Registrar solicitud
        </Button>
      </Card>
    </div>
  );
}
