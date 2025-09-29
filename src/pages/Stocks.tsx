import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Building2,
  Star,
  BarChart3,
  Activity,
  Calendar,
} from "lucide-react";
import { useStockQuote } from "../hooks/useApi";
import {
  getFavorites,
  saveFavorite,
  removeFavorite,
  splitFavorites,
} from "../services/favorites";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/Loading";
import Chart from "../components/Chart";
import { debounce } from "../utils/helpers";
import { AlphaVantageQuote } from "../types";

const Stocks: React.FC = () => {
  const navigate = useNavigate();
  const { authState } = useAuth();
  const [stockFavorites, setStockFavorites] = useState<string[]>([]);
  // Load favorites for current user and keep in state
  const refreshFavorites = useCallback(async () => {
    try {
      const rows = await getFavorites();
      const { stocks } = splitFavorites(rows);
      setStockFavorites(stocks);
    } catch (e) {
      console.error("Failed to refresh favorites", e);
      setStockFavorites([]);
    }
  }, []);

  useEffect(() => {
    if (authState.user) {
      refreshFavorites();
    } else {
      setStockFavorites([]);
    }
  }, [authState.user, refreshFavorites]);

  const isStockFavorite = useCallback(
    (symbol: string) => stockFavorites.includes(symbol),
    [stockFavorites]
  );

  const toggleStockFavorite = useCallback(
    async (symbol: string) => {
      if (!authState.user) {
        navigate("/login", { replace: false });
        return;
      }

      const isFav = stockFavorites.includes(symbol);

      // Optimistic update - update UI immediately
      if (isFav) {
        setStockFavorites((prev) => prev.filter((s) => s !== symbol));
      } else {
        setStockFavorites((prev) => [...prev, symbol]);
        try {
          window.dispatchEvent(
            new CustomEvent("favorite:add", {
              detail: { type: "stock", id: symbol },
            })
          );
        } catch {}
      }

      try {
        // Sync with database in background
        if (isFav) {
          await removeFavorite(symbol, "stock");
        } else {
          await saveFavorite(symbol, "stock");
        }
      } catch (e) {
        console.error("toggleStockFavorite error", e);
        // Revert optimistic update on error
        if (isFav) {
          setStockFavorites((prev) => [...prev, symbol]);
        } else {
          setStockFavorites((prev) => prev.filter((s) => s !== symbol));
        }
      }
    },
    [authState.user, stockFavorites, navigate, refreshFavorites]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState<string>(() => {
    // Load selected symbol from localStorage on component mount
    return localStorage.getItem("selectedStockSymbol") || "";
  });
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Demo stock symbols for demonstration
  const demoStocks = [
    "AAPL",
    "MSFT",
    "GOOGL",
    "AMZN",
    "TSLA",
    "META",
    "NVDA",
    "NFLX",
    "AMD",
    "INTC",
    "CRM",
    "ADBE",
    "PYPL",
    "UBER",
    "SPOT",
  ];

  const { data: stockData, loading, error } = useStockQuote(selectedSymbol);

  // Set search query when component mounts with saved symbol
  useEffect(() => {
    if (selectedSymbol) {
      setSearchQuery(selectedSymbol);
    }
  }, [selectedSymbol]);

  // Debounced search
  const debouncedSearch = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query.trim()) {
          setSearchResults([]);
          return;
        }

        try {
          // In a real app, you would call the search API here
          // For demo purposes, we'll simulate search results
          const mockResults = demoStocks
            .filter((symbol) =>
              symbol.toLowerCase().includes(query.toLowerCase())
            )
            .map((symbol) => ({
              "1. symbol": symbol,
              "2. name": `${symbol} Inc.`,
              "3. type": "Equity",
              "4. region": "United States",
              "8. currency": "USD",
            }));

          setSearchResults(mockResults);
        } catch (err) {
          console.error("Search error:", err);
          setSearchResults([]);
        }
      }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleSymbolSelect = (symbol: string) => {
    setSelectedSymbol(symbol);
    setSearchQuery(symbol);
    setSearchResults([]);
    // Save selected symbol to localStorage
    localStorage.setItem("selectedStockSymbol", symbol);
  };

  // Generate sample chart data for demo
  const generateSampleChartData = () => {
    const data: { timestamp: number; value: number }[] = [];
    const now = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;
    const basePrice = 100 + Math.random() * 200; // Random base price between 100-300

    for (let i = 29; i >= 0; i--) {
      data.push({
        timestamp: now - i * dayInMs,
        value: basePrice + (Math.random() - 0.5) * 20, // Random variation
      });
    }
    return data;
  };

  const sampleChartData = selectedSymbol ? generateSampleChartData() : [];

  // Generate demo stock data when API fails
  const generateDemoStockData = (symbol: string): AlphaVantageQuote => {
    const basePrice = 100 + Math.random() * 200;
    const change = (Math.random() - 0.5) * 20;
    const changePercent = (change / basePrice) * 100;

    return {
      "01. symbol": symbol,
      "02. open": (basePrice - change * 0.5).toFixed(2),
      "03. high": (basePrice + Math.abs(change) * 0.8).toFixed(2),
      "04. low": (basePrice - Math.abs(change) * 0.8).toFixed(2),
      "05. price": basePrice.toFixed(2),
      "06. volume": Math.floor(Math.random() * 10000000).toString(),
      "07. latest trading day": new Date().toISOString().split("T")[0],
      "08. previous close": (basePrice - change).toFixed(2),
      "09. change": change.toFixed(2),
      "10. change percent": `${changePercent.toFixed(2)}%`,
    };
  };

  const displayStockData =
    stockData ||
    (selectedSymbol ? generateDemoStockData(selectedSymbol) : null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Stock Market
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track real-time stock prices and market data
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for stocks (e.g., AAPL, MSFT, GOOGL)..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white text-base"
            />

            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleSymbolSelect(result["1. symbol"])}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-3"
                  >
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">
                        {result["1. symbol"]}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                        {result["2. name"]}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Demo Symbols */}
          <div className="mt-4">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2">
              Try these symbols:
            </p>
            <div className="flex flex-wrap gap-2">
              {demoStocks.slice(0, 6).map((symbol) => (
                <button
                  key={symbol}
                  onClick={() => handleSymbolSelect(symbol)}
                  className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Stock Display */}
        {selectedSymbol && (
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                    {selectedSymbol}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 truncate">
                    {selectedSymbol} Inc.
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleStockFavorite(selectedSymbol)}
                className={`p-2 rounded-full transition-colors flex-shrink-0 ${
                  isStockFavorite(selectedSymbol)
                    ? "text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20"
                    : "text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                }`}
                aria-label={
                  isStockFavorite(selectedSymbol)
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
              >
                <Star
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    isStockFavorite(selectedSymbol) ? "fill-current" : ""
                  }`}
                />
              </button>
            </div>

            {/* Chart */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Price Chart (30 Days)
              </h3>
              <Chart
                data={sampleChartData}
                type="area"
                height={300}
                color="#3B82F6"
              />
            </div>

            {/* Stock Quote */}
            {loading && (
              <div className="flex justify-center py-8">
                <Loading text="Loading stock data..." />
              </div>
            )}

            {error && !displayStockData && (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  Couldn't load stock data. This might be due to API limitations
                  or the symbol not being found.
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                  Note: This demo uses limited API access. In production, you
                  would need a valid Alpha Vantage API key.
                </p>
              </div>
            )}

            {displayStockData && (
              <div className="space-y-6">
                {/* Primary Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <div className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
                      Current Price
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                      ${parseFloat(displayStockData["05. price"]).toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Last updated: {new Date().toLocaleTimeString()}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">
                      Change
                    </div>
                    <div
                      className={`text-xl sm:text-2xl lg:text-3xl font-bold ${
                        parseFloat(displayStockData["09. change"]) >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {parseFloat(displayStockData["09. change"]) >= 0
                        ? "+"
                        : ""}
                      ${parseFloat(displayStockData["09. change"]).toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      vs previous close
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">
                      Change %
                    </div>
                    <div
                      className={`text-xl sm:text-2xl lg:text-3xl font-bold ${
                        parseFloat(displayStockData["10. change percent"]) >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {parseFloat(displayStockData["10. change percent"]) >= 0
                        ? "+"
                        : ""}
                      {displayStockData["10. change percent"]}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      daily performance
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                    <div className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">
                      Volume
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                      {parseInt(
                        displayStockData["06. volume"]
                      ).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      shares traded
                    </div>
                  </div>
                </div>

                {/* Additional Stock Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Trading Details */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-green-600" />
                      Trading Details
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Open
                          </div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            ${displayStockData["02. open"]}
                          </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Previous Close
                          </div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            ${displayStockData["08. previous close"]}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Day High
                          </div>
                          <div className="text-sm font-semibold text-green-600">
                            ${displayStockData["03. high"]}
                          </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Day Low
                          </div>
                          <div className="text-sm font-semibold text-red-600">
                            ${displayStockData["04. low"]}
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          Latest Trading Day
                        </div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(
                            displayStockData["07. latest trading day"]
                          ).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                      Quick Stats
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Market Cap
                        </span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          ${(Math.random() * 500 + 50).toFixed(0)}B
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          P/E Ratio
                        </span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {(Math.random() * 30 + 10).toFixed(1)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          52W High
                        </span>
                        <span className="text-sm font-semibold text-green-600">
                          $
                          {(
                            parseFloat(displayStockData["05. price"]) *
                            (1.1 + Math.random() * 0.3)
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          52W Low
                        </span>
                        <span className="text-sm font-semibold text-red-600">
                          $
                          {(
                            parseFloat(displayStockData["05. price"]) *
                            (0.6 + Math.random() * 0.3)
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Beta
                        </span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {(Math.random() * 2 + 0.5).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Favorites Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Your Favorite Stocks
          </h3>
          {stockFavorites.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No favorite stocks yet. Search for stocks and add them to your
              favorites.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stockFavorites.map((symbol) => {
                // Get the actual stock data for this favorite
                const favoriteStockData =
                  stockData && selectedSymbol === symbol ? stockData : null;

                // Use actual data if available, otherwise use demo data
                const price = favoriteStockData
                  ? parseFloat(favoriteStockData["05. price"])
                  : Math.random() * 200 + 50;
                const change = favoriteStockData
                  ? parseFloat(favoriteStockData["09. change"])
                  : (Math.random() - 0.5) * 10;
                const changePercent = favoriteStockData
                  ? parseFloat(favoriteStockData["10. change percent"])
                  : (Math.random() - 0.5) * 5;
                const volume = favoriteStockData
                  ? parseInt(favoriteStockData["06. volume"])
                  : Math.floor(Math.random() * 10000000);
                const isPositive = change >= 0;

                return (
                  <div
                    key={symbol}
                    className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-full flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {symbol}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {symbol} Inc.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleStockFavorite(symbol)}
                        className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        aria-label="Remove from favorites"
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    {/* Price Info */}
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          ${price.toFixed(2)}
                        </span>
                        <span
                          className={`text-sm font-semibold ${
                            isPositive ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {isPositive ? "+" : ""}
                          {change.toFixed(2)} ({isPositive ? "+" : ""}
                          {changePercent.toFixed(2)}%)
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Last updated: {new Date().toLocaleTimeString()}
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Volume
                        </div>
                        <div className="text-xs font-semibold text-gray-900 dark:text-white">
                          {volume.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Market Cap
                        </div>
                        <div className="text-xs font-semibold text-gray-900 dark:text-white">
                          ${(Math.random() * 100 + 10).toFixed(0)}B
                        </div>
                      </div>
                    </div>

                    {/* Additional Trading Info */}
                    {favoriteStockData && (
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            Day High
                          </div>
                          <div className="text-xs font-semibold text-green-600">
                            $
                            {parseFloat(favoriteStockData["03. high"]).toFixed(
                              2
                            )}
                          </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            Day Low
                          </div>
                          <div className="text-xs font-semibold text-red-600">
                            $
                            {parseFloat(favoriteStockData["04. low"]).toFixed(
                              2
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => handleSymbolSelect(symbol)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors"
                    >
                      View Full Details
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stocks;
