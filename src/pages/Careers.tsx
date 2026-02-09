import React, { useState, useEffect, useRef } from "react";
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
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set(),
  );

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Intersection Observer for scroll animations
  useEffect(() => {
    // Make header visible immediately
    setVisibleSections((prev) => new Set(prev).add("header"));

    const observers: IntersectionObserver[] = [];

    Object.keys(sectionRefs.current).forEach((key) => {
      // Skip header as it's already visible
      if (key === "header") return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => new Set(prev).add(key));
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        },
      );

      const element = sectionRefs.current[key];
      if (element) {
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

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
        <div
          ref={(el) => { sectionRefs.current["header"] = el; }}
          className={`text-center mb-16 transition-all duration-1000 ${
            visibleSections.has("header")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Help us build the future of financial data. We're looking for
            passionate individuals who want to make a difference in fintech.
          </p>
        </div>

        {/* Why Work With Us */}
        <div
          ref={(el) => { sectionRefs.current["benefits"] = el; }}
          className={`bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-16 transition-all duration-1000 ${
            visibleSections.has("benefits")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Why Work at TradeLens?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              const isVisible = visibleSections.has("benefits");
              return (
                <div
                  key={index}
                  className={`text-center transition-all duration-700 hover:scale-105 hover:shadow-xl ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                  }}
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:rotate-12 hover:bg-blue-200 dark:hover:bg-blue-800">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400 transition-transform duration-300" />
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
        <div
          ref={(el) => { sectionRefs.current["values"] = el; }}
          className={`mb-16 transition-all duration-1000 ${
            visibleSections.has("values")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((value, index) => {
              const isVisible = visibleSections.has("values");
              return (
                <div
                  key={index}
                  className={`flex items-center space-x-3 bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md transition-all duration-500 hover:scale-105 hover:shadow-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 80}ms` : "0ms",
                  }}
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 animate-pulse" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Status */}
        <div
          ref={(el) => { sectionRefs.current["status"] = el; }}
          className={`bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-16 transition-all duration-1000 ${
            visibleSections.has("status")
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          <div className="text-center">
            <div
              className={`w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-700 ${
                visibleSections.has("status") ? "animate-bounce" : ""
              }`}
            >
              <Clock
                className="w-8 h-8 text-yellow-600 dark:text-yellow-400"
                style={{ animation: "spin 3s linear infinite" }}
              />
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
            <div
              className={`bg-blue-50 dark:bg-blue-900 rounded-lg p-6 max-w-2xl mx-auto transition-all duration-700 ${
                visibleSections.has("status")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
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
        <div
          ref={(el) => { sectionRefs.current["opportunities"] = el; }}
          className={`mb-16 transition-all duration-1000 ${
            visibleSections.has("opportunities")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Future Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "Engineering",
                description:
                  "Frontend, Backend, DevOps, and Data Engineering roles",
                color: "blue",
              },
              {
                icon: Heart,
                title: "Product & Design",
                description:
                  "Product Management, UX/UI Design, and User Research",
                color: "green",
              },
              {
                icon: ArrowRight,
                title: "Business & Growth",
                description:
                  "Sales, Marketing, Customer Success, and Business Development",
                color: "purple",
              },
            ].map((opportunity, index) => {
              const Icon = opportunity.icon;
              const isVisible = visibleSections.has("opportunities");
              return (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 text-center transition-all duration-700 hover:scale-110 hover:shadow-2xl hover:-translate-y-2 ${
                    isVisible
                      ? "opacity-100 translate-y-0 rotate-0"
                      : "opacity-0 translate-y-8 rotate-3"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
                  }}
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:rotate-12 hover:scale-125 ${
                      opportunity.color === "blue"
                        ? "bg-blue-100 dark:bg-blue-900"
                        : opportunity.color === "green"
                          ? "bg-green-100 dark:bg-green-900"
                          : "bg-purple-100 dark:bg-purple-900"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        opportunity.color === "blue"
                          ? "text-blue-600 dark:text-blue-400"
                          : opportunity.color === "green"
                            ? "text-green-600 dark:text-green-400"
                            : "text-purple-600 dark:text-purple-400"
                      }`}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {opportunity.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {opportunity.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div
          ref={(el) => { sectionRefs.current["cta"] = el; }}
          className={`bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white transition-all duration-1000 ${
            visibleSections.has("cta")
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          <h2 className="text-3xl font-bold mb-4 animate-pulse">
            Stay Connected
          </h2>
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

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ${
              visibleSections.has("cta")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <button
              onClick={() => window.open("https://x.com/TradeLens25", "_blank")}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95"
            >
              Follow Us
            </button>
            <button
              onClick={() =>
                window.open("https://linkedin.com/company/tradelens", "_blank")
              }
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95"
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
