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
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-5">
        <div className="relative w-full max-w-4xl bg-white dark:bg-zinc-950 border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:px-7 sm:py-5 border-b border-gray-100 dark:border-white/5 gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="relative">
                <img
                  src={coin.image}
                  alt={`${coin.name} (${coin.symbol})`}
                  className="w-11 h-11 rounded-full border border-gray-100 dark:border-white/10 shadow-sm"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://via.placeholder.com/40x40/27272A/FFFFFF?text=?";
                  }}
                />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                  {coin.name}
                </h2>
                <div className="flex items-center mt-1 space-x-2">
                  <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-gray-600 bg-gray-100 dark:bg-white/10 dark:text-gray-300 rounded uppercase">
                    {coin.symbol}
                  </span>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Rank #{coin.market_cap_rank || "-"}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="absolute top-5 right-5 sm:relative sm:top-auto sm:right-auto p-2 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 sm:px-8 sm:py-8">
            {/* Price Section */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 pl-0.5">
                    Current Price
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-none">
                    {formatCurrency(coin.current_price)}
                  </h3>
                </div>
                <div
                  className={`inline-flex items-center self-start sm:self-auto space-x-1 px-3 py-1.5 rounded-lg text-sm font-semibold border ${getPriceChangeBgColor(
                    priceChange,
                  )} ${getPriceChangeColor(priceChange)} ${
                    isPositive
                      ? "border-green-200 dark:border-green-900/30"
                      : "border-red-200 dark:border-red-900/30"
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{formatPercentage(priceChange)}</span>
                  <span className="text-[10px] opacity-70 ml-1 font-medium text-current uppercase tracking-wider">
                    24H
                  </span>
                </div>
              </div>

              {/* 24h High/Low */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3.5 bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-xl transition-colors hover:bg-gray-50 dark:hover:bg-white/[0.03]">
                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 bg-green-500/10 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 block mb-0.5">
                        24h High
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white block">
                        {coin.high_24h ? formatCurrency(coin.high_24h) : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-xl transition-colors hover:bg-gray-50 dark:hover:bg-white/[0.03]">
                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 bg-red-500/10 rounded-lg">
                      <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 block mb-0.5">
                        24h Low
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white block">
                        {coin.low_24h ? formatCurrency(coin.low_24h) : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Data Grid */}
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3.5 flex items-center">
              <BarChart3 className="w-4 h-4 mr-1.5 text-gray-400" /> Market Stats
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-white/5 rounded-xl shadow-sm">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                  Market Cap
                </span>
                <p className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
                  {coin.market_cap ? formatLargeNumber(coin.market_cap) : "N/A"}
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-white/5 rounded-xl shadow-sm">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                  Volume (24h)
                </span>
                <p className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
                  {coin.total_volume
                    ? formatLargeNumber(coin.total_volume)
                    : "N/A"}
                </p>
                <p className="text-[10px] font-medium text-gray-500 dark:text-gray-500 mt-1">
                  Vol/MCap:{" "}
                  {coin.total_volume && coin.market_cap
                    ? ((coin.total_volume / coin.market_cap) * 100).toFixed(2) +
                      "%"
                    : "N/A"}
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-white/5 rounded-xl shadow-sm">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
                    Circulating Supply
                  </span>
                </div>
                <p className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
                  {coin.circulating_supply
                    ? formatLargeNumber(coin.circulating_supply)
                    : "N/A"}
                </p>
                <div className="mt-2.5 w-full bg-gray-100 dark:bg-white/10 rounded-full h-1 overflow-hidden">
                  <div
                    className="bg-black dark:bg-white h-1 rounded-full"
                    style={{
                      width: `${
                        coin.circulating_supply && coin.max_supply
                          ? Math.min(
                              (coin.circulating_supply / coin.max_supply) * 100,
                              100
                            )
                          : 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2.5">
                <h4 className="text-[10px] font-bold tracking-wider text-gray-500 dark:text-gray-400 uppercase ml-1">
                  Supply Information
                </h4>
                <div className="bg-white dark:bg-zinc-900/30 border border-gray-100 dark:border-white/5 rounded-xl divide-y divide-gray-100 dark:divide-white/5">
                  <div className="flex justify-between items-center px-4 py-3">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Total Supply
                    </span>
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">
                      {coin.total_supply
                        ? formatLargeNumber(coin.total_supply)
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-3">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Max Supply
                    </span>
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">
                      {coin.max_supply
                        ? formatLargeNumber(coin.max_supply)
                        : "∞"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-3">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Fully Diluted Val
                    </span>
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">
                      {coin.fully_diluted_valuation
                        ? formatLargeNumber(coin.fully_diluted_valuation)
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-[10px] font-bold tracking-wider text-gray-500 dark:text-gray-400 uppercase ml-1">
                  Historical Price
                </h4>
                <div className="bg-white dark:bg-zinc-900/30 border border-gray-100 dark:border-white/5 rounded-xl divide-y divide-gray-100 dark:divide-white/5">
                  <div className="flex justify-between items-center px-4 py-3">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      All Time High
                    </span>
                    <div className="text-right flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-900 dark:text-white">
                        {coin.ath ? formatCurrency(coin.ath) : "N/A"}
                      </span>
                      <span
                        className={`text-[10px] font-semibold ${getPriceChangeColor(
                          coin.ath_change_percentage || 0,
                        )}`}
                      >
                        {coin.ath_change_percentage
                          ? formatPercentage(coin.ath_change_percentage)
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-4 py-3">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      All Time Low
                    </span>
                    <div className="text-right flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-900 dark:text-white">
                        {coin.atl ? formatCurrency(coin.atl) : "N/A"}
                      </span>
                      <span
                        className={`text-[10px] font-semibold ${getPriceChangeColor(
                          coin.atl_change_percentage || 0,
                        )}`}
                      >
                        {coin.atl_change_percentage
                          ? formatPercentage(coin.atl_change_percentage)
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* External Links */}
            <div className="mt-6 pt-5 border-t border-gray-100 dark:border-white/5">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`https://www.coingecko.com/en/coins/${coin.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-bold tracking-wide transition-all group border border-transparent dark:border-white/5"
                >
                  <img
                    src="https://assets.coingecko.com/safari-pinned-tab.svg"
                    alt=""
                    className="w-4 h-4 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all dark:invert"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <span>CoinGecko</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-50 relative top-[0.5px]" />
                </a>
                <a
                  href={`https://coinmarketcap.com/currencies/${coin.id}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-bold tracking-wide transition-all group border border-transparent dark:border-white/5"
                >
                  <Globe className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span>CoinMarketCap</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-50 relative top-[0.5px]" />
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-4 sm:px-7 bg-gray-50 dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-white/5 rounded-b-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-[10px] font-semibold tracking-wide text-gray-500 dark:text-gray-500">
                LAST UPDATED: {formatDate(coin.last_updated).toUpperCase()}
              </p>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-semibold text-sm rounded-lg transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-offset-zinc-950 dark:focus:ring-white active:scale-95"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetailsModal;
