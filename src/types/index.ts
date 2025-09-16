// API Response Types
export interface CoinGeckoCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: any;
  last_updated: string;
}

export interface CoinGeckoChartData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface AlphaVantageQuote {
  "01. symbol": string;
  "02. open": string;
  "03. high": string;
  "04. low": string;
  "05. price": string;
  "06. volume": string;
  "07. latest trading day": string;
  "08. previous close": string;
  "09. change": string;
  "10. change percent": string;
}

export interface AlphaVantageTimeSeries {
  [date: string]: {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
  };
}

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
}

export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

// Authentication Types
export interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export interface AuthState {
  user: User | null;
  session: any | null;
  loading: boolean;
}

// App State Types
export interface AppState {
  theme: "light" | "dark";
  favorites: {
    crypto: string[];
    stocks: string[];
  };
  notifications?: {
    favoriteAdded: boolean;
  };
  isLoading: boolean;
  error: string | null;
}

// Chart Types
export interface ChartDataPoint {
  timestamp: number;
  value: number;
  volume?: number;
}

export interface CandlestickData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Component Props Types
export interface CryptoCardProps {
  coin: CoinGeckoCoin;
  isFavorite: boolean;
  onToggleFavorite: (coinId: string) => void;
}

export interface StockCardProps {
  symbol: string;
  quote: AlphaVantageQuote;
  isFavorite: boolean;
  onToggleFavorite: (symbol: string) => void;
}

export interface NewsCardProps {
  article: NewsArticle;
}

export interface ChartProps {
  data: ChartDataPoint[] | CandlestickData[];
  type: "line" | "candlestick";
  height?: number;
  color?: string;
}

// API Error Types
export interface APIError {
  message: string;
  status?: number;
  code?: string;
}

// Search and Filter Types
export interface SearchFilters {
  query: string;
  sortBy: "market_cap" | "price" | "change_24h" | "volume";
  sortOrder: "asc" | "desc";
  limit: number;
}

// Local Storage Types
export interface LocalStorageData {
  theme: "light" | "dark";
  favorites: {
    crypto: string[];
    stocks: string[];
  };
  notifications?: {
    favoriteAdded: boolean;
  };
  lastCryptoData: CoinGeckoCoin[];
  lastStockData: { [symbol: string]: AlphaVantageQuote };
  lastNewsData: NewsArticle[];
}
