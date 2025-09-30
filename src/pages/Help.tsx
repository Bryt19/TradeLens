import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailForm, setEmailForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<
    (typeof popularArticles)[0] | null
  >(null);
  const [expandedFaqSections, setExpandedFaqSections] = useState<string[]>([
    "getting-started",
  ]);
  const [notification, setNotification] = useState<{
    type: "success" | "info" | "error";
    message: string;
    show: boolean;
  }>({
    type: "info",
    message: "",
    show: false,
  });

  const showNotification = (
    type: "success" | "info" | "error",
    message: string
  ) => {
    setNotification({ type, message, show: true });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 5000);
  };

  const handleArticleClick = (article: (typeof popularArticles)[0]) => {
    setSelectedArticle(article);
  };

  const toggleFaqSection = (sectionId: string) => {
    setExpandedFaqSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleLiveChat = () => {
    setShowLiveChat(true);
    // Simulate opening live chat
    setTimeout(() => {
      showNotification(
        "success",
        "Live chat is now available! Our support team will be with you shortly."
      );
      setShowLiveChat(false);
    }, 1000);
  };

  const handleEmailSupport = () => {
    const email = "tradelens25@gmail.com";
    const subject = encodeURIComponent("Support Request");
    const body = encodeURIComponent(
      "Hi TradeLens Support,\n\nPlease describe your issue here...\n\nThanks,"
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    showNotification("info", "Opening your email client...");
  };

  const handlePhoneSupport = () => {
    // Open phone dialer or show phone number
    const phoneNumber = "+1-555-TRADELENS";
    if (navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) {
      window.location.href = `tel:${phoneNumber}`;
      showNotification("info", "Opening phone dialer...");
    } else {
      // Copy phone number to clipboard for desktop users
      navigator.clipboard
        .writeText(phoneNumber)
        .then(() => {
          showNotification(
            "success",
            `Phone number copied to clipboard: ${phoneNumber}. Call us at this number for immediate support!`
          );
        })
        .catch(() => {
          showNotification(
            "info",
            `Call us at: ${phoneNumber} (Mon-Fri 9AM-6PM PST)`
          );
        });
    }
  };

  const handleScheduleCall = () => {
    // Open phone dialer or show phone number for scheduling
    const phoneNumber = "+1-555-TRADELENS";
    if (navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) {
      window.location.href = `tel:${phoneNumber}`;
      showNotification("info", "Opening phone dialer to schedule a call...");
    } else {
      // Copy phone number to clipboard for desktop users
      navigator.clipboard
        .writeText(phoneNumber)
        .then(() => {
          showNotification(
            "success",
            `Phone number copied to clipboard: ${phoneNumber}. Call us to schedule a consultation!`
          );
        })
        .catch(() => {
          showNotification(
            "info",
            `Call us at: ${phoneNumber} to schedule a call (Mon-Fri 9AM-6PM PST)`
          );
        });
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !emailForm.name ||
      !emailForm.email ||
      !emailForm.subject ||
      !emailForm.message
    ) {
      showNotification("error", "Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailForm.email)) {
      showNotification("error", "Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubmitted(true);
      setEmailForm({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setIsSubmitted(false);
        setShowEmailForm(false);
      }, 5000);
    } catch (error) {
      showNotification("error", "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEmailForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const faqCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: HelpCircle,
      questions: [
        {
          question: "How do I get my API key?",
          answer:
            "You can get your API key by signing up for a free account and visiting the API Keys section in your dashboard. The key will be generated immediately after account creation.",
        },
        {
          question: "What's the difference between free and paid plans?",
          answer:
            "Free plans include basic market data with rate limits, while paid plans offer higher rate limits, historical data, and advanced features like real-time alerts.",
        },
        {
          question: "How do I make my first API call?",
          answer:
            "Include your API key in the Authorization header: 'Bearer YOUR_API_KEY'. Then make a GET request to any of our endpoints. Check our documentation for examples.",
        },
      ],
    },
    {
      id: "api-usage",
      title: "API Usage",
      icon: MessageCircle,
      questions: [
        {
          question: "What are the rate limits?",
          answer:
            "Free plans: 100 requests/minute. Pro plans: 1,000 requests/minute. Enterprise plans: Unlimited. Rate limits are per API key.",
        },
        {
          question: "How do I handle API errors?",
          answer:
            "Our API returns standard HTTP status codes. 429 means you've hit rate limits, 401 means invalid API key, 400 means bad request. Check the error message for details.",
        },
        {
          question: "Can I use the API for commercial purposes?",
          answer:
            "Yes, our API can be used for commercial purposes. Please review our Terms of Service for specific usage guidelines and restrictions.",
        },
      ],
    },
    {
      id: "billing",
      title: "Billing & Plans",
      icon: Mail,
      questions: [
        {
          question: "How does billing work?",
          answer:
            "Billing is monthly or annually. You're charged at the beginning of each billing cycle. You can upgrade, downgrade, or cancel anytime.",
        },
        {
          question: "Do you offer refunds?",
          answer:
            "Yes, we offer a 30-day money-back guarantee for all paid plans. Contact support if you're not satisfied with our service.",
        },
        {
          question: "Can I change my plan anytime?",
          answer:
            "Yes, you can upgrade or downgrade your plan anytime from your account dashboard. Changes take effect immediately.",
        },
      ],
    },
  ];

  const popularArticles = [
    {
      id: 1,
      title: "Setting up your first API integration",
      category: "Getting Started",
      readTime: "5 min read",
      helpful: 95,
      content:
        "Learn how to get started with TradeLens API integration. This comprehensive guide covers everything from obtaining your API key to making your first successful request. We'll walk you through the authentication process, show you how to handle responses, and provide best practices for error handling.",
    },
    {
      id: 2,
      title: "Understanding rate limits and best practices",
      category: "API Usage",
      readTime: "7 min read",
      helpful: 89,
      content:
        "Rate limits are crucial for maintaining API performance and fair usage. This article explains our rate limiting system, how to monitor your usage, and strategies for optimizing your API calls. Learn about different plan limits and how to implement proper retry logic.",
    },
    {
      id: 3,
      title: "Error handling and troubleshooting",
      category: "API Usage",
      readTime: "6 min read",
      helpful: 92,
      content:
        "Every API integration encounters errors. This guide covers common error scenarios, HTTP status codes, and how to implement robust error handling in your applications. We'll also show you how to debug issues and when to contact support.",
    },
    {
      id: 4,
      title: "Upgrading from free to paid plan",
      category: "Billing & Plans",
      readTime: "3 min read",
      helpful: 87,
      content:
        "Ready to unlock more features? This quick guide shows you how to upgrade your TradeLens plan, what benefits you'll gain, and how to migrate your existing integrations. Learn about our different pricing tiers and find the plan that's right for your needs.",
    },
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7",
      action: "Start Chat",
    },
    {
      icon: Mail,
      title: "Email Support",
      description:
        "Send us a detailed message and we'll respond within 24 hours",
      availability: "24/7",
      action: "Send Email",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our technical team",
      availability: "Mon-Fri 9AM-6PM PST",
      action: "Call Us",
    },
  ];

  const filteredQuestions = faqCategories.flatMap((category) =>
    category.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Find answers to common questions, browse our documentation, or get
            in touch with our support team.
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white text-lg"
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {method.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Available: {method.availability}
                </p>
                <button
                  onClick={() => {
                    if (method.action === "Start Chat") {
                      handleLiveChat();
                    } else if (method.action === "Send Email") {
                      handleEmailSupport();
                    } else if (method.action === "Call Us") {
                      handlePhoneSupport();
                    }
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  {method.action}
                </button>
              </div>
            );
          })}
        </div>

        {/* Search Results or FAQ Categories */}
        {searchQuery ? (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Search Results for "{searchQuery}"
            </h2>
            {filteredQuestions.length > 0 ? (
              <div className="space-y-4">
                {filteredQuestions.map((question, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {question.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {question.answer}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Try different keywords or contact our support team
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Popular Articles */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Popular Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {popularArticles.map((article, index) => (
                  <div
                    key={index}
                    onClick={() => handleArticleClick(article)}
                    className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {article.title}
                      </h3>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{article.category}</span>
                      <div className="flex items-center space-x-4">
                        <span>{article.readTime}</span>
                        <span>{article.helpful}% helpful</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Categories */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqCategories.map((category) => {
                  const Icon = category.icon;
                  const isExpanded = expandedFaqSections.includes(category.id);
                  return (
                    <div
                      key={category.id}
                      className="bg-white dark:bg-gray-900 rounded-lg shadow-md"
                    >
                      <button
                        onClick={() => toggleFaqSection(category.id)}
                        className="w-full p-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                              {category.title}
                            </h3>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </button>
                      {isExpanded && (
                        <div className="p-6">
                          <div className="space-y-6">
                            {category.questions.map((faq, index) => (
                              <div key={index}>
                                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                  {faq.question}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                  {faq.answer}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Still Need Help */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-xl mb-6 text-blue-100">
            Our support team is here to help you succeed. Get in touch and we'll
            respond quickly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
            >
              Contact Support
            </Link>
            <button
              onClick={handleScheduleCall}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Schedule Call
            </button>
          </div>
        </div>
      </div>

      {/* Email Support Modal */}
      {showEmailForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Send us an Email
                </h2>
                <button
                  onClick={() => setShowEmailForm(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {isSubmitted ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Thank you for contacting us. We'll get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={emailForm.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={emailForm.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={emailForm.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={emailForm.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    placeholder="Please describe your issue or question in detail..."
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowEmailForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">
                      {selectedArticle.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedArticle.readTime}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedArticle.helpful}% helpful
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedArticle.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedArticle.content}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => {
                        showNotification(
                          "success",
                          "Article marked as helpful!"
                        );
                      }}
                      className="flex items-center space-x-2 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V18m-7-8a2 2 0 01-2-2V5a2 2 0 012-2h2.343M11 7v6l4 2-1 2-4-2-2 2V7z"
                        />
                      </svg>
                      <span className="text-sm font-medium">Helpful</span>
                    </button>
                    <button
                      onClick={() => {
                        showNotification(
                          "info",
                          "Article shared successfully!"
                        );
                      }}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                        />
                      </svg>
                      <span className="text-sm font-medium">Share</span>
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Chat Indicator */}
      {showLiveChat && (
        <div className="fixed bottom-6 left-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">
            Connecting to live chat...
          </span>
        </div>
      )}

      {/* Notification */}
      {notification.show && (
        <div className="fixed top-6 right-6 z-50 max-w-md">
          <div
            className={`rounded-lg shadow-lg p-4 flex items-start space-x-3 ${
              notification.type === "success"
                ? "bg-green-500 text-white"
                : notification.type === "error"
                ? "bg-red-500 text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            <div className="flex-shrink-0">
              {notification.type === "success" && (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              {notification.type === "error" && (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
              {notification.type === "info" && (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
            <button
              onClick={() =>
                setNotification((prev) => ({ ...prev, show: false }))
              }
              className="flex-shrink-0 ml-2 text-white hover:text-gray-200"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Help;
