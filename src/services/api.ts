import axios, { AxiosResponse, AxiosError } from "axios";
import {
  CoinGeckoCoin,
  CoinGeckoChartData,
  AlphaVantageQuote,
  AlphaVantageTimeSeries,
  PolygonQuote,
  PolygonTicker,
  NewsAPIResponse,
  APIError,
} from "../types";
import {
  demoCryptoData,
  demoNewsData,
  generateMoreCryptoData,
  generateMoreNewsData,
} from "./demoData";

// API Configuration
const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";
const ALPHA_VANTAGE_BASE_URL = "https://www.alphavantage.co/query";
const NEWS_API_BASE_URL = "https://newsapi.org/v2";
const NEWSDATA_BASE_URL = "https://newsdata.io/api/1";
const CRYPTOPANIC_BASE_URL = "https://cryptopanic.com/api/v1";
const POLYGON_BASE_URL = "https://api.polygon.io";
const WORLDNEWS_BASE_URL = "https://api.worldnewsapi.com";
const GNEWS_BASE_URL = "https://gnews.io/api/v4";

// API Keys (using environment variables)
const ALPHA_VANTAGE_API_KEY =
  import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || "YFXX02SNR0BC4ZAB";
const NEWS_API_KEY =
  import.meta.env.VITE_NEWS_API_KEY || "3fe36ec1033c41c8976ff40d29045443";
const NEWSDATA_API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY;
const CRYPTOPANIC_API_KEY = import.meta.env.VITE_CRYPTOPANIC_API_KEY;
const POLYGON_API_KEY = "jjl8Zd3Yp1weLsN9io1LcYYwNzUbD0SS";
const WORLDNEWS_API_KEY =
  import.meta.env.VITE_WORLDNEWS_API_KEY || "fb06661485d9499b9169ec21a44509d2";
const GNEWS_API_KEY =
  import.meta.env.VITE_GNEWS_API_KEY || "b258c4a55adb264bb74d5f8ca3e057cc";

// Axios instances with default configs
const coinGeckoAPI = axios.create({
  baseURL: COINGECKO_BASE_URL,
  timeout: 10000,
});

const alphaVantageAPI = axios.create({
  baseURL: ALPHA_VANTAGE_BASE_URL,
  timeout: 10000,
});

const newsAPI = axios.create({
  baseURL: NEWS_API_BASE_URL,
  timeout: 10000,
});

const newsDataAPI = axios.create({
  baseURL: NEWSDATA_BASE_URL,
  timeout: 10000,
});

const cryptoPanicAPI = axios.create({
  baseURL: CRYPTOPANIC_BASE_URL,
  timeout: 10000,
});

const polygonAPI = axios.create({
  baseURL: POLYGON_BASE_URL,
  timeout: 10000,
});

const worldNewsAPI = axios.create({
  baseURL: WORLDNEWS_BASE_URL,
  timeout: 10000,
});

const gnewsAPI = axios.create({
  baseURL: GNEWS_BASE_URL,
  timeout: 10000,
});

// Error handling utility
const handleAPIError = (error: AxiosError): APIError => {
  if (error.response) {
    return {
      message: `API Error: ${error.response.status} - ${error.response.statusText}`,
      status: error.response.status,
    };
  } else if (error.request) {
    return {
      message: "Network Error: Unable to connect to the server",
    };
  } else {
    return {
      message: "Request Error: Something went wrong",
    };
  }
};

// CoinGecko API Services
export const coinGeckoService = {
  // Get top cryptocurrencies by market cap
  getTopCryptos: async (limit: number = 50): Promise<CoinGeckoCoin[]> => {
    try {
      const response: AxiosResponse<CoinGeckoCoin[]> = await coinGeckoAPI.get(
        `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h`
      );
      return response.data;
    } catch (error) {
      console.warn("CoinGecko API failed, using demo data:", error);
      // Return demo data when API fails
      const demoData = [
        ...demoCryptoData,
        ...generateMoreCryptoData(Math.max(0, limit - demoCryptoData.length)),
      ];
      return demoData.slice(0, limit);
    }
  },

  // Get cryptocurrency by ID
  getCryptoById: async (id: string): Promise<CoinGeckoCoin> => {
    try {
      const response: AxiosResponse<CoinGeckoCoin> = await coinGeckoAPI.get(
        `/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      );
      return response.data;
    } catch (error) {
      throw handleAPIError(error as AxiosError);
    }
  },

  // Get historical price data for charts
  getCryptoChartData: async (
    id: string,
    days: number = 30,
    vs_currency: string = "usd"
  ): Promise<CoinGeckoChartData> => {
    try {
      const response: AxiosResponse<CoinGeckoChartData> =
        await coinGeckoAPI.get(
          `/coins/${id}/market_chart?vs_currency=${vs_currency}&days=${days}&interval=${
            days <= 1 ? "hourly" : "daily"
          }`
        );
      return response.data;
    } catch (error) {
      throw handleAPIError(error as AxiosError);
    }
  },

  // Search cryptocurrencies
  searchCryptos: async (query: string): Promise<{ coins: CoinGeckoCoin[] }> => {
    try {
      const response = await coinGeckoAPI.get(
        `/search?query=${encodeURIComponent(query)}`
      );
      return response.data;
    } catch (error) {
      throw handleAPIError(error as AxiosError);
    }
  },
};

// Alpha Vantage API Services
export const alphaVantageService = {
  // Get stock quote
  getStockQuote: async (symbol: string): Promise<AlphaVantageQuote> => {
    try {
      const response = await alphaVantageAPI.get(
        `?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
      );

      if (response.data["Error Message"]) {
        throw new Error(response.data["Error Message"]);
      }

      if (response.data["Note"]) {
        throw new Error(
          "API call frequency limit reached. Please try again later."
        );
      }

      return response.data["Global Quote"];
    } catch (error) {
      throw handleAPIError(error as AxiosError);
    }
  },

  // Get time series data for charts
  getTimeSeriesData: async (
    symbol: string,
    function_type:
      | "TIME_SERIES_DAILY"
      | "TIME_SERIES_WEEKLY"
      | "TIME_SERIES_MONTHLY" = "TIME_SERIES_DAILY"
  ): Promise<AlphaVantageTimeSeries> => {
    try {
      const response = await alphaVantageAPI.get(
        `?function=${function_type}&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}&outputsize=compact`
      );

      if (response.data["Error Message"]) {
        throw new Error(response.data["Error Message"]);
      }

      if (response.data["Note"]) {
        throw new Error(
          "API call frequency limit reached. Please try again later."
        );
      }

      const timeSeriesKey = Object.keys(response.data).find((key) =>
        key.includes("Time Series")
      );

      return response.data[timeSeriesKey!] || {};
    } catch (error) {
      throw handleAPIError(error as AxiosError);
    }
  },

  // Search for stocks
  searchStocks: async (keywords: string): Promise<any> => {
    try {
      const response = await alphaVantageAPI.get(
        `?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(
          keywords
        )}&apikey=${ALPHA_VANTAGE_API_KEY}`
      );

      if (response.data["Error Message"]) {
        throw new Error(response.data["Error Message"]);
      }

      return response.data.bestMatches || [];
    } catch (error) {
      throw handleAPIError(error as AxiosError);
    }
  },
};

// News API Services
export const newsService = {
  // Get financial news
  getFinancialNews: async (
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsAPIResponse> => {
    try {
      const response = await newsAPI.get(
        `/everything?q=finance OR stock OR market OR economy&language=en&sortBy=publishedAt&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.warn("News API failed, using demo data:", error);
      // Return demo data when API fails
      const allDemoNews = [...demoNewsData, ...generateMoreNewsData(50)];
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return {
        status: "ok",
        totalResults: allDemoNews.length,
        articles: allDemoNews.slice(startIndex, endIndex),
      };
    }
  },

  // Get crypto news
  getCryptoNews: async (
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsAPIResponse> => {
    try {
      const response = await newsAPI.get(
        `/everything?q=cryptocurrency OR bitcoin OR ethereum OR crypto&language=en&sortBy=publishedAt&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.warn("News API failed, using demo data:", error);
      // Return demo data when API fails
      const allDemoNews = [...demoNewsData, ...generateMoreNewsData(50)];
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return {
        status: "ok",
        totalResults: allDemoNews.length,
        articles: allDemoNews.slice(startIndex, endIndex),
      };
    }
  },

  // Get general business news
  getBusinessNews: async (
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsAPIResponse> => {
    try {
      const response = await newsAPI.get(
        `/top-headlines?category=business&language=en&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.warn("News API failed, using demo data:", error);
      // Return demo data when API fails
      const allDemoNews = [...demoNewsData, ...generateMoreNewsData(50)];
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return {
        status: "ok",
        totalResults: allDemoNews.length,
        articles: allDemoNews.slice(startIndex, endIndex),
      };
    }
  },
};

// Polygon.io Stock Services
export const polygonStockService = {
  // Get stock quote (latest price)
  getStockQuote: async (symbol: string): Promise<PolygonQuote> => {
    try {
      const response = await polygonAPI.get(
        `/v2/aggs/ticker/${symbol}/prev?adjusted=true&apikey=${POLYGON_API_KEY}`
      );

      if (!response.data.results || response.data.results.length === 0) {
        throw new Error(`No data found for symbol: ${symbol}`);
      }

      return response.data;
    } catch (error) {
      throw handleAPIError(error as AxiosError);
    }
  },

  // Get historical stock data
  getHistoricalData: async (
    symbol: string,
    timespan: "day" | "week" | "month" = "day",
    limit: number = 30
  ): Promise<PolygonQuote> => {
    try {
      const multiplier = timespan === "day" ? 1 : timespan === "week" ? 7 : 30;
      const from = new Date();
      from.setDate(from.getDate() - limit * multiplier);
      const fromDate = from.toISOString().split("T")[0];
      const toDate = new Date().toISOString().split("T")[0];

      const response = await polygonAPI.get(
        `/v2/aggs/ticker/${symbol}/range/${multiplier}/${timespan}/${fromDate}/${toDate}?adjusted=true&sort=asc&apikey=${POLYGON_API_KEY}`
      );

      if (!response.data.results || response.data.results.length === 0) {
        throw new Error(`No historical data found for symbol: ${symbol}`);
      }

      return response.data;
    } catch (error) {
      throw handleAPIError(error as AxiosError);
    }
  },

  // Search for stocks
  searchStocks: async (query: string): Promise<PolygonTicker[]> => {
    try {
      const response = await polygonAPI.get(
        `/v3/reference/tickers?search=${encodeURIComponent(
          query
        )}&active=true&limit=10&apikey=${POLYGON_API_KEY}`
      );

      return response.data.results || [];
    } catch (error) {
      throw handleAPIError(error as AxiosError);
    }
  },

  // Get real-time stock data (if available in your plan)
  getRealtimeData: async (symbol: string): Promise<any> => {
    try {
      const response = await polygonAPI.get(
        `/v2/last/trade/${symbol}?apikey=${POLYGON_API_KEY}`
      );

      return response.data;
    } catch (error) {
      throw handleAPIError(error as AxiosError);
    }
  },
};

// Polygon.io News Services (Preferred news source)
export const polygonNewsService = {
  // Get financial/business/market news
  getFinancialNews: async (
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsAPIResponse> => {
    try {
      // Polygon v2 reference news
      const response = await polygonAPI.get(
        `/v2/reference/news?order=desc&limit=${pageSize}&sort=published_utc&apiKey=${POLYGON_API_KEY}&page=${page}`
      );

      const results = response.data.results || [];
      return {
        status: "ok",
        totalResults: response.data.count || results.length || 0,
        articles: results.map((n: any) => ({
          title: n.title,
          description: n.description,
          url: n.article_url,
          urlToImage: n.image_url,
          publishedAt: n.published_utc,
          source: {
            id: n.publisher?.name || "Polygon",
            name: n.publisher?.name || "Polygon",
          },
        })),
      };
    } catch (error) {
      console.warn("Polygon API failed, falling back to GNews:", error);
      return gnewsService.getFinancialNews(page, pageSize);
    }
  },

  // Get crypto-focused news (filter by crypto tickers or keywords)
  getCryptoNews: async (
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsAPIResponse> => {
    try {
      const response = await polygonAPI.get(
        `/v2/reference/news?order=desc&limit=${pageSize}&sort=published_utc&apiKey=${POLYGON_API_KEY}&page=${page}&category=crypto`
      );

      const results = response.data.results || [];
      return {
        status: "ok",
        totalResults: response.data.count || results.length || 0,
        articles: results.map((n: any) => ({
          title: n.title,
          description: n.description,
          url: n.article_url,
          urlToImage: n.image_url,
          publishedAt: n.published_utc,
          source: {
            id: n.publisher?.name || "Polygon",
            name: n.publisher?.name || "Polygon",
          },
        })),
      };
    } catch (error) {
      console.warn("Polygon API failed, falling back to GNews:", error);
      return gnewsService.getCryptoNews(page, pageSize);
    }
  },

  // Get general business news (alias of financial here)
  getBusinessNews: async (
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsAPIResponse> => {
    try {
      const response = await polygonAPI.get(
        `/v2/reference/news?order=desc&limit=${pageSize}&sort=published_utc&apiKey=${POLYGON_API_KEY}&page=${page}`
      );

      const results = response.data.results || [];
      return {
        status: "ok",
        totalResults: response.data.count || results.length || 0,
        articles: results.map((n: any) => ({
          title: n.title,
          description: n.description,
          url: n.article_url,
          urlToImage: n.image_url,
          publishedAt: n.published_utc,
          source: {
            id: n.publisher?.name || "Polygon",
            name: n.publisher?.name || "Polygon",
          },
        })),
      };
    } catch (error) {
      console.warn("Polygon API failed, falling back to GNews:", error);
      return gnewsService.getBusinessNews(page, pageSize);
    }
  },
};

// WorldNewsAPI Services (Optional alternative/fallback)
export const worldNewsService = {
  getFinancialNews: async (
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsAPIResponse> => {
    try {
      const response = await worldNewsAPI.get(
        `/search-news?language=en&sort=publish-time&offset=${
          (page - 1) * pageSize
        }&number=${pageSize}&api-key=${WORLDNEWS_API_KEY}`
      );

      const results = response.data.news || [];
      return {
        status: "ok",
        totalResults: response.data.available || results.length || 0,
        articles: results.map((n: any) => ({
          title: n.title,
          description: n.text,
          url: n.url,
          urlToImage: n.image,
          publishedAt: n.publish_date,
          source: {
            id: n.source || "WorldNewsAPI",
            name: n.source || "WorldNewsAPI",
          },
        })),
      };
    } catch (error) {
      console.warn("WorldNewsAPI failed, falling back to NewsData.io:", error);
      return newsDataService.getFinancialNews(page, pageSize);
    }
  },

  getBusinessNews: async (
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsAPIResponse> => {
    try {
      const response = await worldNewsAPI.get(
        `/search-news?language=en&sort=publish-time&offset=${
          (page - 1) * pageSize
        }&number=${pageSize}&api-key=${WORLDNEWS_API_KEY}&topic=business`
      );
      const results = response.data.news || [];
      return {
        status: "ok",
        totalResults: response.data.available || results.length || 0,
        articles: results.map((n: any) => ({
          title: n.title,
          description: n.text,
          url: n.url,
          urlToImage: n.image,
          publishedAt: n.publish_date,
          source: {
            id: n.source || "WorldNewsAPI",
            name: n.source || "WorldNewsAPI",
          },
        })),
      };
    } catch (error) {
      console.warn("WorldNewsAPI failed, falling back to NewsData.io:", error);
      return newsDataService.getBusinessNews(page, pageSize);
    }
  },

  getCryptoNews: async (
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsAPIResponse> => {
    try {
      const response = await worldNewsAPI.get(
        `/search-news?language=en&sort=publish-time&offset=${
          (page - 1) * pageSize
        }&number=${pageSize}&api-key=${WORLDNEWS_API_KEY}&q=crypto OR bitcoin OR ethereum`
      );
      const results = response.data.news || [];
      return {
        status: "ok",
        totalResults: response.data.available || results.length || 0,
        articles: results.map((n: any) => ({
          title: n.title,
          description: n.text,
          url: n.url,
          urlToImage: n.image,
          publishedAt: n.publish_date,
          source: {
            id: n.source || "WorldNewsAPI",
            name: n.source || "WorldNewsAPI",
          },
        })),
      };
    } catch (error) {
      console.warn("WorldNewsAPI failed, falling back to CryptoPanic:", error);
      return cryptoPanicService.getCryptoNews(page, pageSize);
    }
  },
};

// GNews Services (Backup fallback)
export const gnewsService = {
  getFinancialNews: async (
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsAPIResponse> => {
    try {
      const response = await gnewsAPI.get(
        `/search?q=finance%20OR%20stock%20OR%20market%20OR%20economy&lang=en&sortby=publishedAt&max=${pageSize}&page=${page}&apikey=${GNEWS_API_KEY}`
      );
      const results = response.data.articles || [];
      return {
        status: "ok",
        totalResults: response.data.totalArticles || results.length || 0,
        articles: results.map((n: any) => ({
          title: n.title,
          description: n.description,
          url: n.url,
          urlToImage: n.image,
          publishedAt: n.publishedAt,
          source: {
            id: n.source?.name || "GNews",
            name: n.source?.name || "GNews",
          },
        })),
      };
    } catch (error) {
      console.warn("GNews failed, falling back to NewsData.io:", error);
      return newsDataService.getFinancialNews(page, pageSize);
    }
  },

  getBusinessNews: async (
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsAPIResponse> => {
    try {
      const response = await gnewsAPI.get(
        `/search?q=business&lang=en&sortby=publishedAt&max=${pageSize}&page=${page}&apikey=${GNEWS_API_KEY}`
      );
      const results = response.data.articles || [];
      return {
        status: "ok",
        totalResults: response.data.totalArticles || results.length || 0,
        articles: results.map((n: any) => ({
          title: n.title,
          description: n.description,
          url: n.url,
          urlToImage: n.image,
          publishedAt: n.publishedAt,
          source: {
            id: n.source?.name || "GNews",
            name: n.source?.name || "GNews",
          },
        })),
      };
    } catch (error) {
      console.warn("GNews failed, falling back to NewsData.io:", error);
      return newsDataService.getBusinessNews(page, pageSize);
    }
  },

  getCryptoNews: async (
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsAPIResponse> => {
    try {
      const response = await gnewsAPI.get(
        `/search?q=cryptocurrency%20OR%20bitcoin%20OR%20ethereum%20OR%20crypto&lang=en&sortby=publishedAt&max=${pageSize}&page=${page}&apikey=${GNEWS_API_KEY}`
      );
      const results = response.data.articles || [];
      return {
        status: "ok",
        totalResults: response.data.totalArticles || results.length || 0,
        articles: results.map((n: any) => ({
          title: n.title,
          description: n.description,
          url: n.url,
          urlToImage: n.image,
          publishedAt: n.publishedAt,
          source: {
            id: n.source?.name || "GNews",
            name: n.source?.name || "GNews",
          },
        })),
      };
    } catch (error) {
      console.warn("GNews failed, falling back to CryptoPanic:", error);
      return cryptoPanicService.getCryptoNews(page, pageSize);
    }
  },
};

// NewsData.io API Services (Primary news source)
export const newsDataService = {
  // Get financial news from NewsData.io
  getFinancialNews: async (
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsAPIResponse> => {
    try {
      const response = await newsDataAPI.get(
        `/news?apikey=${NEWSDATA_API_KEY}&category=business,finance&language=en&page=${page}&size=${pageSize}`
      );

      // Transform NewsData.io response to match NewsAPI format
      return {
        status: "ok",
        totalResults:
          response.data.totalResults || response.data.results?.length || 0,
        articles:
          response.data.results?.map((article: any) => ({
            title: article.title,
            description: article.description,
            url: article.link,
            urlToImage: article.image_url,
            publishedAt: article.pubDate,
            source: {
              id: article.source_id,
              name: article.source_priority,
            },
          })) || [],
      };
    } catch (error) {
      console.warn("NewsData.io API failed, falling back to NewsAPI:", error);
      // Fallback to NewsAPI
      return newsService.getFinancialNews(page, pageSize);
    }
  },

  // Get crypto news from NewsData.io
  getCryptoNews: async (
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsAPIResponse> => {
    try {
      const response = await newsDataAPI.get(
        `/news?apikey=${NEWSDATA_API_KEY}&q=cryptocurrency,bitcoin,ethereum,crypto&language=en&page=${page}&size=${pageSize}`
      );

      // Transform NewsData.io response to match NewsAPI format
      return {
        status: "ok",
        totalResults:
          response.data.totalResults || response.data.results?.length || 0,
        articles:
          response.data.results?.map((article: any) => ({
            title: article.title,
            description: article.description,
            url: article.link,
            urlToImage: article.image_url,
            publishedAt: article.pubDate,
            source: {
              id: article.source_id,
              name: article.source_priority,
            },
          })) || [],
      };
    } catch (error) {
      console.warn("NewsData.io API failed, falling back to NewsAPI:", error);
      // Fallback to NewsAPI
      return newsService.getCryptoNews(page, pageSize);
    }
  },

  // Get general business news from NewsData.io
  getBusinessNews: async (
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsAPIResponse> => {
    try {
      const response = await newsDataAPI.get(
        `/news?apikey=${NEWSDATA_API_KEY}&category=business&language=en&page=${page}&size=${pageSize}`
      );

      // Transform NewsData.io response to match NewsAPI format
      return {
        status: "ok",
        totalResults:
          response.data.totalResults || response.data.results?.length || 0,
        articles:
          response.data.results?.map((article: any) => ({
            title: article.title,
            description: article.description,
            url: article.link,
            urlToImage: article.image_url,
            publishedAt: article.pubDate,
            source: {
              id: article.source_id,
              name: article.source_priority,
            },
          })) || [],
      };
    } catch (error) {
      console.warn("NewsData.io API failed, falling back to NewsAPI:", error);
      // Fallback to NewsAPI
      return newsService.getBusinessNews(page, pageSize);
    }
  },
};

// CryptoPanic API Services (Specialized crypto news and sentiment)
export const cryptoPanicService = {
  // Get crypto news from CryptoPanic
  getCryptoNews: async (
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsAPIResponse> => {
    try {
      const response = await cryptoPanicAPI.get(
        `/posts/?auth_token=${CRYPTOPANIC_API_KEY}&public=true&page=${page}&per_page=${pageSize}`
      );

      // Transform CryptoPanic response to match NewsAPI format
      return {
        status: "ok",
        totalResults: response.data.count || response.data.results?.length || 0,
        articles:
          response.data.results?.map((article: any) => ({
            title: article.title,
            description: article.metadata?.description || article.title,
            url: article.url,
            urlToImage:
              article.metadata?.image ||
              article.currencies?.[0]?.logo ||
              "/api/placeholder/300/200",
            publishedAt: article.published_at,
            source: {
              id: article.source?.title || "CryptoPanic",
              name: article.source?.title || "CryptoPanic",
            },
            // Additional CryptoPanic specific data
            sentiment:
              article.votes?.positive > article.votes?.negative
                ? "positive"
                : article.votes?.negative > article.votes?.positive
                ? "negative"
                : "neutral",
            votes: article.votes,
            currencies: article.currencies,
          })) || [],
      };
    } catch (error) {
      console.warn(
        "CryptoPanic API failed, falling back to NewsData.io:",
        error
      );
      // Fallback to NewsData.io
      return newsDataService.getCryptoNews(page, pageSize);
    }
  },

  // Get trending crypto news
  getTrendingCryptoNews: async (
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsAPIResponse> => {
    try {
      const response = await cryptoPanicAPI.get(
        `/posts/?auth_token=${CRYPTOPANIC_API_KEY}&public=true&filter=hot&page=${page}&per_page=${pageSize}`
      );

      // Transform CryptoPanic response to match NewsAPI format
      return {
        status: "ok",
        totalResults: response.data.count || response.data.results?.length || 0,
        articles:
          response.data.results?.map((article: any) => ({
            title: article.title,
            description: article.metadata?.description || article.title,
            url: article.url,
            urlToImage:
              article.metadata?.image ||
              article.currencies?.[0]?.logo ||
              "/api/placeholder/300/200",
            publishedAt: article.published_at,
            source: {
              id: article.source?.title || "CryptoPanic",
              name: article.source?.title || "CryptoPanic",
            },
            sentiment:
              article.votes?.positive > article.votes?.negative
                ? "positive"
                : article.votes?.negative > article.votes?.positive
                ? "negative"
                : "neutral",
            votes: article.votes,
            currencies: article.currencies,
          })) || [],
      };
    } catch (error) {
      console.warn(
        "CryptoPanic API failed, falling back to NewsData.io:",
        error
      );
      // Fallback to NewsData.io
      return newsDataService.getCryptoNews(page, pageSize);
    }
  },

  // Get crypto news by sentiment (positive, negative, neutral)
  getCryptoNewsBySentiment: async (
    sentiment: "positive" | "negative" | "neutral" = "neutral",
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsAPIResponse> => {
    try {
      const filter =
        sentiment === "positive"
          ? "bullish"
          : sentiment === "negative"
          ? "bearish"
          : "all";

      const response = await cryptoPanicAPI.get(
        `/posts/?auth_token=${CRYPTOPANIC_API_KEY}&public=true&filter=${filter}&page=${page}&per_page=${pageSize}`
      );

      // Transform CryptoPanic response to match NewsAPI format
      return {
        status: "ok",
        totalResults: response.data.count || response.data.results?.length || 0,
        articles:
          response.data.results?.map((article: any) => ({
            title: article.title,
            description: article.metadata?.description || article.title,
            url: article.url,
            urlToImage:
              article.metadata?.image ||
              article.currencies?.[0]?.logo ||
              "/api/placeholder/300/200",
            publishedAt: article.published_at,
            source: {
              id: article.source?.title || "CryptoPanic",
              name: article.source?.title || "CryptoPanic",
            },
            sentiment:
              article.votes?.positive > article.votes?.negative
                ? "positive"
                : article.votes?.negative > article.votes?.positive
                ? "negative"
                : "neutral",
            votes: article.votes,
            currencies: article.currencies,
          })) || [],
      };
    } catch (error) {
      console.warn(
        "CryptoPanic API failed, falling back to NewsData.io:",
        error
      );
      // Fallback to NewsData.io
      return newsDataService.getCryptoNews(page, pageSize);
    }
  },

  // Get crypto news for specific currency
  getCryptoNewsByCurrency: async (
    currency: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsAPIResponse> => {
    try {
      const response = await cryptoPanicAPI.get(
        `/posts/?auth_token=${CRYPTOPANIC_API_KEY}&public=true&currencies=${currency}&page=${page}&per_page=${pageSize}`
      );

      // Transform CryptoPanic response to match NewsAPI format
      return {
        status: "ok",
        totalResults: response.data.count || response.data.results?.length || 0,
        articles:
          response.data.results?.map((article: any) => ({
            title: article.title,
            description: article.metadata?.description || article.title,
            url: article.url,
            urlToImage:
              article.metadata?.image ||
              article.currencies?.[0]?.logo ||
              "/api/placeholder/300/200",
            publishedAt: article.published_at,
            source: {
              id: article.source?.title || "CryptoPanic",
              name: article.source?.title || "CryptoPanic",
            },
            sentiment:
              article.votes?.positive > article.votes?.negative
                ? "positive"
                : article.votes?.negative > article.votes?.positive
                ? "negative"
                : "neutral",
            votes: article.votes,
            currencies: article.currencies,
          })) || [],
      };
    } catch (error) {
      console.warn(
        "CryptoPanic API failed, falling back to NewsData.io:",
        error
      );
      // Fallback to NewsData.io
      return newsDataService.getCryptoNews(page, pageSize);
    }
  },
};

// Utility function to check if we're in demo mode
export const isDemoMode = (): boolean => {
  return !ALPHA_VANTAGE_API_KEY || ALPHA_VANTAGE_API_KEY === "demo";
};
