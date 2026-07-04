import { MOCK_TASAS } from "./mock-data";
import { fmt, pctColor } from "./helpers";
import { SectionLabel } from "./SectionLabel";

export function TasasRow() {
  return (
    <div className="flex flex-col gap-3">
      <SectionLabel>Tasas de Interés · Mercado de Dinero MX</SectionLabel>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {MOCK_TASAS.map((t) => {
          const diff = t.rate - t.prev;
          return (
            <div key={t.name} className="bg-card border border-border rounded-lg p-3 hover:bg-accent/20 transition-colors">
              <div className="text-[10px] font-mono text-muted-foreground mb-1">{t.plazo}</div>
              <div className="text-xs font-medium text-foreground mb-2 truncate">{t.name}</div>
              <div className="font-mono font-bold text-lg text-amber-400 tabular-nums">{fmt(t.rate, 2)}%</div>
              <div className={`text-[10px] font-mono mt-0.5 ${pctColor(diff)}`}>
                {diff > 0 ? "▲" : diff < 0 ? "▼" : "●"} ant. {fmt(t.prev, 2)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
