import React, { useState } from "react";
import {
  FileText,
  AlertTriangle,
  Scale,
  Shield,
  Users,
  CreditCard,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Terms: React.FC = () => {
  const lastUpdated = "January 1, 2024";
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const sections = [
    {
      id: "acceptance-of-terms",
      title: "Acceptance of Terms",
      icon: FileText,
      content: [
        {
          text: "By accessing or using TradeLens services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.",
        },
        {
          text: "These terms apply to all users of the service, including visitors, registered users, and API consumers. Your continued use of the service constitutes acceptance of any modifications to these terms.",
        },
      ],
    },
    {
      id: "description-of-service",
      title: "Description of Service",
      icon: Scale,
      content: [
        {
          text: "TradeLens provides financial market data services including real-time cryptocurrency prices, stock market information, financial news, and related data through our website, mobile applications, and API services.",
        },
        {
          text: "Our services are intended for informational purposes and should not be considered as financial advice. Users are responsible for their own investment decisions and should consult with qualified financial advisors.",
        },
      ],
    },
    {
      id: "user-accounts",
      title: "User Accounts and Registration",
      icon: Users,
      content: [
        {
          text: "To access certain features of our service, you may be required to create an account. You agree to:",
          items: [
            "Provide accurate, current, and complete information during registration",
            "Maintain and update your account information to keep it accurate and current",
            "Maintain the security of your password and account",
            "Accept responsibility for all activities under your account",
            "Notify us immediately of any unauthorized use of your account",
          ],
        },
        {
          text: "We reserve the right to refuse service, terminate accounts, or remove content at our sole discretion.",
        },
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable Use Policy",
      icon: Shield,
      content: [
        {
          text: "You agree to use our services only for lawful purposes and in accordance with these terms. You agree not to:",
          items: [
            "Use the service for any illegal or unauthorized purpose",
            "Attempt to gain unauthorized access to our systems or networks",
            "Interfere with or disrupt the service or servers connected to the service",
            "Use automated systems to access the service without permission",
            "Resell or redistribute our data without explicit permission",
            "Use our service to compete directly with us",
          ],
        },
        {
          text: "Violation of this policy may result in immediate termination of your account and legal action.",
        },
      ],
    },
    {
      id: "api-usage",
      title: "API Usage and Rate Limits",
      icon: CreditCard,
      content: [
        {
          text: "Our API services are subject to rate limits based on your subscription plan:",
          items: [
            "Free Plan: 100 requests per minute",
            "Pro Plan: 1,000 requests per minute",
            "Enterprise Plan: Custom limits as agreed",
          ],
        },
        {
          text: "You agree to:",
          items: [
            "Respect all rate limits and not attempt to circumvent them",
            "Use API keys only for your own applications",
            "Not share API keys with third parties",
            "Implement appropriate error handling and retry logic",
            "Monitor your usage to stay within limits",
          ],
        },
      ],
    },
    {
      id: "payment-and-billing",
      title: "Payment and Billing",
      icon: CreditCard,
      content: [
        {
          text: "For paid services:",
          items: [
            "Fees are charged in advance on a monthly or annual basis",
            "All fees are non-refundable except as required by law",
            "We may change our fees with 30 days' notice",
            "You are responsible for all applicable taxes",
            "Payment failures may result in service suspension",
          ],
        },
        {
          text: "You can cancel your subscription at any time from your account dashboard. Cancellation takes effect at the end of your current billing period.",
        },
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      icon: FileText,
      content: [
        {
          text: "The service and its original content, features, and functionality are owned by TradeLens and are protected by international copyright, trademark, and other intellectual property laws.",
        },
        {
          text: "You may not:",
          items: [
            "Copy, modify, or distribute our content without permission",
            "Use our trademarks or logos without written consent",
            "Reverse engineer or attempt to extract source code",
            "Create derivative works based on our service",
          ],
        },
      ],
    },
    {
      id: "disclaimers",
      title: "Disclaimers and Limitations",
      icon: AlertTriangle,
      content: [
        {
          text: "Our service is provided 'as is' without warranties of any kind. We disclaim all warranties, express or implied, including:",
          items: [
            "Warranties of merchantability and fitness for a particular purpose",
            "Warranties regarding accuracy, reliability, or completeness of data",
            "Warranties that the service will be uninterrupted or error-free",
          ],
        },
        {
          text: "We are not liable for any investment decisions made based on our data. All financial data is for informational purposes only.",
        },
      ],
    },
    {
      id: "limitation-of-liability",
      title: "Limitation of Liability",
      icon: Scale,
      content: [
        {
          text: "To the maximum extent permitted by law, TradeLens shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including:",
          items: [
            "Loss of profits, data, or business opportunities",
            "Investment losses or trading losses",
            "System downtime or service interruptions",
            "Third-party actions or content",
          ],
        },
        {
          text: "Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.",
        },
      ],
    },
    {
      id: "termination",
      title: "Termination",
      icon: Shield,
      content: [
        {
          text: "We may terminate or suspend your account immediately, without prior notice, for any reason, including:",
          items: [
            "Breach of these terms of service",
            "Fraudulent or illegal activity",
            "Non-payment of fees",
            "Violation of our acceptable use policy",
          ],
        },
        {
          text: "Upon termination, your right to use the service ceases immediately. We may delete your account and data at our discretion.",
        },
      ],
    },
    {
      id: "governing-law",
      title: "Governing Law and Disputes",
      icon: Scale,
      content: [
        {
          text: "These terms shall be governed by and construed in accordance with the laws of the State of California, without regard to conflict of law principles.",
        },
        {
          text: "Any disputes arising from these terms or your use of the service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            These terms govern your use of TradeLens services. Please read them
            carefully before using our platform.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Important Notice
              </h3>
              <p className="text-yellow-700 dark:text-yellow-300">
                By using TradeLens services, you acknowledge that you have read,
                understood, and agree to be bound by these Terms of Service. If
                you do not agree to these terms, please do not use our services.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {sections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSections.includes(section.id);
            return (
              <div
                key={section.id}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-8 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {section.title}
                      </h2>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-6 h-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-8 pb-8">
                    <div className="space-y-4">
                      {section.content.map((item, index) => (
                        <div key={index}>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                            {item.text}
                          </p>
                          {item.items && (
                            <ul className="space-y-2 ml-4">
                              {item.items.map((listItem, itemIndex) => (
                                <li
                                  key={itemIndex}
                                  className="text-gray-600 dark:text-gray-300 flex items-start space-x-2"
                                >
                                  <span className="text-blue-500 mt-1">•</span>
                                  <span>{listItem}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Information */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Questions About These Terms?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            If you have any questions about these Terms of Service, please
            contact us:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-medium text-gray-900 dark:text-white mb-2">
                Email
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                legal@tradelens.com
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white mb-2">
                Address
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                TradeLens Inc.
                <br />
                123 Financial Street
                <br />
                San Francisco, CA 94105
              </p>
            </div>
          </div>
        </div>

        {/* Changes to Terms */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Changes to These Terms
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We reserve the right to modify these terms at any time. We will
            notify users of any material changes by posting the updated terms on
            our website and updating the "Last updated" date. Your continued use
            of the service after such modifications constitutes acceptance of
            the updated terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
