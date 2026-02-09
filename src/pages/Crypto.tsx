import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, TrendingUp, TrendingDown, Star, Plus } from "lucide-react";
import { useCryptocurrencies } from "../hooks/useApi";
import {
  getFavorites,
  saveFavorite,
  removeFavorite,
  splitFavorites,
} from "../services/favorites";
import CryptoCard from "../components/CryptoCard";
import CryptoDetailsModal from "../components/CryptoDetailsModal";
import Loading from "../components/Loading";
// import Chart from "../components/Chart";
import { CoinGeckoCoin } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { AnimatedSearchBar } from "../components/ui/animated-search-bar";

const Crypto: React.FC = () => {
  const navigate = useNavigate();
  const { authState } = useAuth();
  const { data: cryptoData, loading, error } = useCryptocurrencies(100);
  const [cryptoFavorites, setCryptoFavorites] = useState<string[]>([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  // Load favorites for current user and keep in state
  const refreshFavorites = useCallback(async () => {
    setFavoritesLoading(true);
    try {
      const rows = await getFavorites();
      const { crypto } = splitFavorites(rows);
      setCryptoFavorites(crypto);
    } catch (e) {
      console.error("Failed to refresh favorites", e);
      setCryptoFavorites([]);
    } finally {
      setFavoritesLoading(false);
    }
  }, []);

  // Load favorites immediately on mount and when user changes
  useEffect(() => {
    if (authState.user) {
      // Load favorites immediately without waiting for other effects
      refreshFavorites();
    } else {
      setCryptoFavorites([]);
    }
  }, [authState.user, refreshFavorites]);

  // Pre-load favorites on component mount for faster initial render
  useEffect(() => {
    if (authState.user && cryptoFavorites.length === 0) {
      refreshFavorites();
    }
  }, []);

  // Create favorites Set for O(1) lookup performance
  const favoritesSet = useMemo(
    () => new Set(cryptoFavorites),
    [cryptoFavorites],
  );

  const isCryptoFavorite = useCallback(
    (coinId: string) => favoritesSet.has(coinId),
    [favoritesSet],
  );

  const toggleCryptoFavorite = useCallback(
    async (coinId: string) => {
      if (!authState.user) {
        navigate("/login", { replace: false });
        return;
      }

      const isFav = cryptoFavorites.includes(coinId);

      // Optimistic update - update UI immediately
      if (isFav) {
        setCryptoFavorites((prev) => prev.filter((id) => id !== coinId));
      } else {
        setCryptoFavorites((prev) => [...prev, coinId]);
        // optional toast event preserved
        try {
          window.dispatchEvent(
            new CustomEvent("favorite:add", {
              detail: { type: "crypto", id: coinId },
            }),
          );
        } catch {}
      }

      try {
        // Sync with database in background
        if (isFav) {
          await removeFavorite(coinId, "coin");
        } else {
          await saveFavorite(coinId, "coin");
        }
      } catch (e) {
        console.error("toggleCryptoFavorite error", e);
        // Revert optimistic update on error
        if (isFav) {
          setCryptoFavorites((prev) => [...prev, coinId]);
        } else {
          setCryptoFavorites((prev) => prev.filter((id) => id !== coinId));
        }
      }
    },
    [authState.user, cryptoFavorites, navigate, refreshFavorites],
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "market_cap" | "price" | "change_24h" | "volume"
  >("market_cap");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(() => {
    // Load from localStorage on mount
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("crypto-show-favorites-only");
      return saved === "true";
    }
    return false;
  });
  const [displayCount, setDisplayCount] = useState(20); // Start with 20, max 100
  const [selectedCoin, setSelectedCoin] = useState<CoinGeckoCoin | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSorting, setIsSorting] = useState(false);

  // Save showFavoritesOnly to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "crypto-show-favorites-only",
        showFavoritesOnly.toString(),
      );
    }
  }, [showFavoritesOnly]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value); // Update immediately for responsive input
  };

  // Filter and sort data with optimized performance
  const filteredAndSortedData = useMemo(() => {
    if (!cryptoData) return [];

    let filtered = cryptoData;

    // Filter by search query (optimized with early return)
    if (searchQuery) {
      const queryLower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (coin) =>
          coin.name.toLowerCase().includes(queryLower) ||
          coin.symbol.toLowerCase().includes(queryLower),
      );
    }

    // Filter by favorites using Set for O(1) lookup
    if (showFavoritesOnly) {
      filtered = filtered.filter((coin) => favoritesSet.has(coin.id));
    }

    // Sort data with optimized comparison
    filtered.sort((a, b) => {
      let aValue: number;
      let bValue: number;

      // Use direct property access for better performance
      switch (sortBy) {
        case "market_cap":
          aValue = a.market_cap ?? 0;
          bValue = b.market_cap ?? 0;
          break;
        case "price":
          aValue = a.current_price ?? 0;
          bValue = b.current_price ?? 0;
          break;
        case "change_24h":
          aValue = a.price_change_percentage_24h ?? 0;
          bValue = b.price_change_percentage_24h ?? 0;
          break;
        case "volume":
          aValue = a.total_volume ?? 0;
          bValue = b.total_volume ?? 0;
          break;
        default:
          aValue = a.market_cap ?? 0;
          bValue = b.market_cap ?? 0;
      }

      // Optimized comparison for instant sorting
      const diff = aValue - bValue;
      return sortOrder === "asc" ? diff : -diff;
    });

    return filtered;
  }, [
    cryptoData,
    searchQuery,
    sortBy,
    sortOrder,
    showFavoritesOnly,
    favoritesSet,
  ]);

  // Get displayed data (limited by displayCount)
  const displayedData = useMemo(() => {
    return filteredAndSortedData.slice(0, displayCount);
  }, [filteredAndSortedData, displayCount]);

  // Check if we can load more
  const canLoadMore =
    displayCount < Math.min(filteredAndSortedData.length, 100);
  // const hasMoreData = filteredAndSortedData.length > displayCount;

  const handleSortChange = (newSortBy: typeof sortBy) => {
    // Instant visual feedback
    setIsSorting(true);

    // Use React's batching for instant updates
    React.startTransition(() => {
      if (sortBy === newSortBy) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortBy(newSortBy);
        setSortOrder("desc");
      }

      // Reset sorting state after a brief moment
      setTimeout(() => setIsSorting(false), 100);
    });
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 20, 100));
  };

  const handleViewDetails = (coin: CoinGeckoCoin) => {
    if (!authState.user) {
      navigate("/login", { replace: false });
      return;
    }
    setSelectedCoin(coin);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCoin(null);
  };

  const sortOptions = [
    { key: "market_cap" as const, label: "Market Cap" },
    { key: "price" as const, label: "Price" },
    { key: "change_24h" as const, label: "24h Change" },
    { key: "volume" as const, label: "Volume" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Cryptocurrencies
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track real-time cryptocurrency prices and market data
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="space-y-4">
            {/* Search */}
            <div className="w-full">
              <AnimatedSearchBar
                placeholder="Search cryptocurrencies..."
                value={searchQuery}
                onChange={handleSearchChange}
                showResults={false}
                className="w-full"
                inputClassName="text-base py-2 sm:py-3"
              />
            </div>

            {/* Sort Options and Favorites Filter */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
              {/* Sort Options */}
              <div className="flex flex-wrap gap-2 flex-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => handleSortChange(option.key)}
                    disabled={isSorting}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 ${
                      sortBy === option.key
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-sm"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-sm"
                    } ${
                      isSorting
                        ? "opacity-75 cursor-wait"
                        : "hover:scale-105 active:scale-95"
                    }`}
                  >
                    <span className="hidden sm:inline">{option.label}</span>
                    <span className="sm:hidden">
                      {option.label.split(" ")[0]}
                    </span>
                    {sortBy === option.key && (
                      <div className="flex items-center">
                        {isSorting ? (
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : sortOrder === "asc" ? (
                          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : (
                          <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Favorites Filter */}
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                disabled={favoritesLoading}
                className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  showFavoritesOnly
                    ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                } ${favoritesLoading ? "opacity-50 cursor-wait" : ""}`}
              >
                {favoritesLoading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Star
                    className={`w-4 h-4 ${
                      showFavoritesOnly ? "fill-current" : ""
                    }`}
                  />
                )}
                <span className="hidden sm:inline">
                  Favorites{" "}
                  {!favoritesLoading &&
                    cryptoFavorites.length > 0 &&
                    `(${cryptoFavorites.length})`}
                </span>
                <span className="sm:hidden">
                  {favoritesLoading
                    ? "..."
                    : `★${
                        cryptoFavorites.length > 0
                          ? ` ${cryptoFavorites.length}`
                          : ""
                      }`}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {displayedData.length} of{" "}
            {Math.min(filteredAndSortedData.length, 100)} cryptocurrencies
            {searchQuery && ` matching "${searchQuery}"`}
            {showFavoritesOnly && " in your favorites"}
            {displayedData.length < filteredAndSortedData.length &&
              ` (${
                filteredAndSortedData.length - displayedData.length
              } more available)`}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <Loading text="Loading cryptocurrencies..." />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Couldn't load cryptocurrency data. Try again later.
            </p>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && displayedData.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No cryptocurrencies found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {searchQuery
                  ? `No cryptocurrencies match "${searchQuery}"`
                  : showFavoritesOnly
                    ? "You haven't added any cryptocurrencies to your favorites yet"
                    : "No cryptocurrencies available"}
              </p>
            </div>
          </div>
        )}

        {/* Cryptocurrency Grid */}
        {!loading && !error && displayedData.length > 0 && (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 transition-all duration-300 ${
              isSorting ? "opacity-90 scale-[0.99]" : "opacity-100 scale-100"
            }`}
          >
            {displayedData.map((coin, index) => {
              const isFavorite = isCryptoFavorite(coin.id);
              const handleClick = () => handleViewDetails(coin);

              return (
                <div
                  key={coin.id}
                  className="transition-all duration-300 ease-out"
                  style={{
                    animationDelay: isSorting ? `${index * 10}ms` : "0ms",
                    transform: isSorting ? "translateY(2px)" : "translateY(0)",
                  }}
                >
                  <CryptoCard
                    coin={coin}
                    isFavorite={isFavorite}
                    onToggleFavorite={toggleCryptoFavorite}
                    onClick={handleClick}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {!loading && !error && displayedData.length > 0 && canLoadMore && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>
                Load More (
                {Math.min(
                  20,
                  filteredAndSortedData.length - displayedData.length,
                )}{" "}
                more)
              </span>
            </button>
          </div>
        )}

        {/* Max Reached Message */}
        {!loading && !error && displayedData.length > 0 && !canLoadMore && (
          <div className="text-center mt-8">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Showing all {displayedData.length} cryptocurrencies (maximum 100)
            </p>
          </div>
        )}

        {/* Crypto Details Modal */}
        <CryptoDetailsModal
          coin={selectedCoin}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default Crypto;
