import React, { useState } from "react";
import { Calendar, User, ArrowRight, Tag, Clock, Filter } from "lucide-react";

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Cryptocurrency Trading: Trends to Watch in 2024",
      excerpt:
        "Explore the latest trends shaping the cryptocurrency market and how they're revolutionizing trading strategies.",
      author: "Sarah Chen",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Cryptocurrency",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=300&fit=crop",
      featured: true,
    },
    {
      id: 2,
      title: "Understanding Market Volatility: A Guide for New Investors",
      excerpt:
        "Learn how to navigate market volatility and make informed investment decisions during uncertain times.",
      author: "Michael Rodriguez",
      date: "2024-01-12",
      readTime: "7 min read",
      category: "Education",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=300&fit=crop",
      featured: false,
    },
    {
      id: 3,
      title: "API Integration Best Practices for Financial Applications",
      excerpt:
        "Discover the essential best practices for integrating financial data APIs into your applications.",
      author: "Emily Johnson",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Technology",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop",
      featured: false,
    },
    {
      id: 4,
      title: "Stock Market Analysis: Q4 2023 Performance Review",
      excerpt:
        "A comprehensive analysis of stock market performance in Q4 2023 and what it means for investors.",
      author: "Bright Akoto",
      date: "2024-01-08",
      readTime: "8 min read",
      category: "Analysis",
      image:
        "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=300&fit=crop",
      featured: false,
    },
    {
      id: 5,
      title: "Building a Diversified Portfolio: A Step-by-Step Guide",
      excerpt:
        "Learn how to build a well-diversified investment portfolio that can weather market fluctuations.",
      author: "Sarah Chen",
      date: "2024-01-05",
      readTime: "9 min read",
      category: "Education",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=300&fit=crop",
      featured: false,
    },
    {
      id: 6,
      title: "Real-Time Data: The Key to Successful Trading",
      excerpt:
        "Why real-time market data is crucial for trading success and how to leverage it effectively.",
      author: "Michael Rodriguez",
      date: "2024-01-03",
      readTime: "4 min read",
      category: "Trading",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=300&fit=crop",
      featured: false,
    },
    {
      id: 7,
      title: "Bitcoin ETF Approval: What It Means for Crypto Markets",
      excerpt:
        "Analyzing the impact of Bitcoin ETF approval on cryptocurrency markets and investor sentiment.",
      author: "Sarah Chen",
      date: "2024-01-01",
      readTime: "6 min read",
      category: "Cryptocurrency",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=300&fit=crop",
      featured: false,
    },
    {
      id: 8,
      title: "Risk Management Strategies for Crypto Investors",
      excerpt:
        "Essential risk management techniques every cryptocurrency investor should know and implement.",
      author: "Emily Johnson",
      date: "2023-12-28",
      readTime: "7 min read",
      category: "Education",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=300&fit=crop",
      featured: false,
    },
    {
      id: 9,
      title: "Machine Learning in Financial Data Analysis",
      excerpt:
        "How machine learning algorithms are revolutionizing financial data analysis and prediction.",
      author: "Bright Akoto",
      date: "2023-12-25",
      readTime: "8 min read",
      category: "Technology",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop",
      featured: false,
    },
    {
      id: 10,
      title: "Market Sentiment Analysis: Tools and Techniques",
      excerpt:
        "Learn how to analyze market sentiment using various tools and techniques for better trading decisions.",
      author: "Michael Rodriguez",
      date: "2023-12-22",
      readTime: "5 min read",
      category: "Analysis",
      image:
        "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=300&fit=crop",
      featured: false,
    },
    {
      id: 11,
      title: "Day Trading vs Long-Term Investing: Which is Right for You?",
      excerpt:
        "A comprehensive comparison of day trading and long-term investing strategies to help you choose your path.",
      author: "Sarah Chen",
      date: "2023-12-20",
      readTime: "9 min read",
      category: "Trading",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=300&fit=crop",
      featured: false,
    },
    // Additional Cryptocurrency articles (4 total)
    {
      id: 12,
      title: "Ethereum 2.0: The Future of Smart Contracts and DeFi",
      excerpt:
        "Exploring the impact of Ethereum's upgrade on decentralized finance and smart contract capabilities.",
      author: "Emily Johnson",
      date: "2023-12-18",
      readTime: "6 min read",
      category: "Cryptocurrency",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=300&fit=crop",
      featured: false,
    },
    {
      id: 13,
      title: "Altcoin Season: Identifying the Next Big Cryptocurrency",
      excerpt:
        "Learn how to research and identify promising altcoins before they become mainstream investments.",
      author: "Michael Rodriguez",
      date: "2023-12-15",
      readTime: "7 min read",
      category: "Cryptocurrency",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=300&fit=crop",
      featured: false,
    },
    // Additional Technology articles (3 total)
    {
      id: 14,
      title: "Blockchain Technology: Beyond Cryptocurrency",
      excerpt:
        "Discover how blockchain technology is revolutionizing industries beyond digital currencies.",
      author: "Emily Johnson",
      date: "2023-12-05",
      readTime: "6 min read",
      category: "Technology",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop",
      featured: false,
    },
    // Additional Analysis articles (3 total)
    {
      id: 15,
      title: "Global Economic Indicators: What Investors Should Watch",
      excerpt:
        "Key economic indicators that every investor should monitor for informed decision making.",
      author: "Sarah Chen",
      date: "2023-11-28",
      readTime: "6 min read",
      category: "Analysis",
      image:
        "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=300&fit=crop",
      featured: false,
    },
    // Additional Trading articles (3 total)
    {
      id: 16,
      title: "Options Trading Strategies for Beginners",
      excerpt:
        "Essential options trading strategies that every beginner should understand before getting started.",
      author: "Emily Johnson",
      date: "2023-11-25",
      readTime: "9 min read",
      category: "Trading",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=300&fit=crop",
      featured: false,
    },
  ];

  const categories = [
    "All",
    "Cryptocurrency",
    "Education",
    "Technology",
    "Analysis",
    "Trading",
  ];

  // Filter posts based on selected category
  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  // Get posts count for each category
  const getCategoryCount = (category: string) => {
    if (category === "All") return blogPosts.length;
    return blogPosts.filter((post) => post.category === category).length;
  };

  // Handle newsletter subscription
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate successful subscription
      setIsSubscribed(true);
      setEmail("");

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            TradeLens Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay informed with the latest insights, analysis, and trends in
            financial markets, cryptocurrency, and trading strategies.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filter by Category
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {category}
                <span className="ml-2 text-xs opacity-75">
                  ({getCategoryCount(category)})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {selectedCategory === "All"
              ? "All Articles"
              : `${selectedCategory} Articles`}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {selectedCategory === "All"
              ? `Showing all ${filteredPosts.length} articles`
              : `Showing ${filteredPosts.length} article${
                  filteredPosts.length !== 1 ? "s" : ""
                } in ${selectedCategory}`}
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          {filteredPosts
            .filter((post) => post.featured)
            .map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                      <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <button className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No articles found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              No articles available in the {selectedCategory} category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts
              .filter((post) => !post.featured)
              .map((post) => (
                <article
                  key={post.id}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <button className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                        <span>Read</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-6 text-blue-100">
            Subscribe to our newsletter for the latest market insights and
            trading tips
          </p>

          {isSubscribed ? (
            <div className="max-w-md mx-auto">
              <div className="bg-green-500 text-white px-6 py-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  🎉 Successfully Subscribed!
                </h3>
                <p className="text-sm">
                  Thank you for subscribing to our newsletter. You'll receive
                  the latest updates soon!
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
