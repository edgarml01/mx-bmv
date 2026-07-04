'use client'
import { useState } from "react";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { MOCK_GAINERS, MOCK_LOSERS, MOCK_VOLUME } from "./mock-data";
import { fmt, fmtVol, PctBadge } from "./helpers";

type TopTab = "gainers" | "losers" | "volume";

export function Termometro() {
  const [tab, setTab] = useState<TopTab>("gainers");

  const data = tab === "gainers" ? MOCK_GAINERS : tab === "losers" ? MOCK_LOSERS : MOCK_VOLUME;

  const tabs: { id: TopTab; label: string; icon: React.ReactNode }[] = [
    { id: "gainers", label: "Alzas", icon: <TrendingUp size={12} /> },
    { id: "losers", label: "Bajas", icon: <TrendingDown size={12} /> },
    { id: "volume", label: "Volumen", icon: <BarChart3 size={12} /> },
  ];

  return (
    <div className="flex flex-col bg-card border border-border rounded-lg overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium font-mono transition-colors
              ${tab === t.id
                ? t.id === "gainers"
                  ? "bg-emerald-400/10 text-emerald-400 border-b-2 border-emerald-400"
                  : t.id === "losers"
                  ? "bg-red-400/10 text-red-400 border-b-2 border-red-400"
                  : "bg-blue-400/10 text-blue-400 border-b-2 border-blue-400"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-3 py-2 text-muted-foreground font-mono font-medium">Emisora</th>
              <th className="text-right px-3 py-2 text-muted-foreground font-mono font-medium">Precio</th>
              <th className="text-right px-3 py-2 text-muted-foreground font-mono font-medium">
                {tab === "volume" ? "Volumen" : "Var %"}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={row.ticker}
                className="border-b border-border/50 hover:bg-accent/30 transition-colors group"
              >
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground font-mono w-4 text-right">{i + 1}</span>
                    <div>
                      <div className="font-mono font-semibold text-foreground leading-none">{row.ticker}</div>
                      <div className="text-muted-foreground text-[10px] leading-none mt-0.5 truncate max-w-[110px]">{row.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-right font-mono font-medium text-foreground">
                  ${fmt(row.price)}
                </td>
                <td className="px-3 py-2.5 text-right">
                  {tab === "volume" ? (
                    <span className="font-mono text-blue-400">{fmtVol(row.volume)}</span>
                  ) : (
                    <PctBadge value={row.changePct} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
