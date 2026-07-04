import { MOCK_INDICES } from "./mock-data";
import { fmt, pctColor, PctBadge } from "./helpers";
import { SectionLabel } from "./SectionLabel";

export function IndicesGrid() {
  return (
    <div className="flex flex-col gap-3">
      <SectionLabel>Índices de Referencia</SectionLabel>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {MOCK_INDICES.map((idx) => (
          <div
            key={idx.ticker}
            className="bg-card border border-border rounded-lg p-3 hover:border-border/80 hover:bg-accent/20 transition-all group"
          >
            <div className="flex items-start justify-between mb-1.5">
              <div>
                <div className="text-[10px] font-mono text-muted-foreground">{idx.region} · {idx.ticker}</div>
                <div className="text-xs font-medium text-foreground leading-tight mt-0.5 truncate max-w-[90px]">{idx.name}</div>
              </div>
              <PctBadge value={idx.changePct} />
            </div>
            <div className="font-mono font-bold text-base text-foreground tabular-nums">
              {fmt(idx.value)}
            </div>
            <div className={`text-xs font-mono mt-0.5 ${pctColor(idx.change)}`}>
              {idx.change > 0 ? "+" : ""}{fmt(idx.change)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
