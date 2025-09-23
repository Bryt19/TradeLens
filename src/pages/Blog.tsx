import React, { useState } from "react";
import {
  Calendar,
  User,
  ArrowRight,
  Tag,
  Clock,
  Filter,
  X,
} from "lucide-react";

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Cryptocurrency Trading: Trends to Watch in 2025",
      excerpt:
        "Explore the latest trends shaping the cryptocurrency market and how they're revolutionizing trading strategies.",
      author: "Sarah Chen",
      date: "2025-09-15",
      readTime: "5 min read",
      category: "Cryptocurrency",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=300&fit=crop",
      featured: true,
      content: `
        <p>The cryptocurrency market continues to evolve at a rapid pace, with 2024 bringing forth several groundbreaking trends that are reshaping how we think about digital asset trading. From institutional adoption to regulatory clarity, the landscape is becoming more sophisticated and accessible than ever before.</p>
        
        <h3>Institutional Adoption Accelerates</h3>
        <p>One of the most significant developments this year has been the accelerated pace of institutional adoption. Major corporations, pension funds, and investment firms are now allocating substantial portions of their portfolios to cryptocurrencies. This trend is driven by several factors:</p>
        
        <ul>
          <li>Improved regulatory frameworks providing clearer guidelines</li>
          <li>Enhanced security measures and custody solutions</li>
          <li>Growing recognition of crypto as a legitimate asset class</li>
          <li>Diversification benefits in traditional portfolios</li>
        </ul>
        
        <h3>DeFi Integration with Traditional Finance</h3>
        <p>Decentralized Finance (DeFi) protocols are increasingly integrating with traditional financial systems, creating hybrid solutions that offer the benefits of both worlds. This integration is enabling:</p>
        
        <ul>
          <li>Seamless cross-chain transactions</li>
          <li>Automated yield farming strategies</li>
          <li>Decentralized lending and borrowing</li>
          <li>Real-time market data and analytics</li>
        </ul>
        
        <h3>AI-Powered Trading Strategies</h3>
        <p>Artificial Intelligence is revolutionizing cryptocurrency trading by providing sophisticated analysis tools and automated trading strategies. Machine learning algorithms can now:</p>
        
        <ul>
          <li>Analyze market sentiment in real-time</li>
          <li>Identify trading patterns across multiple timeframes</li>
          <li>Execute trades based on predictive models</li>
          <li>Manage risk through dynamic portfolio allocation</li>
        </ul>
        
        <h3>Looking Ahead</h3>
        <p>As we move forward, the cryptocurrency market is expected to become more mature, stable, and integrated with traditional financial systems. The trends we're seeing today are just the beginning of a fundamental transformation in how we think about money, investments, and financial services.</p>
        
        <p>For traders and investors, staying informed about these trends is crucial for making informed decisions and capitalizing on emerging opportunities in this dynamic market.</p>
      `,
    },
    {
      id: 2,
      title: "Understanding Market Volatility: A Guide for New Investors",
      excerpt:
        "Learn how to navigate market volatility and make informed investment decisions during uncertain times.",
      author: "Michael Rodriguez",
      date: "2025-09-12",
      readTime: "5 min read",
      category: "Education",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=300&fit=crop",
      featured: false,
      content: `
        <p>Market volatility is one of the most misunderstood aspects of investing, yet it's also one of the most important concepts for new investors to grasp. Understanding volatility can help you make better investment decisions and maintain your composure during turbulent market conditions.</p>
        
        <h3>What is Market Volatility?</h3>
        <p>Market volatility refers to the degree of variation in trading prices over time. It's measured by the standard deviation of returns and indicates how much an investment's value fluctuates. High volatility means prices change dramatically over short periods, while low volatility indicates more stable, predictable price movements.</p>
        
        <h3>Types of Volatility</h3>
        <p>There are two main types of volatility that investors should understand:</p>
        
        <ul>
          <li><strong>Historical Volatility:</strong> Based on past price movements and helps predict future volatility</li>
          <li><strong>Implied Volatility:</strong> Derived from options prices and reflects market expectations</li>
        </ul>
        
        <h3>Factors Driving Market Volatility</h3>
        <p>Several factors can increase market volatility:</p>
        
        <ul>
          <li>Economic news and data releases</li>
          <li>Geopolitical events and uncertainty</li>
          <li>Central bank policy changes</li>
          <li>Corporate earnings reports</li>
          <li>Market sentiment and investor behavior</li>
        </ul>
        
        <h3>Strategies for Managing Volatility</h3>
        <p>While volatility can't be eliminated, it can be managed through various strategies:</p>
        
        <ul>
          <li><strong>Diversification:</strong> Spread investments across different asset classes and sectors</li>
          <li><strong>Dollar-Cost Averaging:</strong> Invest fixed amounts regularly regardless of market conditions</li>
          <li><strong>Long-term Perspective:</strong> Focus on long-term goals rather than short-term fluctuations</li>
          <li><strong>Risk Management:</strong> Set stop-loss orders and position sizing limits</li>
        </ul>
        
        <h3>Building Volatility Resilience</h3>
        <p>Developing resilience to market volatility takes time and experience. Key practices include:</p>
        
        <ul>
          <li>Regular portfolio reviews and rebalancing</li>
          <li>Staying informed about market conditions</li>
          <li>Maintaining realistic expectations</li>
          <li>Seeking professional advice when needed</li>
        </ul>
        
        <p>Remember, volatility is a normal part of investing. By understanding its nature and implementing proper risk management strategies, you can navigate market volatility with confidence and achieve your long-term financial goals.</p>
      `,
    },
    {
      id: 3,
      title: "API Integration Best Practices for Financial Applications",
      excerpt:
        "Discover the essential best practices for integrating financial data APIs into your applications.",
      author: "Emily Johnson",
      date: "2025-09-10",
      readTime: "6 min read",
      category: "Technology",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop",
      featured: false,
      content: `
        <p>Integrating financial data APIs into your applications requires careful planning and adherence to best practices to ensure reliability, security, and optimal performance. Whether you're building a trading platform, portfolio tracker, or financial analytics tool, following these guidelines will help you create robust integrations.</p>
        
        <h3>API Selection and Evaluation</h3>
        <p>Choosing the right API provider is crucial for your application's success. Consider these factors:</p>
        
        <ul>
          <li><strong>Data Quality:</strong> Ensure the API provides accurate, real-time data</li>
          <li><strong>Coverage:</strong> Verify the API covers the markets and instruments you need</li>
          <li><strong>Reliability:</strong> Check uptime statistics and service level agreements</li>
          <li><strong>Rate Limits:</strong> Understand request limits and pricing tiers</li>
          <li><strong>Documentation:</strong> Look for comprehensive, well-maintained documentation</li>
        </ul>
        
        <h3>Security Best Practices</h3>
        <p>Financial data APIs require special attention to security:</p>
        
        <ul>
          <li><strong>API Key Management:</strong> Store keys securely and rotate them regularly</li>
          <li><strong>HTTPS Only:</strong> Always use encrypted connections</li>
          <li><strong>Input Validation:</strong> Validate all user inputs before making API calls</li>
          <li><strong>Error Handling:</strong> Implement proper error handling without exposing sensitive information</li>
          <li><strong>Rate Limiting:</strong> Implement client-side rate limiting to avoid hitting API limits</li>
        </ul>
        
        <h3>Performance Optimization</h3>
        <p>Optimize your API integration for better performance:</p>
        
        <ul>
          <li><strong>Caching:</strong> Implement intelligent caching strategies</li>
          <li><strong>Batch Requests:</strong> Combine multiple requests when possible</li>
          <li><strong>Async Processing:</strong> Use asynchronous calls to avoid blocking</li>
          <li><strong>Connection Pooling:</strong> Reuse HTTP connections</li>
          <li><strong>Data Compression:</strong> Use compression for large data transfers</li>
        </ul>
        
        <h3>Error Handling and Resilience</h3>
        <p>Build resilient integrations that can handle failures gracefully:</p>
        
        <ul>
          <li><strong>Retry Logic:</strong> Implement exponential backoff for failed requests</li>
          <li><strong>Circuit Breaker:</strong> Prevent cascading failures</li>
          <li><strong>Fallback Data:</strong> Use cached data when APIs are unavailable</li>
          <li><strong>Monitoring:</strong> Track API performance and error rates</li>
          <li><strong>Alerting:</strong> Set up alerts for critical failures</li>
        </ul>
        
        <h3>Data Management</h3>
        <p>Proper data management is essential for financial applications:</p>
        
        <ul>
          <li><strong>Data Validation:</strong> Validate API responses before processing</li>
          <li><strong>Data Transformation:</strong> Normalize data from different sources</li>
          <li><strong>Storage Strategy:</strong> Choose appropriate storage solutions</li>
          <li><strong>Data Retention:</strong> Implement proper data retention policies</li>
          <li><strong>Backup and Recovery:</strong> Ensure data can be recovered in case of failures</li>
        </ul>
        
        <h3>Testing and Monitoring</h3>
        <p>Comprehensive testing and monitoring are crucial:</p>
        
        <ul>
          <li><strong>Unit Testing:</strong> Test individual API integration components</li>
          <li><strong>Integration Testing:</strong> Test end-to-end API workflows</li>
          <li><strong>Load Testing:</strong> Test performance under various load conditions</li>
          <li><strong>Monitoring:</strong> Track API usage, performance, and errors</li>
          <li><strong>Logging:</strong> Implement comprehensive logging for debugging</li>
        </ul>
        
        <p>By following these best practices, you can create robust, secure, and performant financial API integrations that provide reliable data to your users while maintaining high standards of security and performance.</p>
      `,
    },
    {
      id: 4,
      title: "Stock Market Analysis: Q4 2024 Performance Review",
      excerpt:
        "A comprehensive analysis of stock market performance in Q4 2024 and what it means for investors.",
      author: "Bright Akoto",
      date: "2025-09-08",
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
      date: "2025-09-05",
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
      date: "2025-09-03",
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
      date: "2025-09-01",
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
      date: "2025-08-29",
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
      date: "2025-08-25",
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
      date: "2025-08-22",
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
      date: "2025-08-20",
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
      date: "2025-08-18",
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
      date: "2025-08-15",
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
      date: "2025-08-05",
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
      date: "2025-08-02",
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
      date: "2025-07-30",
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

  // Handle blog post selection
  const handleReadMore = (post: any) => {
    setSelectedPost(post);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedPost(null);
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
                      alt={`Featured blog post image: ${post.title} by ${post.author}`}
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
                      <button
                        onClick={() => handleReadMore(post)}
                        className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                      >
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
                    alt={`Blog article image: ${post.title} - ${post.category} article`}
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
                      <button
                        onClick={() => handleReadMore(post)}
                        className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                      >
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

      {/* Blog Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={handleCloseModal}
          />

          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-lg shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                      {selectedPost.category}
                    </span>
                    {selectedPost.featured && (
                      <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Article Header */}
                <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {selectedPost.title}
                  </h1>

                  {/* Author and Date Info */}
                  <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{selectedPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(selectedPost.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{selectedPost.readTime}</span>
                    </div>
                  </div>

                  {/* Featured Image */}
                  <div className="mb-8">
                    <img
                      src={selectedPost.image}
                      alt={`${selectedPost.title} - Featured image`}
                      className="w-full h-64 md:h-80 object-cover rounded-lg"
                    />
                  </div>
                </div>

                {/* Article Content */}
                {selectedPost.content ? (
                  <div
                    className="prose prose-lg max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                  />
                ) : (
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    <p>{selectedPost.excerpt}</p>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-6">
                      <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                        <strong>Note:</strong> This is a preview article. The
                        full content is coming soon!
                      </p>
                    </div>
                  </div>
                )}

                {/* Article Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>By {selectedPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(selectedPost.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Close Article
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
