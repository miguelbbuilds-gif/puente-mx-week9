import { AlertTriangle, CheckCircle2, Circle } from "lucide-react";
import { Link } from "react-router-dom";
import { progressPercent, progressSteps } from "../lib/progress";
import { useDemo } from "../context/DemoContext";

const phaseLabel = {
  done: "Listo",
  current: "Paso actual",
  todo: "Pendiente",
  alert: "Requiere atención",
} as const;

export function ProgressTracker() {
  const { state, status } = useDemo();
  const steps = progressSteps(state, status);
  const percent = progressPercent(state, status);

  return (
    <div className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-navy-900/5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-navy-950">Avance del encargo</h2>
          <p className="mt-1 text-sm text-slate-600">Puedes abrir cada etapa. Las que faltan te explican qué sigue.</p>
        </div>
        <p className="text-sm font-semibold text-navy-900">{percent}%</p>
      </div>
      <div
        className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Avance del proyecto de demostración"
      >
        <div className="h-full rounded-full bg-electric-600" style={{ width: `${percent}%` }} />
      </div>
      <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.label}>
            <Link
              to={step.to}
              aria-current={step.phase === "current" ? "step" : undefined}
              className={`flex h-full gap-3 rounded-2xl border px-3 py-3 transition hover:border-electric-300 ${
                step.phase === "current"
                  ? "border-electric-500 bg-electric-50"
                  : step.phase === "alert"
                    ? "border-amber-300 bg-amber-50"
                    : "border-slate-200 bg-white"
              }`}
            >
              <span className="mt-0.5" aria-hidden="true">
                {step.phase === "done" ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                ) : step.phase === "alert" ? (
                  <AlertTriangle className="h-5 w-5 text-amber-700" />
                ) : (
                  <Circle className={`h-5 w-5 ${step.phase === "current" ? "text-electric-600" : "text-slate-300"}`} />
                )}
              </span>
              <span>
                <span className="block text-sm font-semibold text-navy-950">
                  {index + 1}. {step.label}
                </span>
                <span className="mt-0.5 block text-xs text-slate-600">{step.hint}</span>
                <span className="mt-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {phaseLabel[step.phase]}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
