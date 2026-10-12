import { useParams } from "react-router-dom";
import { defenseQuestions, rubricCriteria } from "../data/content";
import { PROJECT } from "../data/project";
import { useDemo } from "../context/DemoContext";
import { formatDateTime } from "../lib/format";
import { aiUsageLabel } from "../lib/share";
import { isCurrentApproval, rubricAverage } from "../lib/status";
import { useDocumentTitle } from "../lib/title";
import { ExperienceRecord } from "../components/ExperienceRecord";
import { Alert, Card, PageIntro, Prose } from "../components/ui";

export function VerifyPage() {
  const { id } = useParams();
  useDocumentTitle("Detalle de evidencia");
  const { state } = useDemo();
  const matches = Boolean(id && state.verificationId && id === state.verificationId);
  const approved = isCurrentApproval(state);
  const detailUrl = `${window.location.origin}/verificar/${state.verificationId ?? ""}`;

  if (matches && !approved) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-12 sm:px-6">
        <PageIntro
          title="Este identificador no tiene una verificación vigente"
          lede="La constancia solo se muestra cuando la revisión humana más reciente aprueba el paquete actual. Un identificador anterior no acredita empleo."
        />
        <Alert tone="warning">ID de demostración: {id}. Sigue siendo un dato local de este navegador.</Alert>
      </div>
    );
  }

  if (!matches || !approved || !state.verificationId) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-12 sm:px-6">
        <PageIntro
          title="No hay una constancia con ese identificador"
          lede="Esta demostración no tiene un registro público. El identificador solo puede contrastarse en el mismo navegador donde se aprobó el trabajo."
        />
        <Alert tone="info">
          Buscado: {id ?? "sin identificador"}. No afirma identidad, empleo ni validación de terceros.
        </Alert>
      </div>
    );
  }

  const review = state.submittedReview;
  const average = review ? rubricAverage(review.scores) : null;

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6">
      <PageIntro
        eyebrow="Detalle local"
        title="Evidencia detrás de la constancia"
        lede="Esta página repite el trabajo, la traza y la defensa guardados en este navegador. No es una validación externa."
      />
      {state.recordHidden && (
        <Alert tone="warning">La constancia está oculta en el perfil de demostración. El detalle local sigue disponible aquí.</Alert>
      )}
      <ExperienceRecord state={state} detailUrl={detailUrl} />
      <Card className="space-y-4">
        <h2 className="font-serif text-2xl text-navy-950">Traza de decisiones</h2>
        <Block title="Por qué" body={state.trace.why} />
        <Block title="Datos que influyeron" body={state.trace.dataInfluenced} />
        <Block title="Uso de IA" body={`${aiUsageLabel(state.trace.usedAI)}. ${state.trace.aiDetails}`.trim()} />
        <Block title="Qué haría distinto" body={state.trace.differently} />
      </Card>
      <Card className="space-y-4">
        <h2 className="font-serif text-2xl text-navy-950">Defensa simulada</h2>
        <p className="text-sm text-slate-600">No fue una entrevista real. Enviada: {formatDateTime(state.defenseSubmittedAt)}.</p>
        {defenseQuestions.map((question, index) => (
          <Block key={question.id} title={`${index + 1}. ${question.prompt}`} body={state.defense[question.id]} />
        ))}
      </Card>
      <Card className="space-y-3">
        <h2 className="font-serif text-2xl text-navy-950">Rúbrica humana</h2>
        <p className="text-sm text-slate-600">
          {PROJECT.supervisorName}, {PROJECT.supervisorNote}. Promedio informativo: {average ?? "—"}. El promedio no decide la verificación.
        </p>
        <ul className="space-y-2 text-sm">
          {rubricCriteria.map((criterion) => (
            <li key={criterion.key} className="flex items-center justify-between gap-3 rounded-2xl bg-mist px-3 py-2">
              <span>{criterion.label}</span>
              <span className="font-semibold">{review?.scores[criterion.key] ?? "—"} / 5</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-navy-950">{title}</h3>
      <Prose>{body || "Sin respuesta"}</Prose>
    </div>
  );
}
