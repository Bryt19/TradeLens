import {
  CoinGeckoCoin,
  ChartDataPoint,
  CandlestickData,
} from "../types";

// Format currency values
export const formatCurrency = (
  value: number,
  currency: string = "USD",
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

// Format large numbers (market cap, volume)
export const formatLargeNumber = (value: number): string => {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  } else {
    return `$${value.toFixed(2)}`;
  }
};

// Format percentage
export const formatPercentage = (
  value: number,
  decimals: number = 2,
): string => {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
};

// Format date
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Format date and time
export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Get relative time (e.g., "2 hours ago")
export const getRelativeTime = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    return formatDate(dateString);
  }
};

// Convert CoinGecko chart data to ChartDataPoint format
export const convertCoinGeckoChartData = (
  data: [number, number][],
): ChartDataPoint[] => {
  return data.map(([timestamp, value]) => ({
    timestamp,
    value,
  }));
};

// Convert Alpha Vantage time series to ChartDataPoint format
export const convertAlphaVantageTimeSeries = (data: {
  [date: string]: any;
}): ChartDataPoint[] => {
  return Object.entries(data)
    .map(([date, values]) => ({
      timestamp: new Date(date).getTime(),
      value: parseFloat(values["4. close"]),
      volume: parseFloat(values["5. volume"]),
    }))
    .sort((a, b) => a.timestamp - b.timestamp);
};

// Convert Alpha Vantage time series to CandlestickData format
export const convertToCandlestickData = (data: {
  [date: string]: any;
}): CandlestickData[] => {
  return Object.entries(data)
    .map(([date, values]) => ({
      timestamp: new Date(date).getTime(),
      open: parseFloat(values["1. open"]),
      high: parseFloat(values["2. high"]),
      low: parseFloat(values["3. low"]),
      close: parseFloat(values["4. close"]),
      volume: parseFloat(values["5. volume"]),
    }))
    .sort((a, b) => a.timestamp - b.timestamp);
};

// Get color based on price change
export const getPriceChangeColor = (change: number): string => {
  if (change > 0) return "text-green-500";
  if (change < 0) return "text-red-500";
  return "text-gray-500";
};

// Get background color based on price change
export const getPriceChangeBgColor = (change: number): string => {
  if (change > 0) return "bg-green-50 dark:bg-green-900/20";
  if (change < 0) return "bg-red-50 dark:bg-red-900/20";
  return "bg-gray-50 dark:bg-gray-800";
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Local storage helpers
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  },
};

// Error message helpers
export const getErrorMessage = (error: any): string => {
  if (typeof error === "string") return error;
  if (error?.message) return error.message;
  if (error?.response?.data?.message) return error.response.data.message;
  return "An unexpected error occurred";
};

// API key validation
export const validateAPIKeys = (): {
  isValid: boolean;
  missingKeys: string[];
} => {
  const missingKeys: string[] = [];

  // Check if we're using demo keys
  if (
    process.env.REACT_APP_ALPHA_VANTAGE_API_KEY === "demo" ||
    !process.env.REACT_APP_ALPHA_VANTAGE_API_KEY
  ) {
    missingKeys.push("Alpha Vantage API Key");
  }

  if (
    process.env.REACT_APP_NEWS_API_KEY === "your_news_api_key_here" ||
    !process.env.REACT_APP_NEWS_API_KEY
  ) {
    missingKeys.push("News API Key");
  }

  return {
    isValid: missingKeys.length === 0,
    missingKeys,
  };
};

// Optimize Google avatar URL for better loading
export const optimizeAvatarUrl = (
  url: string | undefined,
): string | undefined => {
  if (!url) return undefined;

  // If it's a Google avatar URL, add size parameter for better performance
  if (url.includes("googleusercontent.com") || url.includes("googleapis.com")) {
    // Add size parameter (s=64 for 64x64 pixels)
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}s=64`;
  }

  return url;
};

// Generate random demo data for testing
export const generateDemoData = () => {
  const cryptoData: CoinGeckoCoin[] = [
    {
      id: "bitcoin",
      symbol: "btc",
      name: "Bitcoin",
      image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      current_price: 45000,
      market_cap: 850000000000,
      market_cap_rank: 1,
      fully_diluted_valuation: 945000000000,
      total_volume: 25000000000,
      high_24h: 46000,
      low_24h: 44000,
      price_change_24h: 1000,
      price_change_percentage_24h: 2.27,
      market_cap_change_24h: 20000000000,
      market_cap_change_percentage_24h: 2.41,
      circulating_supply: 19000000,
      total_supply: 21000000,
      max_supply: 21000000,
      ath: 69000,
      ath_change_percentage: -34.78,
      ath_date: "2021-11-10T14:24:11.849Z",
      atl: 67.81,
      atl_change_percentage: 66263.74,
      atl_date: "2013-07-06T00:00:00.000Z",
      roi: null,
      last_updated: new Date().toISOString(),
    },
    // Add more demo data as needed
  ];

  return { cryptoData };
};
