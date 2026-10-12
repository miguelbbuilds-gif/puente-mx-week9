import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { illustrativeProgram } from "../data/content";
import { useDemo } from "../context/DemoContext";
import { isReviewCurrent } from "../lib/status";
import { useDocumentTitle } from "../lib/title";
import { Alert, Card, PageIntro } from "../components/ui";

export function AccountabilityPage() {
  useDocumentTitle("Responsabilidad");
  const { state } = useDemo();
  const packageReady = Boolean(state.projectSubmittedAt && state.traceSubmittedAt && state.defenseSubmittedAt);
  const reviewCurrent = isReviewCurrent(state);
  const session = [
    {
      label: "Proyectos creados",
      value: 1,
      note: "Solo existe el encargo ficticio de Norte Consultores dentro de esta demo.",
    },
    {
      label: "Proyectos completados",
      value: packageReady ? 1 : 0,
      note: "Completado significa que hay proyecto, traza y defensa simulada enviados.",
    },
    {
      label: "Revisiones vigentes",
      value: reviewCurrent ? 1 : 0,
      note: state.submittedReview && !reviewCurrent ? "Hay una revisión enviada, pero el paquete cambió después." : "Cuenta solo si la decisión sigue cubriendo el paquete actual.",
    },
    {
      label: "Consideraciones de entrevista",
      value: reviewCurrent && state.submittedReview?.considerInterview === true ? 1 : 0,
      note: "Una consideración no es una entrevista confirmada.",
    },
    {
      label: "Entrevistas confirmadas",
      value: 0,
      note: "Esta demo no puede confirmar entrevistas.",
    },
    {
      label: "Contrataciones confirmadas",
      value: 0,
      note: "Esta demo no puede registrar contrataciones.",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6">
      <PageIntro
        eyebrow="Rendición de cuentas"
        title="Lo que pasó aquí no es un resultado de programa."
        lede="Un empleador o un programa no debería presumir colocaciones que nadie verificó por fuera. Esta pantalla separa tu sesión de un ejemplo inventado."
      />
      <Alert tone="danger" title="Ninguna cifra de esta página es un resultado real">
        Las entrevistas y contrataciones confirmadas de la sesión están en cero a propósito. No hay forma de anotarlas como si hubieran ocurrido.
      </Alert>
      <section>
        <h2 className="font-serif text-3xl text-navy-950">Esta sesión de demostración</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {session.map((item) => (
            <article key={item.label} className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-navy-900/5">
              <p className="text-sm text-slate-600">{item.label}</p>
              <p className="mt-2 font-serif text-4xl text-navy-950">{item.value}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">{item.note}</p>
            </article>
          ))}
        </div>
      </section>
      <Card>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-800">Ejemplo ilustrativo · datos sintéticos</p>
        <h2 className="mt-2 font-serif text-3xl text-navy-950">Así se vería un tablero. Estos números están inventados.</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          24, 17, 15, 9, 3 y 1 no describen a PUENTE MX ni a ningún programa. Aunque un tablero real mostrara contrataciones, haría falta confirmación independiente del empleador. Publicarlas sin eso sería una afirmación vacía.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {illustrativeProgram.map((item) => (
            <li key={item.label} className="rounded-2xl bg-amber-50 px-4 py-3 ring-1 ring-amber-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-900">Inventado</p>
              <p className="mt-1 text-sm text-slate-700">{item.label}</p>
              <p className="font-serif text-3xl text-navy-950">{item.value}</p>
            </li>
          ))}
        </ul>
        <div className="relative mt-6 hidden min-w-0 overflow-hidden rounded-2xl bg-amber-50 p-3 ring-1 ring-amber-200 md:block">
          <p className="pointer-events-none absolute right-4 top-4 text-xs font-bold uppercase tracking-[0.14em] text-amber-800">
            No son resultados
          </p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={illustrativeProgram} layout="vertical" margin={{ left: 8, right: 16, top: 28, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3e2b3" />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="label" width={150} tick={{ fontSize: 11, fill: "#122033" }} />
                <Tooltip />
                <Bar dataKey="value" name="Ejemplo ficticio" fill="#0B1F3A" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
  );
}
