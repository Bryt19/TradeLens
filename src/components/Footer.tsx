import React from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Github,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Icons } from "./ui/icons";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Features", href: "/features" },
      { name: "Pricing", href: "/pricing" },
      { name: "API", href: "/api" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
    ],
    resources: [
      { name: "Documentation", href: "/docs" },
      { name: "Help Center", href: "/help" },
      { name: "Community", href: "/community" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  };

  const socialLinks = [
    {
      name: "Discord",
      href: "https://discord.com/channels/@me",
      icon: MessageCircle,
    },
    { name: "GitHub", href: "https://github.com/Bryt19", icon: Github },
    { name: "Twitter", href: "https://x.com/TradeLens25", icon: Twitter },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/bright-akoto19",
      icon: Linkedin,
    },
    { name: "Email", href: "mailto:tradelens25@gmail.com", icon: Mail },
  ];

  return (
    <footer className="py-12 px-4 md:px-6 bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">TradeLens</h2>
            </Link>
            <h1 className="text-gray-600 dark:text-gray-300 mt-4">
              Built by{" "}
              <span className="text-blue-600 dark:text-blue-400">
                <a href="https://x.com/TradeLens25" target="_blank" rel="noopener noreferrer">
                  @TradeLens
                </a>
              </span>
            </h1>
            <div className="mt-2">
              <a
                href="https://x.com/compose/tweet?text=I%27ve%20been%20using%20%23TradeLens%20share%20your%20thoughts%20%40TradeLens25"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                  Share Your Thoughts On
                  <Icons.twitter className="icon-class ml-1 w-3.5" />
                </Button>
              </a>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-5">
              © {currentYear} TradeLens. All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Product</h3>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Resources</h3>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Socials</h3>
              <ul className="space-y-2">
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Legal</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full flex mt-4 items-center justify-center">
          <h1 className="text-center text-3xl md:text-5xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 via-blue-600 to-purple-600 dark:from-neutral-300 dark:via-blue-400 dark:to-purple-400 select-none">
            TradeLens
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
