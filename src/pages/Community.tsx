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
      description: "Connect with other developers and professionals",
      icon: Linkedin,
      members: "3,000+",
      color: "bg-blue-600",
      href: "https://linkedin.com/company/tradelens",
    },
  ];

  const featuredProjects = [
    {
      title: "Leapbod",
      description:
        "A modern web application built with cutting-edge technology",
      author: "Bright Akoto",
      stars: 167,
      language: "React",
      lastUpdated: "1 week ago",
      url: "https://leapbod.vercel.app/",
    },
    {
      title: "Bitspenda",
      description:
        "A secure and efficient payment platform for digital transactions",
      author: "BRIGHT KPORTIKLAH",
      stars: 189,
      language: "Next.js",
      lastUpdated: "3 days ago",
      url: "https://send.bitspenda.app",
    },
    {
      title: "TaskFlow",
      description:
        "A comprehensive task management system with advanced features",
      author: "Ezekiel J.N.L Quarcoopome",
      stars: 127,
      language: "JavaScript",
      lastUpdated: "5 days ago",
      url: "https://my-to-do-list-nine-iota.vercel.app/",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            TradeLens Community
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Connect with developers, share knowledge, and build amazing
            applications together. Join our growing community of financial tech
            enthusiasts.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {communityStats.map((stat, index) => {
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

        {/* Social Links */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Join Our Communities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow group"
                >
                  <div
                    className={`w-12 h-12 ${social.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {social.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {social.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {social.members} members
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Recent Discussions */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Recent Discussions
              </h2>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentDiscussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                      {discussion.title}
                    </h3>
                    {discussion.solved && (
                      <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">Solved</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span>by {discussion.author}</span>
                    <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                      {discussion.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span>{discussion.replies} replies</span>
                      <span>{discussion.views} views</span>
                    </div>
                    <span>{discussion.lastActivity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Upcoming Events
              </h2>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {event.title}
                    </h3>
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                      {event.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span>{event.date}</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {event.attendees}/{event.maxAttendees} attending
                      </span>
                    </div>
                    <a
                      href={(event as any).url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      View Event
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Featured Projects
            </h2>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>by {project.author}</span>
                  <span>{project.language}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{project.stars}</span>
                    </div>
                    <span>Updated {project.lastUpdated}</span>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl mb-6 text-blue-100">
            Connect with thousands of developers building the future of
            financial technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://discord.gg/tradelens"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
            >
              Join Discord
            </a>
            <a
              href="https://github.com/tradelens"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
            >
              Browse Projects
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
