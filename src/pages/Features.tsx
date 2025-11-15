import React from "react";
import { Link } from "react-router-dom";
import AnimatedCounter from "../components/AnimatedCounter";
import { CyberneticBentoGrid } from "../components/ui/cybernetic-bento-grid";

const Features: React.FC = () => {
  const features = [
    {
      title: "Real-time Market Data",
      description:
        "Get live cryptocurrency and stock prices with instant updates and comprehensive market analysis.",
      icon: "📊",
      benefits: [
        "Live price feeds",
        "Market depth analysis",
        "Historical data",
        "Technical indicators",
      ],
    },
    {
      title: "Advanced Charting",
      description:
        "Professional-grade charts with multiple timeframes, drawing tools, and technical analysis indicators.",
      icon: "📈",
      benefits: [
        "Multiple chart types",
        "Drawing tools",
        "Technical indicators",
        "Custom timeframes",
      ],
    },
    {
      title: "Portfolio Management",
      description:
        "Track your investments with detailed portfolio analytics, performance metrics, and risk assessment.",
      icon: "💼",
      benefits: [
        "Portfolio tracking",
        "Performance analytics",
        "Risk assessment",
        "Asset allocation",
      ],
    },
    {
      title: "News & Analysis",
      description:
        "Stay informed with the latest market news, expert analysis, and market sentiment indicators.",
      icon: "📰",
      benefits: [
        "Real-time news",
        "Expert analysis",
        "Market sentiment",
        "Custom alerts",
      ],
    },
    {
      title: "API Integration",
      description:
        "Powerful REST API for developers to integrate market data into their applications.",
      icon: "🔌",
      benefits: [
        "REST API",
        "WebSocket feeds",
        "SDK libraries",
        "Rate limiting",
      ],
    },
    {
      title: "Mobile Responsive",
      description:
        "Access your trading dashboard anywhere with our fully responsive mobile-optimized interface.",
      icon: "📱",
      benefits: [
        "Mobile optimized",
        "Touch-friendly",
        "Offline support",
        "Push notifications",
      ],
    },
  ];

  const stats = [
    { label: "Supported Assets", value: "10,000+" },
    { label: "Exchange Connections", value: "500+" },
    { label: "API Calls/Day", value: "1M+" },
    { label: "Active Users", value: "50K+" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Powerful Trading Features
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Everything you need to succeed in the financial markets
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <AnimatedCounter
                    value={stat.value}
                    duration={2000}
                    className="text-3xl md:text-4xl font-bold text-yellow-300"
                  />
                  <div className="text-blue-100 mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Core Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover the comprehensive suite of tools and features designed to
              give you the edge in trading
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-black">
            <CyberneticBentoGrid className="min-h-0" />
          </div>
        </div>
      </div>

      {/* Additional Features Section */}
      <div className="bg-white dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Additional Capabilities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              More features to enhance your trading experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🔔</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Smart Alerts
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Set up custom price alerts, news notifications, and market
                    condition triggers.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🛡️</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Security & Privacy
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Bank-grade security with encrypted data transmission and
                    secure API keys.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    High Performance
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Optimized for speed with sub-second data updates and
                    lightning-fast chart rendering.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🌐</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Global Coverage
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Access markets worldwide with support for multiple
                    currencies and time zones.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Advanced Analytics
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Deep market insights with sentiment analysis, volume
                    profiles, and correlation matrices.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🔧</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Customization
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Personalize your dashboard with custom layouts, themes, and
                    widget configurations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Start your free trial today and discover how TradeLens can transform
            your trading experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pricing"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
            >
              Start Free Trial
            </Link>
            <Link
              to="/docs"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
