import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://uabknquqcpcbhhiafeqw.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhYmtucXVxY3BjYmhoaWFmZXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MDU3MDQsImV4cCI6MjA3MzA4MTcwNH0.4KkZg4EjdlhHyWe7BY5huwETL5Uv4OurnlIsm2bWQZQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
