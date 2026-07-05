// ── Mock Data (valores reales de la API, 2026-07-03) ─────────────────────
import type { TopResponse, IndicesResponse, TasasResponse, DivisasResponse, CommoditiesResponse } from "./types";

export const MOCK_TOP: TopResponse = {
  SUBEN: [
    { e: "AGUILASCPO",   u: 81.90,   c: 2.23,  f: "2026-07-03" },
    { e: "LAMOSA*",      u: 97.49,   c: 2.09,  f: "2026-07-03" },
    { e: "AGUA*",        u: 13.30,   c: 1.76,  f: "2026-07-03" },
    { e: "FEXI21",       u: 17.77,   c: 1.60,  f: "2026-07-03" },
    { e: "FSHOP13",      u: 12.00,   c: 1.52,  f: "2026-07-03" },
    { e: "CUERVO*",      u: 14.63,   c: 1.52,  f: "2026-07-03" },
    { e: "LASITE*",      u: 5.06,    c: 1.20,  f: "2026-07-03" },
    { e: "IVVPESOISHRS", u: 152.90,  c: 1.16,  f: "2026-07-03" },
    { e: "GMEXICOB",     u: 199.35,  c: 1.00,  f: "2026-07-03" },
    { e: "FIBRAPL14",    u: 76.39,   c: 0.98,  f: "2026-07-03" },
  ],
  BAJAN: [
    { e: "FIBRAHD15",  u: 2.19,   c: -3.10, f: "2026-07-03" },
    { e: "NUTRISAA",   u: 3.71,   c: -2.62, f: "2026-07-03" },
    { e: "SORIANAB",   u: 29.91,  c: -2.57, f: "2026-07-03" },
    { e: "ASURB",      u: 531.03, c: -2.02, f: "2026-07-03" },
    { e: "FUNO11",     u: 29.77,  c: -1.45, f: "2026-07-03" },
    { e: "CMOCTEZ*",   u: 84.00,  c: -1.18, f: "2026-07-03" },
    { e: "SPORTS",     u: 8.15,   c: -1.09, f: "2026-07-03" },
    { e: "ACTINVRB",   u: 21.50,  c: -1.06, f: "2026-07-03" },
    { e: "AUTLANB",    u: 7.60,   c: -1.04, f: "2026-07-03" },
    { e: "SIGMAFA",    u: 16.07,  c: -0.98, f: "2026-07-03" },
  ],
  VOLUMEN: [
    { e: "GFNORTEO",  u: 187.63, i: 632343088.59 },
    { e: "GMEXICOB",  u: 199.35, i: 237794762.74 },
    { e: "FEMSAUBD",  u: 225.49, i: 206282049.71 },
    { e: "GAPB",      u: 438.10, i: 123146913.26 },
    { e: "WALMEX*",   u: 50.18,  i: 103063153.30 },
    { e: "AMXB",      u: 22.48,  i: 101797122.90 },
    { e: "CEMEXCPO",  u: 21.44,  i: 94231577.32  },
    { e: "PENOLES*",  u: 772.99, i: 85433614.90  },
    { e: "PINFRA*",   u: 282.00, i: 63673992.31  },
    { e: "ORBIA*",    u: 23.00,  i: 59184167.50  },
  ],
};

export const MOCK_INDICES: IndicesResponse = {
  IPC:      { e: "Indice de Precios Y Cotizaciones",  u: 67416.22,    a: 66486.49,   x: 67488.76,   n: 66439.73,  c:  1.72,  m:  1138.21,   v: 185721795,   ytdp:  17.4785, f: "2026-06-26 04:59:00" },
  FTSEBIVA: { e: "Indice FTSE BIVA",                  u: 1352.23,     a: 0,          x: 0,          n: 0,         c:  0.00,  m:  0,          v: 0,           ytdp:  14.3052, f: "2026-06-26 05:00:00" },
  DJIA:     { e: "Dow Jones Industrial Average",      u: 51920.62,    a: 52009.02,   x: 52655.66,   n: 51857.78,  c:  0.14,  m:  71.72,      v: 639230227,   ytdp:  37.7570, f: "2026-06-26 04:59:00" },
  SP500:    { e: "Standard and Poor's 500",           u: 7357.49,     a: 7404.91,    x: 7419.08,    n: 7323.50,   c: -0.01,  m: -0.73,       v: 3563880082,  ytdp:  54.2451, f: "2026-06-26 04:59:00" },
  NASDAQ:   { e: "Nasdaq Composite Index",            u: 25358.60,    a: 25724.78,   x: 25724.78,   n: 25123.43,  c: -0.46,  m: -118.03,     v: 1715495945,  ytdp:  68.9334, f: "2026-06-26 04:59:00" },
  FTSE100:  { e: "FTSE 100 Index",                    u: 10464.45,    a: 10530.18,   x: 10530.18,   n: 10447.70,  c: -0.62,  m: -65.44,      v: 97775691,    ytdp:  35.3220, f: "2026-06-26 04:59:00" },
  DAX:      { e: "DAX 40 Index",                      u: 24707.63,    a: 24848.51,   x: 24869.63,   n: 24681.93,  c: -1.15,  m: -287.20,     v: 15076374,    ytdp:  47.4906, f: "2026-06-26 04:59:00" },
  CAC40:    { e: "CAC 40 Index",                      u: 8387.98,     a: 8410.36,    x: 8421.10,    n: 8379.88,   c: -0.52,  m: -43.63,      v: 9942675,     ytdp:  11.2022, f: "2026-06-26 04:59:00" },
  NK225:    { e: "Nikkei 225 Index",                  u: 69360.88,    a: 71587.71,   x: 71786.28,   n: 68639.84,  c: -4.15,  m: -3005.46,    v: 1569063800,  ytdp: 107.2701, f: "2026-06-26 04:59:00" },
  HSI:      { e: "Hang Seng 64 Index",                u: 22671.86,    a: 22952.09,   x: 22962.46,   n: 22518.00,  c: -1.76,  m: -405.05,     v: 4194503173,  ytdp:  32.9962, f: "2026-06-26 04:59:00" },
  SSE:      { e: "SSE Shanghai Composite Index",      u: 4027.26,     a: 4098.69,    x: 4099.78,    n: 4007.86,   c: -2.26,  m: -93.02,      v: 66010866600, ytdp:  35.3701, f: "2026-06-26 04:59:00" },
  VIX:      { e: "Cboe Volatility Index",             u: 20.08,       a: 19.70,      x: 20.32,      n: 19.52,     c:  7.78,  m:  1.45,       v: 0,           ytdp:  61.2851, f: "2026-06-26 04:59:00" },
};

export const MOCK_TASAS: TasasResponse = {
  TIIE182:       { t: 6.8474, f: "2026-07-06" },
  TIIEFB:        { t: 6.4900, f: "2026-07-03" },
  TIIE28:        { t: 6.7559, f: "2026-07-06" },
  TIIE91:        { t: 6.7931, f: "2026-07-06" },
  CETE28:        { t: 6.3000, f: "2026-07-02" },
  "CETE 91":     { t: 6.4900, f: "2026-07-02" },
  CETE182:       { t: 6.7500, f: "2026-07-02" },
  CETE364:       { t: 7.1200, f: "2026-06-25" },
  Tasa_Objetivo: { t: 6.5000, f: "2026-07-04" },
};

export const MOCK_DIVISAS: DivisasResponse = {
  AUDUSD: { u: 0.6903,  c: -0.10, m: -0.0007 },
  CADMXN: { u: 12.3493, c:  0.16, m:  0.0196 },
  CHFMXN: { u: 21.6778, c:  0.30, m:  0.0659 },
  EURMXN: { u: 19.9913, c:  0.42, m:  0.0833 },
  EURUSD: { u: 1.1408,  c:  0.34, m:  0.0039 },
  GBPMXN: { u: 23.1671, c:  0.29, m:  0.0671 },
  GBPUSD: { u: 1.3224,  c:  0.24, m:  0.0031 },
  USDCAD: { u: 1.4181,  c: -0.14, m: -0.0020 },
  USDJPY: { u: 161.55,  c: -0.15, m: -0.2400 },
  USDMXN: { u: 17.5147, c:  0.03, m:  0.0047 },
  t: "2026-06-26 04:01:00",
};

export const MOCK_COMMODITIES: CommoditiesResponse = {
  petroleo_wti:   { u: 68.345,  x: "USD por barril",       m:  0.419, p: -0.61, ytd:  19.03, yoy:   0.61, t: "2024-07-05", l: -25.14, s:  -3.40 },
  petroleo_brent: { u: 71.691,  x: "USD por barril",       m:  0.411, p: -0.57, ytd:  17.82, yoy:   3.03, t: "2024-07-05", l: -23.94, s:  -3.00 },
  gas_natural:    { u: 3.2098,  x: "USD por MMBTU",        m:  0.034, p: -1.05, ytd: -12.92, yoy:  -5.93, t: "2024-07-05", l:   2.00, s:   0.91 },
  oro:            { u: 3309.95, x: "USD por Onza Troy",    m: 42.870, p: -1.28, ytd:  26.12, yoy:  44.35, t: "2024-06-06", l:  -1.96, s:   0.63 },
  plata:          { u: 29.48,   x: "USD por Onza Troy",    m:  0.340, p:  1.17, ytd:  18.40, yoy:  22.10, t: "2024-07-05", l:   1.20, s:   1.17 },
  cobre:          { u: 4.5820,  x: "USD por libra",        m: -0.042, p: -0.91, ytd:  14.20, yoy:  18.50, t: "2024-07-05", l:  -2.30, s:  -0.91 },
  maiz:           { u: 425.00,  x: "USD por bushel",       m:  4.000, p:  0.95, ytd:  -3.46, yoy:   1.67, t: "2024-07-05", l:   1.49, s:   5.72 },
  trigo:          { u: 590.50,  x: "USD por bushel",       m:  1.500, p: -0.25, ytd:  16.47, yoy:   7.66, t: "2024-07-05", l:   1.24, s:   3.69 },
  soja:           { u: 1131.75, x: "USD por bushel",       m:  5.500, p:  0.49, ytd:   9.83, yoy:   7.27, t: "2024-07-02", l:  -1.93, s:   0.38 },
  cacao:          { u: 5017.24, x: "USD por tonelada",     m: 18.760, p: -0.37, ytd: -17.28, yoy: -38.81, t: "2024-07-03", l:  26.54, s:  -1.53 },
  cafe:           { u: 302.16,  x: "USD por libra",        m:  0.960, p:  0.32, ytd: -13.36, yoy:   8.42, t: "2024-07-03", l:  22.26, s:  10.60 },
  azucar:         { u: 14.81,   x: "USD por libra",        m:  0.040, p: -0.27, ytd:  -1.33, yoy:  -8.82, t: "2024-07-05", l:   4.89, s:   0.21 },
  uranio:         { u: 85.70,   x: "USD por libra",        m:  0.350, p: -0.41, ytd:   4.96, yoy:  10.72, t: "2024-07-02", l:  -0.46, s:   0.23 },
  gasolina:       { u: 2.9339,  x: "USD por galón",        m:  0.017, p: -0.58, ytd:  71.48, yoy:  36.41, t: "2024-07-05", l:  -4.45, s:   1.13 },
  carbon:         { u: 128.80,  x: "USD por tonelada",     m:  0.300, p: -0.23, ytd:  19.81, yoy:  17.14, t: "2024-07-03", l: -12.71, s:   2.22 },
};