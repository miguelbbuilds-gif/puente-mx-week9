import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { defenseQuestions, rubricCriteria, rubricLevels } from "../data/content";
import { PROJECT } from "../data/project";
import { useDemo } from "../context/DemoContext";
import { aiUsageLabel, displayName } from "../lib/share";
import { LIMITS, isReviewCurrent, reviewIssues, rubricAverage, rubricComplete } from "../lib/status";
import { useDocumentTitle } from "../lib/title";
import type { RubricScores } from "../types";
import { Alert, Button, Card, PageIntro, Prose } from "../components/ui";

export function ReviewPage() {
  useDocumentTitle("Revisión");
  const { state, setRole, setScore, updateReviewDraft, submitReview, approved } = useDemo();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const issues = reviewIssues(state);
  const average = rubricComplete(state.reviewDraft.scores) ? rubricAverage(state.reviewDraft.scores) : null;
  const stale = Boolean(state.submittedReview && !isReviewCurrent(state));

  function onSubmit() {
    const result = submitReview();
    if (result) {
      setError(result);
      setMessage(null);
      return;
    }
    setError(null);
    setMessage(
      state.reviewDraft.decision === "approve"
        ? "Aprobación registrada por el rol supervisor. La aplicación no decidió esto."
        : "Solicitud de cambios registrada. La constancia no queda verificada.",
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6">
      <PageIntro
        eyebrow="Decisión humana"
        title={`Revisión de ${displayName(state.participantName)}`}
        lede="Lee el trabajo que quedó guardado en este navegador. La verificación exige la rúbrica completa, retroalimentación y una elección explícita. Un promedio no aprueba a nadie."
      />
      {state.role !== "supervisor" && (
        <Alert tone="warning" title="Esta decisión corresponde al rol supervisor">
          <button type="button" className="font-semibold underline" onClick={() => setRole("supervisor")}>
            Entrar como supervisor simulado
          </button>
        </Alert>
      )}
      <Alert tone="info">
        Estás operando a {PROJECT.supervisorName}. Es un rol simulado, no una supervisora real de {PROJECT.company}.
      </Alert>
      {stale && (
        <Alert tone="warning" title="La revisión anterior ya no cubre este paquete">
          La persona reenvió evidencia después de tu última decisión. Vuelve a enviar la rúbrica para que cuente.
        </Alert>
      )}
      {approved && <Alert tone="success">Hay una aprobación vigente. Enviar otra decisión la sustituye.</Alert>}

      <Card className="space-y-4">
        <h2 className="font-serif text-2xl text-navy-950">Trabajo enviado</h2>
        {state.projectSubmittedAt ? (
          <>
            <Block title="Producto con mejor desempeño" body={state.answers.bestProduct} />
            <Block title="Área a mejorar" body={state.answers.areaToImprove} />
            <Block title="Recomendación" body={state.answers.recommendation} />
            <Block title="Evidencia" body={state.answers.evidence} />
          </>
        ) : (
          <p className="text-sm text-slate-600">Todavía no hay un proyecto enviado.</p>
        )}
      </Card>

      <Card className="space-y-4">
        <h2 className="font-serif text-2xl text-navy-950">Traza de decisiones</h2>
        {state.traceSubmittedAt ? (
          <>
            <Block title="Por qué" body={state.trace.why} />
            <Block title="Datos que influyeron" body={state.trace.dataInfluenced} />
            <Block title="Uso de IA" body={`${aiUsageLabel(state.trace.usedAI)}. ${state.trace.aiDetails}`.trim()} />
            <Block title="Qué haría distinto" body={state.trace.differently} />
          </>
        ) : (
          <p className="text-sm text-slate-600">La traza aún no se envía. Puedes leer un borrador, pero no cerrar la verificación.</p>
        )}
      </Card>

      <Card className="space-y-4">
        <h2 className="font-serif text-2xl text-navy-950">Defensa simulada</h2>
        <p className="text-sm text-slate-600">No fue una entrevista real.</p>
        {state.defenseSubmittedAt ? (
          defenseQuestions.map((question, index) => (
            <Block key={question.id} title={`${index + 1}. ${question.prompt}`} body={state.defense[question.id]} />
          ))
        ) : (
          <p className="text-sm text-slate-600">La defensa simulada aún no se envía.</p>
        )}
      </Card>

      <Card className="space-y-6">
        <div>
          <h2 className="font-serif text-2xl text-navy-950">Rúbrica</h2>
          <p className="mt-1 text-sm text-slate-600">
            Califica del 1 al 5. El promedio informativo {average === null ? "aparecerá al completar las cinco dimensiones" : `es ${average}`}. No determina la verificación.
          </p>
        </div>
        {rubricCriteria.map((criterion) => (
          <fieldset key={criterion.key} className="rounded-2xl border border-slate-200 p-4">
            <legend className="px-1 text-sm font-semibold text-navy-950">{criterion.label}</legend>
            <p id={`${criterion.key}-ayuda`} className="mb-3 text-sm text-slate-600">
              {criterion.help}
            </p>
            <div className="grid gap-2 sm:grid-cols-5" role="radiogroup" aria-describedby={`${criterion.key}-ayuda`}>
              {rubricLevels.map((level) => {
                const selected = state.reviewDraft.scores[criterion.key] === level.value;
                return (
                  <label
                    key={level.value}
                    className={`flex min-h-11 cursor-pointer items-center justify-center rounded-xl border px-2 text-center text-xs font-semibold focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-electric-600 ${
                      selected ? "border-electric-600 bg-electric-50 text-navy-950" : "border-slate-200 text-slate-600"
                    }`}
                  >
                    <input
                      className="sr-only"
                      type="radio"
                      name={`rubrica-${criterion.key}`}
                      value={level.value}
                      checked={selected}
                      onChange={() => setScore(criterion.key as keyof RubricScores, level.value)}
                    />
                    {level.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
        <div>
          <label htmlFor="retroalimentacion" className="text-sm font-semibold text-navy-950">
            Retroalimentación personalizada
          </label>
          <textarea
            id="retroalimentacion"
            value={state.reviewDraft.feedback}
            onChange={(event) => updateReviewDraft({ feedback: event.target.value })}
            className="mt-2 min-h-32 w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm"
          />
          <p className="mt-1 text-xs text-slate-500">
            {state.reviewDraft.feedback.trim().length} caracteres · mínimo {LIMITS.feedback}
          </p>
        </div>
        <fieldset>
          <legend className="text-sm font-semibold text-navy-950">Decisión</legend>
          <div className="mt-2 space-y-2">
            <Choice
              name="decision"
              checked={state.reviewDraft.decision === "approve"}
              label="Aprobar y emitir constancia de demostración"
              onChange={() => updateReviewDraft({ decision: "approve" })}
            />
            <Choice
              name="decision"
              checked={state.reviewDraft.decision === "revision"}
              label="Solicitar cambios. No queda verificado."
              onChange={() => updateReviewDraft({ decision: "revision" })}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-semibold text-navy-950">¿Considerarías una entrevista futura?</legend>
          <p className="mt-1 text-sm text-slate-600">Registrarlo no agenda una entrevista ni promete contratación.</p>
          <div className="mt-2 space-y-2">
            <Choice
              name="entrevista"
              checked={state.reviewDraft.considerInterview === true}
              label="Sí, considerar más adelante. No es una cita."
              onChange={() => updateReviewDraft({ considerInterview: true })}
            />
            <Choice
              name="entrevista"
              checked={state.reviewDraft.considerInterview === false}
              label="No por ahora."
              onChange={() => updateReviewDraft({ considerInterview: false })}
            />
          </div>
        </fieldset>
        {issues.length > 0 && (
          <ul className="space-y-1 text-sm text-slate-600">
            {issues.map((issue) => (
              <li key={issue}>· {issue}</li>
            ))}
          </ul>
        )}
        {error && <Alert tone="danger">{error}</Alert>}
        {message && <Alert tone="success">{message}</Alert>}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={onSubmit}>Enviar revisión humana</Button>
          {approved && (
            <Button
              variant="secondary"
              onClick={() => {
                setRole("participant");
                navigate("/constancia");
              }}
            >
              Ver constancia como participante
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-navy-950">{title}</h3>
      <Prose>{body}</Prose>
    </div>
  );
}

function Choice({
  name,
  checked,
  label,
  onChange,
}: {
  name: string;
  checked: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <label className="flex items-start gap-3 rounded-2xl border border-slate-200 px-3 py-3 text-sm">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="mt-1" />
      <span>{label}</span>
    </label>
  );
}
