import { MOCK_GAINERS, MOCK_LOSERS, MOCK_INDICES } from "./mock-data";
import { fmt, pctColor } from "./helpers";
import type { TopEntry, IndexEntry } from "./types";

export function TickerTape() {
  const items = [...MOCK_GAINERS.slice(0, 4), ...MOCK_LOSERS.slice(0, 4), ...MOCK_INDICES.slice(0, 4)].map((d) => ({
    label: "ticker" in d ? (d as TopEntry).ticker : (d as IndexEntry).ticker,
    value: "price" in d ? fmt((d as TopEntry).price) : fmt((d as IndexEntry).value),
    pct: "changePct" in d ? (d as TopEntry | IndexEntry).changePct : 0,
  }));

  return (
    <div className="border-b border-border bg-secondary/40 overflow-hidden relative h-8 flex items-center">
      <div className="flex gap-8 animate-[ticker_60s_linear_infinite] whitespace-nowrap px-4">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 font-mono text-xs">
            <span className="text-muted-foreground font-medium">{item.label}</span>
            <span className="text-foreground">{item.value}</span>
            <span className={pctColor(item.pct)}>{item.pct > 0 ? "+" : ""}{item.pct.toFixed(2)}%</span>
            <span className="text-border select-none">│</span>
          </span>
        ))}
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#07080d] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#07080d] to-transparent pointer-events-none" />
    </div>
  );
}
