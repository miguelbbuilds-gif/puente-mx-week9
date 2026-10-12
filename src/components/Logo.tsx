export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-9 w-9 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill={light ? "#123056" : "#0B1F3A"} />
        <path d="M7 21.5V14.5M25 21.5V14.5" stroke="#9DBBFF" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M7 14.5c3.2-5.2 14.8-5.2 18 0" stroke="#2F6BFF" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M5 21.5h22" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="leading-none">
        <span className={`block font-serif text-lg font-semibold tracking-tight ${light ? "text-white" : "text-navy-950"}`}>
          PUENTE MX
        </span>
        <span className={`mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] ${light ? "text-blue-100" : "text-slate-500"}`}>
          Work That Counts
        </span>
      </span>
    </span>
  );
}
