// ── Helpers ────────────────────────────────────────────────────────────────

export function fmt(n: number, decimals = 2) {
  return n.toLocaleString("es-MX", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function fmtVol(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

export function pctColor(v: number) {
  if (v > 0) return "text-emerald-400";
  if (v < 0) return "text-red-400";
  return "text-slate-400";
}

export function pctBg(v: number) {
  if (v > 0) return "bg-emerald-400/10 text-emerald-400";
  if (v < 0) return "bg-red-400/10 text-red-400";
  return "bg-slate-400/10 text-slate-400";
}


export function PctBadge({ value }: { value: number }) {
  return (
    <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-mono font-semibold ${pctBg(value)}`}>
      {value > 0 ? "▲" : value < 0 ? "▼" : "●"} {Math.abs(value).toFixed(2)}%
    </span>
  );
}

export function now() {
  return new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-1 h-3 rounded-full bg-primary inline-block shrink-0" />
      <span className="text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-widest">{children}</span>
    </div>
  );
}