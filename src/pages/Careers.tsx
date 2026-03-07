import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Clock,
  Users,
  Heart,
  CheckCircle,
} from "lucide-react";
import { Sparkles } from "../components/ui/sparkles";
import FadeInOnScroll from "../components/FadeInOnScroll";
import { motion } from "framer-motion";
import CTASection from "../components/CTASection";
import { NumberTicker } from "../components/ui/number-ticker";

const Careers: React.FC = () => {
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
    <div className="min-h-screen bg-white dark:bg-[#030712]">
      {/* Hero Section */}
      <div className="relative bg-[#030712] py-32 overflow-hidden border-b border-white/5">
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
                <Users className="w-4 h-4" />
                <span>We're Hiring</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-7xl font-bold mb-6 text-white tracking-tight"
              >
                Join the Future of <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Finance</span>
              </motion.h1>
            </FadeInOnScroll>
            <FadeInOnScroll direction="up" delay={200}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
              >
                Help us build the most advanced financial data platform on the planet. 
                We're looking for passionate individuals to join our global, remote-first team.
              </motion.p>
            </FadeInOnScroll>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: "Team Members", value: "50+" },
            { label: "Countries", value: "12+" },
            { label: "Female Ratio", value: "45%" },
            { label: "Remote", value: "100%" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 p-8 rounded-[2rem] text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                <NumberTicker value={stat.value} />
              </div>
              <div className="text-black dark:text-gray-400 text-sm font-bold uppercase tracking-widest leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Why Join Us */}
        <div
          ref={(el) => { sectionRefs.current["benefits"] = el; }}
          className={`transition-all duration-1000 mb-24 ${
            visibleSections.has("benefits")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Join TradeLens?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We offer competitive compensation and a culture that values innovation and well-being.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-8 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl transition-all duration-300 hover:scale-105 hover:border-blue-500/30"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                  <benefit.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div
          ref={(el) => { sectionRefs.current["values"] = el; }}
          className={`transition-all duration-1000 mb-24 ${
            visibleSections.has("values")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-[#030712] rounded-[3rem] p-12 md:p-20 relative overflow-hidden border border-white/5">
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-600/10 blur-[100px]" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Our Values
                </h2>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  We believe that our success is built on a foundation of trust, 
                  transparency, and a relentless commitment to our users.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {values.map((value, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-300">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center p-12">
                   <div className="text-center group cursor-default">
                      <div className="text-6xl font-black text-white mb-2 group-hover:scale-110 transition-transform">98%</div>
                      <div className="text-blue-400 font-bold tracking-widest uppercase text-sm">Employee Satisfaction</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hiring Status */}
        <div
          ref={(el) => { sectionRefs.current["status"] = el; }}
          className={`transition-all duration-1000 mb-24 ${
            visibleSections.has("status")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold mb-8 animate-pulse">
              <Clock className="w-4 h-4" />
              <span>Current Status: Team Growing</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Not Seeing Your Role?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10">
              We're currently focusing on scaling our core infrastructure team, but we're always 
              looking for exceptional talent. If you believe you can bring something uniquely 
              valuable to TradeLens, reach out.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
               <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all hover:scale-105">
                 Send General Application
               </button>
               <button className="px-8 py-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl font-bold transition-all hover:bg-gray-200 dark:hover:bg-white/10">
                 Follow Us for Updates
               </button>
            </div>
          </div>
        </div>

        <CTASection
          title="Ready to Start Your Journey?"
          description="Build the tools that will power the next generation of global traders."
          primaryButtonText="Contact Recruiting"
          primaryButtonTo="/contact"
          secondaryButtonText="Learn More About Us"
          secondaryButtonTo="/about"
        />
      </div>
    </div>
  );
};

export default Careers;
