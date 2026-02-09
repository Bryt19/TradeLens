import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  RefreshCw,
  Search,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Activity,
} from "lucide-react";
import { Badge } from "./ui/badge";
import Loading from "./Loading";
import {
  EconomicCalendarFilters,
  EconomicEventType,
  UnifiedEconomicEvent,
} from "../types/economicCalendar";
import { economicCalendarService } from "../services/economicCalendar";
import { motion, AnimatePresence } from "framer-motion";

const FILTER_OPTIONS: { key: EconomicEventType; label: string }[] = [
  { key: "CPI", label: "CPI" },
  { key: "Interest Rates", label: "Interest Rates" },
  { key: "Earnings", label: "Earnings" },
  { key: "Crypto", label: "Crypto" },
];

const TYPE_STYLES: Record<EconomicEventType, string> = {
  CPI: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.1)]",
  "Interest Rates":
    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]",
  Earnings:
    "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]",
  Crypto:
    "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20 shadow-[0_0_10px_rgba(217,70,239,0.1)]",
};

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

const formatNumber = (
  value?: number | null,
  options?: Intl.NumberFormatOptions,
) => {
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
        {
          label: "EPS Est.",
          value: formatNumber(event.epsEstimate, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        },
        {
          label: "EPS Act.",
          value: formatNumber(event.epsActual, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        },
        {
          label: "Revenue",
          value: formatRevenue(event.revenueEstimate ?? event.revenueActual),
        },
      ];
    case "Crypto":
    default:
      return [
        { label: "Network", value: event.network },
        {
          label: "Category",
          value: event.category.replace(/\b\w/g, (c) => c.toUpperCase()),
        },
        { label: "Location", value: event.location ?? "Global" },
      ];
  }
};

const EconomicCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
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
      // Fetch events for the selected date (Simulation Mode)
      const result = await economicCalendarService.getAllEvents(selectedDate);
      setEvents(result.events);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to load economic calendar.";
      setError(message);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Clock tick for "Real-time" status updates
  useEffect(() => {
    const clockId = window.setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000); // 1 second tick for live feel
    return () => window.clearInterval(clockId);
  }, []);

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const filteredEvents = useMemo(() => {
    const typeFiltered = events.filter((event) => filters[event.type]);
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
  }, [events, filters, searchQuery]);

  const handleToggleFilter = (key: EconomicEventType) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getEventStatus = (eventDate: string) => {
    const eventTime = new Date(eventDate).getTime();
    const now = currentTime;
    const diffMinutes = (eventTime - now) / 60000;

    if (Math.abs(diffMinutes) <= 15) return "live";
    if (diffMinutes < 0) return "completed";
    return "upcoming";
  };

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/80 dark:border-white/10 rounded-3xl shadow-soft-lg overflow-hidden min-h-[600px] flex flex-col">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-200 dark:border-white/10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-500" />
            Economic Calendar
          </h2>

          {/* Date Navigation */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 rounded-full p-1 border border-gray-200 dark:border-white/10">
            <button
              onClick={() => changeDate(-1)}
              className="p-2 hover:bg-white dark:hover:bg-white/10 rounded-full transition-colors text-gray-500 dark:text-gray-400"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 px-4 py-1">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 min-w-[140px] text-center">
                {selectedDate.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
                {isToday(selectedDate) && (
                  <span className="ml-2 text-xs text-blue-500 font-bold">
                    (Today)
                  </span>
                )}
              </span>
            </div>
            <button
              onClick={() => changeDate(1)}
              className="p-2 hover:bg-white dark:hover:bg-white/10 rounded-full transition-colors text-gray-500 dark:text-gray-400"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => handleToggleFilter(filter.key)}
                className={`px-4 py-1.5 rounded-full border text-xs font-semibold transition-all duration-300 ${
                  filters[filter.key]
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20"
                    : "bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search..."
              className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 px-10 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-gray-50/50 dark:bg-transparent">
        <AnimatePresence mode="wait">
          {error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-48 text-center"
            >
              <div className="mb-4 p-3 rounded-full bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
              <button
                type="button"
                onClick={() => fetchEvents()}
                className="inline-flex items-center gap-2 rounded-full px-6 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors text-sm font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            </motion.div>
          ) : loading ? (
            <div className="h-64 flex items-center justify-center">
              <Loading text="Syncing global events..." />
            </div>
          ) : filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">📅</div>
              <p className="text-gray-500 dark:text-gray-400">
                No events found for this date.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {filteredEvents.map((event, index) => {
                const { time } = formatDateTime(event.date);
                const metrics = buildMetrics(event);
                const status = getEventStatus(event.date);

                return (
                  <motion.article
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${
                      status === "completed"
                        ? "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/5 opacity-70 grayscale-[0.5]"
                        : "bg-white dark:bg-gray-900/40 border-gray-100 dark:border-white/10 hover:border-blue-500/30 hover:shadow-lg dark:hover:bg-white/5"
                    }`}
                  >
                    {/* Status Indicator Line */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${
                        status === "live"
                          ? "bg-red-500 animate-pulse"
                          : status === "completed"
                            ? "bg-gray-300 dark:bg-gray-700"
                            : "bg-blue-500"
                      }`}
                    />

                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center ml-2">
                      {/* Time & Type */}
                      <div className="flex flex-col gap-2 min-w-[100px]">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span
                            className={`text-sm font-medium ${status === "live" ? "text-red-500 font-bold" : ""}`}
                          >
                            {status === "live" ? "LIVE NOW" : time}
                          </span>
                        </div>
                        <Badge
                          className={`${TYPE_STYLES[event.type]} w-fit border`}
                        >
                          {event.type}
                        </Badge>
                      </div>

                      {/* Main Info */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          {event.country && (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                              {event.country}
                            </span>
                          )}
                          {event.type === "Earnings" && "ticker" in event && (
                            <span className="text-xs font-mono text-blue-500">
                              {event.ticker}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-1">
                          {event.description ||
                            "No additional details available."}
                        </p>
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-3 gap-2 w-full md:w-auto min-w-[300px]">
                        {metrics.map((metric) => (
                          <div
                            key={`${event.id}-${metric.label}`}
                            className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-center"
                          >
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                              {metric.label}
                            </p>
                            <p
                              className={`text-sm font-bold ${
                                metric.value === "—"
                                  ? "text-gray-400"
                                  : "text-gray-900 dark:text-white"
                              }`}
                            >
                              {metric.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-3 border-t border-gray-200 dark:border-white/10 text-center">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Displaying simulated market data in Real-time Mode.{" "}
          {lastUpdated &&
            `Last sync: ${new Date(lastUpdated).toLocaleTimeString()}`}
        </p>
      </div>
    </div>
  );
};
export default EconomicCalendar;
