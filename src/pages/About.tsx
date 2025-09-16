import React from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Users,
  Target,
  Award,
  Globe,
  Heart,
  BarChart3,
  Shield,
  Zap,
  Users2,
  Lightbulb,
  CheckCircle,
} from "lucide-react";

const About: React.FC = () => {
  const stats = [
    { number: "50K+", label: "Active Users", icon: Users },
    { number: "1M+", label: "API Calls/Day", icon: Zap },
    { number: "99.9%", label: "Uptime", icon: Shield },
    { number: "150+", label: "Countries", icon: Globe },
  ];

  const values = [
    {
      icon: Target,
      title: "Transparency",
      description:
        "We believe in providing clear, honest information about financial markets and our services.",
    },
    {
      icon: Users,
      title: "User-Centric",
      description:
        "Every feature we build is designed with our users' needs and feedback in mind.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We continuously explore new technologies to improve the financial data experience.",
    },
    {
      icon: Shield,
      title: "Security",
      description:
        "Your data and privacy are our top priorities, protected by enterprise-grade security.",
    },
  ];

  const team = [
    {
      name: "Bright Akoto",
      role: "Founder & CEO",
      image:
        "https://avatars.githubusercontent.com/u/122811766?s=400&u=77ef1a48543698fdb141b0af0848a3f406796945&v=4",
      bio: "Former fintech engineer with 8+ years experience in financial data systems.",
    },
    {
      name: "Zuri Adom",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1653669486397-b802144ae64a?w=150&h=150&fit=crop&crop=face",
      bio: "Expert in scalable systems and real-time data processing.",
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Product",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Product strategist focused on user experience and market research.",
    },
    {
      name: "Emily Johnson",
      role: "Head of Engineering",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Full-stack engineer passionate about building reliable financial APIs.",
    },
  ];

  const timeline = [
    {
      year: "2023",
      title: "TradeLens Founded",
      description:
        "Started with a vision to democratize access to financial market data.",
    },
    {
      year: "2023",
      title: "First API Launch",
      description:
        "Launched our cryptocurrency data API with real-time pricing.",
    },
    {
      year: "2024",
      title: "Stock Market Integration",
      description:
        "Expanded to include comprehensive stock market data and analysis.",
    },
    {
      year: "2024",
      title: "10K+ Users Milestone",
      description: "Reached our first major milestone of 10,000 active users.",
    },
    {
      year: "2025",
      title: "Enterprise Solutions",
      description:
        "Launched enterprise-grade solutions for institutional clients.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About TradeLens
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            We're on a mission to make financial market data accessible,
            reliable, and easy to use for everyone from individual traders to
            large institutions.
          </p>
          <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400">
            <Heart className="w-5 h-5" />
            <span className="font-semibold">
              Built with passion for financial technology
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center shadow-md"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Our Mission
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              To democratize access to financial market data by providing
              reliable, real-time information that empowers individuals and
              organizations to make informed investment decisions.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Our Vision
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              To become the world's most trusted and comprehensive platform for
              financial market data, serving millions of users globally with
              cutting-edge technology and exceptional service.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center shadow-md"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center shadow-md"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 dark:bg-blue-800"></div>
            <div className="space-y-8">
              {timeline.map((event, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
                      <div className="text-blue-600 dark:text-blue-400 font-bold text-lg mb-2">
                        {event.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {event.description}
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center relative z-10">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Technology Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
                Data Processing
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Real-time data streaming</li>
                <li>• High-performance databases</li>
                <li>• Advanced caching systems</li>
                <li>• Machine learning algorithms</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400 mr-2" />
                Security & Reliability
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• End-to-end encryption</li>
                <li>• Multi-factor authentication</li>
                <li>• 99.9% uptime guarantee</li>
                <li>• Regular security audits</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-2" />
                Performance
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Sub-second response times</li>
                <li>• Global CDN distribution</li>
                <li>• Auto-scaling infrastructure</li>
                <li>• Load balancing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-6 text-blue-100">
            Be part of the future of financial data. Start your journey with
            TradeLens today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
            >
              Get Started Free
            </Link>
            <Link
              to="/careers"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
            >
              View Careers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
