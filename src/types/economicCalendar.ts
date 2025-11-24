export type EconomicEventType = "CPI" | "Interest Rates" | "Earnings" | "Crypto";

export interface BaseEconomicEvent {
  id: string;
  type: EconomicEventType;
  title: string;
  description?: string;
  date: string; // ISO string
  country?: string;
  source?: string;
  importance?: "low" | "medium" | "high";
}

export interface CpiEvent extends BaseEconomicEvent {
  type: "CPI";
  country: string;
  period?: string;
  previous?: number | null;
  forecast?: number | null;
  actual?: number | null;
  unit?: string;
}

export interface InterestRateEvent extends BaseEconomicEvent {
  type: "Interest Rates";
  centralBank: string;
  currency?: string;
  previousRate?: number | null;
  forecastRate?: number | null;
  actualRate?: number | null;
}

export interface EarningsEvent extends BaseEconomicEvent {
  type: "Earnings";
  company: string;
  ticker: string;
  epsEstimate?: number | null;
  epsActual?: number | null;
  revenueEstimate?: number | null;
  revenueActual?: number | null;
}

export interface CryptoEvent extends BaseEconomicEvent {
  type: "Crypto";
  network: string;
  category: "halving" | "hard fork" | "upgrade" | "launch" | "other";
  assetSymbol?: string;
  location?: string | null;
}

export type UnifiedEconomicEvent =
  | CpiEvent
  | InterestRateEvent
  | EarningsEvent
  | CryptoEvent;

export interface EconomicCalendarFilters {
  CPI: boolean;
  "Interest Rates": boolean;
  Earnings: boolean;
  Crypto: boolean;
}

export interface EconomicCalendarResult {
  events: UnifiedEconomicEvent[];
  lastUpdated: string;
  usedFallback: boolean;
}

