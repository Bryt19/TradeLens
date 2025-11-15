import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  Star,
  Zap,
  Shield,
  Users,
  BarChart3,
  HelpCircle,
} from "lucide-react";
import { AnimatedFaqAccordion } from "../components/ui/animated-faq-accordion";
import PricingSection4 from "../components/ui/pricing-section-4";

const Pricing: React.FC = () => {
  useEffect(() => {
    // Check if there's a hash in the URL and scroll to the pricing plans section
    if (window.location.hash === "#pricing-plans") {
      setTimeout(() => {
        document.getElementById("pricing-plans")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }, []);

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with basic market data",
      icon: BarChart3,
      features: [
        "Real-time crypto prices",
        "Basic stock data",
        "Financial news updates",
        "Portfolio tracking (up to 5 assets)",
        "Basic charts and graphs",
        "Community support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "Advanced features for serious traders and investors",
      icon: Zap,
      features: [
        "Everything in Free",
        "Advanced charting tools",
        "Real-time alerts & notifications",
        "Portfolio tracking (unlimited)",
        "Historical data access",
        "API access (1,000 calls/month)",
        "Priority support",
        "Custom watchlists",
        "Price predictions",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "Tailored solutions for institutions and large teams",
      icon: Shield,
      features: [
        "Everything in Pro",
        "Unlimited API access",
        "White-label solutions",
        "Custom integrations",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom data feeds",
        "Advanced analytics",
        "Team collaboration tools",
        "SLA guarantees",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const faqs = [
    {
      icon: HelpCircle,
      value: "item-1",
      question: "Can I change plans at any time?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
    },
    {
      icon: HelpCircle,
      value: "item-2",
      question: "Is there a free trial?",
      answer:
        "Yes! We offer a 14-day free trial for the Pro plan. No credit card required to start your trial.",
    },
    {
      icon: HelpCircle,
      value: "item-3",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans. All payments are processed securely.",
    },
    {
      icon: HelpCircle,
      value: "item-4",
      question: "Can I cancel anytime?",
      answer:
        "Absolutely. You can cancel your subscription at any time from your account settings. No cancellation fees or long-term commitments.",
    },
    {
      icon: HelpCircle,
      value: "item-5",
      question: "Do you offer refunds?",
      answer:
        "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund.",
    },
    {
      icon: HelpCircle,
      value: "item-6",
      question: "What's included in API access?",
      answer:
        "API access includes real-time and historical market data, with rate limits based on your plan. Pro includes 1,000 calls/month, Enterprise has unlimited access.",
    },
  ];

  // Convert plans to the format expected by PricingSection4
  const pricingPlans = plans.map((plan) => {
    const priceNum = plan.price === "$0" ? 0 : parseInt(plan.price.replace("$", "")) || 0;
    const yearlyPrice = priceNum === 0 ? 0 : Math.round(priceNum * 10); // Approximate yearly price
    
    return {
      name: plan.name,
      description: plan.description,
      price: priceNum,
      yearlyPrice: yearlyPrice,
      buttonText: plan.cta,
      buttonVariant: plan.popular ? "default" as const : "outline" as const,
      popular: plan.popular,
      includes: [
        plan.name === "Free" 
          ? "Free includes:"
          : plan.name === "Pro"
          ? "Everything in Free, plus:"
          : "Everything in Pro, plus:",
        ...plan.features,
      ],
    };
  });

  return (
    <div className="min-h-screen bg-black">
      <div id="pricing-plans" className="relative">
        {/* Animated Pricing Section */}
        <PricingSection4 plans={pricingPlans} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-50 bg-black">

        {/* Features Comparison */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Compare Features
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="text-left py-4 px-4 font-semibold text-white">
                    Features
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-white">
                    Free
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-blue-400">
                    Pro
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-white">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-700">
                {[
                  "Real-time crypto prices",
                  "Stock market data",
                  "Financial news",
                  "Portfolio tracking",
                  "Basic charts",
                  "Advanced charting",
                  "Price alerts",
                  "API access",
                  "Historical data",
                  "Priority support",
                  "Custom integrations",
                ].map((feature, index) => (
                  <tr key={index}>
                    <td className="py-4 px-4 text-gray-300">
                      {feature}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {index < 5 ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {index < 8 ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <AnimatedFaqAccordion items={faqs} />
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6 text-blue-100">
            Join thousands of traders and investors using TradeLens
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                document.getElementById("pricing-plans")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start Free Trial
            </button>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
