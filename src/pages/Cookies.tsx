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
} from "lucide-react";

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
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Cookie className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Cookie Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            This policy explains how TradeLens uses cookies and similar
            technologies to enhance your experience on our website and services.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* What Are Cookies */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            What Are Cookies?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Cookies are small text files that are stored on your device when you
            visit our website. They help us provide you with a better experience
            by remembering your preferences, analyzing how you use our site, and
            personalizing content.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We also use similar technologies such as web beacons, pixels, and
            local storage to collect information about your interactions with
            our services.
          </p>
        </div>

        {/* Cookie Types */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
          <button
            onClick={() => toggleSection("cookie-types")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleSection("cookie-types");
              }
            }}
            aria-expanded={expandedSections.includes("cookie-types")}
            aria-controls="cookie-types-content"
            className="w-full p-8 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Types of Cookies We Use
              </h2>
              {expandedSections.includes("cookie-types") ? (
                <ChevronUp className="w-6 h-6 text-gray-400" aria-hidden="true" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-400" aria-hidden="true" />
              )}
            </div>
          </button>
            {expandedSections.includes("cookie-types") && (
              <div id="cookie-types-content" className="px-8 pb-8" role="region">
                <div className="space-y-6">
                  {cookieTypes.map((cookieType, index) => {
                    const Icon = cookieType.icon;
                    return (
                      <div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
                      >
                        <div className="flex items-start space-x-4 mb-4">
                          <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                              {cookieType.type}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-3">
                              {cookieType.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm">
                              <span className="text-gray-500 dark:text-gray-400">
                                <strong>Purpose:</strong> {cookieType.purpose}
                              </span>
                              <span className="text-gray-500 dark:text-gray-400">
                                <strong>Retention:</strong>{" "}
                                {cookieType.retention}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  cookieType.canDisable
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                                }`}
                              >
                                {cookieType.canDisable
                                  ? "Can Disable"
                                  : "Required"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Examples:
                          </h4>
                          <ul className="space-y-2">
                            {cookieType.examples.map(
                              (example, exampleIndex) => (
                                <li
                                  key={exampleIndex}
                                  className="text-gray-600 dark:text-gray-300 flex items-start space-x-2"
                                >
                                  <span className="text-blue-500 mt-1">•</span>
                                  <span>{example}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Third-Party Services */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg mb-8">
          <button
            onClick={() => toggleSection("third-party-services")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleSection("third-party-services");
              }
            }}
            aria-expanded={expandedSections.includes("third-party-services")}
            aria-controls="third-party-services-content"
            className="w-full p-8 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Third-Party Services
              </h2>
              {expandedSections.includes("third-party-services") ? (
                <ChevronUp className="w-6 h-6 text-gray-400" aria-hidden="true" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-400" aria-hidden="true" />
              )}
            </div>
          </button>
          {expandedSections.includes("third-party-services") && (
            <div id="third-party-services-content" className="px-8 pb-8" role="region">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We use third-party services that may set their own cookies.
                These services help us provide better functionality and
                analytics.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        Service
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        Purpose
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        Cookies
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        Retention
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {thirdPartyServices.map((service, index) => (
                      <tr key={index}>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {service.name}
                            </p>
                            <a
                              href={service.privacyPolicy}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                            >
                              Privacy Policy
                            </a>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                          {service.purpose}
                        </td>
                        <td className="py-3 px-4">
                          <code className="text-sm text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            {service.cookies.join(", ")}
                          </code>
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                          {service.retention}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Cookie Settings */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg mb-8">
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
            className="w-full p-8 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Manage Your Cookie Preferences
              </h2>
              {expandedSections.includes("cookie-settings") ? (
                <ChevronUp className="w-6 h-6 text-gray-400" aria-hidden="true" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-400" aria-hidden="true" />
              )}
            </div>
          </button>
          {expandedSections.includes("cookie-settings") && (
            <div id="cookie-settings-content" className="px-8 pb-8" role="region">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You can control which cookies you accept. Note that disabling
                certain cookies may affect the functionality of our website.
              </p>
              <div className="space-y-4" role="group" aria-label="Cookie preferences">
                {cookieSettings.map((setting, index) => {
                  const isEnabled = cookiePreferences[setting.category];
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {setting.category}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {setting.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span
                          id={`status-${setting.category.toLowerCase().replace(/\s+/g, '-')}`}
                          className={`text-sm font-medium ${
                            isEnabled
                              ? "text-green-600 dark:text-green-400"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {isEnabled ? "Enabled" : "Disabled"}
                        </span>
                        <button
                          role="switch"
                          aria-checked={isEnabled}
                          aria-labelledby={`status-${setting.category.toLowerCase().replace(/\s+/g, '-')}`}
                          aria-label={`Toggle ${setting.category} cookies`}
                          disabled={!setting.canToggle}
                          onClick={() => setting.canToggle && toggleCookiePreference(setting.category)}
                          onKeyDown={(e) => handleToggleKeyDown(e, setting.category, setting.canToggle)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            isEnabled
                              ? "bg-blue-600"
                              : "bg-gray-200 dark:bg-gray-700"
                          } ${
                            !setting.canToggle
                              ? "opacity-50 cursor-not-allowed"
                              : "cursor-pointer hover:opacity-80"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              isEnabled ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleSavePreferences}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Save cookie preferences"
                >
                  Save Preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  aria-label="Accept all cookies"
                >
                  Accept All
                </button>
                <button
                  onClick={handleRejectAll}
                  className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  aria-label="Reject all optional cookies"
                >
                  Reject All
                </button>
              </div>
              {statusMessage && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`mt-4 rounded-lg p-4 border ${
                    statusMessage.type === "success"
                      ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200"
                      : "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <p className="font-medium">{statusMessage.text}</p>
                    <button
                      onClick={() => setStatusMessage(null)}
                      className="ml-4 text-sm underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      aria-label="Dismiss message"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Browser Settings */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg mb-8">
          <button
            onClick={() => toggleSection("browser-settings")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleSection("browser-settings");
              }
            }}
            aria-expanded={expandedSections.includes("browser-settings")}
            aria-controls="browser-settings-content"
            className="w-full p-8 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Browser Cookie Settings
              </h2>
              {expandedSections.includes("browser-settings") ? (
                <ChevronUp className="w-6 h-6 text-gray-400" aria-hidden="true" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-400" aria-hidden="true" />
              )}
            </div>
          </button>
          {expandedSections.includes("browser-settings") && (
            <div id="browser-settings-content" className="px-8 pb-8" role="region">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You can also control cookies through your browser settings.
                Here's how to manage cookies in popular browsers:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Chrome
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Settings → Privacy and security → Cookies and other site
                    data
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Firefox
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Options → Privacy & Security → Cookies and Site Data
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Safari
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Preferences → Privacy → Manage Website Data
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Edge
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Settings → Cookies and site permissions → Cookies and site
                    data
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Questions About Cookies?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            If you have any questions about our use of cookies or this policy,
            please contact us:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-medium text-gray-900 dark:text-white mb-2">
                Email
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                privacy@tradelens.com
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white mb-2">
                Data Protection Officer
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                dpo@tradelens.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
