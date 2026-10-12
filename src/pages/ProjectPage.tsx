import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { PROJECT } from "../data/project";
import { useDemo } from "../context/DemoContext";
import { currency, formatDateTime } from "../lib/format";
import { LIMITS, canEditProject, projectIssues, revisionOpen } from "../lib/status";
import { useDocumentTitle } from "../lib/title";
import { DatasetPanel } from "../components/DatasetPanel";
import { RevisionBanner } from "../components/RevisionBanner";
import { Alert, Button, Card, CheckList, PageIntro, TextArea } from "../components/ui";

export function ProjectPage() {
  useDocumentTitle("Microexperiencia");
  const { state, saveAnswers, submitProject, acceptScope, updateAnswers } = useDemo();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const editable = canEditProject(state);
  const openRevision = revisionOpen(state);

  function onSave() {
    if (!state.scopeAccepted) {
      setError("Acepta el alcance, el plazo y la compensación antes de guardar.");
      setMessage(null);
      return;
    }
    saveAnswers();
    setError(null);
    setMessage("Progreso guardado en este navegador.");
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const wasRevision = openRevision;
    const result = submitProject();
    if (result) {
      setError(result);
      setMessage(null);
      return;
    }
    setError(null);
    if (wasRevision) {
      setMessage("Evidencia reenviada. La revisión anterior ya no está vigente.");
      return;
    }
    navigate("/trazabilidad");
  }

  const checks = [
    { ok: state.scopeAccepted, label: "Alcance, plazo y compensación aceptados" },
    { ok: state.answers.bestProduct.trim().length >= LIMITS.bestProduct, label: "Producto con mejor desempeño" },
    { ok: state.answers.areaToImprove.trim().length >= LIMITS.area, label: "Área que necesita mejora" },
    { ok: state.answers.recommendation.trim().length >= LIMITS.recommendation, label: "Recomendación concreta" },
    { ok: state.answers.evidence.trim().length >= LIMITS.evidence, label: "Evidencia que la sostiene" },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6">
      <PageIntro
        eyebrow={`${PROJECT.company} · ${PROJECT.companyNote}`}
        title={PROJECT.title}
        lede="Microexperiencia de demostración. Lees un problema de negocio, usas datos ficticios y dejas por escrito tu criterio. No hay pago ni cliente real."
      />
      <RevisionBanner />
      <div className="grid gap-4 md:grid-cols-3">
        <Fact title="Compensación" body={`${currency.format(PROJECT.compensation)}. ${PROJECT.compensationNote}`} />
        <Fact title="Plazo" body={`${PROJECT.duration}. ${PROJECT.durationNote}`} />
        <Fact title="Alcance" body={PROJECT.scope} />
      </div>
      <Alert tone="warning" title="Antes de empezar">
        No se te pide trabajo para una empresa real. Si aceptas, solo confirmas que leíste estas condiciones de la demostración.
      </Alert>
      <Card>
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4"
            checked={state.scopeAccepted}
            disabled={!editable && state.scopeAccepted}
            onChange={(event) => acceptScope(event.target.checked)}
          />
          <span>
            <span className="font-semibold text-navy-950">Acepto el alcance, el plazo ilustrativo y la compensación ilustrativa.</span>
            <span className="mt-1 block text-slate-600">Entiendo que no hay pago, contratación ni ampliación del encargo.</span>
          </span>
        </label>
      </Card>
      <Card>
        <h2 className="font-serif text-2xl text-navy-950">Dataset ficticio</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Norte Consultores, en esta historia, vende mobiliario ligero de oficina en cuatro regiones. Los cálculos de abajo son automáticos para ayudarte a leer. La recomendación tiene que ser tuya.
        </p>
        <div className="mt-5">
          <DatasetPanel />
        </div>
      </Card>
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <Card className="space-y-5">
          <h2 className="font-serif text-2xl text-navy-950">Tus respuestas</h2>
          <TextArea
            id="mejor-producto"
            label="¿Qué producto se desempeñó mejor?"
            hint="Puedes distinguir ventas, margen y devoluciones. No hay una única cifra correcta."
            min={LIMITS.bestProduct}
            readOnly={!editable}
            value={state.answers.bestProduct}
            onChange={(value) => updateAnswers({ bestProduct: value })}
          />
          <TextArea
            id="area-mejora"
            label="¿Qué área necesita mejora?"
            hint="Puede ser un producto, una región o una combinación. Explica el síntoma."
            min={LIMITS.area}
            readOnly={!editable}
            value={state.answers.areaToImprove}
            onChange={(value) => updateAnswers({ areaToImprove: value })}
          />
          <TextArea
            id="recomendacion"
            label="¿Qué recomendación le darías a la empresa?"
            hint="Propón una acción concreta y realista para este encargo. No implementes nada fuera de la demo."
            min={LIMITS.recommendation}
            readOnly={!editable}
            value={state.answers.recommendation}
            onChange={(value) => updateAnswers({ recommendation: value })}
          />
          <TextArea
            id="evidencia"
            label="¿Qué evidencia sostiene tu recomendación?"
            hint="Señala cifras de la tabla: ingreso, unidades, margen o tasa de devolución."
            min={LIMITS.evidence}
            readOnly={!editable}
            value={state.answers.evidence}
            onChange={(value) => updateAnswers({ evidence: value })}
          />
          <CheckList items={checks} />
          {error && (
            <Alert tone="danger" title="Revisa el formulario">
              {error}
            </Alert>
          )}
          {message && <Alert tone="success">{message}</Alert>}
          <p className="text-xs text-slate-500">
            Guardado en este navegador: {formatDateTime(state.answersSavedAt)}. El envío del proyecto: {formatDateTime(state.projectSubmittedAt)}.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            {editable && (
              <Button type="button" variant="secondary" onClick={onSave}>
                Guardar progreso
              </Button>
            )}
            {editable && (
              <Button type="submit">{openRevision ? "Reenviar evidencia" : "Enviar proyecto"}</Button>
            )}
          </div>
          {!editable && state.projectSubmittedAt && (
            <Alert tone="info">
              Esta entrega ya fue enviada. El siguiente paso depende de tu avance: traza, defensa simulada o revisión humana.
            </Alert>
          )}
          {projectIssues(state).length > 0 && editable && (
            <p className="text-xs text-slate-500">El botón de envío comprueba la lista. Puedes guardar aunque todavía falten respuestas.</p>
          )}
        </Card>
      </form>
    </div>
  );
}

function Fact({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-navy-900/5">
      <h2 className="text-sm font-semibold text-navy-950">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
    </article>
  );
}
