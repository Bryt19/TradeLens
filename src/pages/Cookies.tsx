import React, { useState } from "react";
import {
  Cookie,
  Settings,
  Shield,
  Eye,
  Database,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Globe,
  User,
  Mail,
} from "lucide-react";
import { AnimatedFaqAccordion } from "../components/ui/animated-faq-accordion";
import { Sparkles } from "../components/ui/sparkles";
import FadeInOnScroll from "../components/FadeInOnScroll";
import { motion } from "framer-motion";
import CTASection from "../components/CTASection";

const Cookies: React.FC = () => {
  const lastUpdated = "January 1, 2024";
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [cookiePreferences, setCookiePreferences] = useState<{
    [key: string]: boolean;
  }>({
    "Essential Cookies": true,
    "Analytics Cookies": true,
    "Functional Cookies": true,
    "Marketing Cookies": false,
  });
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "info"; text: string } | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleCookiePreference = (category: string) => {
    setCookiePreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSavePreferences = () => {
    console.log("Cookie preferences saved:", cookiePreferences);
    setStatusMessage({ type: "success", text: "Your cookie preferences have been saved." });
    window.setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleAcceptAll = () => {
    setCookiePreferences({
      "Essential Cookies": true,
      "Analytics Cookies": true,
      "Functional Cookies": true,
      "Marketing Cookies": true,
    });
    setStatusMessage({ type: "success", text: "All cookies have been accepted." });
    window.setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleRejectAll = () => {
    setCookiePreferences({
      "Essential Cookies": true, // Cannot be disabled
      "Analytics Cookies": false,
      "Functional Cookies": false,
      "Marketing Cookies": false,
    });
    setStatusMessage({ type: "success", text: "All optional cookies have been rejected." });
    window.setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleToggleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    category: string,
    canToggle: boolean
  ) => {
    if ((e.key === " " || e.key === "Enter") && canToggle) {
      e.preventDefault();
      toggleCookiePreference(category);
    }
  };

  const cookieTypes = [
    {
      type: "Essential Cookies",
      icon: Shield,
      description:
        "These cookies are necessary for the website to function and cannot be switched off in our systems.",
      purpose: "Authentication, security, and basic functionality",
      examples: [
        "Session management and user authentication",
        "Security and fraud prevention",
        "Load balancing and performance optimization",
        "Remembering your login status",
      ],
      retention: "Session or up to 1 year",
      canDisable: false,
    },
    {
      type: "Analytics Cookies",
      icon: BarChart3,
      description:
        "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
      purpose: "Website performance and user behavior analysis",
      examples: [
        "Page views and user interactions",
        "Time spent on pages",
        "Error tracking and debugging",
        "Performance monitoring",
      ],
      retention: "Up to 2 years",
      canDisable: true,
    },
    {
      type: "Functional Cookies",
      icon: Settings,
      description:
        "These cookies enable enhanced functionality and personalization, such as remembering your preferences.",
      purpose: "User experience and personalization",
      examples: [
        "Language and region preferences",
        "Theme and display settings",
        "API usage preferences",
        "Custom dashboard configurations",
      ],
      retention: "Up to 1 year",
      canDisable: true,
    },
    {
      type: "Marketing Cookies",
      icon: Eye,
      description:
        "These cookies are used to track visitors across websites to display relevant and engaging advertisements.",
      purpose: "Advertising and marketing optimization",
      examples: [
        "Ad targeting and personalization",
        "Campaign effectiveness measurement",
        "Cross-site tracking for retargeting",
        "Social media integration",
      ],
      retention: "Up to 1 year",
      canDisable: true,
    },
  ];

  const thirdPartyServices = [
    {
      name: "Google Analytics",
      purpose: "Website analytics and performance monitoring",
      cookies: ["_ga", "_gid", "_gat"],
      retention: "2 years",
      privacyPolicy: "https://policies.google.com/privacy",
    },
    {
      name: "Stripe",
      purpose: "Payment processing and fraud prevention",
      cookies: ["__stripe_mid", "__stripe_sid"],
      retention: "1 year",
      privacyPolicy: "https://stripe.com/privacy",
    },
    {
      name: "Cloudflare",
      purpose: "Security, performance, and DDoS protection",
      cookies: ["__cfduid", "__cf_bm"],
      retention: "1 month",
      privacyPolicy: "https://www.cloudflare.com/privacy/",
    },
    {
      name: "Intercom",
      purpose: "Customer support and live chat",
      cookies: ["intercom-id", "intercom-session"],
      retention: "9 months",
      privacyPolicy: "https://www.intercom.com/privacy",
    },
  ];

  const cookieSettings = [
    {
      category: "Essential Cookies",
      description: "Required for basic website functionality",
      enabled: true,
      canToggle: false,
    },
    {
      category: "Analytics Cookies",
      description: "Help us improve our website performance",
      enabled: true,
      canToggle: true,
    },
    {
      category: "Functional Cookies",
      description: "Remember your preferences and settings",
      enabled: true,
      canToggle: true,
    },
    {
      category: "Marketing Cookies",
      description: "Used for advertising and marketing purposes",
      enabled: false,
      canToggle: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#030712]">
      {/* Hero Section */}
      <div className="relative bg-[#030712] py-24 overflow-hidden border-b border-white/5">
        {/* Background Mesh */}
        <div className="absolute inset-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px]" />
        </div>
        
        <div className="absolute inset-0 opacity-30">
          <Sparkles color="#6366f1" density={50} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <FadeInOnScroll direction="up" delay={0}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6"
              >
                <Cookie className="w-4 h-4" />
                <span>Cookie Policy</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight"
              >
                Data Tracking
              </motion.h1>
            </FadeInOnScroll>
            <FadeInOnScroll direction="up" delay={200}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
              >
                This policy explains how TradeLens uses cookies and similar
                technologies to enhance your experience on our website and services.
              </motion.p>
              <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
                <span>Last updated: {lastUpdated}</span>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* What Are Cookies */}
        <div className="bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            What Are Cookies?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-lg">
            Cookies are small text files that are stored on your device when you
            visit our website. They help us provide you with a better experience
            by remembering your preferences, analyzing how you use our site, and
            personalizing content.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            We also use similar technologies such as web beacons, pixels, and
            local storage to collect information about your interactions with
            our services.
          </p>
        </div>

        {/* Cookie Types */}
        <div className="mb-8">
          <AnimatedFaqAccordion
            items={cookieTypes.map((cookieType, index) => ({
              icon: cookieType.icon,
              value: `cookie-type-${index}`,
              question: cookieType.type,
              answer: `${cookieType.description}\n\nPurpose: ${cookieType.purpose}\nRetention: ${cookieType.retention}\nStatus: ${cookieType.canDisable ? "Can Disable" : "Required"}\n\nExamples:\n${cookieType.examples.map((ex) => `• ${ex}`).join("\n")}`,
            }))}
            className="max-w-none"
          />
        </div>

        {/* Third-Party Services */}
        <div className="mb-8">
          <AnimatedFaqAccordion
            items={[
              {
                icon: Database,
                value: "third-party-services",
                question: "Third-Party Services",
                answer: `We use third-party services that may set their own cookies. These services help us provide better functionality and analytics.\n\n${thirdPartyServices.map((service) => `${service.name}\nPurpose: ${service.purpose}\nCookies: ${service.cookies.join(", ")}\nRetention: ${service.retention}\nPrivacy Policy: ${service.privacyPolicy}`).join("\n\n")}`,
              },
            ]}
            className="max-w-none"
          />
        </div>

        {/* Cookie Settings */}
        <div className="bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl overflow-hidden mb-12 transition-all duration-300 hover:border-blue-500/20">
          <button
            onClick={() => toggleSection("cookie-settings")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleSection("cookie-settings");
              }
            }}
            aria-expanded={expandedSections.includes("cookie-settings")}
            aria-controls="cookie-settings-content"
            className="w-full p-8 text-left focus:outline-none group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                  Manage Your Cookie Preferences
                </h2>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Customize your data tracking preferences
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                {expandedSections.includes("cookie-settings") ? (
                  <ChevronUp className="w-6 h-6 text-gray-400 group-hover:text-blue-500" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-blue-500" />
                )}
              </div>
            </div>
          </button>
          
          {expandedSections.includes("cookie-settings") && (
            <div id="cookie-settings-content" className="px-8 pb-8 animate-in fade-in slide-in-from-top-4 duration-500" role="region">
              <div className="h-px bg-black/5 dark:bg-white/10 mb-8" />
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                You can control which cookies you accept. Note that disabling
                certain cookies may affect the functionality of our website.
              </p>
              <div className="space-y-4" role="group" aria-label="Cookie preferences">
                {cookieSettings.map((setting, index) => {
                  const isEnabled = cookiePreferences[setting.category];
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-6 bg-white dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-2xl transition-all duration-300 hover:border-blue-500/30"
                    >
                      <div className="flex-1 pr-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {setting.category}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {setting.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-6">
                        <span
                          id={`status-${setting.category.toLowerCase().replace(/\s+/g, '-')}`}
                          className={`text-sm font-bold uppercase tracking-wider ${
                            isEnabled
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-gray-500 dark:text-gray-500"
                          }`}
                        >
                          {isEnabled ? "Active" : "Disabled"}
                        </span>
                        <button
                          role="switch"
                          aria-checked={isEnabled}
                          aria-labelledby={`status-${setting.category.toLowerCase().replace(/\s+/g, '-')}`}
                          aria-label={`Toggle ${setting.category} cookies`}
                          disabled={!setting.canToggle}
                          onClick={() => setting.canToggle && toggleCookiePreference(setting.category)}
                          onKeyDown={(e) => handleToggleKeyDown(e, setting.category, setting.canToggle)}
                          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            isEnabled
                              ? "bg-blue-600 shadow-[0_0_15px_-3px_rgba(37,99,235,0.4)]"
                              : "bg-gray-200 dark:bg-gray-800"
                          } ${
                            !setting.canToggle
                              ? "opacity-40 cursor-not-allowed"
                              : "cursor-pointer hover:scale-105"
                          }`}
                        >
                          <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
                              isEnabled ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={handleSavePreferences}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
                >
                  Save Preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white px-8 py-4 rounded-2xl font-bold transition-all hover:bg-gray-50 dark:hover:bg-white/10"
                >
                  Accept All
                </button>
                <button
                  onClick={handleRejectAll}
                  className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white px-8 py-4 rounded-2xl font-bold transition-all hover:bg-gray-50 dark:hover:bg-white/10"
                >
                  Reject Optional
                </button>
              </div>
              {statusMessage && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`mt-8 animate-in zoom-in-95 duration-300`}
                >
                  <div className={`p-6 rounded-2xl border flex items-center justify-between ${
                    statusMessage.type === "success"
                      ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400"
                      : "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400"
                  }`}>
                    <div className="flex items-center gap-3 font-bold">
                       <Shield className="w-5 h-5" />
                       {statusMessage.text}
                    </div>
                    <button
                      onClick={() => setStatusMessage(null)}
                      className="text-sm font-bold uppercase tracking-wider hover:underline"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Browser Settings */}
        <div className="mb-8">
          <AnimatedFaqAccordion
            items={[
              {
                icon: Globe,
                value: "browser-settings",
                question: "Browser Cookie Settings",
                answer: `You can also control cookies through your browser settings. Here's how to manage cookies in popular browsers:\n\nChrome\nSettings → Privacy and security → Cookies and other site data\n\nFirefox\nOptions → Privacy & Security → Cookies and Site Data\n\nSafari\nPreferences → Privacy → Manage Website Data\n\nEdge\nSettings → Cookies and site permissions → Cookies and site data`,
              },
            ]}
            className="max-w-none"
          />
        </div>

        {/* Contact Information */}
        <div className="bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/10 rounded-3xl p-8 mt-12 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Questions About Cookies?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            If you have any questions about our use of cookies or this policy,
            please contact us:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-lg">
                  Email
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  privacy@tradelens.com
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-lg">
                  Data Protection Officer
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  dpo@tradelens.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20">
          <CTASection
            title="Full Transparency"
            description="We believe in giving you full control over your data and how it's used."
            primaryButtonText="Privacy Policy"
            primaryButtonTo="/privacy"
            secondaryButtonText="Terms of Service"
            secondaryButtonTo="/terms"
          />
        </div>
      </div>
    </div>
  );
};

export default Cookies;
