import {
  EconomicCalendarResult,
  UnifiedEconomicEvent,
  CpiEvent,
  InterestRateEvent,
  EarningsEvent,
  CryptoEvent,
} from "../types/economicCalendar";
import {
  mockCpiEvents,
  mockInterestRateEvents,
  mockEarningsEvents,
  mockCryptoEvents,
} from "./economicCalendar.mock";

const FMP_BASE_URL = "https://financialmodelingprep.com/api/v3";
const COINGECKO_EVENTS_URL =
  "https://api.coingecko.com/api/v3/events?upcoming_events_only=true";
const DATE_RANGE_DAYS = 45;

const FMP_API_KEY = import.meta.env.VITE_FMP_API_KEY;

const getDateRange = () => {
  const today = new Date();
  const future = new Date();
  future.setDate(today.getDate() + DATE_RANGE_DAYS);
  const format = (date: Date) => date.toISOString().split("T")[0];
  return { from: format(today), to: format(future) };
};

const normalizeDate = (value: string | number | Date | undefined): string => {
  if (!value) {
    return new Date().toISOString();
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
};

const toNumber = (value: unknown): number | null => {
  if (value === null || value === undefined || value === "") return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
};

const parseImportance = (importance?: string): "low" | "medium" | "high" | undefined => {
  if (!importance) return undefined;
  const normalized = importance.toLowerCase();
  if (normalized.includes("high")) return "high";
  if (normalized.includes("medium")) return "medium";
  if (normalized.includes("low")) return "low";
  return undefined;
};

const requireApiKey = () => {
  if (!FMP_API_KEY) {
    throw new Error(
      "Missing VITE_FMP_API_KEY. Please set it in your environment to enable live economic data."
    );
  }
};

const withFallback = async <T>(
  operation: () => Promise<T>,
  fallback: T
): Promise<{ data: T; usedFallback: boolean }> => {
  try {
    const data = await operation();
    if (Array.isArray(data) && data.length === 0) {
      return { data: fallback, usedFallback: true };
    }
    return { data, usedFallback: false };
  } catch (error) {
    console.warn("Economic calendar request failed, using fallback data.", error);
    return { data: fallback, usedFallback: true };
  }
};

const fetchCpiEvents = async (): Promise<CpiEvent[]> => {
  requireApiKey();
  const { from, to } = getDateRange();
  const url = `${FMP_BASE_URL}/economic_calendar?from=${from}&to=${to}&apikey=${FMP_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch CPI releases");
  }
  const payload = await response.json();
  return (payload as any[])
    .filter((item) =>
      String(item?.event ?? "")
        .toLowerCase()
        .includes("cpi")
    )
    .slice(0, 15)
    .map((item, index) => ({
      id: `cpi-${item?.id ?? index}-${item?.date}`,
      type: "CPI",
      title: item?.event ?? "CPI Release",
      country: item?.country ?? item?.region ?? "Global",
      date: normalizeDate(item?.date),
      period: item?.period ?? item?.date,
      previous: toNumber(item?.previous),
      forecast: toNumber(item?.forecast),
      actual: toNumber(item?.actual),
      unit: item?.unit ?? "%",
      importance: parseImportance(item?.importance),
      description: item?.change ?? item?.impact ?? undefined,
      source: "Financial Modeling Prep",
    }));
};

const fetchInterestRateEvents = async (): Promise<InterestRateEvent[]> => {
  requireApiKey();
  const { from, to } = getDateRange();
  const url = `${FMP_BASE_URL}/economic_calendar?from=${from}&to=${to}&apikey=${FMP_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch interest rate decisions");
  }
  const payload = await response.json();
  return (payload as any[])
    .filter((item) => {
      const event = String(item?.event ?? "").toLowerCase();
      return (
        event.includes("interest rate") ||
        event.includes("policy rate") ||
        event.includes("rate decision") ||
        event.includes("central bank")
      );
    })
    .slice(0, 15)
    .map((item, index) => ({
      id: `rate-${item?.id ?? index}-${item?.date}`,
      type: "Interest Rates",
      title: item?.event ?? "Rate Decision",
      centralBank: item?.event?.split(" - ")?.[0] ?? item?.country ?? "Central Bank",
      country: item?.country ?? "Global",
      date: normalizeDate(item?.date),
      previousRate: toNumber(item?.previous),
      forecastRate: toNumber(item?.forecast),
      actualRate: toNumber(item?.actual),
      importance: parseImportance(item?.importance),
      description: item?.impact ?? undefined,
      source: "Financial Modeling Prep",
    }));
};

const fetchEarningsEvents = async (): Promise<EarningsEvent[]> => {
  requireApiKey();
  const { from, to } = getDateRange();
  const url = `${FMP_BASE_URL}/earning_calendar?from=${from}&to=${to}&apikey=${FMP_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch earnings calendar");
  }
  const payload = await response.json();
  return (payload as any[])
    .slice(0, 25)
    .map((item: any) => ({
      id: `earnings-${item?.symbol}-${item?.date}`,
      type: "Earnings",
      title: `${item?.company ?? item?.symbol} Earnings`,
      company: item?.company ?? item?.symbol ?? "Company",
      ticker: item?.symbol ?? "TBD",
      date: normalizeDate(item?.date ?? item?.time),
      epsEstimate: toNumber(item?.epsEstimated),
      epsActual: toNumber(item?.eps),
      revenueEstimate: toNumber(item?.revenueEstimated),
      revenueActual: toNumber(item?.revenue),
      description: item?.time ? `Call at ${item.time}` : undefined,
      importance: parseImportance(item?.importance) ?? "medium",
      source: "Financial Modeling Prep",
    }));
};

const fetchCryptoEvents = async (): Promise<CryptoEvent[]> => {
  const response = await fetch(COINGECKO_EVENTS_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch crypto events");
  }
  const payload = await response.json();
  const events = Array.isArray(payload?.data) ? payload.data : [];
  return events.slice(0, 20).map((event: any, index: number) => ({
    id: event?.id ? `crypto-${event.id}` : `crypto-${index}`,
    type: "Crypto",
    title: event?.title ?? "Crypto Event",
    network: event?.project?.name ?? "Multi-chain",
    category: ((): CryptoEvent["category"] => {
      const type = String(event?.type ?? "").toLowerCase();
      if (type.includes("halving")) return "halving";
      if (type.includes("fork")) return "hard fork";
      if (type.includes("upgrade") || type.includes("update")) return "upgrade";
      if (type.includes("launch")) return "launch";
      return "other";
    })(),
    date: normalizeDate(event?.start_date ?? event?.end_date),
    description: event?.description ?? event?.organizer ?? undefined,
    importance: "medium",
    assetSymbol: event?.project?.symbol,
    location: event?.venue ?? event?.city ?? null,
    source: "CoinGecko",
  }));
};

const getCpiEvents = () => withFallback(fetchCpiEvents, mockCpiEvents);
const getInterestRateEvents = () =>
  withFallback(fetchInterestRateEvents, mockInterestRateEvents);
const getEarningsEvents = () =>
  withFallback(fetchEarningsEvents, mockEarningsEvents);
const getCryptoEvents = () => withFallback(fetchCryptoEvents, mockCryptoEvents);

export const economicCalendarService = {
  getCpiEvents,
  getInterestRateEvents,
  getEarningsEvents,
  getCryptoEvents,
  getAllEvents: async (): Promise<EconomicCalendarResult> => {
    const [cpi, interest, earnings, crypto] = await Promise.all([
      getCpiEvents(),
      getInterestRateEvents(),
      getEarningsEvents(),
      getCryptoEvents(),
    ]);

    const events: UnifiedEconomicEvent[] = [
      ...cpi.data,
      ...interest.data,
      ...earnings.data,
      ...crypto.data,
    ];

    events.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return {
      events,
      lastUpdated: new Date().toISOString(),
      usedFallback:
        cpi.usedFallback ||
        interest.usedFallback ||
        earnings.usedFallback ||
        crypto.usedFallback,
    };
  },
};

