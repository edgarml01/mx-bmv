'use client'
import { useState, useEffect, useCallback } from "react";
import { TrendingUp, TrendingDown, BarChart3, RefreshCw, Activity } from "lucide-react";
import { TopResponse, TopSubenBajan, TopVolumen, IndicesResponse, DivisasResponse, DivisaData, TasasResponse , CommodityData, CommoditiesResponse } from "./dashboard/_components/types";
import { MOCK_TOP, MOCK_INDICES, MOCK_TASAS, MOCK_DIVISAS, MOCK_COMMODITIES } from "./dashboard/_components/mock-data";
import { fmt, fmtVol, pctColor, pctBg, PctBadge, now, SectionLabel } from "./dashboard/_components/helpers";


// ── Ticker Tape ────────────────────────────────────────────────────────────
interface TickerTapeProps {
  top: TopResponse;
  indices: IndicesResponse;
}

function TickerTape({ top, indices }: TickerTapeProps) {
  const items = [
    ...(top?.SUBEN || []).slice(0, 4).map((d) => ({ label: d.e, value: `$${fmt(d.u)}`, pct: d.c })),
    ...(top?.BAJAN || []).slice(0, 4).map((d) => ({ label: d.e, value: `$${fmt(d.u)}`, pct: d.c })),
    ...Object.entries(indices || {}).slice(0, 4).map(([k, d]) => ({ label: k, value: fmt(d.u), pct: d.c })),
  ];

  return (
    <div className="border-b border-border bg-secondary/40 overflow-hidden relative h-8 flex items-center">
      <div className="flex gap-8 animate-[ticker_80s_linear_infinite] whitespace-nowrap px-4">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 font-mono text-[11px]">
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

// ── Termómetro ─────────────────────────────────────────────────────────────
type TopTab = "SUBEN" | "BAJAN" | "VOLUMEN";

interface TermometroProps {
  top: TopResponse;
}

function Termometro({ top }: TermometroProps) {
  const [tab, setTab] = useState<TopTab>("SUBEN");

  const tabs: { id: TopTab; label: string; icon: React.ReactNode; color: string }[] = [
    { id: "SUBEN",   label: "Alzas",   icon: <TrendingUp size={11} />,   color: "emerald" },
    { id: "BAJAN",   label: "Bajas",   icon: <TrendingDown size={11} />, color: "red"     },
    { id: "VOLUMEN", label: "Volumen", icon: <BarChart3 size={11} />,    color: "blue"    },
  ];

  const activeStyle: Record<string, string> = {
    emerald: "bg-emerald-400/10 text-emerald-400 border-b-2 border-emerald-400",
    red:     "bg-red-400/10 text-red-400 border-b-2 border-red-400",
    blue:    "bg-blue-400/10 text-blue-400 border-b-2 border-blue-400",
  };

  const rows = top?.[tab] || [];

  return (
    <div className="flex flex-col bg-card border border-border rounded-lg overflow-hidden h-full">
      <div className="grid grid-cols-3 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center justify-center gap-1 px-2 py-2.5 text-[10px] font-medium font-mono transition-colors
              ${tab === t.id ? activeStyle[t.color] : "text-muted-foreground hover:text-foreground hover:bg-accent/40"}`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-card z-10">
            <tr className="border-b border-border">
              <th className="text-left px-3 py-2 text-muted-foreground font-mono font-medium">#  Emisora</th>
              <th className="text-right px-3 py-2 text-muted-foreground font-mono font-medium">Precio</th>
              <th className="text-right px-3 py-2 text-muted-foreground font-mono font-medium">
                {tab === "VOLUMEN" ? "Importe" : "Var %"}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={`${row.e}-${i}`} className="border-b border-border/40 hover:bg-accent/30 transition-colors">
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground font-mono w-4 text-right shrink-0">{i + 1}</span>
                    <span className="font-mono font-semibold text-foreground">{row.e}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-right font-mono font-medium text-foreground tabular-nums">
                  ${fmt(row.u)}
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums">
                  {tab === "VOLUMEN"
                    ? <span className="font-mono text-blue-400">{fmtVol((row as TopVolumen).i)}</span>
                    : <PctBadge value={(row as TopSubenBajan).c} />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Indices ────────────────────────────────────────────────────────────────
interface IndicesGridProps {
  indices: IndicesResponse;
}

function IndicesGrid({ indices }: IndicesGridProps) {
  return (
    <div className="flex flex-col gap-3">
      <SectionLabel>Índices de Referencia</SectionLabel>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
        {Object.entries(indices || {}).map(([key, idx]) => (
          <div key={key} className="bg-card border border-border rounded-lg p-3 hover:bg-accent/20 transition-colors">
            <div className="flex items-start justify-between mb-1.5">
              <div className="min-w-0 mr-2">
                <div className="text-[10px] font-mono text-muted-foreground">{key}</div>
                <div className="text-xs font-medium text-foreground leading-tight mt-0.5 truncate">{idx.e}</div>
              </div>
              <PctBadge value={idx.c} />
            </div>
            <div className="font-mono font-bold text-base text-foreground tabular-nums">{fmt(idx.u)}</div>
            <div className="flex items-center justify-between mt-0.5">
              <span className={`text-[10px] font-mono ${pctColor(idx.m)}`}>
                {idx.m > 0 ? "+" : ""}{fmt(idx.m)}
              </span>
              <span className={`text-[10px] font-mono ${pctColor(idx.ytdp)}`}>
                YTD {idx.ytdp > 0 ? "+" : ""}{Math.abs(idx.ytdp).toFixed(2)}%
              </span>
            </div>
            {idx.x > 0 && (
              <div className="mt-1.5 grid grid-cols-2 gap-x-2 text-[10px] font-mono text-muted-foreground">
                <span>H: {fmt(idx.x)}</span>
                <span>L: {fmt(idx.n)}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tasas ─────────────────────────────────────────────────────────────────
const TASA_LABELS: Record<string, string> = {
  TIIE182:       "TIIE 182d",
  TIIEFB:        "TIIE Fondeo Bco.",
  TIIE28:        "TIIE 28d",
  TIIE91:        "TIIE 91d",
  CETE28:        "CETES 28d",
  "CETE 91":     "CETES 91d",
  CETE182:       "CETES 182d",
  CETE364:       "CETES 364d",
  Tasa_Objetivo: "Obj. Banxico",
};

interface TasasRowProps {
  tasas: TasasResponse;
}

function TasasRow({ tasas }: TasasRowProps) {
  return (
    <div className="flex flex-col gap-3">
      <SectionLabel>Tasas de Interés · Mercado de Dinero MX</SectionLabel>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-2">
        {Object.entries(tasas || {}).map(([key, d]) => (
          <div key={key} className="bg-card border border-border rounded-lg p-3 hover:bg-accent/20 transition-colors">
            <div className="text-[10px] font-mono text-muted-foreground mb-1 truncate">{TASA_LABELS[key] ?? key}</div>
            <div className="font-mono font-bold text-lg text-amber-400 tabular-nums">{fmt(d.t, 4)}%</div>
            <div className="text-[10px] font-mono text-muted-foreground mt-0.5">{d.f}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Divisas ────────────────────────────────────────────────────────────────
interface DivisasPanelProps {
  divisas: DivisasResponse;
}

function DivisasPanel({ divisas }: DivisasPanelProps) {
  const pairs = Object.entries(divisas || {}).filter(
    ([, v]) => typeof v === "object"
  ) as [string, DivisaData][];

  return (
    <div className="flex flex-col gap-3">
      <SectionLabel>Divisas · Tipos de Cambio</SectionLabel>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              <th className="text-left px-3 py-2 text-muted-foreground font-mono font-medium">Par</th>
              <th className="text-right px-3 py-2 text-muted-foreground font-mono font-medium">Último</th>
              <th className="text-right px-3 py-2 text-muted-foreground font-mono font-medium hidden sm:table-cell">Cambio</th>
              <th className="text-right px-3 py-2 text-muted-foreground font-mono font-medium">Var %</th>
            </tr>
          </thead>
          <tbody>
            {pairs.map(([key, d]) => (
              <tr key={key} className="border-b border-border/40 hover:bg-accent/30 transition-colors">
                <td className="px-3 py-2.5 font-mono font-semibold text-foreground">{key}</td>
                <td className="px-3 py-2.5 text-right font-mono font-medium text-foreground tabular-nums">
                  {fmt(d.u, 4)}
                </td>
                <td className={`px-3 py-2.5 text-right font-mono tabular-nums hidden sm:table-cell ${pctColor(d.m)}`}>
                  {d.m > 0 ? "+" : ""}{fmt(d.m, 4)}
                </td>
                <td className="px-3 py-2.5 text-right">
                  <PctBadge value={d.c} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Commodities ────────────────────────────────────────────────────────────
interface CommoditiesPanelProps {
  commodities: CommoditiesResponse;
}

function CommoditiesPanel({ commodities }: CommoditiesPanelProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const items = Object.entries(commodities || {}).filter(
    ([, v]) => typeof v === "object"
  ) as [string, CommodityData][];

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

  function label(key: string) {
    return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }

  // Reset page to 1 if commodities data updates
  useEffect(() => {
    setCurrentPage(1);
  }, [commodities]);

  return (
    <div className="flex flex-col gap-3">
      <SectionLabel>Materias Primas · Commodities</SectionLabel>
      <div className="bg-card border border-border rounded-lg overflow-hidden flex flex-col justify-between h-full">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="text-left px-3 py-2 text-muted-foreground font-mono font-medium">Producto</th>
                <th className="text-right px-3 py-2 text-muted-foreground font-mono font-medium">Precio</th>
                <th className="text-right px-3 py-2 text-muted-foreground font-mono font-medium hidden sm:table-cell">Unidad</th>
                <th className="text-right px-3 py-2 text-muted-foreground font-mono font-medium">Var %</th>
                <th className="text-right px-3 py-2 text-muted-foreground font-mono font-medium hidden md:table-cell">YTD</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map(([key, c]) => (
                <tr key={key} className="border-b border-border/40 hover:bg-accent/30 transition-colors">
                  <td className="px-3 py-2.5">
                    <div className="font-mono font-semibold text-foreground">{label(key)}</div>
                    <div className="text-[10px] text-muted-foreground">{c.t}</div>
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono font-semibold text-foreground tabular-nums">
                    {fmt(c.u, c.u < 10 ? 4 : 2)}
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-muted-foreground text-[10px] hidden sm:table-cell">
                    {c.x}
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <PctBadge value={c.p} />
                  </td>
                  <td className={`px-3 py-2.5 text-right font-mono text-[11px] hidden md:table-cell ${pctColor(c.ytd)}`}>
                    {c.ytd > 0 ? "+" : ""}{Math.abs(c.ytd).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sleek Pagination Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-secondary/20 border-t border-border text-xs mt-auto">
          <span className="text-muted-foreground font-mono text-[10px]">
            Mostrando {Math.min(startIndex + 1, totalItems)}-{Math.min(startIndex + itemsPerPage, totalItems)} de {totalItems}
          </span>
          <div className="flex items-center gap-2 font-mono">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded border border-border text-[10px] hover:bg-accent text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              Anterior
            </button>
            <span className="text-foreground font-semibold px-1 text-[10px]">
              {currentPage} / {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-2 py-1 rounded border border-border text-[10px] hover:bg-accent text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Market Status ──────────────────────────────────────────────────────────
function getMarketStatus() {
  const h = new Date().getHours(), m = new Date().getMinutes();
  const t = h * 60 + m;
  if (t >= 8 * 60 + 30 && t < 15 * 60) return "open";
  if (t >= 7 * 60 + 45 && t < 8 * 60 + 30) return "pre";
  return "closed";
}

// ── Root App ───────────────────────────────────────────────────────────────
export default function App() {
  const [time, setTime] = useState(now);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(now);
  const status = getMarketStatus();

  // State initialized with mock data to prevent initial empty rendering/layout shifts
  const [top, setTop] = useState<TopResponse>(MOCK_TOP);
  const [indices, setIndices] = useState<IndicesResponse>(MOCK_INDICES);
  const [tasas, setTasas] = useState<TasasResponse>(MOCK_TASAS);
  const [divisas, setDivisas] = useState<DivisasResponse>(MOCK_DIVISAS);
  const [commodities, setCommodities] = useState<CommoditiesResponse>(MOCK_COMMODITIES);

  const fetchAllData = useCallback(async () => {
    try {
      const [topRes, indicesRes, tasasRes, divisasRes, commoditiesRes] = await Promise.all([
        fetch("/api/databursatil/top").then((r) => r.json()),
        fetch("/api/databursatil/indices").then((r) => r.json()),
        fetch("/api/databursatil/tasas").then((r) => r.json()),
        fetch("/api/databursatil/divisas").then((r) => r.json()),
        fetch("/api/databursatil/commodities").then((r) => r.json()),
      ]);

      if (topRes) setTop(topRes);
      if (indicesRes) setIndices(indicesRes);
      if (tasasRes) setTasas(tasasRes);
      if (divisasRes) setDivisas(divisasRes);
      if (commoditiesRes) setCommodities(commoditiesRes);
      
      setLastUpdate(now());
    } catch (error) {
      console.error("Error fetching live data from internal endpoints:", error);
    }
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTime(now()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAllData();
    setRefreshing(false);
  }, [fetchAllData]);

  useEffect(() => {
    const t = setInterval(handleRefresh, 60_000);
    return () => clearInterval(t);
  }, [handleRefresh]);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>

      {/* Header */}
      <header className="border-b border-border bg-card/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-screen-2xl mx-auto px-4 h-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Activity size={15} className="text-primary" />
              <span className="font-mono font-bold text-sm text-foreground tracking-tight">BMV MONITOR</span>
            </div>
            <span className="hidden sm:block text-border select-none">│</span>
            <span className="hidden sm:block text-xs font-mono text-muted-foreground">DataBursatil · API v2</span>
          </div>

          <div className="flex items-center gap-2">
            <div className={`hidden sm:flex items-center gap-1.5 px-2 py-1 rounded font-mono text-[10px] font-semibold uppercase tracking-widest
              ${status === "open" ? "bg-emerald-400/10 text-emerald-400" : status === "pre" ? "bg-amber-400/10 text-amber-400" : "bg-slate-500/10 text-slate-500"}`}>
              <span className={`w-1.5 h-1.5 rounded-full inline-block ${status === "open" ? "bg-emerald-400 animate-pulse" : status === "pre" ? "bg-amber-400" : "bg-slate-500"}`} />
              {status === "open" ? "Abierto" : status === "pre" ? "Pre-mercado" : "Cerrado"}
            </div>

            <span className="hidden md:block font-mono text-[10px] text-muted-foreground tabular-nums">
              Act. {lastUpdate}
            </span>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">{time}</span>

            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-border text-[11px] font-mono text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <RefreshCw size={11} className={refreshing ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Actualizar</span>
            </button>
          </div>
        </div>
      </header>

      <TickerTape top={top} indices={indices} />

      <main className="max-w-screen-2xl mx-auto px-4 py-5 space-y-6">
        {/* Row 1: Termómetro + Indices */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5 items-start">
          <div className="flex flex-col gap-3">
            <SectionLabel>Termómetro del Día · /v2/top</SectionLabel>
            <div style={{ height: 440 }}>
              <Termometro top={top} />
            </div>
          </div>
          <IndicesGrid indices={indices} />
        </div>

        {/* Row 2: Tasas */}
        <TasasRow tasas={tasas} />

        {/* Row 3: Divisas + Commodities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <DivisasPanel divisas={divisas} />
          <CommoditiesPanel commodities={commodities} />
        </div>

        <footer className="border-t border-border pt-4 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-muted-foreground">
          <span>Fuente: DataBursatil API v2 · Datos con retraso de mercado</span>
          <span>BMV Monitor · {new Date().getFullYear()}</span>
        </footer>
      </main>
    </div>
  );
}
