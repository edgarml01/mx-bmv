export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-1 h-3 rounded-full bg-primary inline-block" />
      <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-widest">{children}</span>
    </div>
  );
}

export function getMarketStatus() {
  const h = new Date().getHours();
  const m = new Date().getMinutes();
  const mins = h * 60 + m;
  if (mins >= 8 * 60 + 30 && mins < 15 * 60) return "open";
  if (mins >= 7 * 60 + 45 && mins < 8 * 60 + 30) return "pre";
  return "closed";
}
