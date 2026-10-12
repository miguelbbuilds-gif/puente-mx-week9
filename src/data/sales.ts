export interface SaleRow {
  id: string;
  product: string;
  region: string;
  units: number;
  revenue: number;
  returns: number;
  margin: number;
}

export const salesRows: SaleRow[] = [
  { id: "kop-n", product: "Kit Oficina Pro", region: "Norte", units: 420, revenue: 336000, returns: 12, margin: 28 },
  { id: "kop-c", product: "Kit Oficina Pro", region: "Centro", units: 510, revenue: 408000, returns: 18, margin: 27 },
  { id: "kop-b", product: "Kit Oficina Pro", region: "Bajío", units: 190, revenue: 152000, returns: 22, margin: 24 },
  { id: "kop-s", product: "Kit Oficina Pro", region: "Sur", units: 160, revenue: 128000, returns: 9, margin: 26 },
  { id: "se-n", product: "Silla Ergo", region: "Norte", units: 280, revenue: 252000, returns: 8, margin: 32 },
  { id: "se-c", product: "Silla Ergo", region: "Centro", units: 340, revenue: 306000, returns: 11, margin: 31 },
  { id: "se-b", product: "Silla Ergo", region: "Bajío", units: 210, revenue: 189000, returns: 7, margin: 33 },
  { id: "se-s", product: "Silla Ergo", region: "Sur", units: 150, revenue: 135000, returns: 6, margin: 30 },
  { id: "led-n", product: "Lámpara LED", region: "Norte", units: 190, revenue: 57000, returns: 15, margin: 18 },
  { id: "led-c", product: "Lámpara LED", region: "Centro", units: 220, revenue: 66000, returns: 28, margin: 16 },
  { id: "led-b", product: "Lámpara LED", region: "Bajío", units: 140, revenue: 42000, returns: 19, margin: 15 },
  { id: "led-s", product: "Lámpara LED", region: "Sur", units: 95, revenue: 28500, returns: 8, margin: 17 },
  { id: "om-n", product: "Organizador Modular", region: "Norte", units: 310, revenue: 124000, returns: 6, margin: 35 },
  { id: "om-c", product: "Organizador Modular", region: "Centro", units: 260, revenue: 104000, returns: 5, margin: 34 },
  { id: "om-b", product: "Organizador Modular", region: "Bajío", units: 180, revenue: 72000, returns: 4, margin: 36 },
  { id: "om-s", product: "Organizador Modular", region: "Sur", units: 120, revenue: 48000, returns: 3, margin: 33 },
];

export interface ProductSummary {
  product: string;
  units: number;
  revenue: number;
  returns: number;
  returnRate: number;
  margin: number;
}

export interface RegionSummary {
  region: string;
  units: number;
  revenue: number;
  returns: number;
  returnRate: number;
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

export function summarizeByProduct(rows: SaleRow[]): ProductSummary[] {
  const map = new Map<string, ProductSummary & { marginWeight: number }>();
  for (const row of rows) {
    const current = map.get(row.product) ?? {
      product: row.product,
      units: 0,
      revenue: 0,
      returns: 0,
      returnRate: 0,
      margin: 0,
      marginWeight: 0,
    };
    current.units += row.units;
    current.revenue += row.revenue;
    current.returns += row.returns;
    current.marginWeight += row.revenue * row.margin;
    map.set(row.product, current);
  }
  return [...map.values()].map((item) => ({
    product: item.product,
    units: item.units,
    revenue: item.revenue,
    returns: item.returns,
    returnRate: round1((item.returns / item.units) * 100),
    margin: round1(item.marginWeight / item.revenue),
  }));
}

export function summarizeByRegion(rows: SaleRow[]): RegionSummary[] {
  const map = new Map<string, RegionSummary>();
  for (const row of rows) {
    const current = map.get(row.region) ?? {
      region: row.region,
      units: 0,
      revenue: 0,
      returns: 0,
      returnRate: 0,
    };
    current.units += row.units;
    current.revenue += row.revenue;
    current.returns += row.returns;
    map.set(row.region, current);
  }
  return [...map.values()].map((item) => ({
    ...item,
    returnRate: round1((item.returns / item.units) * 100),
  }));
}

export const productSummaries = summarizeByProduct(salesRows);
export const regionSummaries = summarizeByRegion(salesRows);

export const datasetNotes = [
  "Periodo ilustrativo: primer trimestre. Las cifras no provienen de una empresa real.",
  "Tasa de devolución = devoluciones ÷ unidades.",
  "El margen del resumen es un promedio ponderado por ingreso.",
  "Un producto puede liderar en ventas y otro en rentabilidad. La recomendación es tuya.",
];
