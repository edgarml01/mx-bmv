import { MOCK_COMMODITIES } from "./mock-data";
import { fmt, PctBadge } from "./helpers";
import { SectionLabel } from "./SectionLabel";

export function CommoditiesPanel() {
  return (
    <div className="flex flex-col gap-3">
      <SectionLabel>Materias Primas · Commodities</SectionLabel>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              <th className="text-left px-3 py-2 text-muted-foreground font-mono font-medium">Producto</th>
              <th className="text-right px-3 py-2 text-muted-foreground font-mono font-medium">Precio</th>
              <th className="text-right px-3 py-2 text-muted-foreground font-mono font-medium">Unidad</th>
              <th className="text-right px-3 py-2 text-muted-foreground font-mono font-medium">Var %</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_COMMODITIES.map((c) => (
              <tr key={c.ticker} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
                <td className="px-3 py-2.5">
                  <div className="font-mono font-semibold text-foreground">{c.name}</div>
                  <div className="text-[10px] text-muted-foreground font-mono">{c.ticker}</div>
                </td>
                <td className="px-3 py-2.5 text-right font-mono font-semibold text-foreground tabular-nums">
                  ${fmt(c.price, c.price < 10 ? 4 : 2)}
                </td>
                <td className="px-3 py-2.5 text-right font-mono text-muted-foreground text-[10px]">
                  {c.unit}
                </td>
                <td className="px-3 py-2.5 text-right">
                  <PctBadge value={c.changePct} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
