import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Users,
  Heart,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const Careers: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubscribed(true);
      setEmail("");

      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description:
        "Comprehensive health, dental, and vision insurance for you and your family",
    },
    {
      icon: Users,
      title: "Team Culture",
      description:
        "Work with passionate, talented people who care about financial technology",
    },
    {
      icon: Clock,
      title: "Flexible Work",
      description: "Remote-first culture with flexible hours and unlimited PTO",
    },
    {
      icon: MapPin,
      title: "Global Team",
      description:
        "Work with team members from around the world in a diverse environment",
    },
  ];

  const values = [
    "Innovation and continuous learning",
    "Transparency and open communication",
    "User-centric product development",
    "Work-life balance and flexibility",
    "Diversity and inclusion",
    "Ownership and accountability",
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Help us build the future of financial data. We're looking for
            passionate individuals who want to make a difference in fintech.
          </p>
        </div>

        {/* Why Work With Us */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Why Work at TradeLens?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md"
              >
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Status */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Currently Not Hiring
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              We're currently focused on growing our existing team and building
              amazing products. While we don't have open positions right now,
              we're always interested in connecting with talented individuals
              for future opportunities.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Stay in Touch
              </h3>
              <p className="text-blue-800 dark:text-blue-200">
                Follow us on social media and subscribe to our newsletter to be
                the first to know when we're hiring again!
              </p>
            </div>
          </div>
        </div>

        {/* Future Opportunities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Future Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Engineering
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Frontend, Backend, DevOps, and Data Engineering roles
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Product & Design
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Product Management, UX/UI Design, and User Research
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Business & Growth
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Sales, Marketing, Customer Success, and Business Development
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-xl mb-6 text-blue-100">
            While we're not hiring right now, we'd love to stay in touch for
            future opportunities. Follow our journey and be the first to know
            when we're ready to grow our team!
          </p>

          {isSubscribed ? (
            <div className="max-w-md mx-auto mb-6">
              <div className="bg-green-500 text-white px-6 py-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  🎉 Successfully Subscribed!
                </h3>
                <p className="text-sm">
                  Thank you for subscribing! You'll be the first to know when
                  we're hiring again.
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto mb-6">
              <form onSubmit={handleSubscribe}>
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
                      "Subscribe to Updates"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open("https://x.com/TradeLens25", "_blank")}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Follow Us
            </button>
            <button
              onClick={() =>
                window.open("https://linkedin.com/company/tradelens", "_blank")
              }
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Connect on LinkedIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
