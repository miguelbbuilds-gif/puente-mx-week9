import { useEffect } from "react";

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title === "Inicio" ? "PUENTE MX — Work That Counts" : `${title} · PUENTE MX`;
  }, [title]);
}
