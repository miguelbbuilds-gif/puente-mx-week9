import { ShieldCheck } from "lucide-react";
import { safeguardItems } from "../data/content";
import { useDocumentTitle } from "../lib/title";
import { ButtonLink, PageIntro } from "../components/ui";

export function SafeguardsPage() {
  useDocumentTitle("Salvaguardas");
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6">
      <PageIntro
        eyebrow="Salvaguardas"
        title="Límites visibles, no letra pequeña."
        lede="PUENTE MX deja claro qué es una demostración y qué no puede afirmar. Ninguna pantalla convierte datos ficticios en un empleo, un pago o una certificación."
      />
      <ul className="grid gap-4 md:grid-cols-2">
        {safeguardItems.map((item) => (
          <li key={item.title} className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-navy-900/5">
            <ShieldCheck className="h-5 w-5 text-electric-600" aria-hidden="true" />
            <h2 className="mt-3 text-lg font-semibold text-navy-950">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
          </li>
        ))}
      </ul>
      <ButtonLink to="/rol">Entrar a la demostración</ButtonLink>
    </div>
  );
}
