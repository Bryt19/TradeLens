import React from "react";
import { Link } from "react-router-dom";
import AnimatedCounter from "../components/AnimatedCounter";
import { CyberneticBentoGrid } from "../components/ui/cybernetic-bento-grid";
import { FeatureSteps } from "../components/ui/feature-section";

const Features: React.FC = () => {
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
        <FeatureSteps
          features={[
            {
              step: "Step 1",
              title: "Smart Alerts",
              content: "Set up custom price alerts, news notifications, and market condition triggers to stay ahead of market movements.",
              image: "https://i2-prod.mirror.co.uk/article35849718.ece/ALTERNATES/s615/0_GettyImages-1416887716.jpg"
            },
            {
              step: "Step 2",
              title: "Security & Privacy",
              content: "Bank-grade security with encrypted data transmission and secure API keys to protect your trading data.",
              image: "https://www.columbiasouthern.edu/media/udobzpao/privacy-issues-in-cybersecurity.jpg"
            },
            {
              step: "Step 3",
              title: "High Performance",
              content: "Optimized for speed with sub-second data updates and lightning-fast chart rendering for real-time trading.",
              image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=2070&q=80"
            },
            {
              step: "Step 4",
              title: "Global Coverage",
              content: "Access markets worldwide with support for multiple currencies and time zones across all major exchanges.",
              image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=2070&q=80"
            },
            {
              step: "Step 5",
              title: "Advanced Analytics",
              content: "Deep market insights with sentiment analysis, volume profiles, and correlation matrices for informed decisions.",
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=2070&q=80"
            },
            {
              step: "Step 6",
              title: "Customization",
              content: "Personalize your dashboard with custom layouts, themes, and widget configurations to match your trading style.",
              image: "https://www.shutterstock.com/image-photo/business-technology-internet-network-concept-600nw-2463313771.jpg"
            },
          ]}
          title="Additional Capabilities"
          autoPlayInterval={4000}
          imageHeight="h-[400px]"
          className="bg-white dark:bg-gray-800"
        />
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
