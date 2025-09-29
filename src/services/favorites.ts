import { supabase } from "../lib/supabase";

export type FavoriteType = "coin" | "stock";

export interface FavoriteRow {
  id: string;
  user_id: string;
  symbol: string;
  type: FavoriteType;
  created_at: string;
}

export async function saveFavorite(symbol: string, type: FavoriteType) {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("favorites")
      .upsert(
        { user_id: user.id, symbol, type },
        { onConflict: "user_id,symbol,type" }
      )
      .select()
      .single();
    if (error) throw error;
    return data as FavoriteRow | null;
  } catch (err) {
    console.error("saveFavorite error:", err);
    return null;
  }
}

export async function getFavorites() {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("favorites")
      .select("id,user_id,symbol,type,created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []) as FavoriteRow[];
  } catch (err) {
    console.error("getFavorites error:", err);
    return [] as FavoriteRow[];
  }
}

export async function removeFavorite(symbol: string, type: FavoriteType) {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("Not authenticated");

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("symbol", symbol)
      .eq("type", type);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error("removeFavorite error:", err);
    return false;
  }
}

export function splitFavorites(rows: FavoriteRow[]) {
  const crypto: string[] = [];
  const stocks: string[] = [];
  for (const row of rows) {
    if (row.type === "coin") crypto.push(row.symbol);
    else if (row.type === "stock") stocks.push(row.symbol);
  }
  return { crypto, stocks } as { crypto: string[]; stocks: string[] };
}
