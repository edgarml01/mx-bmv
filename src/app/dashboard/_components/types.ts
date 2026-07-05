

export interface TopSubenBajan {
  e: string;   // emisora
  u: number;   // último precio
  c: number;   // cambio %
  f: string;   // fecha
}

export interface TopVolumen {
  e: string;   // emisora
  u: number;   // último precio
  i: number;   // importe operado
}

export interface TopResponse {
  SUBEN:   TopSubenBajan[];
  BAJAN:   TopSubenBajan[];
  VOLUMEN: TopVolumen[];
}

export interface IndexData {
  e:    string;  // nombre
  u:    number;  // último
  a:    number;  // anterior
  x:    number;  // máximo
  n:    number;  // mínimo
  c:    number;  // cambio %
  m:    number;  // cambio puntos
  v:    number;  // volumen
  ytdp: number;  // ytd %
  f:    string;  // fecha
}
export type IndicesResponse = Record<string, IndexData>;

export interface TasaData {
  t: number;   // tasa
  f: string;   // fecha
}
export type TasasResponse = Record<string, TasaData>;

export interface DivisaData {
  u: number;   // último
  c: number;   // cambio %
  m: number;   // cambio valor
}
export type DivisasResponse = Record<string, DivisaData | string>;

export interface CommodityData {
  u:   number;  // último precio
  x:   string;  // unidad
  m:   number;  // cambio valor
  p:   number;  // cambio %
  ytd: number;  // year-to-date %
  yoy: number;  // year-over-year %
  t:   string;  // fecha
  l:   number;
  s:   number;
}
export type CommoditiesResponse = Record<string, CommodityData | string>;