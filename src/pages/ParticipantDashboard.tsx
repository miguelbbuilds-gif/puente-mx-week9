import { useNavigate } from "react-router-dom";
import { PROJECT } from "../data/project";
import { useDemo } from "../context/DemoContext";
import { currency, formatDateTime } from "../lib/format";
import { displayName } from "../lib/share";
import { nextAction, statusLabel } from "../lib/status";
import { useDocumentTitle } from "../lib/title";
import { ProgressTracker } from "../components/ProgressTracker";
import { Alert, Badge, Button, Card, PageIntro } from "../components/ui";

export function ParticipantDashboard() {
  useDocumentTitle("Panel participante");
  const { state, status, approved, setRole, setParticipantName } = useDemo();
  const navigate = useNavigate();
  const action = nextAction(status);
  const name = displayName(state.participantName);

  function goNext() {
    if (action.switchTo) setRole(action.switchTo);
    navigate(action.to);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6">
      <PageIntro
        eyebrow="Panel de participante"
        title={`Hola, ${name}.`}
        lede="Este espacio guarda tu demostración en este navegador. Norte Consultores es una empresa ficticia y la compensación no se paga."
      />
      {state.role !== "participant" && (
        <Alert tone="warning" title="Estás viendo el panel, pero tu rol activo es otro">
          <button type="button" className="font-semibold underline" onClick={() => setRole("participant")}>
            Cambiar a Joven / Participante
          </button>
        </Alert>
      )}
      <Card className="bg-navy-900 text-white ring-0">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200">Siguiente acción</p>
        <h2 className="mt-2 font-serif text-3xl">{action.title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-blue-100">{action.body}</p>
        <Button variant="light" className="mt-5" onClick={goNext}>
          {action.cta}
        </Button>
      </Card>
      <ProgressTracker />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-serif text-2xl text-navy-950">Proyecto actual</h2>
            <Badge tone={status === "approved" ? "green" : status === "revision_requested" ? "amber" : "blue"}>
              {statusLabel[status]}
            </Badge>
          </div>
          <p className="mt-3 font-semibold text-navy-950">{PROJECT.title}</p>
          <p className="text-sm text-slate-600">{PROJECT.company} · {PROJECT.companyNote}</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-slate-500">Duración</dt>
              <dd className="font-semibold">{PROJECT.duration} ilustrativos</dd>
            </div>
            <div>
              <dt className="text-slate-500">Compensación</dt>
              <dd className="font-semibold">{currency.format(PROJECT.compensation)} sin pago</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-slate-500">Último guardado: {formatDateTime(state.answersSavedAt)}</p>
        </Card>
        <Card>
          <h2 className="font-serif text-2xl text-navy-950">Experiencias verificadas</h2>
          {approved && !state.recordHidden && (
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Hay 1 constancia de demostración visible en tu perfil. No acredita empleo.
            </p>
          )}
          {approved && state.recordHidden && (
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Ocultaste la constancia de este perfil. Sigue en este navegador y puedes volver a mostrarla.
            </p>
          )}
          {!approved && (
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Todavía no hay una experiencia verificada. Completar el encargo no la crea: hace falta la aprobación del supervisor.
            </p>
          )}
          <h3 className="mt-5 text-sm font-semibold text-navy-950">Evaluaciones pendientes</h3>
          <p className="mt-1 text-sm text-slate-600">{pendingCopy(status)}</p>
        </Card>
        <Card>
          <h2 className="font-serif text-2xl text-navy-950">
            {approved ? "Habilidades observadas en el proyecto" : "Habilidades que este proyecto puede evidenciar"}
          </h2>
          <ul className="mt-4 space-y-2">
            {PROJECT.skills.map((skill) => (
              <li key={skill} className="flex items-center justify-between gap-3 rounded-2xl bg-mist px-3 py-2 text-sm">
                <span className="font-semibold text-navy-950">{skill}</span>
                <Badge tone={approved ? "green" : "slate"}>{approved ? "Señal de este encargo" : "Aún sin verificar"}</Badge>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-500">No son una certificación profesional.</p>
        </Card>
        <Card>
          <h2 className="font-serif text-2xl text-navy-950">Perfil de demostración</h2>
          <label htmlFor="nombre-panel" className="mt-3 block text-sm font-semibold text-navy-950">
            Nombre que aparecerá en la constancia
          </label>
          <input
            id="nombre-panel"
            value={state.participantName}
            autoComplete="off"
            onChange={(event) => setParticipantName(event.target.value)}
            className="mt-2 min-h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm"
          />
          <p className="mt-2 text-xs text-slate-500">{PROJECT.participantNote}</p>
        </Card>
      </div>
    </div>
  );
}

function pendingCopy(status: ReturnType<typeof useDemo>["status"]): string {
  if (status === "awaiting_review") return "1 evaluación esperando al rol supervisor. La aplicación no la resuelve sola.";
  if (status === "revision_requested") return "La revisión pidió cambios. Cuando reenvíes el paquete, volverá a quedar pendiente.";
  if (status === "approved") return "No hay evaluaciones pendientes en esta demostración.";
  return "La revisión humana empieza cuando envíes el proyecto, la traza y la defensa simulada.";
}
