'use client'
import { useState, useEffect, useCallback } from "react";
import { Activity, RefreshCw, Wifi } from "lucide-react";
import { TickerTape } from "./_components/TickerTape";
import { Termometro } from "./_components/Termometro";
import { IndicesGrid } from "./_components/IndicesGrid";
import { TasasRow } from "./_components/TasasRow";
import { DivisasPanel } from "./_components/DivisasPanel";
import { CommoditiesPanel } from "./_components/CommoditiesPanel";
import { SectionLabel, getMarketStatus } from "./_components/SectionLabel";
import { now } from "./_components/helpers";

export default function App() {
  const [time, setTime] = useState(now());
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(now());
  const status = getMarketStatus();

  useEffect(() => {
    const t = setInterval(() => setTime(now()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastUpdate(now());
    }, 1200);
  }, []);

  useEffect(() => {
    const t = setInterval(handleRefresh, 60000);
    return () => clearInterval(t);
  }, [handleRefresh]);

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Global ticker-tape animation ── */}
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>

      {/* ── Header ── */}
      <header className="border-b border-border bg-card/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-screen-2xl mx-auto px-4 h-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Activity size={16} className="text-primary" />
              <span className="font-mono font-bold text-sm text-foreground tracking-tight">BMV MONITOR</span>
            </div>
            <span className="hidden sm:block text-border select-none">│</span>
            <span className="hidden sm:block text-xs font-mono text-muted-foreground">Bolsa Mexicana de Valores</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Market status */}
            <div className={`hidden sm:flex items-center gap-1.5 px-2 py-1 rounded font-mono text-[10px] font-semibold uppercase tracking-widest
              ${status === "open" ? "bg-emerald-400/10 text-emerald-400" : status === "pre" ? "bg-amber-400/10 text-amber-400" : "bg-slate-400/10 text-slate-500"}`}>
              <span className={`w-1.5 h-1.5 rounded-full inline-block ${status === "open" ? "bg-emerald-400 animate-pulse" : status === "pre" ? "bg-amber-400" : "bg-slate-500"}`} />
              {status === "open" ? "Mercado Abierto" : status === "pre" ? "Pre-mercado" : "Mercado Cerrado"}
            </div>

            <span className="font-mono text-xs text-muted-foreground tabular-nums">{time}</span>

            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-border text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <RefreshCw size={11} className={refreshing ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Actualizar</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Ticker tape ── */}
      <TickerTape />

      {/* ── Main content ── */}
      <main className="max-w-screen-2xl mx-auto px-4 py-5 space-y-6">

        {/* Row 1: Termómetro + Indices */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5">
          {/* Termómetro */}
          <div className="flex flex-col gap-3">
            <SectionLabel>Termómetro del Día</SectionLabel>
            <Termometro />
          </div>

          {/* Indices */}
          <IndicesGrid />
        </div>

        {/* Row 2: Tasas */}
        <TasasRow />

        {/* Row 3: Divisas + Commodities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <DivisasPanel />
          <CommoditiesPanel />
        </div>

        {/* Footer */}
        <footer className="border-t border-border pt-4 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
          <span>Última actualización: {lastUpdate} · Datos con fines ilustrativos</span>
          <span className="flex items-center gap-1.5">
            <Wifi size={10} className="text-primary" />
            Conectado · API v2
          </span>
        </footer>
      </main>
    </div>
  );
}
