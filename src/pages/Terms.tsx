import React from "react";
import {
  FileText,
  AlertTriangle,
  Scale,
  Shield,
  Users,
  CreditCard,
  Mail,
  MapPin,
} from "lucide-react";
import { AnimatedFaqAccordion } from "../components/ui/animated-faq-accordion";
import { Sparkles } from "../components/ui/sparkles";
import FadeInOnScroll from "../components/FadeInOnScroll";
import { motion } from "framer-motion";
import CTASection from "../components/CTASection";

const Terms: React.FC = () => {
  const lastUpdated = "January 1, 2024";

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
                <FileText className="w-4 h-4" />
                <span>Agreement</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight"
              >
                Terms of Service
              </motion.h1>
            </FadeInOnScroll>
            <FadeInOnScroll direction="up" delay={200}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
              >
                These terms govern your use of TradeLens services. Please read them
                carefully before using our platform.
              </motion.p>
              <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
                <span>Last updated: {lastUpdated}</span>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Important Notice */}
        <div className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/10 rounded-3xl p-8 mb-12">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-1">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Important Notice
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                By using TradeLens services, you acknowledge that you have read,
                understood, and agree to be bound by these Terms of Service. If
                you do not agree to these terms, please do not use our services.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <AnimatedFaqAccordion
            items={sections.map((section) => ({
              icon: section.icon,
              value: section.id,
              question: section.title,
              answer: section.content
                .map((item) => {
                  let answerText = item.text;
                  if (item.items && item.items.length > 0) {
                    answerText += "\n\n" + item.items.map((listItem) => `• ${listItem}`).join("\n");
                  }
                  return answerText;
                })
                .join("\n\n"),
            }))}
            className="max-w-none"
          />
        </div>

        {/* Contact Information */}
        <div className="bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/10 rounded-3xl p-8 mt-12 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Questions About These Terms?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            If you have any questions about these Terms of Service, please
            contact us:
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
                  legal@tradelens.com
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-lg">
                  Address
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  TradeLens Inc.
                  <br />
                  123 Financial Street
                  <br />
                  San Francisco, CA 94105
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Changes to Terms */}
        <div className="bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Changes to These Terms
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            We reserve the right to modify these terms at any time. We will
            notify users of any material changes by posting the updated terms on
            our website and updating the "Last updated" date. Your continued use
            of the service after such modifications constitutes acceptance of
            the updated terms.
          </p>
        </div>

        {/* Final CTA */}
        <div className="mt-20">
          <CTASection
            title="Ready to Build?"
            description="Start exploring our high-performance APIs and data solutions today."
            primaryButtonText="Get API Key"
            primaryButtonTo="/api"
            secondaryButtonText="View Pricing"
            secondaryButtonTo="/pricing"
          />
        </div>
      </div>
    </div>
  );
};

export default Terms;
