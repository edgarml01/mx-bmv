import { MOCK_DIVISAS } from "./mock-data";
import { fmt, pctColor, PctBadge } from "./helpers";
import { SectionLabel } from "./SectionLabel";

export function DivisasPanel() {
  return (
    <div className="flex flex-col gap-3">
      <SectionLabel>Divisas · Tipos de Cambio</SectionLabel>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              <th className="text-left px-3 py-2 text-muted-foreground font-mono font-medium">Par</th>
              <th className="text-right px-3 py-2 text-muted-foreground font-mono font-medium">Spot</th>
              <th className="text-right px-3 py-2 text-muted-foreground font-mono font-medium">Cambio</th>
              <th className="text-right px-3 py-2 text-muted-foreground font-mono font-medium">Var %</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_DIVISAS.map((d) => (
              <tr key={d.pair} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
                <td className="px-3 py-2.5">
                  <div className="font-mono font-semibold text-foreground">{d.pair}</div>
                  <div className="text-[10px] text-muted-foreground truncate max-w-[130px]">{d.name}</div>
                </td>
                <td className="px-3 py-2.5 text-right font-mono font-medium text-foreground tabular-nums">
                  {fmt(d.value, 4)}
                </td>
                <td className={`px-3 py-2.5 text-right font-mono tabular-nums ${pctColor(d.change)}`}>
                  {d.change > 0 ? "+" : ""}{fmt(d.change, 4)}
                </td>
                <td className="px-3 py-2.5 text-right">
                  <PctBadge value={d.changePct} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
