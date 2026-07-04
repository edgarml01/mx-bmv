import type { TopEntry, IndexEntry, TasaEntry, DivisaEntry, CommodityEntry } from "./types";

export const MOCK_GAINERS: TopEntry[] = [
  { ticker: "FEMSA UBD", name: "Fomento Económico Mexicano", price: 178.42, change: 8.93, changePct: 5.27, volume: 4820000 },
  { ticker: "GFINBUR O", name: "Grupo Financiero Inbursa", price: 42.18, change: 1.96, changePct: 4.87, volume: 3120000 },
  { ticker: "BIMBOA", name: "Grupo Bimbo", price: 89.35, change: 3.75, changePct: 4.38, volume: 6540000 },
  { ticker: "LIVEPOLC-1", name: "El Puerto de Liverpool", price: 137.60, change: 5.10, changePct: 3.85, volume: 2890000 },
  { ticker: "WALMEX V", name: "Walmart de México", price: 67.24, change: 2.31, changePct: 3.56, volume: 9870000 },
  { ticker: "ALPEKA", name: "Alpek", price: 22.84, change: 0.74, changePct: 3.34, volume: 5430000 },
  { ticker: "OMAB", name: "OMA", price: 188.90, change: 5.88, changePct: 3.21, volume: 1240000 },
  { ticker: "ASURB", name: "Grupo Aeroportuario del Sureste", price: 412.50, change: 12.40, changePct: 3.10, volume: 980000 },
];

export const MOCK_LOSERS: TopEntry[] = [
  { ticker: "PINFRA *", name: "Promotora y Operadora de Infraestructura", price: 168.90, change: -9.42, changePct: -5.28, volume: 2340000 },
  { ticker: "GENTERA O", name: "Gentera", price: 18.74, change: -0.94, changePct: -4.77, volume: 7120000 },
  { ticker: "RA", name: "Regional", price: 104.30, change: -4.91, changePct: -4.50, volume: 1890000 },
  { ticker: "GICSA B", name: "GICSA", price: 4.38, change: -0.18, changePct: -3.95, volume: 3450000 },
  { ticker: "VESTA *", name: "Corporación Inmobiliaria Vesta", price: 52.16, change: -2.02, changePct: -3.73, volume: 4230000 },
  { ticker: "AUTLAN B", name: "Compañía Minera Autlán", price: 31.50, change: -1.10, changePct: -3.37, volume: 2010000 },
  { ticker: "CUERVO *", name: "Becle", price: 23.78, change: -0.72, changePct: -2.94, volume: 5670000 },
  { ticker: "BOLSAA", name: "Bolsa Mexicana de Valores", price: 44.20, change: -1.24, changePct: -2.73, volume: 1340000 },
];

export const MOCK_VOLUME: TopEntry[] = [
  { ticker: "AMXL", name: "América Móvil", price: 14.84, change: 0.22, changePct: 1.50, volume: 48200000 },
  { ticker: "CEMEXCPO", name: "CEMEX", price: 7.62, change: -0.14, changePct: -1.80, volume: 42700000 },
  { ticker: "GFNORTEO", name: "Grupo Financiero Banorte", price: 146.30, change: 2.80, changePct: 1.95, volume: 38900000 },
  { ticker: "WALMEX V", name: "Walmart de México", price: 67.24, change: 2.31, changePct: 3.56, volume: 31400000 },
  { ticker: "BIMBOA", name: "Grupo Bimbo", price: 89.35, change: 3.75, changePct: 4.38, volume: 28600000 },
  { ticker: "KOFUBL", name: "Coca-Cola FEMSA", price: 198.70, change: -1.20, changePct: -0.60, volume: 24100000 },
  { ticker: "TLEVISACPO", name: "Televisa", price: 28.46, change: 0.48, changePct: 1.72, volume: 21800000 },
  { ticker: "GMEXICOB", name: "Grupo México", price: 108.90, change: -2.30, changePct: -2.07, volume: 19500000 },
];

export const MOCK_INDICES: IndexEntry[] = [
  { name: "S&P/BMV IPC", ticker: "IPC", value: 52483.60, change: 312.40, changePct: 0.60, region: "MX" },
  { name: "S&P 500", ticker: "SPX", value: 5487.03, change: -18.62, changePct: -0.34, region: "US" },
  { name: "Nasdaq Comp.", ticker: "IXIC", value: 17421.35, change: -82.10, changePct: -0.47, region: "US" },
  { name: "Dow Jones", ticker: "DJIA", value: 38905.20, change: 134.80, changePct: 0.35, region: "US" },
  { name: "FTSE 100", ticker: "UKX", value: 8184.50, change: 42.30, changePct: 0.52, region: "UK" },
  { name: "DAX", ticker: "DAX", value: 18391.75, change: -67.40, changePct: -0.37, region: "DE" },
  { name: "Nikkei 225", ticker: "NKY", value: 38647.00, change: -189.50, changePct: -0.49, region: "JP" },
  { name: "Shanghai Comp.", ticker: "SHCOMP", value: 3088.43, change: 22.15, changePct: 0.72, region: "CN" },
];

export const MOCK_TASAS: TasaEntry[] = [
  { name: "CETES 28d", plazo: "28 días", rate: 10.48, prev: 10.50 },
  { name: "CETES 91d", plazo: "91 días", rate: 10.42, prev: 10.45 },
  { name: "CETES 182d", plazo: "182 días", rate: 10.28, prev: 10.32 },
  { name: "CETES 364d", plazo: "364 días", rate: 10.05, prev: 10.10 },
  { name: "TIIE 28d", plazo: "28 días", rate: 10.75, prev: 10.75 },
  { name: "Obj. Banxico", plazo: "Tasa Objetivo", rate: 10.50, prev: 10.75 },
];

export const MOCK_DIVISAS: DivisaEntry[] = [
  { pair: "USD/MXN", name: "Dólar Estadounidense", value: 17.2840, change: 0.0342, changePct: 0.20 },
  { pair: "EUR/MXN", name: "Euro", value: 18.7420, change: -0.0810, changePct: -0.43 },
  { pair: "GBP/MXN", name: "Libra Esterlina", value: 21.9350, change: 0.1240, changePct: 0.57 },
  { pair: "JPY/MXN", name: "Yen Japonés", value: 0.1138, change: -0.0012, changePct: -1.04 },
  { pair: "CAD/MXN", name: "Dólar Canadiense", value: 12.6810, change: 0.0570, changePct: 0.45 },
  { pair: "CHF/MXN", name: "Franco Suizo", value: 19.4230, change: -0.2100, changePct: -1.07 },
];

export const MOCK_COMMODITIES: CommodityEntry[] = [
  { name: "WTI Crude", ticker: "CL", price: 78.42, unit: "USD/bbl", change: -1.24, changePct: -1.55 },
  { name: "Brent Crude", ticker: "CO", price: 82.18, unit: "USD/bbl", change: -1.08, changePct: -1.30 },
  { name: "Oro / Gold", ticker: "GC", price: 2318.60, unit: "USD/oz", change: 12.40, changePct: 0.54 },
  { name: "Plata / Silver", ticker: "SI", price: 29.48, unit: "USD/oz", change: 0.34, changePct: 1.17 },
  { name: "Cobre / Copper", ticker: "HG", price: 4.5820, unit: "USD/lb", change: -0.0420, changePct: -0.91 },
  { name: "Gas Natural", ticker: "NG", price: 2.748, unit: "USD/MMBtu", change: 0.0320, changePct: 1.18 },
];
