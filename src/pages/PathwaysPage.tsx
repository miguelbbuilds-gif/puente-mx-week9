import { pathways } from "../data/content";
import { useDemo } from "../context/DemoContext";
import { useDocumentTitle } from "../lib/title";
import { Alert, Badge, Card, PageIntro } from "../components/ui";

export function PathwaysPage() {
  useDocumentTitle("Siguientes peldaños");
  const { approved } = useDemo();

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6">
      <PageIntro
        eyebrow="Rutas ilustrativas"
        title="Un siguiente peldaño, no una vacante."
        lede="Estas ocupaciones se parecen a las señales del proyecto de ventas. No son ofertas, no hay empresas contratando y no prometen un empleo."
      />
      <Alert tone="warning" title="No inventamos demanda laboral">
        No consultamos bolsas de trabajo ni cifras de mercado. Si una ruta parece cercana, es por el tipo de tarea que acabas de hacer, no porque exista un puesto abierto.
      </Alert>
      <div className="grid gap-4 lg:grid-cols-3">
        {pathways.map((path) => (
          <Card key={path.id} className="flex flex-col">
            <Badge tone="amber">Ilustrativa · no es vacante</Badge>
            <h2 className="mt-3 font-serif text-2xl text-navy-950">{path.role}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{path.why}</p>
            <h3 className="mt-4 text-sm font-semibold text-navy-950">
              {approved ? "Señales ya observadas en el proyecto verificado" : "Señales de este proyecto, aún sin verificar"}
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {path.demonstrated.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
            <h3 className="mt-4 text-sm font-semibold text-navy-950">Todavía haría falta</h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {path.needed.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
            <p className="mt-4 rounded-2xl bg-mist p-3 text-sm leading-relaxed text-slate-700">
              <span className="font-semibold">Siguiente aprendizaje sugerido: </span>
              {path.nextAction}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
