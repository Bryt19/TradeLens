import { useState, useEffect, useCallback } from "react";
import {
  coinGeckoService,
  alphaVantageService,
  polygonStockService,
  newsService,
  newsDataService,
  polygonNewsService,
  cryptoPanicService,
} from "../services/api";
import {
  CoinGeckoCoin,
  AlphaVantageQuote,
  PolygonQuote,
  NewsArticle,
  APIError,
} from "../types";
import { storage } from "../utils/helpers";

// Generic hook for API calls with caching and error handling
export const useApi = <T>(
  apiCall: () => Promise<T>,
  cacheKey: string,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to get cached data first
      const cachedData = storage.get(cacheKey, null) as T | null;
      if (cachedData) {
        setData(cachedData);
      }

      // Fetch fresh data
      const result = await apiCall();
      setData(result);

      // Cache the result
      storage.set(cacheKey, result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch data";
      setError(errorMessage);

      // If we have cached data, keep showing it
      const cachedData = storage.get(cacheKey, null) as T | null;
      if (cachedData) {
        setData(cachedData);
      }
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Hook for cryptocurrency data
export const useCryptocurrencies = (limit: number = 50) => {
  return useApi(() => coinGeckoService.getTopCryptos(limit), "crypto-data", [
    limit,
  ]);
};

// Hook for individual cryptocurrency
export const useCryptocurrency = (id: string) => {
  return useApi(() => coinGeckoService.getCryptoById(id), `crypto-${id}`, [id]);
};

// Hook for cryptocurrency chart data
export const useCryptoChart = (id: string, days: number = 30) => {
  return useApi(
    () => coinGeckoService.getCryptoChartData(id, days),
    `crypto-chart-${id}-${days}`,
    [id, days]
  );
};

// Hook for stock quote with Polygon primary, Alpha Vantage fallback
export const useStockQuote = (symbol: string) => {
  const [data, setData] = useState<AlphaVantageQuote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!symbol) {
      setData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Try to get cached data first
      const cachedData = storage.get(
        `stock-${symbol}`,
        null
      ) as AlphaVantageQuote | null;
      if (cachedData) {
        setData(cachedData);
      }

      try {
        // Try Polygon first
        const polygonData = await polygonStockService.getStockQuote(symbol);

        // Convert Polygon format to Alpha Vantage format for compatibility
        const latestResult =
          polygonData.results[polygonData.results.length - 1];
        const previousResult =
          polygonData.results[polygonData.results.length - 2];

        const change =
          latestResult.c - (previousResult ? previousResult.c : latestResult.o);
        const changePercent = previousResult
          ? (change / previousResult.c) * 100
          : 0;

        const convertedData: AlphaVantageQuote = {
          "01. symbol": polygonData.ticker,
          "02. open": latestResult.o.toString(),
          "03. high": latestResult.h.toString(),
          "04. low": latestResult.l.toString(),
          "05. price": latestResult.c.toString(),
          "06. volume": latestResult.v.toString(),
          "07. latest trading day": new Date(latestResult.t)
            .toISOString()
            .split("T")[0],
          "08. previous close": previousResult
            ? previousResult.c.toString()
            : latestResult.o.toString(),
          "09. change": change.toString(),
          "10. change percent": `${changePercent.toFixed(2)}%`,
        };

        setData(convertedData);
        storage.set(`stock-${symbol}`, convertedData);
      } catch (polygonError) {
        console.warn("Polygon failed, trying Alpha Vantage:", polygonError);

        // Fallback to Alpha Vantage
        const alphaVantageData = await alphaVantageService.getStockQuote(
          symbol
        );
        setData(alphaVantageData);
        storage.set(`stock-${symbol}`, alphaVantageData);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch stock data";
      setError(errorMessage);

      // If we have cached data, keep showing it
      const cachedData = storage.get(
        `stock-${symbol}`,
        null
      ) as AlphaVantageQuote | null;
      if (cachedData) {
        setData(cachedData);
      }
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Hook for stock time series data with Polygon primary
export const useStockChart = (
  symbol: string,
  functionType:
    | "TIME_SERIES_DAILY"
    | "TIME_SERIES_WEEKLY"
    | "TIME_SERIES_MONTHLY" = "TIME_SERIES_DAILY"
) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!symbol) {
      setData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Try to get cached data first
      const cachedData = storage.get(
        `stock-chart-${symbol}-${functionType}`,
        null
      );
      if (cachedData) {
        setData(cachedData);
      }

      try {
        // Try Polygon first
        const timespan =
          functionType === "TIME_SERIES_DAILY"
            ? "day"
            : functionType === "TIME_SERIES_WEEKLY"
            ? "week"
            : "month";
        const limit =
          functionType === "TIME_SERIES_DAILY"
            ? 30
            : functionType === "TIME_SERIES_WEEKLY"
            ? 12
            : 12;

        const polygonData = await polygonStockService.getHistoricalData(
          symbol,
          timespan,
          limit
        );

        // Convert Polygon format to Alpha Vantage format for compatibility
        const convertedData: any = {};
        polygonData.results.forEach((result: any) => {
          const date = new Date(result.t).toISOString().split("T")[0];
          convertedData[date] = {
            "1. open": result.o.toString(),
            "2. high": result.h.toString(),
            "3. low": result.l.toString(),
            "4. close": result.c.toString(),
            "5. volume": result.v.toString(),
          };
        });

        setData(convertedData);
        storage.set(`stock-chart-${symbol}-${functionType}`, convertedData);
      } catch (polygonError) {
        console.warn("Polygon failed, trying Alpha Vantage:", polygonError);

        // Fallback to Alpha Vantage
        const alphaVantageData = await alphaVantageService.getTimeSeriesData(
          symbol,
          functionType
        );
        setData(alphaVantageData);
        storage.set(`stock-chart-${symbol}-${functionType}`, alphaVantageData);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch chart data";
      setError(errorMessage);

      // If we have cached data, keep showing it
      const cachedData = storage.get(
        `stock-chart-${symbol}-${functionType}`,
        null
      );
      if (cachedData) {
        setData(cachedData);
      }
    } finally {
      setLoading(false);
    }
  }, [symbol, functionType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Hook for financial news (using Polygon as primary source)
export const useFinancialNews = (page: number = 1, pageSize: number = 20) => {
  return useApi(
    () => polygonNewsService.getFinancialNews(page, pageSize),
    `financial-news-${page}-${pageSize}`,
    [page, pageSize]
  );
};

// Hook for crypto news (using Polygon as primary source)
export const useCryptoNews = (page: number = 1, pageSize: number = 20) => {
  return useApi(
    () => polygonNewsService.getCryptoNews(page, pageSize),
    `crypto-news-${page}-${pageSize}`,
    [page, pageSize]
  );
};

// Hook for business news (using Polygon as primary source)
export const useBusinessNews = (page: number = 1, pageSize: number = 20) => {
  return useApi(
    () => polygonNewsService.getBusinessNews(page, pageSize),
    `business-news-${page}-${pageSize}`,
    [page, pageSize]
  );
};

// CryptoPanic specific hooks for enhanced crypto news
export const useCryptoPanicNews = (page: number = 1, pageSize: number = 20) => {
  return useApi(
    () => cryptoPanicService.getCryptoNews(page, pageSize),
    `crypto-panic-news-${page}-${pageSize}`,
    [page, pageSize]
  );
};

export const useTrendingCryptoNews = (
  page: number = 1,
  pageSize: number = 20
) => {
  return useApi(
    () => cryptoPanicService.getTrendingCryptoNews(page, pageSize),
    `trending-crypto-news-${page}-${pageSize}`,
    [page, pageSize]
  );
};

export const useCryptoNewsBySentiment = (
  sentiment: "positive" | "negative" | "neutral" = "neutral",
  page: number = 1,
  pageSize: number = 20
) => {
  return useApi(
    () =>
      cryptoPanicService.getCryptoNewsBySentiment(sentiment, page, pageSize),
    `crypto-news-${sentiment}-${page}-${pageSize}`,
    [sentiment, page, pageSize]
  );
};

export const useCryptoNewsByCurrency = (
  currency: string,
  page: number = 1,
  pageSize: number = 20
) => {
  return useApi(
    () => cryptoPanicService.getCryptoNewsByCurrency(currency, page, pageSize),
    `crypto-news-${currency}-${page}-${pageSize}`,
    [currency, page, pageSize]
  );
};

// Hook for search functionality
export const useSearch = () => {
  const [searchResults, setSearchResults] = useState({
    crypto: [] as CoinGeckoCoin[],
    stocks: [] as any[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults({ crypto: [], stocks: [] });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [cryptoResults, stockResults] = await Promise.allSettled([
        coinGeckoService.searchCryptos(query),
        polygonStockService.searchStocks(query),
      ]);

      const crypto =
        cryptoResults.status === "fulfilled" ? cryptoResults.value.coins : [];

      // Convert Polygon tickers to the expected format
      const stocks =
        stockResults.status === "fulfilled"
          ? stockResults.value.map((ticker: any) => ({
              "1. symbol": ticker.ticker,
              "2. name": ticker.name,
              "3. type": ticker.type,
              "4. region": ticker.locale,
              "8. currency": ticker.currency_name,
            }))
          : [];

      setSearchResults({ crypto, stocks });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setLoading(false);
    }
  }, []);

  return { searchResults, loading, error, search };
};

// Hook for managing favorites
export const useFavorites = () => {
  const [cryptoFavorites, setCryptoFavorites] = useState<string[]>([]);
  const [stockFavorites, setStockFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Load favorites from localStorage
    const crypto = storage.get<string[]>("crypto-favorites", []);
    const stocks = storage.get<string[]>("stock-favorites", []);
    setCryptoFavorites(crypto);
    setStockFavorites(stocks);
  }, []);

  const toggleCryptoFavorite = useCallback((coinId: string) => {
    setCryptoFavorites((prev) => {
      const newFavorites = prev.includes(coinId)
        ? prev.filter((id) => id !== coinId)
        : [...prev, coinId];
      storage.set("crypto-favorites", newFavorites);
      // Emit event for notifications when added
      if (!prev.includes(coinId)) {
        window.dispatchEvent(
          new CustomEvent("favorite:add", {
            detail: { type: "crypto", id: coinId },
          })
        );
      }
      return newFavorites;
    });
  }, []);

  const toggleStockFavorite = useCallback((symbol: string) => {
    setStockFavorites((prev) => {
      const newFavorites = prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol];
      storage.set("stock-favorites", newFavorites);
      // Emit event for notifications when added
      if (!prev.includes(symbol)) {
        window.dispatchEvent(
          new CustomEvent("favorite:add", {
            detail: { type: "stock", id: symbol },
          })
        );
      }
      return newFavorites;
    });
  }, []);

  const isCryptoFavorite = useCallback(
    (coinId: string) => {
      return cryptoFavorites.includes(coinId);
    },
    [cryptoFavorites]
  );

  const isStockFavorite = useCallback(
    (symbol: string) => {
      return stockFavorites.includes(symbol);
    },
    [stockFavorites]
  );

  return {
    cryptoFavorites,
    stockFavorites,
    toggleCryptoFavorite,
    toggleStockFavorite,
    isCryptoFavorite,
    isStockFavorite,
  };
};
