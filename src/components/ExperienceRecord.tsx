import { PROJECT } from "../data/project";
import { currency, formatDate } from "../lib/format";
import { aiUsageLabel, displayName } from "../lib/share";
import type { DemoState } from "../types";
import { Logo } from "./Logo";

export function ExperienceRecord({ state, detailUrl }: { state: DemoState; detailUrl: string }) {
  const review = state.submittedReview;
  const name = displayName(state.participantName);

  return (
    <article id="constancia" className="overflow-hidden rounded-3xl bg-paper shadow-card ring-1 ring-navy-900/10">
      <header className="print-color bg-navy-900 px-5 py-6 text-white sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <Logo light />
          <p className="max-w-xs text-right text-xs uppercase tracking-[0.16em] text-blue-100">
            Evidencia de trabajo · Demostración
          </p>
        </div>
        <h2 className="mt-8 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">Constancia de demostración</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-blue-100">
          Registro portable de un encargo revisado por una persona dentro de esta demostración.
        </p>
      </header>
      <p className="print-color border-y border-amber-300 bg-amber-100 px-5 py-3 text-sm font-bold text-amber-950 sm:px-8">
        Constancia de demostración — No acredita empleo real.
      </p>
      <div className="space-y-6 px-5 py-6 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Participante" value={`${name} (perfil ficticio)`} />
          <Field label="Empresa" value={`${PROJECT.company} (${PROJECT.companyNote.toLowerCase()})`} />
          <Field label="Proyecto" value={PROJECT.title} />
          <Field label="Compensación declarada" value={`${currency.format(PROJECT.compensation)} · ${PROJECT.compensationNote}`} />
          <Field label="Fecha de la revisión" value={formatDate(review?.submittedAt ?? null)} />
          <Field label="Estado" value="Verificado en esta demostración" />
          <Field label="ID de demostración" value={state.verificationId ?? "Sin identificador"} mono />
          <Field
            label="Supervisor"
            value={`${PROJECT.supervisorName} · ${PROJECT.supervisorNote}`}
          />
        </div>

        <section>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Trabajo realizado</h3>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink">
            <p><span className="font-semibold">Desempeño: </span>{state.answers.bestProduct}</p>
            <p><span className="font-semibold">Área a mejorar: </span>{state.answers.areaToImprove}</p>
            <p><span className="font-semibold">Recomendación: </span>{state.answers.recommendation}</p>
            <p><span className="font-semibold">Evidencia citada: </span>{state.answers.evidence}</p>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Habilidades demostradas en este proyecto</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {PROJECT.skills.map((skill) => (
              <li key={skill} className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-navy-900 ring-1 ring-navy-900/10">
                {skill}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-slate-600">
            Son señales de este encargo. No son una certificación profesional ni una credencial de terceros.
          </p>
        </section>

        <section className="rounded-2xl bg-white p-4 ring-1 ring-navy-900/5">
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Retroalimentación del supervisor</h3>
          <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-ink">{review?.feedback}</p>
          <p className="mt-3 text-sm text-slate-600">{aiUsageLabel(state.trace.usedAI)}.</p>
          <p className="mt-1 text-sm text-slate-600">
            {review?.considerInterview
              ? "Se registró que podría considerarse una entrevista futura. Eso no agenda ni confirma una entrevista."
              : "No se registró una consideración de entrevista."}
          </p>
        </section>

        <section className="text-sm leading-relaxed text-slate-700">
          <p className="break-all">
            Detalle de la evidencia, visible solo en el navegador donde se creó: {detailUrl}
          </p>
          <p className="mt-3">
            La evidencia pertenece a la persona participante. Puede ocultarla del perfil de demostración. Esta constancia no verifica identidad, no prueba un pago, no usa certificación criptográfica y no valida una colocación laboral.
          </p>
        </section>
      </div>
    </article>
  );
}

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-2xl bg-white/70 px-4 py-3 ring-1 ring-navy-900/5">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className={`mt-1 break-words text-sm font-semibold text-navy-950 ${mono ? "font-mono text-[13px]" : ""}`}>{value}</p>
    </div>
  );
}
