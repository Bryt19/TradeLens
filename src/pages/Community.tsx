import React from "react";
import {
  MessageCircle,
  Users,
  Calendar,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  Heart,
  Star,
} from "lucide-react";
import { Sparkles } from "../components/ui/sparkles";
import FadeInOnScroll from "../components/FadeInOnScroll";
import { motion } from "framer-motion";
import CTASection from "../components/CTASection";
import { NumberTicker } from "../components/ui/number-ticker";

const Community: React.FC = () => {
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const addDays = (base: Date, days: number) => {
    const d = new Date(base);
    d.setDate(d.getDate() + days);
    return d;
  };

  const communityStats = [
    { number: "5,000+", label: "Active Members", icon: Users },
    { number: "500+", label: "Discussions", icon: MessageCircle },
    { number: "50+", label: "Events", icon: Calendar },
    { number: "99%", label: "Satisfaction", icon: Heart },
  ];

  const recentDiscussions = [
    {
      id: 1,
      title: "Best practices for handling API rate limits",
      author: "Sarah Chen",
      replies: 12,
      views: 156,
      lastActivity: "2 hours ago",
      category: "API Usage",
      solved: true,
    },
    {
      id: 2,
      title: "Real-time data streaming with WebSockets",
      author: "Mike Rodriguez",
      replies: 8,
      views: 89,
      lastActivity: "4 hours ago",
      category: "Technical",
      solved: false,
    },
    {
      id: 3,
      title: "Portfolio tracking integration examples",
      author: "Emily Johnson",
      replies: 15,
      views: 203,
      lastActivity: "6 hours ago",
      category: "Integration",
      solved: true,
    },
    {
      id: 4,
      title: "Error handling patterns in JavaScript",
      author: "Alex Kim",
      replies: 6,
      views: 78,
      lastActivity: "8 hours ago",
      category: "Development",
      solved: false,
    },
  ];

  const today = new Date();
  const upcomingEvents = [
    {
      title: "API Workshop: Building Your First Trading Bot",
      date: formatDate(addDays(today, 7)),
      time: "2:00 PM PST",
      type: "Workshop",
      attendees: 45,
      maxAttendees: 100,
      url: "https://www.eventbrite.com/d/online/api-workshop/",
    },
    {
      title: "Community AMA with the TradeLens Team",
      date: formatDate(addDays(today, 24)),
      time: "10:00 AM PST",
      type: "AMA",
      attendees: 120,
      maxAttendees: 200,
      url: "https://github.com/community/events",
    },
    {
      title: "Hackathon: Financial Data Visualization",
      date: formatDate(addDays(today, 36)),
      time: "9:00 AM PST",
      type: "Hackathon",
      attendees: 78,
      maxAttendees: 150,
      url: "https://mlh.io/seasons/2025/events",
    },
  ];

  const socialLinks = [
    {
      name: "Discord",
      description: "Join our Discord server for real-time discussions",
      icon: MessageCircle,
      members: "2,500+",
      color: "bg-indigo-500",
      href: "https://discord.com/channels/@me",
    },
    {
      name: "GitHub",
      description: "Contribute to open source projects and examples",
      icon: Github,
      members: "1,200+",
      color: "bg-gray-800",
      href: "https://github.com/tradelens",
    },
    {
      name: "Twitter",
      description: "Follow us for updates and market insights",
      icon: Twitter,
      members: "5,000+",
      color: "bg-blue-400",
      href: "https://x.com/TradeLens25",
    },
    {
      name: "LinkedIn",
      description: "Connect with other professionals",
      icon: Linkedin,
      members: "3,000+",
      color: "bg-blue-600",
      href: "https://linkedin.com/company/tradelens",
    },
  ];

  const featuredProjects = [
    {
      title: "MoneyGrid",
      description:
        "A modern web application for managing your finances",
      author: "Bright Akoto",
      stars: 231,
      language: "React",
      lastUpdated: "1 week ago",
      url: "https://moneygrid.vercel.app/",
    },
    {
      title: "Bitspenda",
      description:
        "A secure and efficient payment platform for digital transactions",
      author: "Bright Kportiklah",
      stars: 809,
      language: "Next.js",
      lastUpdated: "3 days ago",
      url: "https://send.bitspenda.app",
    },
    {
      title: "ElectionHub",
      description:
        "A comprehensive election management system with advanced features",
      author: "Ezekiel J.N.L Quarcoopome",
      stars: 127,
      language: "JavaScript",
      lastUpdated: "5 days ago",
      url: "https://electhub.vercel.app/",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#030712]">
      {/* Hero Section */}
      <div className="relative bg-[#030712] py-24 sm:py-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[140px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/10 blur-[140px]" />
        </div>
        <div className="absolute inset-0 opacity-40">
          <Sparkles color="#6366f1" density={40} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeInOnScroll direction="up" delay={0}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6 backdrop-blur-md"
            >
              <Users className="w-4 h-4" />
              <span>Global Creator Network</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Build the <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Future</span> Together
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Connect with thousands of developers, share knowledge, and build amazing financial applications with TradeLens APIs.
            </motion.p>
          </FadeInOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Community Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {communityStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <FadeInOnScroll key={index} direction="up" delay={index * 100}>
                <div className="group relative p-8 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[3rem] text-center transition-all duration-500 hover:scale-[1.05] hover:bg-white/10">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-all duration-500 group-hover:rotate-6">
                    <Icon className="w-8 h-8 text-blue-500 group-hover:text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2 tracking-tighter">
                    <NumberTicker value={stat.number} />
                  </div>
                  <div className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                    {stat.label}
                  </div>
                </div>
              </FadeInOnScroll>
            );
          })}
        </div>

        {/* Social Links */}
        <div className="mb-32">
          <FadeInOnScroll direction="up">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16 tracking-tight">
              Join the Ecosystem
            </h2>
          </FadeInOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <FadeInOnScroll key={index} direction="up" delay={index * 100}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-10 bg-[#030712] rounded-[3rem] border border-white/5 transition-all duration-500 hover:scale-105 active:scale-95 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className={`w-16 h-16 ${social.color} rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-all duration-500 shadow-xl group-hover:rotate-3`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">
                      {social.name}
                    </h3>
                    <p className="text-gray-400 mb-8 leading-relaxed font-medium">
                      {social.description}
                    </p>
                    <div className="flex items-center justify-between text-blue-400 font-bold">
                      <span className="text-xs uppercase tracking-widest">
                        <NumberTicker value={social.members} /> Members
                      </span>
                      <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </a>
                </FadeInOnScroll>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          {/* Recent Discussions */}
          <FadeInOnScroll direction="left">
            <div>
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                  Recent Activity
                </h2>
                <button className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                  View All
                </button>
              </div>
              <div className="space-y-6">
                {recentDiscussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className="p-8 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] transition-all duration-500 hover:scale-[1.02] cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                        {discussion.title}
                      </h3>
                      {discussion.solved && (
                        <div className="flex items-center space-x-1 text-green-500 bg-green-500/10 px-3 py-1 rounded-full">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Solved</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center font-bold text-blue-500 text-xs">
                           {discussion.author[0]}
                        </div>
                        <span className="font-bold">{discussion.author}</span>
                      </div>
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-lg font-bold text-[10px] uppercase tracking-widest">
                        {discussion.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-gray-400 pt-6 border-t border-black/5 dark:border-white/5">
                      <div className="flex items-center space-x-6">
                        <span>{discussion.replies} Replies</span>
                        <span>{discussion.views} Views</span>
                      </div>
                      <span className="text-blue-500">{discussion.lastActivity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInOnScroll>

          {/* Upcoming Events */}
          <FadeInOnScroll direction="right">
            <div>
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                  Live Events
                </h2>
                <button className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                  View Full Schedule
                </button>
              </div>
              <div className="space-y-6">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="p-8 bg-[#030712] rounded-[2.5rem] border border-white/5 transition-all duration-500 hover:scale-[1.02] relative group"
                  >
                    <div className="absolute top-0 right-0 p-8">
                       <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                        {event.date}
                      </div>
                    </div>
                    <div className="bg-blue-600/10 text-blue-400 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-600/20 w-fit mb-6">
                      {event.type}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-400 mb-8 font-medium">
                      Starts at {event.time}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-white/5">
                      <div className="flex items-center space-x-3 text-blue-400 bg-blue-400/10 px-4 py-2 rounded-xl">
                        <Users className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">
                          {event.attendees}/{event.maxAttendees} Reserved
                        </span>
                      </div>
                      <a
                        href={(event as any).url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-white hover:text-blue-600 text-white px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-blue-600/20 active:scale-95"
                      >
                        Join Stream
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInOnScroll>
        </div>

        {/* Featured Projects */}
        <div className="mb-32">
          <FadeInOnScroll direction="up">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                Featured Projects
              </h2>
              <button className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                View Gallery
              </button>
            </div>
          </FadeInOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <FadeInOnScroll key={index} direction="up" delay={index * 100}>
                <div className="p-10 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[3rem] transition-all duration-500 hover:scale-[1.05] group text-left relative overflow-hidden">
                  <div className="flex items-center justify-between mb-10">
                     <span className="px-4 py-1 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-500/20">
                       {project.language}
                     </span>
                     <div className="flex items-center gap-2 text-yellow-500">
                       <Star className="w-5 h-5 fill-current" />
                       <span className="font-bold text-lg">
                         <NumberTicker value={project.stars} />
                       </span>
                     </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-500 transition-all">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed font-medium">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between pt-10 border-t border-black/5 dark:border-white/5">
                    <div className="text-sm">
                      <div className="text-gray-400 uppercase tracking-widest text-[10px] font-bold mb-1">Architect</div>
                      <div className="font-bold dark:text-white group-hover:text-blue-500 transition-colors">{project.author}</div>
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 rotate-0 group-hover:rotate-12"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <CTASection
          title="Ready to Join Our Community?"
          description="Connect with thousands of developers building the future of financial technology"
          primaryButtonText="Join Discord"
          primaryButtonTo="https://discord.gg/tradelens"
          secondaryButtonText="Browse Projects"
          secondaryButtonTo="https://github.com/tradelens"
        />
      </div>
    </div>
  );
};

export default Community;
