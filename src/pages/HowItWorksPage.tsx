import { ArrowRight } from "lucide-react";
import { safeguardItems } from "../data/content";
import { useDocumentTitle } from "../lib/title";
import { ButtonLink, PageIntro } from "../components/ui";

const perspectives = [
  {
    who: "Quien busca la primera prueba",
    body: "La persona necesita un trabajo breve, con pago declarado, que deje evidencia portable y le acerque a un primer empleo formal. El mecanismo es la microexperiencia, no un CV más largo.",
  },
  {
    who: "Quien diseña la prueba",
    body: "Una IA puede redactar un portafolio o resolver un examen sin supervisión. Por eso la evidencia incluye el trabajo, la traza de decisiones y la revisión de una persona.",
  },
  {
    who: "Quien exige un siguiente paso real",
    body: "Una constancia que no apunta a una ocupación posible no sirve. Mostramos peldaños ilustrativos y lo que faltaría, sin inventar vacantes ni prometer contratación.",
  },
  {
    who: "Quien no acepta cifras de colocación huecas",
    body: "No se declara éxito por entrevistas o contrataciones que nadie verificó. El tablero separa lo ocurrido en esta demo de un ejemplo claramente ficticio.",
  },
];

export function HowItWorksPage() {
  useDocumentTitle("Cómo funciona");
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
      <PageIntro
        eyebrow="Cómo funciona"
        title="Una microexperiencia produce la primera prueba."
        lede="El vacío que ataca PUENTE MX es la falta de una primera evidencia de trabajo confiable. La microexperiencia es el mecanismo: un encargo corto, acotado y revisado por una persona."
      />
      <ol className="grid gap-4 md:grid-cols-3">
        {[
          ["Eliges un rol de demostración", "Entras como participante o como supervisor simulado. No hay cuenta ni contraseña."],
          ["Haces el encargo y explicas", "Analizas ventas ficticias, guardas respuestas, dejas tu traza y respondes una defensa simulada."],
          ["Una persona decide", "El supervisor completa la rúbrica. Solo entonces existe la constancia, y aun así no acredita empleo."],
        ].map(([title, body], index) => (
          <li key={title} className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-navy-900/5">
            <p className="font-serif text-3xl text-electric-600">0{index + 1}</p>
            <h2 className="mt-2 text-lg font-semibold text-navy-950">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
          </li>
        ))}
      </ol>
      <section className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-navy-900/5">
        <h2 className="font-serif text-3xl text-navy-950">Cuatro miradas, un mismo producto</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {perspectives.map((item) => (
            <article key={item.who} className="rounded-2xl bg-mist p-4">
              <h3 className="font-semibold text-navy-950">{item.who}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section>
        <h2 className="font-serif text-3xl text-navy-950">Lo que esta demo no hace</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {safeguardItems.slice(0, 4).map((item) => (
            <li key={item.title} className="rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-slate-200">
              <span className="font-semibold text-navy-950">{item.title}. </span>
              <span className="text-slate-600">{item.body}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="/rol">
            Comenzar mi primera experiencia
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink to="/salvaguardas" variant="secondary">
            Ver todas las salvaguardas
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
