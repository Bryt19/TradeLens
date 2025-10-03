import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Coins, BarChart3, Newspaper, Monitor, ArrowRight } from "lucide-react";
import { useCryptocurrencies, useFinancialNews } from "../hooks/useApi";
import CryptoCard from "../components/CryptoCard";
import CryptoDetailsModal from "../components/CryptoDetailsModal";
import NewsCard from "../components/NewsCard";
import Loading from "../components/Loading";
import MarketSentimentGauge from "../components/MarketSentimentGauge";
import { CoinGeckoCoin } from "../types";
import { useAuth } from "../contexts/AuthContext";

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

  const features = [
    {
      icon: Coins,
      title: "Real-time Crypto Prices",
      description:
        "Track cryptocurrency prices with live updates and detailed market data.",
      link: "/crypto",
    },
    {
      icon: BarChart3,
      title: "Stock Market Data",
      description:
        "Monitor stock prices, market trends, and company information.",
      link: "/stocks",
    },
    {
      icon: Monitor,
      title: "Trading Platforms",
      description:
        "Discover the best trading platforms across different categories.",
      link: "/platforms",
    },
    {
      icon: Newspaper,
      title: "Financial News",
      description: "Stay updated with the latest financial and crypto news.",
      link: "/news",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1617880726918-4c862e74c826?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center text-white">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Welcome to TradeLens
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-200 max-w-4xl mx-auto px-4">
                Your comprehensive financial dashboard for real-time market data
                and insights
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
                <Link
                  to="/crypto"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                >
                  <Coins className="w-5 h-5" />
                  <span>Explore Crypto</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/stocks"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>View Stocks</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="group p-4 sm:p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors flex-shrink-0">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
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
