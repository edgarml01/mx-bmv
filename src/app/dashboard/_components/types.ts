export interface TopEntry {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePct: number;
  volume: number;
}

export interface IndexEntry {
  name: string;
  ticker: string;
  value: number;
  change: number;
  changePct: number;
  region: string;
}

export interface TasaEntry {
  name: string;
  rate: number;
  prev: number;
  plazo: string;
}

export interface DivisaEntry {
  pair: string;
  name: string;
  value: number;
  change: number;
  changePct: number;
}

export interface CommodityEntry {
  name: string;
  ticker: string;
  price: number;
  unit: string;
  change: number;
  changePct: number;
}
