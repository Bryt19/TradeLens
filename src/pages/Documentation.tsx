import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Book,
  Code,
  Zap,
  Shield,
  BarChart3,
  ChevronRight,
  ChevronDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { AnimatedSearchBar } from "../components/ui/animated-search-bar";
import { Sparkles } from "../components/ui/sparkles";
import FadeInOnScroll from "../components/FadeInOnScroll";
import { motion } from "framer-motion";
import CTASection from "../components/CTASection";
import { NumberTicker } from "../components/ui/number-ticker";

const Documentation: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollButtons(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (showScrollButtons && !isHovering) {
      timeoutId = setTimeout(() => {
        setShowScrollButtons(false);
      }, 3000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showScrollButtons, isHovering]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleButtonClick = () => {
    setShowScrollButtons(true);
    setIsHovering(false);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    // Auto-expand sections that contain matching items
    if (query.trim()) {
      const matchingSections = documentationSections.filter(
        (section) =>
          section.title.toLowerCase().includes(query.toLowerCase()) ||
          section.items.some((item) =>
            item.title.toLowerCase().includes(query.toLowerCase()),
          ),
      );

      const matchingSectionIds = matchingSections.map((section) => section.id);
      setExpandedSections((prev) => {
        const newExpanded = [...new Set([...prev, ...matchingSectionIds])];
        return newExpanded;
      });
    }
  };

  const documentationSections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Zap,
      items: [
        { title: "Quick Start Guide", href: "#quick-start" },
        { title: "Authentication", href: "#authentication" },
        { title: "Your First API Call", href: "#first-call" },
        { title: "Rate Limits", href: "#rate-limits" },
      ],
    },
    {
      id: "crypto-api",
      title: "Cryptocurrency API",
      icon: BarChart3,
      items: [
        { title: "Market Data", href: "#crypto-markets" },
        { title: "Coin Details", href: "#crypto-coins" },
        { title: "Historical Data", href: "#crypto-history" },
        { title: "Price Charts", href: "#crypto-charts" },
      ],
    },
    {
      id: "stocks-api",
      title: "Stock Market API",
      icon: Book,
      items: [
        { title: "Stock Quotes", href: "#stock-quotes" },
        { title: "Market Data", href: "#stock-markets" },
        { title: "Company Information", href: "#company-info" },
        { title: "Historical Prices", href: "#stock-history" },
      ],
    },
    {
      id: "news-api",
      title: "News API",
      icon: Book,
      items: [
        { title: "Financial News", href: "#financial-news" },
        { title: "Crypto News", href: "#crypto-news" },
        { title: "Market Analysis", href: "#market-analysis" },
        { title: "News Categories", href: "#news-categories" },
      ],
    },
    {
      id: "sdk-libraries",
      title: "SDK & Libraries",
      icon: Code,
      items: [
        { title: "JavaScript SDK", href: "#js-sdk" },
        { title: "Python SDK", href: "#python-sdk" },
        { title: "Node.js SDK", href: "#node-sdk" },
        { title: "cURL Examples", href: "#curl-examples" },
      ],
    },
    {
      id: "security",
      title: "Security & Best Practices",
      icon: Shield,
      items: [
        { title: "API Security", href: "#api-security" },
        {
          title: "Authentication Best Practices",
          href: "#auth-best-practices",
        },
        { title: "Error Handling", href: "#error-handling" },
        { title: "Webhooks", href: "#webhooks" },
      ],
    },
  ];



  const quickStartCode = `# Install the Python SDK
pip install tradelens

# Import and initialize
from tradelens import TradeLens

# Initialize with your API key
client = TradeLens(api_key="your_api_key_here")

# Get cryptocurrency prices
crypto_data = client.crypto.get_markets(vs_currency="usd", limit=10)
print(crypto_data)

# Get stock quote
stock_quote = client.stocks.get_quote(symbol="AAPL")
print(stock_quote)`;

  const apiExamples = [
    {
      title: "Get Top Cryptocurrencies",
      description: "Fetch the top 10 cryptocurrencies by market cap",
      method: "GET",
      endpoint: "/v1/crypto/markets",
      code: `curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://api.tradelens.com/v1/crypto/markets?vs_currency=usd&limit=10"`,
    },
    {
      title: "Get Stock Quote",
      description: "Retrieve real-time stock price information",
      method: "GET",
      endpoint: "/v1/stocks/quote",
      code: `curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://api.tradelens.com/v1/stocks/quote?symbol=AAPL"`,
    },
    {
      title: "Get Financial News",
      description: "Fetch latest financial news articles",
      method: "GET",
      endpoint: "/v1/news",
      code: `curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://api.tradelens.com/v1/news?category=crypto&limit=5"`,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#030712]">
      {/* Hero Section */}
      <div className="relative bg-[#030712] py-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px]" />
        </div>
        <div className="absolute inset-0 opacity-30">
          <Sparkles color="#6366f1" density={50} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
             <FadeInOnScroll direction="up">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6"
                >
                  <Book className="w-4 h-4" />
                  <span>Developer Portal</span>
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Documentation
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                  Everything you need to integrate with TradeLens APIs and build powerful financial applications.
                </p>
                <div className="max-w-xl mx-auto backdrop-blur-md bg-white/5 rounded-2xl p-2 border border-white/10">
                  <AnimatedSearchBar
                    placeholder="Search docs, APIs, and guides..."
                    value={searchQuery}
                    onChange={handleSearch}
                    showResults={false}
                  />
                </div>
             </FadeInOnScroll>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <nav className="sticky top-24 space-y-2">
              {documentationSections.map((section) => (
                <div key={section.id} className="mb-4">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                      expandedSections.includes(section.id)
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                        : "bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <section.icon className="w-5 h-5" />
                      <span className="font-bold">{section.title}</span>
                    </div>
                    {expandedSections.includes(section.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSections.includes(section.id) && (
                    <div className="mt-2 ml-4 space-y-1">
                      {section.items.map((item, idx) => (
                        <a
                          key={`${section.id}-${idx}`}
                          href={item.href}
                          className="block p-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium border-l border-gray-200 dark:border-white/10 pl-4"
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <button 
                onClick={() => document.getElementById("quick-start")?.scrollIntoView({ behavior: "smooth" })}
                className="p-8 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl transition-all hover:scale-105 active:scale-95 group text-left"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <Zap className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold dark:text-white mb-2">Quick Start</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get up and running in minutes</p>
              </button>
              <button 
                onClick={() => document.getElementById("crypto-api")?.scrollIntoView({ behavior: "smooth" })}
                className="p-8 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl transition-all hover:scale-105 active:scale-95 group text-left"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                  <Code className="w-6 h-6 text-indigo-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold dark:text-white mb-2">API Reference</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Full endpoint specification</p>
              </button>
              <button 
                onClick={() => document.getElementById("security")?.scrollIntoView({ behavior: "smooth" })}
                className="p-8 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl transition-all hover:scale-105 active:scale-95 group text-left"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                  <Shield className="w-6 h-6 text-purple-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold dark:text-white mb-2">Security</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Best practices for auth</p>
              </button>
            </div>
            {/* Quick Start */}
            <div
              id="quick-start"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Quick Start Guide
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get up and running with TradeLens API in minutes. Here's a
                simple example using our Python SDK:
              </p>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                <pre className="text-gray-100 text-sm">
                  <code>{quickStartCode}</code>
                </pre>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/api"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  Get API Key
                </Link>
                <a
                  href="#"
                  className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-center"
                >
                  View All Examples
                </a>
              </div>
            </div>

            {/* Authentication */}
            <div
              id="authentication"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Authentication
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                All API requests require authentication using your API key.
                Include your API key in the Authorization header.
              </p>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-6">
                <pre className="text-gray-100 text-sm">
                  <code>{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://api.tradelens.com/v1/crypto/markets"`}</code>
                </pre>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  <strong>Important:</strong> Keep your API key secure and never
                  expose it in client-side code or public repositories.
                </p>
              </div>
            </div>

            {/* Your First API Call */}
            <div
              id="first-call"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Your First API Call
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Let's make your first API call to get cryptocurrency market
                data.
              </p>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-6">
                <pre className="text-gray-100 text-sm">
                  <code>{`# Python example
import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.tradelens.com/v1/crypto/markets',
    headers=headers,
    params={'vs_currency': 'usd', 'limit': 5}
)

data = response.json()
print(data)`}</code>
                </pre>
              </div>
            </div>

            {/* Rate Limits */}
            <div
              id="rate-limits"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Rate Limits
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                API rate limits help ensure fair usage and system stability.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Free Plan
                  </h3>
                   <p className="text-blue-800 dark:text-blue-200 text-sm">
                    <NumberTicker value="100" /> requests/hour
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                    Pro Plan
                  </h3>
                   <p className="text-green-800 dark:text-green-200 text-sm">
                    <NumberTicker value="1,000" /> requests/hour
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    Enterprise
                  </h3>
                  <p className="text-purple-800 dark:text-purple-200 text-sm">
                    Unlimited requests
                  </p>
                </div>
              </div>
            </div>

            {/* Cryptocurrency API - Market Data */}
            <div
              id="crypto-markets"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Cryptocurrency Market Data
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get real-time cryptocurrency market data including prices,
                market cap, and volume.
              </p>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-6">
                <pre className="text-gray-100 text-sm">
                  <code>{`GET /v1/crypto/markets
Parameters:
- vs_currency: Target currency (usd, eur, etc.)
- limit: Number of results (default: 100)
- order: Sort order (market_cap_desc, market_cap_asc, etc.)

Example:
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://api.tradelens.com/v1/crypto/markets?vs_currency=usd&limit=10"`}</code>
                </pre>
              </div>
            </div>

            {/* Cryptocurrency API - Coin Details */}
            <div
              id="crypto-coins"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Cryptocurrency Coin Details
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get detailed information about specific cryptocurrencies
                including current price, market data, and metadata.
              </p>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-6">
                <pre className="text-gray-100 text-sm">
                  <code>{`GET /v1/crypto/coins/{id}
Parameters:
- id: Coin ID (bitcoin, ethereum, etc.)
- vs_currency: Target currency

Example:
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://api.tradelens.com/v1/crypto/coins/bitcoin?vs_currency=usd"`}</code>
                </pre>
              </div>
            </div>

            {/* Cryptocurrency API - Historical Data */}
            <div
              id="crypto-history"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Cryptocurrency Historical Data
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Access historical price data for cryptocurrencies with various
                time intervals.
              </p>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-6">
                <pre className="text-gray-100 text-sm">
                  <code>{`GET /v1/crypto/coins/{id}/market_chart
Parameters:
- id: Coin ID
- vs_currency: Target currency
- days: Number of days (1, 7, 14, 30, 90, 180, 365, max)
- interval: Data interval (daily, hourly)

Example:
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://api.tradelens.com/v1/crypto/coins/bitcoin/market_chart?vs_currency=usd&days=30"`}</code>
                </pre>
              </div>
            </div>

            {/* Cryptocurrency API - Price Charts */}
            <div
              id="crypto-charts"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Cryptocurrency Price Charts
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get formatted chart data for building price charts and
                visualizations.
              </p>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-6">
                <pre className="text-gray-100 text-sm">
                  <code>{`GET /v1/crypto/coins/{id}/chart
Parameters:
- id: Coin ID
- vs_currency: Target currency
- days: Chart period
- interval: Data granularity

Example:
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://api.tradelens.com/v1/crypto/coins/ethereum/chart?vs_currency=usd&days=7&interval=hourly"`}</code>
                </pre>
              </div>
            </div>

            {/* API Examples */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                API Examples
              </h2>
              <div className="space-y-6">
                {apiExamples.map((example, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {example.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {example.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            example.method === "GET"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          }`}
                        >
                          {example.method}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
                      <code className="text-sm text-gray-800 dark:text-gray-200">
                        {example.endpoint}
                      </code>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-gray-100 text-sm">
                        <code>{example.code}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stock Market API - Stock Quotes */}
            <div
              id="stock-quotes"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Stock Quotes
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get real-time stock quotes and current market prices for stocks,
                ETFs, and other securities.
              </p>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-6">
                <pre className="text-gray-100 text-sm">
                  <code>{`GET /v1/stocks/quote
Parameters:
- symbol: Stock symbol (AAPL, GOOGL, MSFT, etc.)
- exchange: Exchange (NASDAQ, NYSE, etc.)

Example:
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://api.tradelens.com/v1/stocks/quote?symbol=AAPL"`}</code>
                </pre>
              </div>
            </div>

            {/* Stock Market API - Market Data */}
            <div
              id="stock-markets"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Stock Market Data
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Access comprehensive market data including market status,
                indices, and sector performance.
              </p>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-6">
                <pre className="text-gray-100 text-sm">
                  <code>{`GET /v1/stocks/markets
Parameters:
- exchange: Exchange filter
- status: Market status (open, closed, pre-market, after-hours)

Example:
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://api.tradelens.com/v1/stocks/markets?exchange=NASDAQ"`}</code>
                </pre>
              </div>
            </div>

            {/* Stock Market API - Company Information */}
            <div
              id="company-info"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Company Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get detailed company information including financials, profile,
                and key metrics.
              </p>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-6">
                <pre className="text-gray-100 text-sm">
                  <code>{`GET /v1/stocks/companies/{symbol}
Parameters:
- symbol: Stock symbol
- include: Additional data (financials, profile, metrics)

Example:
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://api.tradelens.com/v1/stocks/companies/AAPL?include=financials,profile"`}</code>
                </pre>
              </div>
            </div>

            {/* Stock Market API - Historical Prices */}
            <div
              id="stock-history"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Stock Historical Prices
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Access historical stock price data with various time intervals
                and technical indicators.
              </p>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-6">
                <pre className="text-gray-100 text-sm">
                  <code>{`GET /v1/stocks/{symbol}/history
Parameters:
- symbol: Stock symbol
- period: Time period (1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max)
- interval: Data interval (1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo)

Example:
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://api.tradelens.com/v1/stocks/AAPL/history?period=1y&interval=1d"`}</code>
                </pre>
              </div>
            </div>

            {/* News API - Financial News */}
            <div
              id="financial-news"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Financial News
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get the latest financial news from trusted sources covering
                markets, companies, and economic events.
              </p>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-6">
                <pre className="text-gray-100 text-sm">
                  <code>{`GET /v1/news
Parameters:
- category: News category (general, business, markets, etc.)
- limit: Number of articles (default: 20)
- language: Language code (en, es, fr, etc.)

Example:
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://api.tradelens.com/v1/news?category=markets&limit=10"`}</code>
                </pre>
              </div>
            </div>

            {/* News API - Crypto News */}
            <div
              id="crypto-news"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Cryptocurrency News
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Stay updated with the latest cryptocurrency news, market
                analysis, and blockchain developments.
              </p>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-6">
                <pre className="text-gray-100 text-sm">
                  <code>{`GET /v1/news/crypto
Parameters:
- coins: Specific cryptocurrencies (bitcoin, ethereum, etc.)
- limit: Number of articles
- sort: Sort order (published_desc, relevance)

Example:
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://api.tradelens.com/v1/news/crypto?coins=bitcoin,ethereum&limit=5"`}</code>
                </pre>
              </div>
            </div>

            {/* News API - Market Analysis */}
            <div
              id="market-analysis"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Market Analysis
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Access professional market analysis, research reports, and
                expert insights.
              </p>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-6">
                <pre className="text-gray-100 text-sm">
                  <code>{`GET /v1/news/analysis
Parameters:
- market: Market type (stocks, crypto, forex, commodities)
- timeframe: Analysis period (daily, weekly, monthly)
- limit: Number of articles

Example:
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://api.tradelens.com/v1/news/analysis?market=crypto&timeframe=daily"`}</code>
                </pre>
              </div>
            </div>

            {/* News API - News Categories */}
            <div
              id="news-categories"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                News Categories
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Browse news by categories and topics to find relevant
                information for your needs.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "General",
                  "Business",
                  "Markets",
                  "Technology",
                  "Crypto",
                  "Stocks",
                  "Forex",
                  "Commodities",
                ].map((category, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 text-center"
                  >
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                      {category}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            {/* SDK Downloads */}
            <div className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                SDK Downloads
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: "JavaScript", version: "v2.1.0", downloads: "10K+" },
                  { name: "Python", version: "v1.8.2", downloads: "25K+" },
                  { name: "Node.js", version: "v3.0.1", downloads: "8K+" },
                  { name: "PHP", version: "v1.5.0", downloads: "5K+" },
                ].map((sdk, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {sdk.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {sdk.version}
                    </p>
                    <p className="text-xs text-gray-400 mb-4">
                      {sdk.downloads} downloads
                    </p>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium transition-colors">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* JavaScript SDK */}
            <div
              id="js-sdk"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                JavaScript SDK
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Official JavaScript SDK for browser and Node.js environments.
              </p>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-6">
                <pre className="text-gray-100 text-sm">
                  <code>{`// Install via npm
npm install @tradelens/js-sdk

// Browser usage
import TradeLens from '@tradelens/js-sdk';

const client = new TradeLens({
  apiKey: 'your_api_key_here'
});

// Get crypto data
const cryptoData = await client.crypto.getMarkets({
  vs_currency: 'usd',
  limit: 10
});

console.log(cryptoData);`}</code>
                </pre>
              </div>
            </div>

            {/* Python SDK */}
            <div
              id="python-sdk"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Python SDK
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Official Python SDK for data analysis and backend applications.
              </p>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-6">
                <pre className="text-gray-100 text-sm">
                  <code>{`# Install via pip
pip install tradelens

# Import and initialize
from tradelens import TradeLens

client = TradeLens(api_key='your_api_key_here')

# Get stock data
stock_data = client.stocks.get_quote(symbol='AAPL')
print(stock_data)

# Get news
news = client.news.get_articles(category='crypto', limit=5)
for article in news:
    print(article.title)`}</code>
                </pre>
              </div>
            </div>

            {/* Node.js SDK */}
            <div
              id="node-sdk"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Node.js SDK
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Official Node.js SDK for server-side applications and
                microservices.
              </p>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-6">
                <pre className="text-gray-100 text-sm">
                  <code>{`// Install via npm
npm install @tradelens/node-sdk

// Import and initialize
const TradeLens = require('@tradelens/node-sdk');

const client = new TradeLens({
  apiKey: 'your_api_key_here'
});

// Async/await usage
async function getMarketData() {
  try {
    const markets = await client.crypto.getMarkets({
      vs_currency: 'usd',
      limit: 20
    });
    console.log(markets);
  } catch (error) {
    console.error('Error:', error);
  }
}`}</code>
                </pre>
              </div>
            </div>

            {/* cURL Examples */}
            <div
              id="curl-examples"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                cURL Examples
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Direct HTTP API calls using cURL for testing and integration.
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Get Crypto Markets
                  </h3>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-gray-100 text-sm">
                      <code>{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://api.tradelens.com/v1/crypto/markets?vs_currency=usd&limit=10"`}</code>
                    </pre>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Get Stock Quote
                  </h3>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-gray-100 text-sm">
                      <code>{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://api.tradelens.com/v1/stocks/quote?symbol=AAPL"`}</code>
                    </pre>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Get News
                  </h3>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-gray-100 text-sm">
                      <code>{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://api.tradelens.com/v1/news?category=crypto&limit=5"`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* API Security */}
            <div
              id="api-security"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                API Security
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Best practices for securing your API integration and protecting
                your data.
              </p>
              <div className="space-y-6">
                <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">
                    🔒 Keep API Keys Secure
                  </h3>
                  <p className="text-red-800 dark:text-red-200 text-sm">
                    Never expose API keys in client-side code, public
                    repositories, or logs.
                  </p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                    🛡️ Use HTTPS Only
                  </h3>
                  <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                    Always use HTTPS endpoints to encrypt data in transit.
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    📊 Monitor Usage
                  </h3>
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    Regularly monitor your API usage and set up alerts for
                    unusual activity.
                  </p>
                </div>
              </div>
            </div>

            {/* Authentication Best Practices */}
            <div
              id="auth-best-practices"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Authentication Best Practices
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Follow these guidelines to implement secure authentication in
                your applications.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 dark:text-green-400 text-sm font-bold">
                      ✓
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Use Environment Variables
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Store API keys in environment variables, not in code.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 dark:text-green-400 text-sm font-bold">
                      ✓
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Implement Key Rotation
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Regularly rotate your API keys for enhanced security.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 dark:text-green-400 text-sm font-bold">
                      ✓
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Use Server-Side Proxies
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      For client-side apps, proxy API calls through your
                      backend.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Handling */}
            <div
              id="error-handling"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Error Handling
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Understand API error responses and implement proper error
                handling in your applications.
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    HTTP Status Codes
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-50 dark:bg-red-900 rounded-lg p-4">
                      <h4 className="font-semibold text-red-900 dark:text-red-100">
                        400 - Bad Request
                      </h4>
                      <p className="text-red-800 dark:text-red-200 text-sm">
                        Invalid parameters or malformed request
                      </p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900 rounded-lg p-4">
                      <h4 className="font-semibold text-red-900 dark:text-red-100">
                        401 - Unauthorized
                      </h4>
                      <p className="text-red-800 dark:text-red-200 text-sm">
                        Invalid or missing API key
                      </p>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-900 dark:text-yellow-100">
                        429 - Too Many Requests
                      </h4>
                      <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                        Rate limit exceeded
                      </p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900 rounded-lg p-4">
                      <h4 className="font-semibold text-red-900 dark:text-red-100">
                        500 - Server Error
                      </h4>
                      <p className="text-red-800 dark:text-red-200 text-sm">
                        Internal server error
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Error Response Format
                  </h3>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-gray-100 text-sm">
                      <code>{`{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again in 60 seconds.",
    "details": {
      "limit": 100,
      "remaining": 0,
      "reset_time": "2024-01-15T10:30:00Z"
    }
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Webhooks */}
            <div
              id="webhooks"
              className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Webhooks
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Set up webhooks to receive real-time notifications about market
                events and data updates.
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Setting Up Webhooks
                  </h3>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                    <pre className="text-gray-100 text-sm">
                      <code>{`POST /v1/webhooks
{
  "url": "https://your-app.com/webhook",
  "events": ["price_change", "news_alert"],
  "secret": "your_webhook_secret"
}`}</code>
                    </pre>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Webhook Events
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                        price_change
                      </h4>
                      <p className="text-blue-800 dark:text-blue-200 text-sm">
                        Triggered when cryptocurrency prices change
                        significantly
                      </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 dark:text-green-100">
                        news_alert
                      </h4>
                      <p className="text-green-800 dark:text-green-200 text-sm">
                        Triggered when important financial news is published
                      </p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 dark:text-purple-100">
                        market_open
                      </h4>
                      <p className="text-purple-800 dark:text-purple-200 text-sm">
                        Triggered when stock markets open
                      </p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-900 dark:text-orange-100">
                        market_close
                      </h4>
                      <p className="text-orange-800 dark:text-orange-200 text-sm">
                        Triggered when stock markets close
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Webhook Security
                  </h3>
                  <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                    <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                      <strong>Important:</strong> Always verify webhook
                      signatures using the provided secret to ensure
                      authenticity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support */}
            <CTASection
              title="Need Help?"
              description="Our support team is here to help you succeed"
              primaryButtonText="Contact Support"
              primaryButtonTo="/contact"
              secondaryButtonText="Join Community"
              secondaryButtonTo="/community"
              className="mt-8"
            />
          </div>
        </div>
      </div>

      {/* Scroll Buttons */}
      {showScrollButtons && (
        <div
          className="fixed right-6 bottom-6 flex flex-col gap-3 z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={() => {
              scrollToTop();
              handleButtonClick();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 group"
            title="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              scrollToBottom();
              handleButtonClick();
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 group"
            title="Scroll to bottom"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Documentation;
