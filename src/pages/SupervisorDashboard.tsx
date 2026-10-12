import { useNavigate } from "react-router-dom";
import { PROJECT } from "../data/project";
import { useDemo } from "../context/DemoContext";
import { formatDateTime } from "../lib/format";
import { displayName } from "../lib/share";
import { isReviewCurrent, statusLabel } from "../lib/status";
import { useDocumentTitle } from "../lib/title";
import { Alert, Badge, Button, Card, PageIntro, Prose } from "../components/ui";

export function SupervisorDashboard() {
  useDocumentTitle("Panel supervisor");
  const { state, status, setRole, approved } = useDemo();
  const navigate = useNavigate();
  const ready = Boolean(state.projectSubmittedAt && state.traceSubmittedAt && state.defenseSubmittedAt);
  const current = isReviewCurrent(state);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6">
      <PageIntro
        eyebrow="Rol simulado"
        title="Panel de empresa / supervisor"
        lede={`${PROJECT.supervisorName} no es una persona real. Quien usa la demostración opera este rol y es quien debe decidir. Ningún modelo aprueba el trabajo.`}
      />
      {state.role !== "supervisor" && (
        <Alert tone="warning" title="Aún no estás en el rol supervisor">
          Puedes leer el avance, pero la decisión solo se envía desde el rol de empresa.
          <button type="button" className="mt-2 block font-semibold underline" onClick={() => setRole("supervisor")}>
            Entrar como supervisor simulado
          </button>
        </Alert>
      )}
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-serif text-2xl text-navy-950">{displayName(state.participantName)}</h2>
            <Badge tone={approved ? "green" : "blue"}>{statusLabel[status]}</Badge>
          </div>
          <p className="mt-1 text-sm text-slate-600">Perfil ficticio · {PROJECT.title}</p>
          {state.projectSubmittedAt ? (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-navy-950">Recomendación enviada</h3>
              <Prose>{state.answers.recommendation || "Sin recomendación todavía."}</Prose>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-600">El participante todavía no envía el proyecto. No hay nada que verificar.</p>
          )}
          <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-slate-500">Proyecto</dt>
              <dd className="font-semibold">{formatDateTime(state.projectSubmittedAt)}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Traza</dt>
              <dd className="font-semibold">{formatDateTime(state.traceSubmittedAt)}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Defensa simulada</dt>
              <dd className="font-semibold">{formatDateTime(state.defenseSubmittedAt)}</dd>
            </div>
          </dl>
          <Button className="mt-5" onClick={() => navigate("/supervisor/revision")}>
            {ready ? "Abrir revisión" : "Ver el avance recibido"}
          </Button>
        </Card>
        <Card className="space-y-3">
          <h2 className="font-serif text-2xl text-navy-950">Estado de la revisión</h2>
          {!state.submittedReview && <p className="text-sm text-slate-600">Todavía no envías una decisión.</p>}
          {state.submittedReview && (
            <p className="text-sm text-slate-600">
              Última decisión: {state.submittedReview.decision === "approve" ? "aprobación" : "cambios"} ·{" "}
              {current ? "vigente" : "desactualizada porque el paquete cambió"}.
            </p>
          )}
          {state.feedbackReviewRequested && (
            <Alert tone="warning" title="La persona pidió revisar tu retroalimentación">
              <p className="whitespace-pre-wrap break-words">{state.feedbackReviewNote}</p>
              <p className="mt-2 text-xs">Quedó registrada el {formatDateTime(state.feedbackReviewAt)}. No salió de este navegador.</p>
            </Alert>
          )}
          {approved && (
            <Button
              variant="secondary"
              onClick={() => {
                setRole("participant");
                navigate("/constancia");
              }}
            >
              Ver la constancia como participante
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}
