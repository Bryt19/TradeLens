import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import {
  useCryptocurrencies,
  useFinancialNews,
  useMultipleStockQuotes,
} from "../hooks/useApi";
import CryptoCard from "../components/CryptoCard";
import CryptoDetailsModal from "../components/CryptoDetailsModal";
import NewsCard from "../components/NewsCard";
import Loading from "../components/Loading";
import MarketSentimentGauge from "../components/MarketSentimentGauge";
import { CoinGeckoCoin } from "../types";
import { useAuth } from "../contexts/AuthContext";
import FadeInOnScroll from "../components/FadeInOnScroll";
import AnimatedCounter from "../components/AnimatedCounter";
import { InteractiveHoverButton } from "../components/ui/interactive-hover-button";
import { FeaturesSectionWithHoverEffects } from "../components/ui/feature-section-with-hover-effects";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { authState } = useAuth();
  const {
    data: cryptoData,
    loading: cryptoLoading,
    error: cryptoError,
  } = useCryptocurrencies(10);
  const {
    data: newsData,
    loading: newsLoading,
    error: newsError,
  } = useFinancialNews(1, 6);
  const [selectedCoin, setSelectedCoin] = useState<CoinGeckoCoin | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const topCryptos = cryptoData?.slice(0, 6) || [];
  const newsArticles = newsData?.articles?.slice(0, 6) || [];
  const stockSymbols = useMemo(() => ["GOOGL", "AMZN", "NVDA"], []);
  const {
    data: stockQuotes,
    loading: stockLoading,
    error: stockError,
  } = useMultipleStockQuotes(stockSymbols);

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

  const formatPrice = (price?: number | null) => {
    if (price === undefined || price === null) return "—";
    const minimumFractionDigits = price < 1 ? 4 : 2;
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits,
      maximumFractionDigits: minimumFractionDigits,
    });
  };

  const formatChange = (change?: number | null) => {
    if (change === undefined || change === null || Number.isNaN(change)) {
      return "—";
    }
    const rounded = change.toFixed(2);
    return `${change >= 0 ? "+" : ""}${rounded}%`;
  };

  const { topGainer, topLoser } = useMemo(() => {
    if (!cryptoData || cryptoData.length === 0) {
      return { topGainer: null, topLoser: null };
    }

    const computeTopCoins = () => {
      const sorted = [...cryptoData].sort(
        (a, b) =>
          (b.price_change_percentage_24h ?? -Infinity) -
          (a.price_change_percentage_24h ?? -Infinity)
      );

      const gainer = sorted.find(
        (coin) => coin.price_change_percentage_24h !== undefined
      );
      const loser = [...sorted]
        .reverse()
        .find((coin) => coin.price_change_percentage_24h !== undefined);

      return {
        gainer: gainer || sorted[0] || null,
        loser: loser || sorted[sorted.length - 1] || null,
      };
    };

    const highlightStorageKey = "tradelens_real_highlights";
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const now = Date.now();

    if (typeof window === "undefined") {
      return computeTopCoins();
    }

    try {
      const stored = localStorage.getItem(highlightStorageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.timestamp && now - parsed.timestamp < twentyFourHours) {
          const storedGainer =
            cryptoData.find((coin) => coin.id === parsed.gainerId) ?? null;
          const storedLoser =
            cryptoData.find((coin) => coin.id === parsed.loserId) ?? null;

          if (storedGainer && storedLoser) {
            return { topGainer: storedGainer, topLoser: storedLoser };
          }
        }
      }
    } catch (error) {
      console.warn("Failed to read highlight cache:", error);
    }

    const { gainer, loser } = computeTopCoins();

    try {
      localStorage.setItem(
        highlightStorageKey,
        JSON.stringify({
          timestamp: now,
          gainerId: gainer?.id ?? null,
          loserId: loser?.id ?? null,
        })
      );
    } catch (error) {
      console.warn("Failed to cache highlight pair:", error);
    }

    return { topGainer: gainer, topLoser: loser };
  }, [cryptoData]);

  const stockRows = useMemo(() => {
    return stockSymbols.map((symbol) => {
      const quote = stockQuotes?.[symbol] ?? null;
      const price = quote ? parseFloat(quote["05. price"]) : null;
      const changePercentRaw = quote?.["10. change percent"] || null;
      const changeValue =
        changePercentRaw !== null
          ? parseFloat(changePercentRaw.replace("%", ""))
          : quote
          ? parseFloat(quote["09. change"])
          : null;

      return {
        symbol,
        price: price !== null && !Number.isNaN(price) ? price : null,
        displayPrice: price !== null && !Number.isNaN(price) ? formatPrice(price) : "—",
        changePercent:
          changePercentRaw !== null && !Number.isNaN(changeValue)
            ? changeValue
            : null,
      };
    });
  }, [stockQuotes, stockSymbols]);


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1617880726918-4c862e74c826?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          {/* Dim Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60 dark:bg-opacity-70"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left space-y-8">
              <FadeInOnScroll direction="up" delay={0} duration={800}>
                <div className="inline-block">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full text-sm font-semibold">
                    Real-time Market Data
                  </span>
                </div>
              </FadeInOnScroll>

              <FadeInOnScroll direction="up" delay={200} duration={800}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent">
                    Your Financial
                  </span>
                  <span className="block bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
                    Dashboard
                  </span>
              </h1>
              </FadeInOnScroll>

              <FadeInOnScroll direction="up" delay={400} duration={800}>
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Track cryptocurrencies, stocks, and market trends with real-time data and powerful analytics tools.
              </p>
              </FadeInOnScroll>

              <FadeInOnScroll direction="up" delay={600} duration={800}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  {!authState.user ? (
                    <InteractiveHoverButton
                      to="/login"
                      text="Login to Get Started"
                      className="border-blue-600 bg-blue-600 text-white hover:border-blue-600 [&>div:nth-child(2)]:text-white [&>div:last-child]:bg-white/20"
                    />
                  ) : (
                    <>
                      <InteractiveHoverButton
                  to="/crypto"
                        text="Explore Crypto"
                        className="border-blue-600 bg-blue-600 text-white hover:border-blue-600 [&>div:nth-child(2)]:text-white [&>div:last-child]:bg-white/20"
                      />
                      <InteractiveHoverButton
                  to="/stocks"
                        text="View Stocks"
                        className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:border-white/50 [&>div:nth-child(2)]:text-white [&>div:last-child]:bg-white/20"
                      />
                    </>
                  )}
                </div>
              </FadeInOnScroll>

              {/* Stats */}
              <FadeInOnScroll direction="up" delay={800} duration={800}>
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
                  <div>
                    <AnimatedCounter
                      value="10K+"
                      duration={5000}
                      className="text-2xl sm:text-3xl font-bold text-white"
                    />
                    <div className="text-sm text-white/80">Assets</div>
                  </div>
                  <div>
                    <AnimatedCounter
                      value="50K+"
                      duration={5000}
                      className="text-2xl sm:text-3xl font-bold text-white"
                    />
                    <div className="text-sm text-white/80">Users</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white animate-fade-in">24/7</div>
                    <div className="text-sm text-white/80">Updates</div>
                  </div>
                </div>
              </FadeInOnScroll>
            </div>

            {/* Right Column - Dashboard Mockup */}
            <FadeInOnScroll direction="left" delay={400} duration={1000}>
              <div className="relative">
                {/* Mockup Container */}
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-500">
                  {/* Browser Chrome */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-md px-4 py-2 ml-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400">tradelens.com/dashboard</div>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Portfolio Performance</h3>
                      <div className="text-sm text-red-600 dark:text-red-400 font-semibold flex items-center">
                        <TrendingDown className="w-4 h-4 mr-1" />
                        -0.8%
                      </div>
                    </div>

                    {/* Price Cards */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Top Gainer */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border-2 border-green-200 dark:border-green-800">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">
                            Top Gainer
                          </span>
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {topGainer ? topGainer.symbol.toUpperCase() : "—"}
                          </div>
                        </div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {cryptoLoading && !topGainer
                            ? "Fetching..."
                            : formatPrice(topGainer?.current_price ?? null)}
                        </div>
                        <div
                          className={`text-sm font-bold ${
                            (topGainer?.price_change_percentage_24h ?? 0) >= 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {cryptoLoading && !topGainer
                            ? "—"
                            : formatChange(topGainer?.price_change_percentage_24h ?? null)}
                        </div>
                      </div>
                      {/* Top Loser */}
                      <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 p-4 rounded-xl border-2 border-red-200 dark:border-red-800">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-red-700 dark:text-red-400 uppercase tracking-wide">
                            Top Loser
                          </span>
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {topLoser ? topLoser.symbol.toUpperCase() : "—"}
                          </div>
                        </div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {cryptoLoading && !topLoser
                            ? "Fetching..."
                            : formatPrice(topLoser?.current_price ?? null)}
                        </div>
                        <div
                          className={`text-sm font-bold ${
                            (topLoser?.price_change_percentage_24h ?? 0) >= 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {cryptoLoading && !topLoser
                            ? "—"
                            : formatChange(topLoser?.price_change_percentage_24h ?? null)}
                        </div>
                      </div>
                    </div>

                    {/* Chart Area */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 h-32 flex items-end justify-between space-x-1">
                      {[35, 48, 42, 55, 45, 62, 58, 70, 65, 78, 72, 88].map((height, index) => (
                        <div
                          key={index}
                          className="flex-1 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t transition-all duration-500 hover:opacity-80 chart-bar"
                          style={{
                            height: `${height}%`,
                            animationDelay: `${index * 50}ms`,
                          }}
                        ></div>
                      ))}
                    </div>

                    {/* Stock List */}
                    <div className="space-y-2">
                      {stockLoading ? (
                        <div className="flex justify-center py-4">
                          <Loading text="Fetching stock prices..." />
                        </div>
                      ) : stockError ? (
                        <p className="text-sm text-red-500 dark:text-red-400 text-center py-4">
                          {stockError}
                        </p>
                      ) : (
                        stockRows.map((stock) => (
                          <div
                            key={stock.symbol}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                {stock.symbol}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {stock.displayPrice}
                              </div>
                            </div>
                            <div
                              className={`flex items-center text-sm font-semibold ${
                                stock.changePercent === null
                                  ? "text-gray-500 dark:text-gray-400"
                                  : stock.changePercent >= 0
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-400"
                              }`}
                            >
                              {stock.changePercent === null ? (
                                <span className="text-gray-500 dark:text-gray-400">—</span>
                              ) : stock.changePercent >= 0 ? (
                                <>
                                  <TrendingUp className="w-4 h-4 mr-1" />
                                  {formatChange(stock.changePercent)}
                                </>
                              ) : (
                                <>
                                  <TrendingDown className="w-4 h-4 mr-1" />
                                  {formatChange(stock.changePercent)}
                                </>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-2xl opacity-20 animate-float"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500 rounded-full opacity-20 animate-float animation-delay-2000"></div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive financial tools and data at your fingertips
            </p>
          </div>
          <FeaturesSectionWithHoverEffects />
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-16 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Market Overview
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Top cryptocurrencies and Market sentiment
            </p>
          </div>

          {/* Market Sentiment Gauge */}
          <div className="mb-12">
            <MarketSentimentGauge height={300} />
          </div>

          {/* Top Cryptocurrencies */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Top Cryptocurrencies
              </h3>
              <Link
                to="/crypto"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center space-x-1"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {cryptoLoading ? (
              <div className="flex justify-center py-12">
                <Loading text="Loading cryptocurrencies..." />
              </div>
            ) : cryptoError ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Couldn't load cryptocurrency data. Try again later.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topCryptos.map((coin) => (
                  <CryptoCard
                    key={coin.id}
                    coin={coin}
                    isFavorite={false}
                    onToggleFavorite={() => {}}
                    onClick={() => handleViewDetails(coin)}
                    showFavorite={false}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Latest Financial News
            </h2>
            <Link
              to="/news"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center space-x-1"
            >
              <span>View All News</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {newsLoading ? (
            <div className="flex justify-center py-12">
              <Loading text="Loading news..." />
            </div>
          ) : newsError ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                Couldn't load news data. Try again later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsArticles.map((article, index) => (
                <NewsCard key={index} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Crypto Details Modal */}
      <CryptoDetailsModal
        coin={selectedCoin}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Home;
