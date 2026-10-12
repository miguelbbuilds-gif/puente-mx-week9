export const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export const numberFormat = new Intl.NumberFormat("es-MX");

const dateFormat = new Intl.DateTimeFormat("es-MX", { dateStyle: "long" });
const dateTimeFormat = new Intl.DateTimeFormat("es-MX", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function formatDate(iso: string | null): string {
  if (!iso) return "Sin fecha";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Sin fecha";
  return dateFormat.format(date);
}

export function formatDateTime(iso: string | null): string {
  if (!iso) return "Aún no guardado";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Aún no guardado";
  return dateTimeFormat.format(date);
}

export function minLength(value: string, min: number): boolean {
  return value.trim().length >= min;
}
