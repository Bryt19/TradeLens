import React, { useState, useMemo } from "react";
import { Newspaper, RefreshCw, ExternalLink } from "lucide-react";
import {
  useFinancialNews,
  useCryptoNews,
  useBusinessNews,
  useCryptoPanicNews,
  useTrendingCryptoNews,
} from "../hooks/useApi";
import NewsCard from "../components/NewsCard";
import Loading from "../components/Loading";
import {
  demoFinancialNews,
  demoCryptoNews,
  demoBusinessNews,
  generateMoreNewsData,
} from "../services/demoData";

type NewsCategory = "all" | "financial" | "crypto" | "business" | "trending";

const News: React.FC = () => {
  const [category, setCategory] = useState<NewsCategory>("all");
  const [page, setPage] = useState(1);

  const {
    data: financialNews,
    loading: financialLoading,
    error: financialError,
    refetch: refetchFinancial,
  } = useFinancialNews(page, 12);

  const {
    data: cryptoNews,
    loading: cryptoLoading,
    error: cryptoError,
    refetch: refetchCrypto,
  } = useCryptoNews(page, 12);

  const {
    data: businessNews,
    loading: businessLoading,
    error: businessError,
    refetch: refetchBusiness,
  } = useBusinessNews(page, 12);

  const {
    data: cryptoPanicNews,
    loading: cryptoPanicLoading,
    error: cryptoPanicError,
    refetch: refetchCryptoPanic,
  } = useCryptoPanicNews(page, 12);

  const {
    data: trendingCryptoNews,
    loading: trendingLoading,
    error: trendingError,
    refetch: refetchTrending,
  } = useTrendingCryptoNews(page, 12);

  const categories = [
    { key: "all" as const, label: "All News", icon: Newspaper },
    { key: "financial" as const, label: "Financial", icon: Newspaper },
    { key: "crypto" as const, label: "Crypto", icon: Newspaper },
    { key: "business" as const, label: "Business", icon: Newspaper },
    { key: "trending" as const, label: "Trending", icon: Newspaper },
  ];

  // Generate more diverse news data
  const additionalNews = useMemo(() => {
    return generateMoreNewsData(20); // Generate 20 additional articles
  }, []);

  // Shuffle array to randomize news order
  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Deduplicate articles based on title and URL
  const deduplicateArticles = (articles: any[]) => {
    const seen = new Set();
    return articles.filter((article) => {
      const key = `${article.title}-${article.url}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  };

  const getCurrentData = () => {
    // Use demo data as fallback when API fails
    const getDemoData = (category: NewsCategory) => {
      switch (category) {
        case "financial":
          return demoFinancialNews;
        case "crypto":
          return demoCryptoNews;
        case "business":
          return demoBusinessNews;
        case "trending":
          return demoCryptoNews; // Use crypto demo data for trending
        case "all":
        default:
          return [
            ...demoFinancialNews,
            ...demoCryptoNews,
            ...demoBusinessNews,
            ...additionalNews,
          ];
      }
    };

    switch (category) {
      case "financial":
        return {
          data: deduplicateArticles(
            shuffleArray(financialNews?.articles || getDemoData("financial")),
          ),
          loading: financialLoading,
          error: financialError,
          refetch: refetchFinancial,
        };
      case "crypto":
        return {
          data: deduplicateArticles(
            shuffleArray(cryptoNews?.articles || getDemoData("crypto")),
          ),
          loading: cryptoLoading,
          error: cryptoError,
          refetch: refetchCrypto,
        };
      case "business":
        return {
          data: deduplicateArticles(
            shuffleArray(businessNews?.articles || getDemoData("business")),
          ),
          loading: businessLoading,
          error: businessError,
          refetch: refetchBusiness,
        };
      case "trending":
        return {
          data: deduplicateArticles(
            shuffleArray(
              trendingCryptoNews?.articles || getDemoData("trending"),
            ),
          ),
          loading: trendingLoading,
          error: trendingError,
          refetch: refetchTrending,
        };
      case "all":
      default:
        // Combine all news sources with demo data fallback
        const apiArticles = [
          ...(financialNews?.articles || []),
          ...(cryptoNews?.articles || []),
          ...(businessNews?.articles || []),
          ...(cryptoPanicNews?.articles || []),
          ...(trendingCryptoNews?.articles || []),
        ];

        const allArticles =
          apiArticles.length > 0
            ? deduplicateArticles(shuffleArray(apiArticles)).sort(
                (a, b) =>
                  new Date(b.publishedAt).getTime() -
                  new Date(a.publishedAt).getTime(),
              )
            : deduplicateArticles(shuffleArray(getDemoData("all"))).sort(
                (a, b) =>
                  new Date(b.publishedAt).getTime() -
                  new Date(a.publishedAt).getTime(),
              );

        return {
          data: allArticles,
          loading:
            financialLoading ||
            cryptoLoading ||
            businessLoading ||
            cryptoPanicLoading ||
            trendingLoading,
          error:
            financialError ||
            cryptoError ||
            businessError ||
            cryptoPanicError ||
            trendingError,
          refetch: () => {
            refetchFinancial();
            refetchCrypto();
            refetchBusiness();
            refetchCryptoPanic();
            refetchTrending();
          },
        };
    }
  };

  const { data: articles, loading, error, refetch } = getCurrentData();

  const handleCategoryChange = (newCategory: NewsCategory) => {
    setCategory(newCategory);
    setPage(1);
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Financial News
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Stay updated with the latest financial and market news
          </p>
        </div>

        {/* Category Filter */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.key}
                    onClick={() => handleCategoryChange(cat.key)}
                    className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                      category === cat.key
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{cat.label}</span>
                    <span className="sm:hidden">{cat.label.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
              >
                <RefreshCw
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${
                    loading ? "animate-spin" : ""
                  }`}
                />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {articles.length} articles
            {category !== "all" &&
              ` in ${categories.find((c) => c.key === category)?.label}`}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <Loading text="Loading news..." />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8">
              <Newspaper className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Couldn't load news
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                There was an error loading the news. This might be due to API
                limitations.
              </p>
              <button
                onClick={handleRefresh}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && articles.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8">
              <Newspaper className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No news articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                No articles available for the selected category.
              </p>
            </div>
          </div>
        )}

        {/* News Grid */}
        {!loading && !error && articles.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {articles.map((article, index) => (
                <NewsCard key={`${article.url}-${index}`} article={article} />
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-6 sm:mt-8">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          </>
        )}

        {/* API Notice */}
        <div className="mt-12 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <ExternalLink className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                API Notice
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                This demo uses limited API access. In production, you would need
                valid API keys for NewsAPI to access real-time news data. Some
                features may show placeholder data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
