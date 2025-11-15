import React from "react";
import { ExternalLink, Building2, Coins, BarChart3, Globe } from "lucide-react";
import FadeInOnScroll from "../components/FadeInOnScroll";

interface Platform {
  id: string;
  name: string;
  description: string;
  url: string;
  logo: string;
}

const platformsData = {
  brokers: [
    {
      id: "interactive-brokers",
      name: "Interactive Brokers",
      description:
        "Professional-grade trading platform with low fees and global market access.",
      url: "https://www.interactivebrokers.com",
      logo: "https://s3-eu-west-1.amazonaws.com/tpd/logos/597c8ceb0000ff0005a7af84/0x0.png",
    },
    {
      id: "exness",
      name: "Exness",
      description:
        "Comprehensive trading platform with extensive research tools and educational resources.",
      url: "https://www.exness.com/",
      logo: "https://socialvps.net/wp-content/uploads/2025/06/Exness-Logo-Forex-Broker.webp",
    },
    {
      id: "charles-schwab",
      name: "Charles Schwab",
      description:
        "Full-service brokerage with commission-free trading and robust investment tools.",
      url: "https://www.schwab.com",
      logo: "https://download.logo.wine/logo/Charles_Schwab_Corporation/Charles_Schwab_Corporation-Logo.wine.png",
    },
    {
      id: "fidelity",
      name: "Fidelity",
      description:
        "Leading investment firm offering comprehensive trading and wealth management services.",
      url: "https://www.fidelity.com",
      logo: "https://shorturl.at/M9Q1E",
    },
    {
      id: "etrade",
      name: "E*TRADE",
      description:
        "Online brokerage platform with powerful trading tools and educational resources.",
      url: "https://www.etrade.com",
      logo: "https://www.logo.wine/a/logo/E-Trade/E-Trade-Logo.wine.svg",
    },
    {
      id: "robinhood",
      name: "Robinhood",
      description:
        "Commission-free trading app with a simple, user-friendly interface.",
      url: "https://robinhood.com",
      logo: "https://shorturl.at/zA4Ib",
    },
    {
      id: "webull",
      name: "Webull",
      description:
        "Advanced trading platform with real-time data and technical analysis tools.",
      url: "https://www.webull.com",
      logo: "https://static.cdnlogo.com/logos/w/81/webull.png",
    },
    {
      id: "tastyworks",
      name: "Tastyworks",
      description:
        "Options-focused trading platform designed for active traders.",
      url: "https://tastyworks.com",
      logo: "https://mms.businesswire.com/media/20211111005832/en/562191/5/tastyworks_Logo.jpg",
    },
    {
      id: "ally-invest",
      name: "Ally Invest",
      description:
        "Online brokerage with competitive pricing and comprehensive trading tools.",
      url: "https://www.ally.com/invest",
      logo: "https://www.logo.wine/a/logo/Ally_Financial/Ally_Financial-Logo.wine.svg",
    },
  ],
  crypto: [
    {
      id: "binance",
      name: "Binance",
      description:
        "World's largest cryptocurrency exchange with extensive trading pairs and features.",
      url: "https://www.binance.com",
      logo: "https://www.logo.wine/a/logo/Binance/Binance-BNB-Icon-Logo.wine.svg",
    },
    {
      id: "coinbase",
      name: "Coinbase",
      description:
        "Leading crypto exchange with user-friendly interface and strong security.",
      url: "https://www.coinbase.com",
      logo: "https://short-url.org/1bvWV",
    },
    {
      id: "kraken",
      name: "Kraken",
      description:
        "Established crypto exchange known for security and regulatory compliance.",
      url: "https://www.kraken.com",
      logo: "https://logos-world.net/wp-content/uploads/2021/02/Kraken-Logo.png",
    },
    {
      id: "kucoin",
      name: "KuCoin",
      description:
        "Global cryptocurrency exchange with innovative trading features and altcoins.",
      url: "https://www.kucoin.com",
      logo: "https://zengo.com/wp-content/uploads/kucoin_300x300@x2.png",
    },
    {
      id: "bybit",
      name: "Bybit",
      description:
        "Derivatives-focused crypto exchange with advanced trading tools.",
      url: "https://www.bybit.com",
      logo: "https://altcoinsbox.com/wp-content/uploads/2022/10/bybit-logo-white.jpg",
    },
    {
      id: "okx",
      name: "OKX",
      description:
        "Comprehensive crypto platform with spot, futures, and DeFi services.",
      url: "https://www.okx.com",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Logo-OKX.png",
    },
    {
      id: "huobi",
      name: "Huobi",
      description:
        "Global digital asset exchange with diverse trading products.",
      url: "https://www.huobi.com",
      logo: "https://altcoinsbox.com/wp-content/uploads/2023/01/huobi-logo.webp",
    },
    {
      id: "bitfinex",
      name: "Bitfinex",
      description:
        "Advanced crypto trading platform with professional-grade tools.",
      url: "https://www.bitfinex.com",
      logo: "https://www.logo.wine/a/logo/Bitfinex/Bitfinex-Logo.wine.svg",
    },
    {
      id: "gate-io",
      name: "Gate.io",
      description:
        "Cryptocurrency exchange with extensive altcoin selection and trading pairs.",
      url: "https://www.gate.io",
      logo: "https://miro.medium.com/1*B3yvebBMHtslnTXVMVQE8Q.png",
    },
  ],
  stocks: [
    {
        id: "vanguard",
        name: "Vanguard",
        description:
          "Trusted broker with commission-free stock and ETF trading, focused on long-term investors.",
        url: "https://investor.vanguard.com",
        logo: "https://images.seeklogo.com/logo-png/49/2/vanguard-group-logo-png_seeklogo-490759.png",
      },
      {
        id: "saxo-bank",
        name: "Saxo Bank",
        description:
          "Global investment bank offering advanced stock trading and portfolio management tools.",
        url: "https://www.home.saxo",
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/12/SAXOBankLogo.png",
      },
      {
        id: "degiro",
        name: "DEGIRO",
        description:
          "European broker with low-cost stock trading and access to global exchanges.",
        url: "https://www.degiro.com",
        logo: "https://images.icon-icons.com/2407/PNG/512/degiro_icon_146198.png",
      },
      {
        id: "ig-markets",
        name: "IG Markets",
        description:
          "UK-based trading platform with stocks, CFDs, and forex in one account.",
        url: "https://www.ig.com",
        logo: "https://short-url.org/1gaBX",
      },
      {
        id: "cmc-markets",
        name: "CMC Markets",
        description:
          "Award-winning platform offering global stock trading, CFDs, and market insights.",
        url: "https://www.cmcmarkets.com",
        logo: "http://tiny.cc/tradeLens",
      },
      {
        id: "qtrade",
        name: "Questrade",
        description:
          "Canadian broker with commission-free ETF trades and powerful stock trading tools.",
        url: "https://www.questrade.com",
        logo: "http://tiny.cc/nx4t001",
      },
      {
        id: "plus500",
        name: "Plus500",
        description:
          "Popular global trading app for stocks, ETFs, and CFDs with real-time tools.",
        url: "https://www.plus500.com",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXNNAsrJFQRDSUBczn3HTbxvoSfooAwQ6xew&s",
      },
      {
        id: "xTB",
        name: "XTB",
        description:
          "International broker offering stock CFDs and ETFs with strong research tools.",
        url: "https://www.xtb.com",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgN6wssSgwxDEC-bxYLtO_qi8ujSkGHaD6HA&s",
      },
      {
        id: "fineco",
        name: "FinecoBank",
        description:
          "Italian online bank with stock trading, ETFs, and investment services across Europe.",
        url: "https://www.finecobank.com",
        logo: "http://tiny.cc/cx4t001",
      },
  ],
  africa: [
    {
      id: "bitspenda",
      name: "Bitspenda",
      description:
        "BitSpenda is a Ghana-based service that converts Bitcoin to Mobile Money instantly using the Lightning Network.",
      url: "https://send.bitspenda.app",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2xgsrGNQLHHY_PVUX-FWKPcy6lviIbSUo9A&s",
    },
    {
      id: "quidax",
      name: "Quidax",
      description:
        "African cryptocurrency exchange with local payment methods.",
      url: "https://www.quidax.com",
      logo: "https://shorturl.at/1T0cA",
    },
    {
      id: "luno",
      name: "Luno",
      description:
        "Global crypto platform with strong presence in African markets.",
      url: "https://www.luno.com",
      logo: "https://avatars.githubusercontent.com/u/26893916?s=280&v=4",
    },
    {
      id: "yellow-card",
      name: "Yellow Card",
      description:
        "Pan-African cryptocurrency exchange with mobile-first approach.",
      url: "https://yellowcard.io",
      logo: "http://tiny.cc/gx4t001",
    },
    {
      id: "blink",
      name: "Blink Bitcoin Wallet",
      description: "Blink is a user-friendly Bitcoin Lightning wallet for fast, low-fee payments and savings, designed for global users.",
      url: "https://www.blink.sv",
      logo: "https://d48ttl5m5edbw.cloudfront.net/m94j60nn48knalvyajd8hobkepc1",
    },
    {
      id: "rise-vest",
      name: "Rise Vest",
      description:
        "Nigerian investment platform for global stocks and fixed income.",
      url: "https://risevest.com",
      logo: "https://shorturl.at/VInFX",
    },
    {
      id: "zeepay",
      name: "Zeepay",
      description:
        "Pan-African fintech company enabling seamless mobile money transfers and payments across Africa and beyond.",
      url: "https://www.myzeepay.com",
      logo: "https://shorturl.at/cHLD1",
    },
    {
      id: "giftcardstonaira",
      name: "Giftcardstonaira",
      description: "Platform for exchanging gift cards for Naira and other local currencies in Nigeria.",
      url: "https://giftcardstonaira.com",
      logo: "https://shorturl.at/vsEUy",
    },
    {
      id: "achieve",
      name: "Achieve by Petra",
      description: "Pan-African investment platform offering access to mutual funds, savings, and wealth management solutions.",
      url: "https://theachieveapp.com/",
      logo: "https://shorturl.at/MaxMM",
    },
  ],
};

const PlatformCard: React.FC<{ platform: Platform }> = ({ platform }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img
            src={platform.logo}
            alt={`${platform.name} logo`}
            className="w-16 h-16 rounded-lg object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {platform.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
            {platform.description}
          </p>
          <a
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors"
          >
            Visit Platform
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

const Platforms: React.FC = () => {
  const categories = [
    {
      id: "brokers",
      title: "Top Broker Platforms",
      description:
        "Comprehensive trading platforms offering stocks, options, and more",
      icon: Building2,
      platforms: platformsData.brokers,
    },
    {
      id: "crypto",
      title: "Top Crypto-Only Trading Platforms",
      description: "Specialized cryptocurrency exchanges and trading platforms",
      icon: Coins,
      platforms: platformsData.crypto,
    },
    {
      id: "stocks",
      title: "Top Stock Trading Platforms",
      description:
        "Dedicated platforms for stock market trading and investment",
      icon: BarChart3,
      platforms: platformsData.stocks,
    },
    {
      id: "africa",
      title: "Top Made-in-Africa Platforms",
      description:
        "African fintech platforms revolutionizing investment and trading",
      icon: Globe,
      platforms: platformsData.africa,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeInOnScroll direction="up" delay={0}>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trading Platforms
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover the top trading platforms across different categories.
              From traditional brokers to crypto exchanges and African fintech
              innovations.
            </p>
          </div>
        </FadeInOnScroll>

        {/* Categories */}
        <div className="space-y-16">
          {categories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <FadeInOnScroll key={category.id} direction="up" delay={categoryIndex * 200}>
                <section className="scroll-mt-20">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {category.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.platforms.map((platform, platformIndex) => (
                      <FadeInOnScroll key={platform.id} direction="up" delay={platformIndex * 100}>
                        <PlatformCard platform={platform} />
                      </FadeInOnScroll>
                    ))}
                  </div>
                </section>
              </FadeInOnScroll>
            );
          })}
        </div>

        {/* Footer CTA */}
        <FadeInOnScroll direction="up" delay={0}>
          <div className="mt-16 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Can't Find What You're Looking For?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We're constantly updating our platform recommendations. Have a
                suggestion or want to see a specific platform featured?
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Contact Us
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </div>
  );
};

export default Platforms;
