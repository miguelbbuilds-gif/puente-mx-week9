import { useDocumentTitle } from "../lib/title";
import { ButtonLink, PageIntro } from "../components/ui";

export function NotFoundPage() {
  useDocumentTitle("Página no encontrada");
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-16 sm:px-6">
      <PageIntro title="Esta página no existe" lede="El enlace no corresponde a una pantalla de PUENTE MX." />
      <ButtonLink to="/">Volver al inicio</ButtonLink>
    </div>
  );
}
