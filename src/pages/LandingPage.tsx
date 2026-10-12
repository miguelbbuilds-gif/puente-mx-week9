import { ArrowRight, Building2, Clock, HandCoins, ShieldCheck, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { PROJECT } from "../data/project";
import { currency } from "../lib/format";
import { useDocumentTitle } from "../lib/title";
import { ButtonLink } from "../components/ui";

const steps = [
  {
    number: "01",
    title: "Acepta un encargo acotado",
    body: "Antes de empezar ves la compensación, el plazo y lo que sí entra en el proyecto. En esta demo el pago es ilustrativo.",
  },
  {
    number: "02",
    title: "Entrega el trabajo y tu razonamiento",
    body: "Analizas datos, escribes una recomendación, dejas traza de tus decisiones y declaras si usaste IA.",
  },
  {
    number: "03",
    title: "Una persona verifica",
    body: "El rol supervisor evalúa con una rúbrica. Completar las pantallas no te aprueba. Hace falta una decisión humana.",
  },
];

const youth = [
  { title: "Una primera prueba concreta", body: "No es un currículum vacío. Es un encargo con datos, una recomendación y el camino que seguiste." },
  { title: "Evidencia que puedes mostrar", body: "Si la revisión humana la aprueba, obtienes una constancia portable. Tú decides si permanece visible." },
  { title: "Un siguiente peldaño, sin promesa", body: "Ves oficios afines y qué te faltaría. Son rutas ilustrativas, no vacantes." },
];

const companies = [
  { title: "Trabajo, no solo un CV", body: "Lees cómo la persona interpretó un problema de negocio y qué evidencia usó." },
  { title: "Criterio humano", body: "La rúbrica la completa una persona. Ningún modelo cierra la verificación." },
  { title: "Sin colocar de mentira", body: "Una consideración de entrevista se registra como eso. No se convierte en una contratación." },
];

export function LandingPage() {
  useDocumentTitle("Inicio");

  return (
    <div>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="absolute inset-0 grid-fade" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">Primera prueba de trabajo</p>
            <h1 className="mt-4 max-w-xl font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Tu talento merece una primera oportunidad.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-blue-100 sm:text-lg">
              Completa una microexperiencia pagada —en esta demo, con compensación ilustrativa—, explica las decisiones que tomaste y recibe una constancia solo si una persona revisa tu trabajo. Puedes compartir esa evidencia. No es una oferta de empleo.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/rol" variant="light">
                Comenzar mi primera experiencia
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink to="/como-funciona" variant="outlineLight">
                Explorar cómo funciona
              </ButtonLink>
            </div>
            <dl className="mt-8 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-2xl bg-white/5 px-3 py-3 ring-1 ring-white/10">
                <dt className="text-blue-200">Duración</dt>
                <dd className="mt-1 font-semibold">{PROJECT.duration} ilustrativos</dd>
              </div>
              <div className="rounded-2xl bg-white/5 px-3 py-3 ring-1 ring-white/10">
                <dt className="text-blue-200">Compensación</dt>
                <dd className="mt-1 font-semibold">{currency.format(PROJECT.compensation)} sin pago real</dd>
              </div>
              <div className="rounded-2xl bg-white/5 px-3 py-3 ring-1 ring-white/10">
                <dt className="text-blue-200">Verificación</dt>
                <dd className="mt-1 font-semibold">Humana, no automática</dd>
              </div>
            </dl>
          </div>
          <PreviewCard />
        </div>
      </section>

      <section id="problema" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-electric-700">El problema</p>
            <h2 className="mt-2 font-serif text-3xl text-navy-950 sm:text-4xl">Hay habilidad. Falta una primera prueba que una empresa pueda leer.</h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-slate-600">
            <p>
              Muchas personas jóvenes, y otras que cambiaron de oficio, saben resolver problemas. Lo que no tienen es evidencia formal que un empleador reconozca. Un currículum sin experiencia no muestra cómo piensas.
            </p>
            <p>
              Un certificado generado por IA tampoco resuelve eso: puede armar un portafolio sin que haya existido el trabajo, la decisión ni una persona que lo haya visto. PUENTE MX no es un constructor de CV, no es una bolsa de trabajo y no certifica habilidades en automático.
            </p>
          </div>
        </div>
      </section>

      <section id="proceso" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-electric-700">Tres pasos</p>
          <h2 className="mt-2 max-w-2xl font-serif text-3xl text-navy-950 sm:text-4xl">Del encargo a una evidencia que se puede mostrar.</h2>
          <ol className="mt-8 grid gap-4 lg:grid-cols-3">
            {steps.map((step) => (
              <li key={step.number} className="rounded-3xl bg-mist p-6">
                <p className="font-serif text-3xl text-electric-600">{step.number}</p>
                <h3 className="mt-3 text-lg font-semibold text-navy-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="personas" className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <BenefitColumn icon={<UserRound className="h-5 w-5" aria-hidden="true" />} kicker="Para quien empieza" title="Tu trabajo cuenta antes del primer contrato." items={youth} />
        <BenefitColumn icon={<Building2 className="h-5 w-5" aria-hidden="true" />} kicker="Para una empresa" title="Ves criterio, no una credencial suelta." items={companies} />
      </section>

      <section id="confianza" className="bg-navy-900 py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200">Confianza</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl">La verificación no sale sola de la pantalla.</h2>
            <p className="mt-4 text-sm leading-relaxed text-blue-100">
              El empleo no está garantizado. La constancia no acredita un puesto, un pago real ni una identidad. Si un programa reportara contrataciones, esas cifras tendrían que confirmarse por fuera de esta aplicación.
            </p>
            <div className="mt-6">
              <ButtonLink to="/salvaguardas" variant="secondary">
                Leer salvaguardas
              </ButtonLink>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              ["Revisión humana", "Sin una rúbrica completa y una decisión explícita, no hay constancia."],
              ["IA declarada", "Puedes usarla. Decirlo forma parte de la evidencia y no te descalifica."],
              ["Alcance cerrado", "Cinco días ilustrativos, un dataset y cuatro respuestas. Nada de trabajo extra."],
              ["Datos sintéticos", "Norte Consultores, el monto y las personas de la demo son ficticios."],
            ].map(([title, body]) => (
              <li key={title} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <ShieldCheck className="h-5 w-5 text-electric-400" aria-hidden="true" />
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-blue-100">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-[2rem] bg-white px-6 py-10 shadow-card ring-1 ring-navy-900/5 sm:px-10">
          <p className="font-serif text-3xl text-navy-950 sm:text-4xl">Tu trabajo debe contar, incluso antes de tu primer empleo formal.</p>
          <p className="mt-3 max-w-2xl text-slate-600">Entra a la demostración como participante o como supervisor. No hay registro ni cuenta real.</p>
          <div className="mt-6">
            <ButtonLink to="/rol">
              Comenzar mi primera experiencia
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}

function PreviewCard() {
  return (
    <aside className="rounded-[1.75rem] bg-paper p-5 text-ink shadow-card sm:p-6" aria-label="Vista ilustrativa de una constancia">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Vista ilustrativa · no es tu constancia</p>
      <p className="mt-4 font-serif text-2xl text-navy-950">Análisis de ventas y recomendaciones</p>
      <p className="mt-1 text-sm text-slate-600">{PROJECT.company} · empresa ficticia</p>
      <div className="mt-5 space-y-3 text-sm">
        <Row icon={<Clock className="h-4 w-4" />} label="Plazo" value="5 días ilustrativos" />
        <Row icon={<HandCoins className="h-4 w-4" />} label="Compensación" value="MXN $1,500 · no se paga" />
        <Row icon={<ShieldCheck className="h-4 w-4" />} label="Estado" value="Pendiente de revisión humana" />
      </div>
      <p className="mt-5 rounded-2xl bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-950">
        Constancia de demostración — No acredita empleo real.
      </p>
      <Link to="/como-funciona" className="mt-4 inline-flex text-sm font-semibold text-electric-700">
        Ver el recorrido completo
      </Link>
    </aside>
  );
}

function Row({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2 ring-1 ring-navy-900/5">
      <span className="text-electric-700" aria-hidden="true">{icon}</span>
      <span>
        <span className="block text-xs text-slate-500">{label}</span>
        <span className="font-semibold text-navy-950">{value}</span>
      </span>
    </div>
  );
}

function BenefitColumn({
  icon,
  kicker,
  title,
  items,
}: {
  icon: ReactNode;
  kicker: string;
  title: string;
  items: { title: string; body: string }[];
}) {
  return (
    <article className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-navy-900/5">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-electric-50 text-electric-700">{icon}</span>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-electric-700">{kicker}</p>
      <h2 className="mt-2 font-serif text-3xl text-navy-950">{title}</h2>
      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li key={item.title}>
            <h3 className="font-semibold text-navy-950">{item.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.body}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
