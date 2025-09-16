/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_ALPHA_VANTAGE_API_KEY: string;
  readonly VITE_NEWS_API_KEY: string;
  readonly VITE_NEWSDATA_API_KEY: string;
  readonly VITE_CRYPTOPANIC_API_KEY: string;
  readonly VITE_POLYGON_API_KEY: string;
  readonly VITE_WORLDNEWS_API_KEY: string;
  readonly VITE_GNEWS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
