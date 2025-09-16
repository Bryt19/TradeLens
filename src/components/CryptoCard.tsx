import React from "react";
import { Heart, TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import { CoinGeckoCoin } from "../types";
import {
  formatCurrency,
  formatLargeNumber,
  formatPercentage,
  getPriceChangeColor,
  getPriceChangeBgColor,
} from "../utils/helpers";

interface CryptoCardProps {
  coin: CoinGeckoCoin;
  isFavorite: boolean;
  onToggleFavorite: (coinId: string) => void;
  onClick?: () => void;
  className?: string;
}

import { useAuth } from "../contexts/AuthContext";

const CryptoCard: React.FC<CryptoCardProps> = ({
  coin,
  isFavorite,
  onToggleFavorite,
  onClick,
  className = "",
}) => {
  const { authState } = useAuth();
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(coin.id);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const priceChange = coin.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-800 ${className}`}
      onClick={handleClick}
    >
      <div className="p-3 sm:p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <img
              src={coin.image}
              alt={coin.name}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://via.placeholder.com/40x40/6B7280/FFFFFF?text=?";
              }}
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
                {coin.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 uppercase">
                {coin.symbol}
              </p>
            </div>
          </div>
          {authState.user ? (
            <button
              onClick={handleToggleFavorite}
              className={`p-1.5 sm:p-2 rounded-full transition-colors flex-shrink-0 ${
                isFavorite
                  ? "text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20"
                  : "text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              }`}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Heart
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  isFavorite ? "fill-current" : ""
                }`}
              />
            </button>
          ) : null}
        </div>

        {/* Price and Change */}
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(coin.current_price)}
            </span>
            <div
              className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${getPriceChangeBgColor(
                priceChange
              )}`}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
              <span className={getPriceChangeColor(priceChange)}>
                {formatPercentage(priceChange)}
              </span>
            </div>
          </div>
        </div>

        {/* Market Data */}
        <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Market Cap</span>
            <span className="text-gray-900 dark:text-white font-medium text-right">
              {formatLargeNumber(coin.market_cap)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">24h Volume</span>
            <span className="text-gray-900 dark:text-white font-medium text-right">
              {formatLargeNumber(coin.total_volume)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Rank</span>
            <span className="text-gray-900 dark:text-white font-medium">
              #{coin.market_cap_rank || "N/A"}
            </span>
          </div>
        </div>

        {/* 24h High/Low */}
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400 block">
                24h High
              </span>
              <span className="text-gray-900 dark:text-white font-medium">
                {formatCurrency(coin.high_24h)}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400 block">
                24h Low
              </span>
              <span className="text-gray-900 dark:text-white font-medium">
                {formatCurrency(coin.low_24h)}
              </span>
            </div>
          </div>
        </div>

        {/* View Details Link */}
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center space-x-1 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            <span>View Details</span>
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
