import React from "react";
import {
  Heart,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Building2,
} from "lucide-react";
import { AlphaVantageQuote } from "../types";
import {
  formatCurrency,
  formatPercentage,
  getPriceChangeColor,
  getPriceChangeBgColor,
} from "../utils/helpers";

interface StockCardProps {
  symbol: string;
  quote: AlphaVantageQuote;
  isFavorite: boolean;
  onToggleFavorite: (symbol: string) => void;
  onClick?: () => void;
  className?: string;
}

const StockCard: React.FC<StockCardProps> = ({
  symbol,
  quote,
  isFavorite,
  onToggleFavorite,
  onClick,
  className = "",
}) => {
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(symbol);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const currentPrice = parseFloat(quote["05. price"]);
  const change = parseFloat(quote["09. change"]);
  const changePercent = parseFloat(
    quote["10. change percent"].replace("%", "")
  );
  const isPositive = change >= 0;

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-700 ${className}`}
      onClick={handleClick}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {symbol}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {quote["01. symbol"]}
              </p>
            </div>
          </div>
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full transition-colors ${
              isFavorite
                ? "text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20"
                : "text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            }`}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Price and Change */}
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(currentPrice)}
            </span>
            <div
              className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${getPriceChangeBgColor(
                changePercent
              )}`}
            >
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className={getPriceChangeColor(changePercent)}>
                {formatPercentage(changePercent)}
              </span>
            </div>
          </div>
        </div>

        {/* Market Data */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Open</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {formatCurrency(parseFloat(quote["02. open"]))}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">High</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {formatCurrency(parseFloat(quote["03. high"]))}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Low</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {formatCurrency(parseFloat(quote["04. low"]))}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Volume</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {parseInt(quote["06. volume"]).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Previous Close */}
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              Previous Close
            </span>
            <span className="text-gray-900 dark:text-white font-medium">
              {formatCurrency(parseFloat(quote["08. previous close"]))}
            </span>
          </div>
        </div>

        {/* Trading Day */}
        <div className="mt-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              Last Trading Day
            </span>
            <span className="text-gray-900 dark:text-white font-medium">
              {quote["07. latest trading day"]}
            </span>
          </div>
        </div>

        {/* View Details Link */}
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center space-x-1 text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            <span>View Details</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockCard;
