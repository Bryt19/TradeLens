import {
  EconomicCalendarResult,
  UnifiedEconomicEvent,
} from "../types/economicCalendar";

// Mock Data Generators
const COUNTRIES = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CNY"];
const IMPORTANCE: ("low" | "medium" | "high")[] = ["low", "medium", "high", "high"]; // skewed to high effectively

const generateRandomTime = (date: Date) => {
  const d = new Date(date);
  d.setHours(8 + Math.floor(Math.random() * 10)); // 8 AM to 6 PM
  d.setMinutes(Math.random() < 0.5 ? 0 : 30);
  return d.toISOString();
};

const generateMockEventsForDate = (date: Date): UnifiedEconomicEvent[] => {
  const events: UnifiedEconomicEvent[] = [];
  const eventCount = 5 + Math.floor(Math.random() * 8); // 5-12 events per day

  for (let i = 0; i < eventCount; i++) {
    const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
    const importance = IMPORTANCE[Math.floor(Math.random() * IMPORTANCE.length)];
    const time = generateRandomTime(date);
    
    // Randomize event type
    const rand = Math.random();
    if (rand < 0.4) {
      // CPI / Inflation
      const prev = 2 + Math.random() * 5;
      const forecast = prev + (Math.random() - 0.5);
      const actual = forecast + (Math.random() - 0.5) * 0.5;
      
      events.push({
        id: `mock-cpi-${date.getTime()}-${i}`,
        type: "CPI",
        title: `${country} CPI (YoY)`,
        country,
        date: time,
        period: "Monthly",
        previous: prev,
        forecast: forecast,
        actual: new Date(time) < new Date() ? actual : null, // Only show actual if in past
        unit: "%",
        importance,
        source: "Simulation",
      });
    } else if (rand < 0.7) {
      // Interest Rate
      const prev = 1 + Math.random() * 4;
      events.push({
        id: `mock-rate-${date.getTime()}-${i}`,
        type: "Interest Rates",
        title: `${country} Interest Rate Decision`,
        centralBank: `${country} Central Bank`,
        country,
        date: time,
        previousRate: prev,
        forecastRate: prev,
        actualRate: new Date(time) < new Date() ? prev : null,
        importance: "high",
        source: "Simulation",
      });
    } else {
      // Earnings (Tech focused for "TradeLens" vibe)
      const tickers = ["AAPL", "NVDA", "TSLA", "MSFT", "AMD", "COIN"];
      const ticker = tickers[Math.floor(Math.random() * tickers.length)];
      events.push({
        id: `mock-earn-${date.getTime()}-${i}`,
        type: "Earnings",
        title: `${ticker} Q${1 + Math.floor(Math.random() * 3)} Earnings`,
        company: ticker,
        ticker,
        date: time,
        epsEstimate: 1 + Math.random() * 5,
        epsActual: new Date(time) < new Date() ? 1 + Math.random() * 5 : null,
        revenueEstimate: 10000000000 + Math.random() * 50000000000,
        revenueActual: new Date(time) < new Date() ? 10000000000 + Math.random() * 50000000000 : null,
        importance,
        source: "Simulation",
      });
    }
  }
  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const economicCalendarService = {
  getAllEvents: async (date?: Date): Promise<EconomicCalendarResult> => {
    const targetDate = date || new Date();
    
    // If we have an API key, we *could* fetch real data, but the user explicitly
    // wants to test "real-time" features which might be sparse in real-time APIs for "Today" 
    // depending on the time of day. 
    // However, the instruction is to use Mock Data generator because the user has NO key.
    
    const events = generateMockEventsForDate(targetDate);

    return {
      events,
      lastUpdated: new Date().toISOString(),
      usedFallback: true,
    };
  },
};

