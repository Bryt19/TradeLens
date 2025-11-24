import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AlertTriangle, Filter, RefreshCw, Search } from "lucide-react";
import { Badge } from "./ui/badge";
import Loading from "./Loading";
import {
  EconomicCalendarFilters,
  EconomicEventType,
  UnifiedEconomicEvent,
} from "../types/economicCalendar";
import { economicCalendarService } from "../services/economicCalendar";

const FILTER_OPTIONS: { key: EconomicEventType; label: string }[] = [
  { key: "CPI", label: "CPI" },
  { key: "Interest Rates", label: "Interest Rates" },
  { key: "Earnings", label: "Earnings" },
  { key: "Crypto", label: "Crypto Events" },
];

const TYPE_STYLES: Record<EconomicEventType, string> = {
  CPI: "bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800",
  "Interest Rates":
    "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  Earnings:
    "bg-amber-50 text-amber-800 border-amber-100 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  Crypto:
    "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100 dark:bg-fuchsia-900/30 dark:text-fuchsia-300 dark:border-fuchsia-800",
};

const REALTIME_REFRESH_MS = 60 * 1000; // 1 minute polling for fresh data
const CLOCK_TICK_MS = 30 * 1000; // frequency to re-evaluate event cutoffs
const EVENT_GRACE_PERIOD_MS = 5 * 60 * 1000; // keep events visible 5 min post time

const defaultFilters: EconomicCalendarFilters = {
  CPI: true,
  "Interest Rates": true,
  Earnings: true,
  Crypto: true,
};

const formatDateTime = (value: string) => {
  const date = new Date(value);
  return {
    day: date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    time: date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

const formatNumber = (value?: number | null, options?: Intl.NumberFormatOptions) => {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat(undefined, options).format(value);
};

const formatRate = (value?: number | null) =>
  value === null || value === undefined ? "—" : `${value.toFixed(2)}%`;

const formatRevenue = (value?: number | null) =>
  value === null || value === undefined
    ? "—"
    : new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }).format(value);

const buildMetrics = (event: UnifiedEconomicEvent) => {
  switch (event.type) {
    case "CPI":
      return [
        { label: "Previous", value: formatRate(event.previous) },
        { label: "Forecast", value: formatRate(event.forecast) },
        { label: "Actual", value: formatRate(event.actual) },
      ];
    case "Interest Rates":
      return [
        { label: "Previous", value: formatRate(event.previousRate) },
        { label: "Forecast", value: formatRate(event.forecastRate) },
        { label: "Actual", value: formatRate(event.actualRate) },
      ];
    case "Earnings":
      return [
        { label: "EPS Est.", value: formatNumber(event.epsEstimate, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
        { label: "EPS Act.", value: formatNumber(event.epsActual, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) },
        { label: "Revenue", value: formatRevenue(event.revenueEstimate ?? event.revenueActual) },
      ];
    case "Crypto":
    default:
      return [
        { label: "Network", value: event.network },
        { label: "Category", value: event.category.replace(/\b\w/g, (c) => c.toUpperCase()) },
        { label: "Location", value: event.location ?? "Global" },
      ];
  }
};

const EconomicCalendar: React.FC = () => {
  const [events, setEvents] = useState<UnifiedEconomicEvent[]>([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(() => Date.now());
  const [searchQuery, setSearchQuery] = useState("");

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await economicCalendarService.getAllEvents();
      setEvents(result.events);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to load economic calendar.";
      setError(message);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      fetchEvents();
    }, REALTIME_REFRESH_MS);
    return () => window.clearInterval(intervalId);
  }, [fetchEvents]);

  useEffect(() => {
    const clockId = window.setInterval(() => {
      setCurrentTime(Date.now());
    }, CLOCK_TICK_MS);
    return () => window.clearInterval(clockId);
  }, []);

  const upcomingEvents = useMemo(() => {
    const cutoff = currentTime - EVENT_GRACE_PERIOD_MS;
    return events.filter(
      (event) => new Date(event.date).getTime() >= cutoff
    );
  }, [events, currentTime]);

  const filteredEvents = useMemo(() => {
    const typeFiltered = upcomingEvents.filter((event) => filters[event.type]);
    const query = searchQuery.trim().toLowerCase();
    if (!query) return typeFiltered;
    return typeFiltered.filter((event) => {
      const searchable = [
        event.title,
        event.description,
        event.country,
        "ticker" in event ? event.ticker : "",
        "company" in event ? event.company : "",
        "network" in event ? event.network : "",
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return searchable.includes(query);
    });
  }, [upcomingEvents, filters, searchQuery]);

  const handleToggleFilter = (key: EconomicEventType) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Filters</p>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-1">
              <Filter className="h-3.5 w-3.5" />
              Toggle categories to refine the timeline.
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => handleToggleFilter(filter.key)}
                className={`px-3 py-1 rounded-full border text-xs font-semibold transition-all ${
                  filters[filter.key]
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-transparent text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full sm:w-72">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Search Events
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search titles, tickers, regions..."
              className="w-full rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-10 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>
        </div>
        {lastUpdated && (
          <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
            Updated {new Date(lastUpdated).toLocaleTimeString()}
          </p>
        )}
      </div>

      {error ? (
        <div className="p-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-300">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{error}</p>
          <button
            type="button"
            onClick={fetchEvents}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      ) : loading ? (
        <div className="p-8">
          <Loading text="Syncing upcoming events..." />
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="p-8 text-center text-sm text-gray-600 dark:text-gray-300">
          No events match the selected filters. Try enabling more categories.
        </div>
      ) : (
        <div className="max-h-[520px] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
          {filteredEvents.map((event) => {
            const { day, time } = formatDateTime(event.date);
            const metrics = buildMetrics(event);
            return (
              <article
                key={event.id}
                className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-3 sm:w-48 shrink-0">
                  <div className="text-left">
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      {day}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">{time}</p>
                  </div>
                  <Badge className={TYPE_STYLES[event.type]}>{event.type}</Badge>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                      {event.title}
                    </h3>
                    {event.country && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {event.country}
                      </span>
                    )}
                    {event.type === "Earnings" && "ticker" in event && (
                      <span className="text-xs font-mono text-blue-600 dark:text-blue-400">
                        {event.ticker}
                      </span>
                    )}
                  </div>
                  {event.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {event.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 sm:w-72">
                  {metrics.map((metric) => (
                    <div
                      key={`${event.id}-${metric.label}`}
                      className="rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-3"
                    >
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {metric.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EconomicCalendar;

