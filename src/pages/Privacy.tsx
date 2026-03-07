import React from "react";
import {
  Shield,
  Eye,
  Lock,
  Database,
  User,
  Mail,
} from "lucide-react";
import { AnimatedFaqAccordion } from "../components/ui/animated-faq-accordion";
import { Sparkles } from "../components/ui/sparkles";
import FadeInOnScroll from "../components/FadeInOnScroll";
import { motion } from "framer-motion";
import CTASection from "../components/CTASection";

const Privacy: React.FC = () => {
  const lastUpdated = "January 1, 2024";

  const sections = [
    {
      id: "information-we-collect",
      title: "Information We Collect",
      icon: Database,
      content: [
        {
          subtitle: "Personal Information",
          text: "We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include:",
          items: [
            "Name and email address",
            "Account credentials and preferences",
            "Payment and billing information",
            "Communication records with our support team",
          ],
        },
        {
          subtitle: "Usage Information",
          text: "We automatically collect certain information about your use of our services, including:",
          items: [
            "API usage patterns and frequency",
            "Device information and browser type",
            "IP address and location data",
            "Cookies and similar tracking technologies",
          ],
        },
        {
          subtitle: "Financial Data",
          text: "We may collect financial information related to your use of our services, such as:",
          items: [
            "Trading and investment preferences",
            "Portfolio information (if you choose to share it)",
            "Market data usage patterns",
            "Transaction history for billing purposes",
          ],
        },
      ],
    },
    {
      id: "how-we-use-information",
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        {
          subtitle: "Service Provision",
          text: "We use your information to provide, maintain, and improve our services, including:",
          items: [
            "Processing API requests and delivering market data",
            "Personalizing your experience and recommendations",
            "Providing customer support and technical assistance",
            "Managing your account and billing",
          ],
        },
        {
          subtitle: "Communication",
          text: "We may use your information to communicate with you about:",
          items: [
            "Service updates and new features",
            "Security alerts and important notices",
            "Marketing communications (with your consent)",
            "Responding to your inquiries and support requests",
          ],
        },
        {
          subtitle: "Legal and Security",
          text: "We use your information for legal and security purposes, including:",
          items: [
            "Complying with applicable laws and regulations",
            "Protecting against fraud and security threats",
            "Enforcing our terms of service",
            "Responding to legal requests and court orders",
          ],
        },
      ],
    },
    {
      id: "information-sharing",
      title: "Information Sharing and Disclosure",
      icon: User,
      content: [
        {
          subtitle: "We Do Not Sell Your Data",
          text: "We do not sell, rent, or trade your personal information to third parties for their commercial purposes.",
        },
        {
          subtitle: "Service Providers",
          text: "We may share your information with trusted third-party service providers who assist us in:",
          items: [
            "Data processing and storage",
            "Payment processing and billing",
            "Customer support and communication",
            "Analytics and performance monitoring",
          ],
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information if required by law or if we believe in good faith that such disclosure is necessary to:",
          items: [
            "Comply with legal obligations",
            "Protect our rights and property",
            "Prevent fraud or security threats",
            "Protect the safety of our users and the public",
          ],
        },
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement appropriate technical and organizational measures to protect your personal information, including:",
          items: [
            "Encryption of data in transit and at rest",
            "Regular security audits and assessments",
            "Access controls and authentication systems",
            "Employee training on data protection practices",
          ],
        },
        {
          subtitle: "Data Retention",
          text: "We retain your personal information only as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.",
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your Rights and Choices",
      icon: Shield,
      content: [
        {
          subtitle: "Access and Control",
          text: "You have the right to:",
          items: [
            "Access and review your personal information",
            "Correct inaccurate or incomplete information",
            "Delete your account and associated data",
            "Export your data in a portable format",
          ],
        },
        {
          subtitle: "Communication Preferences",
          text: "You can control how we communicate with you by:",
          items: [
            "Updating your email preferences in your account settings",
            "Unsubscribing from marketing emails",
            "Contacting us to opt out of certain communications",
          ],
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
                <Shield className="w-4 h-4" />
                <span>Legal & Trust</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight"
              >
                Privacy Policy
              </motion.h1>
            </FadeInOnScroll>
            <FadeInOnScroll direction="up" delay={200}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
              >
                Your privacy is important to us. This policy explains how we
                collect, use, and protect your personal information when you use
                TradeLens.
              </motion.p>
              <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
                <span>Last updated: {lastUpdated}</span>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Introduction */}
        <div className="bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Introduction
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            TradeLens ("we," "our," or "us") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our financial data
            services, including our website, mobile applications, and API
            services.
          </p>
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
                  let answerText = "";
                  if (item.subtitle) {
                    answerText += `${item.subtitle}\n\n`;
                  }
                  answerText += item.text;
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
            Contact Us
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            If you have any questions about this Privacy Policy or our data
            practices, please contact us:
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

        {/* Changes to Policy */}
        <div className="bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Changes to This Privacy Policy
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date. We encourage you to review
            this Privacy Policy periodically for any changes.
          </p>
        </div>

        {/* Final CTA */}
        <div className="mt-20">
          <CTASection
            title="Have Security Concerns?"
            description="Our team is dedicated to protecting your data and assets 24/7."
            primaryButtonText="Contact Support"
            primaryButtonTo="/help"
            secondaryButtonText="Security Overview"
            secondaryButtonTo="/docs#security"
          />
        </div>
      </div>
    </div>
  );
};

export default Privacy;
