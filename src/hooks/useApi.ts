import { useState, useEffect, useCallback } from "react";
import {
  coinGeckoService,
  alphaVantageService,
  newsService,
  newsDataService,
  polygonNewsService,
  cryptoPanicService,
} from "../services/api";
import {
  CoinGeckoCoin,
  AlphaVantageQuote,
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

// Hook for stock quote
export const useStockQuote = (symbol: string) => {
  return useApi(
    () => alphaVantageService.getStockQuote(symbol),
    `stock-${symbol}`,
    [symbol]
  );
};

// Hook for stock time series data
export const useStockChart = (
  symbol: string,
  functionType:
    | "TIME_SERIES_DAILY"
    | "TIME_SERIES_WEEKLY"
    | "TIME_SERIES_MONTHLY" = "TIME_SERIES_DAILY"
) => {
  return useApi(
    () => alphaVantageService.getTimeSeriesData(symbol, functionType),
    `stock-chart-${symbol}-${functionType}`,
    [symbol, functionType]
  );
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
        alphaVantageService.searchStocks(query),
      ]);

      const crypto =
        cryptoResults.status === "fulfilled" ? cryptoResults.value.coins : [];
      const stocks =
        stockResults.status === "fulfilled" ? stockResults.value : [];

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
