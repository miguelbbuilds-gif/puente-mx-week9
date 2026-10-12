import { useDemo } from "../context/DemoContext";
import { Alert } from "./ui";

export function RevisionBanner() {
  const { state, status } = useDemo();
  if (status !== "revision_requested" || !state.submittedReview) return null;
  return (
    <Alert tone="warning" title="El supervisor pidió cambios">
      <p className="whitespace-pre-wrap break-words">{state.submittedReview.feedback}</p>
      <p className="mt-2">
        Ajusta el paquete y vuelve a enviarlo. Hasta entonces, la decisión anterior no cuenta como verificación.
      </p>
    </Alert>
  );
}
