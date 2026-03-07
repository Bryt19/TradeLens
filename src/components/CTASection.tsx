import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "./ui/sparkles";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";
import { cn } from "../lib/utils";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonTo?: string;
  primaryButtonOnClick?: () => void;
  secondaryButtonText?: string;
  secondaryButtonTo?: string;
  secondaryButtonOnClick?: () => void;
  showNewsletter?: boolean;
  className?: string;
}

const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  primaryButtonText,
  primaryButtonTo,
  primaryButtonOnClick,
  secondaryButtonText,
  secondaryButtonTo,
  secondaryButtonOnClick,
  showNewsletter = false,
  className,
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <section className={cn("relative py-20 px-4 overflow-hidden rounded-3xl", className)}>
      {/* Dynamic Background with Mesh Effect */}
      <div className="absolute inset-0 bg-[#030712]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>

      {/* Sparkles Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <Sparkles
          density={40}
          size={1.2}
          color="#6366f1"
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          {showNewsletter ? (
            <div className="max-w-md mx-auto">
              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-md"
                >
                  <div className="flex items-center justify-center gap-3 text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-semibold text-lg">Thank you for joining!</span>
                  </div>
                  <p className="text-emerald-400/80 mt-2 text-sm">
                    You're now on the list for exclusive updates.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative group">
                  <div className="flex flex-col sm:flex-row gap-3 p-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-300 group-focus-within:border-blue-500/50 group-focus-within:ring-4 group-focus-within:ring-blue-500/10">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your work email"
                      className="flex-1 bg-transparent px-5 py-4 text-white placeholder-gray-500 focus:outline-none min-w-0"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-[0_0_20px_rgba(37,99,235,0.3)] active:scale-95"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <Send className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {primaryButtonText && (
                <InteractiveHoverButton
                  to={primaryButtonTo}
                  onClick={primaryButtonOnClick}
                  text={primaryButtonText}
                  className="bg-white text-black border-white hover:bg-gray-100"
                />
              )}
              {secondaryButtonText && (
                <Link
                  to={secondaryButtonTo || "#"}
                  onClick={secondaryButtonOnClick}
                  className="px-8 py-3 rounded-full font-semibold text-white border border-white/20 hover:bg-white/10 transition-all duration-300 active:scale-95"
                >
                  {secondaryButtonText}
                </Link>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Decorative Border Glow */}
      <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none shadow-[inset_0_0_50px_rgba(255,255,255,0.02)]" />
    </section>
  );
};

export default CTASection;
