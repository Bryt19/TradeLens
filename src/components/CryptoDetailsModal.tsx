import React from "react";
import {
  X,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Globe,
  BarChart3,
} from "lucide-react";
import { CoinGeckoCoin } from "../types";
import {
  formatCurrency,
  formatLargeNumber,
  formatPercentage,
  getPriceChangeColor,
  getPriceChangeBgColor,
} from "../utils/helpers";

interface CryptoDetailsModalProps {
  coin: CoinGeckoCoin | null;
  isOpen: boolean;
  onClose: () => void;
}

const CryptoDetailsModal: React.FC<CryptoDetailsModalProps> = ({
  coin,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !coin) return null;

  const priceChange = coin.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "Date unavailable";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <img
                src={coin.image}
                alt={`${coin.name} (${coin.symbol}) cryptocurrency logo`}
                className="w-12 h-12 rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://via.placeholder.com/48x48/6B7280/FFFFFF?text=?";
                  target.alt = `${coin.name} cryptocurrency logo (placeholder)`;
                }}
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {coin.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 uppercase">
                  {coin.symbol}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Price Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(coin.current_price)}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Current Price
                  </p>
                </div>
                <div
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-lg font-medium ${getPriceChangeBgColor(
                    priceChange,
                  )}`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : (
                    <TrendingDown className="w-5 h-5" />
                  )}
                  <span className={getPriceChangeColor(priceChange)}>
                    {formatPercentage(priceChange)}
                  </span>
                </div>
              </div>

              {/* 24h High/Low */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      24h High
                    </span>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {coin.high_24h ? formatCurrency(coin.high_24h) : "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      24h Low
                    </span>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {coin.low_24h ? formatCurrency(coin.low_24h) : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Market Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Market Cap
                  </span>
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {coin.market_cap ? formatLargeNumber(coin.market_cap) : "N/A"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Rank #{coin.market_cap_rank || "N/A"}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    24h Volume
                  </span>
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {coin.total_volume
                    ? formatLargeNumber(coin.total_volume)
                    : "N/A"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Volume/Market Cap:{" "}
                  {coin.total_volume && coin.market_cap
                    ? ((coin.total_volume / coin.market_cap) * 100).toFixed(2) +
                      "%"
                    : "N/A"}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Circulating Supply
                  </span>
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {coin.circulating_supply
                    ? formatLargeNumber(coin.circulating_supply)
                    : "N/A"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {coin.total_supply
                    ? `Total: ${formatLargeNumber(coin.total_supply)}`
                    : "Max: ∞"}
                </p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Market Information
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Fully Diluted Valuation
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {coin.fully_diluted_valuation
                        ? formatLargeNumber(coin.fully_diluted_valuation)
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Max Supply
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {coin.max_supply
                        ? formatLargeNumber(coin.max_supply)
                        : "∞"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Supply
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {coin.total_supply
                        ? formatLargeNumber(coin.total_supply)
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Price Information
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      All Time High
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {coin.ath ? formatCurrency(coin.ath) : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      All Time Low
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {coin.atl ? formatCurrency(coin.atl) : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      From ATH
                    </span>
                    <span
                      className={`font-medium ${getPriceChangeColor(
                        coin.ath_change_percentage || 0,
                      )}`}
                    >
                      {coin.ath_change_percentage
                        ? formatPercentage(coin.ath_change_percentage)
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* External Links */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                External Links
              </h4>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://www.coingecko.com/en/coins/${coin.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>View on CoinGecko</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={`https://coinmarketcap.com/currencies/${coin.id}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>View on CoinMarketCap</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-b-lg">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {formatDate(coin.last_updated)}
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetailsModal;
