import { useMemo, useState, type ReactNode } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { datasetNotes, productSummaries, regionSummaries, salesRows, type SaleRow } from "../data/sales";
import { currency, numberFormat } from "../lib/format";

type SortKey = "revenue" | "returnRate" | "margin" | "units";

const shortName: Record<string, string> = {
  "Kit Oficina Pro": "Kit Oficina",
  "Silla Ergo": "Silla Ergo",
  "Lámpara LED": "Lámpara",
  "Organizador Modular": "Organizador",
};

function compactMoney(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)} M`;
  if (value >= 1000) return `$${Math.round(value / 1000)} mil`;
  return currency.format(value);
}

export function DatasetPanel() {
  const [sortKey, setSortKey] = useState<SortKey>("revenue");
  const rows = useMemo(() => {
    const copy = [...salesRows];
    copy.sort((a, b) => compareRows(a, b, sortKey));
    return copy;
  }, [sortKey]);

  const revenueData = productSummaries.map((item) => ({
    ...item,
    short: shortName[item.product] ?? item.product,
  }));

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Ingreso por producto" note="Suma ilustrativa del trimestre.">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueData} layout="vertical" margin={{ left: 8, right: 12, top: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" tickFormatter={(value) => compactMoney(Number(value))} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="short" width={92} tick={{ fontSize: 11, fill: "#122033" }} />
              <Tooltip formatter={(value) => [currency.format(Number(value)), "Ingreso"]} />
              <Bar dataKey="revenue" fill="#1E5AF0" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Tasa de devolución" note="Devoluciones entre unidades, en porcentaje.">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueData} layout="vertical" margin={{ left: 8, right: 12, top: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" unit="%" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="short" width={92} tick={{ fontSize: 11, fill: "#122033" }} />
              <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, "Devolución"]} />
              <Bar dataKey="returnRate" fill="#0B1F3A" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {regionSummaries.map((region) => (
          <article key={region.region} className="rounded-2xl bg-mist px-4 py-3">
            <h3 className="text-sm font-semibold text-navy-950">{region.region}</h3>
            <p className="mt-2 text-lg font-semibold text-navy-900">{currency.format(region.revenue)}</p>
            <p className="text-xs text-slate-600">
              {numberFormat.format(region.units)} unidades · {region.returnRate}% devolución
            </p>
          </article>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-navy-950">Tabla de ventas</h3>
          <p className="text-sm text-slate-600">16 filas ficticias. En pantallas angostas la tabla se desplaza dentro de su recuadro.</p>
        </div>
        <div>
          <label htmlFor="orden-datos" className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Ordenar filas
          </label>
          <select
            id="orden-datos"
            value={sortKey}
            onChange={(event) => setSortKey(event.target.value as SortKey)}
            className="mt-1 min-h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm"
          >
            <option value="revenue">Mayor ingreso</option>
            <option value="returnRate">Mayor devolución</option>
            <option value="margin">Mayor margen</option>
            <option value="units">Más unidades</option>
          </select>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto rounded-2xl ring-1 ring-slate-200">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <caption className="sr-only">Ventas ficticias de Norte Consultores por producto y región</caption>
          <thead className="bg-navy-900 text-white">
            <tr>
              <th scope="col" className="px-3 py-3 font-semibold">Producto</th>
              <th scope="col" className="px-3 py-3 font-semibold">Región</th>
              <th scope="col" className="px-3 py-3 font-semibold">Unidades</th>
              <th scope="col" className="px-3 py-3 font-semibold">Ingreso</th>
              <th scope="col" className="px-3 py-3 font-semibold">Devoluciones</th>
              <th scope="col" className="px-3 py-3 font-semibold">Margen</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="odd:bg-white even:bg-slate-50">
                <th scope="row" className="px-3 py-2.5 font-medium text-navy-950">{row.product}</th>
                <td className="px-3 py-2.5">{row.region}</td>
                <td className="px-3 py-2.5">{numberFormat.format(row.units)}</td>
                <td className="px-3 py-2.5">{currency.format(row.revenue)}</td>
                <td className="px-3 py-2.5">{row.returns}</td>
                <td className="px-3 py-2.5">{row.margin}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl bg-slate-50 p-4">
        <h3 className="text-sm font-semibold text-navy-950">Resumen calculado para leer, no para copiar</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <caption className="sr-only">Totales ilustrativos por producto</caption>
            <thead>
              <tr className="text-slate-500">
                <th scope="col" className="py-2 pr-3 font-semibold">Producto</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Unidades</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Ingreso</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Devolución</th>
                <th scope="col" className="py-2 font-semibold">Margen ponderado</th>
              </tr>
            </thead>
            <tbody>
              {productSummaries.map((item) => (
                <tr key={item.product} className="border-t border-slate-200">
                  <th scope="row" className="py-2 pr-3 font-medium text-navy-950">{item.product}</th>
                  <td className="py-2 pr-3">{numberFormat.format(item.units)}</td>
                  <td className="py-2 pr-3">{currency.format(item.revenue)}</td>
                  <td className="py-2 pr-3">{item.returnRate}%</td>
                  <td className="py-2">{item.margin}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-3 space-y-1 text-xs leading-relaxed text-slate-600">
          {datasetNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ChartCard({ title, note, children }: { title: string; note: string; children: ReactNode }) {
  return (
    <article className="min-w-0 rounded-2xl bg-mist p-4">
      <h3 className="text-sm font-semibold text-navy-950">{title}</h3>
      <p className="mb-2 text-xs text-slate-600">{note}</p>
      {children}
    </article>
  );
}

function compareRows(a: SaleRow, b: SaleRow, key: SortKey): number {
  if (key === "returnRate") {
    return b.returns / b.units - a.returns / a.units;
  }
  return b[key] - a[key];
}
