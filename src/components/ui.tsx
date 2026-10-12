import { CheckCircle2, Circle } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "light" | "outlineLight";

const variants: Record<Variant, string> = {
  primary: "bg-electric-600 text-white shadow-soft hover:bg-electric-700",
  secondary: "bg-white text-navy-900 ring-1 ring-navy-900/10 hover:bg-slate-50",
  ghost: "text-navy-800 hover:bg-navy-900/5",
  danger: "bg-white text-rose-800 ring-1 ring-rose-200 hover:bg-rose-50",
  light: "bg-white text-navy-950 shadow-soft hover:bg-blue-50",
  outlineLight: "bg-transparent text-white ring-1 ring-white/40 hover:bg-white/10",
};

const control =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-center text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-600 disabled:cursor-not-allowed disabled:opacity-50";

export function Button({
  variant = "primary",
  full = false,
  className = "",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; full?: boolean }) {
  return (
    <button type={type} className={`${control} ${variants[variant]} ${full ? "w-full" : ""} ${className}`} {...props} />
  );
}

export function ButtonLink({
  to,
  variant = "primary",
  full = false,
  className = "",
  children,
}: {
  to: string;
  variant?: Variant;
  full?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link to={to} className={`${control} ${variants[variant]} ${full ? "w-full" : ""} ${className}`}>
      {children}
    </Link>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-3xl bg-white p-5 shadow-card ring-1 ring-navy-900/5 sm:p-6 ${className}`}>
      {children}
    </section>
  );
}

type Tone = "navy" | "blue" | "amber" | "green" | "rose" | "slate";

const tones: Record<Tone, string> = {
  navy: "bg-navy-900 text-white",
  blue: "bg-electric-50 text-electric-700",
  amber: "bg-amber-50 text-amber-950",
  green: "bg-emerald-50 text-emerald-800",
  rose: "bg-rose-50 text-rose-800",
  slate: "bg-slate-100 text-slate-700",
};

export function Badge({ children, tone = "blue" }: { children: ReactNode; tone?: Tone }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

export function Alert({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "warning" | "success" | "danger";
  title?: string;
  children: ReactNode;
}) {
  const styles = {
    info: "border-electric-100 bg-electric-50 text-navy-900",
    warning: "border-amber-200 bg-amber-50 text-amber-950",
    success: "border-emerald-200 bg-emerald-50 text-emerald-950",
    danger: "border-rose-200 bg-rose-50 text-rose-950",
  };
  return (
    <div role="status" className={`rounded-2xl border px-4 py-3 text-sm leading-relaxed ${styles[tone]}`}>
      {title && <p className="font-semibold">{title}</p>}
      <div className={title ? "mt-1" : ""}>{children}</div>
    </div>
  );
}

export function PageIntro({ eyebrow, title, lede }: { eyebrow?: string; title: string; lede?: string }) {
  return (
    <header className="max-w-3xl">
      {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.16em] text-electric-700">{eyebrow}</p>}
      <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">{title}</h1>
      {lede && <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">{lede}</p>}
    </header>
  );
}

export function TextArea({
  id,
  label,
  hint,
  value,
  onChange,
  min,
  readOnly = false,
  error,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  readOnly?: boolean;
  error?: string;
} & Pick<TextareaHTMLAttributes<HTMLTextAreaElement>, "rows">) {
  const described = [hint ? `${id}-hint` : "", error ? `${id}-error` : "", min ? `${id}-count` : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-navy-950">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm leading-relaxed text-slate-600">
          {hint}
        </p>
      )}
      <textarea
        id={id}
        value={value}
        readOnly={readOnly}
        aria-invalid={error ? true : undefined}
        aria-describedby={described || undefined}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-32 w-full resize-y rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm leading-relaxed text-ink shadow-sm read-only:bg-slate-50 focus:border-electric-500"
      />
      {min !== undefined && (
        <p id={`${id}-count`} className="mt-1 text-xs text-slate-500">
          {value.trim().length} caracteres · mínimo {min}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-rose-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({
  id,
  label,
  value,
  onChange,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-navy-950">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-slate-600">
          {hint}
        </p>
      )}
      <input
        id={id}
        value={value}
        autoComplete="off"
        aria-describedby={hint ? `${id}-hint` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm shadow-sm focus:border-electric-500"
      />
    </div>
  );
}

export function CheckList({ items }: { items: { ok: boolean; label: string }[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.label} className="flex items-start gap-2 text-sm">
          {item.ok ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
          ) : (
            <Circle className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
          )}
          <span className={item.ok ? "text-slate-700" : "text-slate-600"}>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-700">{children}</div>;
}
