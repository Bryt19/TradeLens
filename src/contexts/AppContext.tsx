import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { ReactNode, Dispatch } from "react";
import { AppState, LocalStorageData } from "../types";

// Action Types
type AppAction =
  | { type: "SET_THEME"; payload: "light" | "dark" }
  | { type: "TOGGLE_THEME" }
  | { type: "ADD_CRYPTO_FAVORITE"; payload: string }
  | { type: "REMOVE_CRYPTO_FAVORITE"; payload: string }
  | { type: "ADD_STOCK_FAVORITE"; payload: string }
  | { type: "REMOVE_STOCK_FAVORITE"; payload: string }
  | {
      type: "SET_NOTIFICATION_PREF";
      payload: { key: "favoriteAdded"; value: boolean };
    }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "LOAD_FROM_STORAGE"; payload: LocalStorageData };

// Get initial theme from localStorage to prevent flash
const getInitialTheme = (): "light" | "dark" => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("marketpulse-data");
      if (stored) {
        const data = JSON.parse(stored);
        return data.theme || "light";
      }
    } catch (error) {
      console.error("Error loading theme from localStorage:", error);
    }
  }
  return "light";
};

// Initial State
const initialState: AppState = {
  theme: getInitialTheme(),
  favorites: {
    crypto: [],
    stocks: [],
  },
  notifications: {
    favoriteAdded: true,
  },
  isLoading: false,
  error: null,
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.payload };

    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };

    case "ADD_CRYPTO_FAVORITE":
      return {
        ...state,
        favorites: {
          ...state.favorites,
          crypto: [...state.favorites.crypto, action.payload],
        },
      };

    case "REMOVE_CRYPTO_FAVORITE":
      return {
        ...state,
        favorites: {
          ...state.favorites,
          crypto: state.favorites.crypto.filter((id) => id !== action.payload),
        },
      };

    case "ADD_STOCK_FAVORITE":
      return {
        ...state,
        favorites: {
          ...state.favorites,
          stocks: [...state.favorites.stocks, action.payload],
        },
      };

    case "REMOVE_STOCK_FAVORITE":
      return {
        ...state,
        favorites: {
          ...state.favorites,
          stocks: state.favorites.stocks.filter(
            (symbol) => symbol !== action.payload
          ),
        },
      };

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "LOAD_FROM_STORAGE":
      return {
        ...state,
        theme: action.payload.theme,
        favorites: action.payload.favorites,
        notifications: action.payload.notifications || state.notifications,
      };

    case "SET_NOTIFICATION_PREF":
      return {
        ...state,
        notifications: {
          ...(state.notifications || { favoriteAdded: true }),
          [action.payload.key]: action.payload.value,
        },
      };

    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<AppAction>;
} | null>(null);

// Provider Component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Apply theme immediately on mount
  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.theme === "dark");
  }, []);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        const stored = localStorage.getItem("marketpulse-data");
        if (stored) {
          const data: LocalStorageData = JSON.parse(stored);
          dispatch({ type: "LOAD_FROM_STORAGE", payload: data });
        }
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
      }
    };

    loadFromStorage();
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    const saveToStorage = () => {
      try {
        const dataToSave: LocalStorageData = {
          theme: state.theme,
          favorites: state.favorites,
          notifications: state.notifications,
          lastCryptoData: [],
          lastStockData: {},
          lastNewsData: [],
        };
        localStorage.setItem("marketpulse-data", JSON.stringify(dataToSave));
      } catch (error) {
        console.error("Error saving data to localStorage:", error);
      }
    };

    saveToStorage();
  }, [state.theme, state.favorites, state.notifications]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.theme === "dark");
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

// Action creators
export const appActions = {
  setTheme: (theme: "light" | "dark") => ({
    type: "SET_THEME" as const,
    payload: theme,
  }),
  toggleTheme: () => ({ type: "TOGGLE_THEME" as const }),
  addCryptoFavorite: (coinId: string) => ({
    type: "ADD_CRYPTO_FAVORITE" as const,
    payload: coinId,
  }),
  removeCryptoFavorite: (coinId: string) => ({
    type: "REMOVE_CRYPTO_FAVORITE" as const,
    payload: coinId,
  }),
  addStockFavorite: (symbol: string) => ({
    type: "ADD_STOCK_FAVORITE" as const,
    payload: symbol,
  }),
  removeStockFavorite: (symbol: string) => ({
    type: "REMOVE_STOCK_FAVORITE" as const,
    payload: symbol,
  }),
  setLoading: (loading: boolean) => ({
    type: "SET_LOADING" as const,
    payload: loading,
  }),
  setError: (error: string | null) => ({
    type: "SET_ERROR" as const,
    payload: error,
  }),
  setNotificationPref: (key: "favoriteAdded", value: boolean) => ({
    type: "SET_NOTIFICATION_PREF" as const,
    payload: { key, value },
  }),
};
