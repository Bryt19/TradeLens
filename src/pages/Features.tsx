import React from "react";
import { NumberTicker } from "../components/ui/number-ticker";
import { CyberneticBentoGrid } from "../components/ui/cybernetic-bento-grid";
import { FeatureSteps } from "../components/ui/feature-section";
import CTASection from "../components/CTASection";
import { Sparkles } from "../components/ui/sparkles";
import { motion } from "framer-motion";

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
      <div className="relative bg-[#030712] py-24 overflow-hidden">
        {/* Background Mesh */}
        <div className="absolute inset-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]" />
        </div>
        
        <div className="absolute inset-0 opacity-30">
          <Sparkles color="#6366f1" density={50} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                Powerful Trading Features
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Everything you need to succeed in the financial markets, built into one seamless experience.
              </p>
            </motion.div>
            
            <div className="flex flex-wrap justify-center gap-12 mt-12 bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center min-w-[150px]"
                >
                  <NumberTicker
                    value={stat.value}
                    className="text-4xl font-bold bg-gradient-to-br from-blue-400 to-indigo-500 bg-clip-text text-transparent"
                  />
                  <div className="text-gray-400 mt-2 font-medium">{stat.label}</div>
                </motion.div>
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
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CTASection
          title="Ready to Experience These Features?"
          description="Start your free trial today and discover how TradeLens can transform your trading experience."
          primaryButtonText="Start Free Trial"
          primaryButtonTo="/pricing"
          secondaryButtonText="View Documentation"
          secondaryButtonTo="/docs"
        />
      </div>
    </div>
  );
};

export default Features;
