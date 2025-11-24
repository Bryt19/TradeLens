import {
  CpiEvent,
  InterestRateEvent,
  EarningsEvent,
  CryptoEvent,
} from "../types/economicCalendar";

const now = new Date();
const addDays = (days: number) => {
  const date = new Date(now);
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

export const mockCpiEvents: CpiEvent[] = [
  {
    id: "mock-cpi-us",
    type: "CPI",
    title: "US CPI (YoY)",
    country: "United States",
    date: addDays(4),
    period: "Oct 2025",
    previous: 3.1,
    forecast: 3.0,
    actual: null,
    unit: "%",
    importance: "high",
    description: "Consumer Price Index change year over year",
  },
  {
    id: "mock-cpi-eu",
    type: "CPI",
    title: "Eurozone CPI (YoY)",
    country: "Euro Area",
    date: addDays(9),
    period: "Oct 2025",
    previous: 2.8,
    forecast: 2.7,
    actual: null,
    unit: "%",
    importance: "medium",
    description: "Harmonised Index of Consumer Prices",
  },
];

export const mockInterestRateEvents: InterestRateEvent[] = [
  {
    id: "mock-rate-fed",
    type: "Interest Rates",
    title: "Federal Reserve Rate Decision",
    centralBank: "Federal Reserve",
    country: "United States",
    date: addDays(12),
    previousRate: 5.5,
    forecastRate: 5.25,
    actualRate: null,
    importance: "high",
    description: "FOMC statement and press conference",
  },
  {
    id: "mock-rate-ecb",
    type: "Interest Rates",
    title: "ECB Policy Statement",
    centralBank: "European Central Bank",
    country: "Euro Area",
    date: addDays(18),
    previousRate: 4.5,
    forecastRate: 4.25,
    actualRate: null,
    importance: "high",
    description: "Main refinancing operations rate decision",
  },
];

export const mockEarningsEvents: EarningsEvent[] = [
  {
    id: "mock-earnings-aapl",
    type: "Earnings",
    title: "Apple Q4 FY25 Earnings",
    company: "Apple Inc.",
    ticker: "AAPL",
    date: addDays(6),
    epsEstimate: 1.39,
    epsActual: null,
    revenueEstimate: 89000000000,
    revenueActual: null,
    description: "Conference call at 5:00 PM ET",
    importance: "high",
  },
  {
    id: "mock-earnings-tsla",
    type: "Earnings",
    title: "Tesla Q4 FY25 Earnings",
    company: "Tesla, Inc.",
    ticker: "TSLA",
    date: addDays(15),
    epsEstimate: 0.78,
    epsActual: null,
    revenueEstimate: 26000000000,
    revenueActual: null,
    description: "Shareholder letter release and webcast",
    importance: "medium",
  },
];

export const mockCryptoEvents: CryptoEvent[] = [
  {
    id: "mock-crypto-halving",
    type: "Crypto",
    title: "Bitcoin Halving Readiness Review",
    network: "Bitcoin",
    category: "halving",
    date: addDays(8),
    description: "Multi-client rehearsal ahead of Halving #5",
    importance: "high",
  },
  {
    id: "mock-crypto-upgrade",
    type: "Crypto",
    title: "Ethereum Pectra Upgrade Testnet",
    network: "Ethereum",
    category: "upgrade",
    date: addDays(21),
    description: "Devnet fork enabling account abstraction primitives",
    importance: "medium",
  },
];

