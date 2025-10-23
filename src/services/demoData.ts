import { CoinGeckoCoin, NewsArticle } from "../types";

// Demo cryptocurrency data
export const demoCryptoData: CoinGeckoCoin[] = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 45000 + Math.random() * 10000 - 5000,
    market_cap: 850000000000 + Math.random() * 100000000000,
    market_cap_rank: 1,
    fully_diluted_valuation: 945000000000,
    total_volume: 25000000000 + Math.random() * 10000000000,
    high_24h: 46000 + Math.random() * 5000,
    low_24h: 44000 - Math.random() * 5000,
    price_change_24h: (Math.random() - 0.5) * 2000,
    price_change_percentage_24h: (Math.random() - 0.5) * 10,
    market_cap_change_24h: (Math.random() - 0.5) * 20000000000,
    market_cap_change_percentage_24h: (Math.random() - 0.5) * 5,
    circulating_supply: 19000000,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 69000,
    ath_change_percentage: -34.78,
    ath_date: "2021-11-10T14:24:11.849Z",
    atl: 67.81,
    atl_change_percentage: 66263.74,
    atl_date: "2013-07-06T00:00:00.000Z",
    roi: null,
    last_updated: new Date().toISOString(),
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 3000 + Math.random() * 1000 - 500,
    market_cap: 360000000000 + Math.random() * 50000000000,
    market_cap_rank: 2,
    fully_diluted_valuation: 360000000000,
    total_volume: 15000000000 + Math.random() * 5000000000,
    high_24h: 3200 + Math.random() * 200,
    low_24h: 2800 - Math.random() * 200,
    price_change_24h: (Math.random() - 0.5) * 200,
    price_change_percentage_24h: (Math.random() - 0.5) * 8,
    market_cap_change_24h: (Math.random() - 0.5) * 10000000000,
    market_cap_change_percentage_24h: (Math.random() - 0.5) * 3,
    circulating_supply: 120000000,
    total_supply: 120000000,
    max_supply: null,
    ath: 4878,
    ath_change_percentage: -38.5,
    ath_date: "2021-11-10T14:24:11.849Z",
    atl: 0.432979,
    atl_change_percentage: 692000,
    atl_date: "2015-10-20T00:00:00.000Z",
    roi: null,
    last_updated: new Date().toISOString(),
  },
  {
    id: "binancecoin",
    symbol: "bnb",
    name: "BNB",
    image:
      "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    current_price: 300 + Math.random() * 100 - 50,
    market_cap: 45000000000 + Math.random() * 10000000000,
    market_cap_rank: 3,
    fully_diluted_valuation: 45000000000,
    total_volume: 2000000000 + Math.random() * 1000000000,
    high_24h: 320 + Math.random() * 20,
    low_24h: 280 - Math.random() * 20,
    price_change_24h: (Math.random() - 0.5) * 20,
    price_change_percentage_24h: (Math.random() - 0.5) * 6,
    market_cap_change_24h: (Math.random() - 0.5) * 2000000000,
    market_cap_change_percentage_24h: (Math.random() - 0.5) * 4,
    circulating_supply: 150000000,
    total_supply: 200000000,
    max_supply: 200000000,
    ath: 686,
    ath_change_percentage: -56.2,
    ath_date: "2021-05-10T07:24:17.097Z",
    atl: 0.0398177,
    atl_change_percentage: 753000,
    atl_date: "2017-10-19T00:00:00.000Z",
    roi: null,
    last_updated: new Date().toISOString(),
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    current_price: 0.5 + Math.random() * 0.2 - 0.1,
    market_cap: 18000000000 + Math.random() * 5000000000,
    market_cap_rank: 4,
    fully_diluted_valuation: 22500000000,
    total_volume: 800000000 + Math.random() * 400000000,
    high_24h: 0.55 + Math.random() * 0.05,
    low_24h: 0.45 - Math.random() * 0.05,
    price_change_24h: (Math.random() - 0.5) * 0.05,
    price_change_percentage_24h: (Math.random() - 0.5) * 8,
    market_cap_change_24h: (Math.random() - 0.5) * 1000000000,
    market_cap_change_percentage_24h: (Math.random() - 0.5) * 5,
    circulating_supply: 36000000000,
    total_supply: 45000000000,
    max_supply: 45000000000,
    ath: 3.09,
    ath_change_percentage: -83.8,
    ath_date: "2021-09-02T06:00:10.474Z",
    atl: 0.01925275,
    atl_change_percentage: 2496,
    atl_date: "2020-03-13T02:22:55.044Z",
    roi: null,
    last_updated: new Date().toISOString(),
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    current_price: 100 + Math.random() * 50 - 25,
    market_cap: 40000000000 + Math.random() * 10000000000,
    market_cap_rank: 5,
    fully_diluted_valuation: 56000000000,
    total_volume: 3000000000 + Math.random() * 2000000000,
    high_24h: 110 + Math.random() * 10,
    low_24h: 90 - Math.random() * 10,
    price_change_24h: (Math.random() - 0.5) * 10,
    price_change_percentage_24h: (Math.random() - 0.5) * 10,
    market_cap_change_24h: (Math.random() - 0.5) * 3000000000,
    market_cap_change_percentage_24h: (Math.random() - 0.5) * 7,
    circulating_supply: 400000000,
    total_supply: 560000000,
    max_supply: null,
    ath: 259.96,
    ath_change_percentage: -61.5,
    ath_date: "2021-11-06T21:54:35.825Z",
    atl: 0.500801,
    atl_change_percentage: 19800,
    atl_date: "2020-05-11T19:35:23.449Z",
    roi: null,
    last_updated: new Date().toISOString(),
  },
];

// Demo news data - Financial News
export const demoFinancialNews: NewsArticle[] = [
  {
    title:
      "Federal Reserve Holds Interest Rates Steady Amid Economic Uncertainty",
    description:
      "The Federal Reserve maintained its current interest rate policy as policymakers assess the impact of recent economic indicators on inflation and employment.",
    url: "https://example.com/fed-rates-steady",
    urlToImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    source: {
      id: "financial-times",
      name: "Financial Times",
    },
  },
  {
    title: "Stock Market Rally Continues as Tech Stocks Lead Gains",
    description:
      "Major technology stocks are driving a sustained market rally, with investors showing renewed confidence in growth sectors and innovation-driven companies.",
    url: "https://example.com/stock-rally-tech",
    urlToImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source: {
      id: "market-watch",
      name: "Market Watch",
    },
  },
  {
    title: "Bond Yields Rise as Investors Adjust to New Economic Reality",
    description:
      "Treasury yields have climbed higher as market participants reassess their expectations for economic growth and monetary policy in the coming quarters.",
    url: "https://example.com/bond-yields-rise",
    urlToImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: {
      id: "bloomberg",
      name: "Bloomberg",
    },
  },
  {
    title:
      "Banking Sector Reports Strong Q4 Earnings Despite Market Volatility",
    description:
      "Major banks have exceeded earnings expectations, demonstrating resilience in the face of economic headwinds and regulatory challenges.",
    url: "https://example.com/banking-earnings-q4",
    urlToImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    source: {
      id: "wall-street-journal",
      name: "Wall Street Journal",
    },
  },
  {
    title: "Inflation Data Shows Signs of Cooling as Supply Chains Improve",
    description:
      "Latest inflation figures indicate a gradual easing of price pressures, with supply chain normalization contributing to more stable economic conditions.",
    url: "https://example.com/inflation-cooling",
    urlToImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    source: {
      id: "reuters",
      name: "Reuters",
    },
  },
  {
    title: "Housing Market Shows Resilience Despite Rising Mortgage Rates",
    description:
      "Despite higher borrowing costs, the housing market continues to show strength with steady demand and limited inventory supporting prices.",
    url: "https://example.com/housing-market-resilience",
    urlToImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
    publishedAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
    source: {
      id: "cnbc",
      name: "CNBC",
    },
  },
];

// Demo news data - Crypto News
export const demoCryptoNews: NewsArticle[] = [
  {
    title: "Bitcoin Reaches New All-Time High Amid Institutional Adoption",
    description:
      "Bitcoin has surged to new heights as major institutions continue to adopt cryptocurrency, driving mainstream acceptance and market confidence.",
    url: "https://example.com/bitcoin-ath-institutional",
    urlToImage:
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=250&fit=crop",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: {
      id: "coindesk",
      name: "CoinDesk",
    },
  },
  {
    title: "Ethereum 2.0 Upgrade Shows Promising Results for Scalability",
    description:
      "The latest Ethereum network upgrade has demonstrated improved scalability and reduced energy consumption, boosting developer confidence and user adoption.",
    url: "https://example.com/ethereum-upgrade-scalability",
    urlToImage:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: {
      id: "blockchain-weekly",
      name: "Blockchain Weekly",
    },
  },
  {
    title: "DeFi Protocol Reaches $100B Total Value Locked Milestone",
    description:
      "A major decentralized finance protocol has achieved a significant milestone, demonstrating the growing adoption of DeFi solutions and yield farming strategies.",
    url: "https://example.com/defi-100b-tvl",
    urlToImage:
      "https://images.unsplash.com/photo-1639322537228-f912d6b7b0b0?w=400&h=250&fit=crop",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: {
      id: "defi-pulse",
      name: "DeFi Pulse",
    },
  },
  {
    title: "NFT Market Shows Signs of Recovery After Recent Downturn",
    description:
      "The non-fungible token market is experiencing renewed interest as new use cases emerge and major brands continue to explore digital collectibles.",
    url: "https://example.com/nft-market-recovery",
    urlToImage:
      "https://images.unsplash.com/photo-1639322537228-f912d6b7b0b0?w=400&h=250&fit=crop",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: {
      id: "nft-now",
      name: "NFT Now",
    },
  },
  {
    title: "Central Banks Explore Digital Currency Integration Standards",
    description:
      "Multiple central banks worldwide are collaborating on digital currency standards, aiming to create a unified approach to CBDCs and cross-border payments.",
    url: "https://example.com/cbdc-standards-collaboration",
    urlToImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source: {
      id: "central-bank-news",
      name: "Central Bank News",
    },
  },
  {
    title: "Layer 2 Solutions Gain Traction as Ethereum Fees Remain High",
    description:
      "Alternative blockchain solutions are seeing increased adoption as users seek more cost-effective ways to interact with decentralized applications.",
    url: "https://example.com/layer2-solutions-traction",
    urlToImage:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: {
      id: "crypto-news",
      name: "Crypto News Daily",
    },
  },
];

// Demo news data - Business News
export const demoBusinessNews: NewsArticle[] = [
  {
    title: "Tech Giants Report Strong Q4 Earnings Despite Market Headwinds",
    description:
      "Major technology companies have exceeded earnings expectations, demonstrating resilience and adaptability in a challenging economic environment.",
    url: "https://example.com/tech-giants-q4-earnings",
    urlToImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    source: {
      id: "forbes",
      name: "Forbes",
    },
  },
  {
    title: "Supply Chain Disruptions Ease as Global Trade Normalizes",
    description:
      "International trade is showing signs of recovery as supply chain bottlenecks begin to resolve and shipping costs stabilize across major routes.",
    url: "https://example.com/supply-chain-normalization",
    urlToImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source: {
      id: "reuters",
      name: "Reuters",
    },
  },
  {
    title: "Renewable Energy Investments Reach Record Highs in 2024",
    description:
      "Global investments in renewable energy have hit unprecedented levels as companies and governments accelerate their transition to sustainable energy sources.",
    url: "https://example.com/renewable-energy-record-investments",
    urlToImage:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=250&fit=crop",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: {
      id: "bloomberg",
      name: "Bloomberg",
    },
  },
  {
    title: "Automotive Industry Embraces Electric Vehicle Revolution",
    description:
      "Traditional automakers are accelerating their electric vehicle programs as consumer demand grows and regulatory requirements become more stringent.",
    url: "https://example.com/automotive-ev-revolution",
    urlToImage:
      "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=250&fit=crop",
    publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    source: {
      id: "automotive-news",
      name: "Automotive News",
    },
  },
  {
    title: "Healthcare Sector Sees Innovation Boom in Digital Therapeutics",
    description:
      "The healthcare industry is experiencing rapid growth in digital health solutions as technology companies partner with medical institutions to improve patient outcomes.",
    url: "https://example.com/healthcare-digital-therapeutics",
    urlToImage:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
    publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    source: {
      id: "healthcare-dive",
      name: "Healthcare Dive",
    },
  },
  {
    title: "Retail Industry Adapts to Changing Consumer Shopping Habits",
    description:
      "Retailers are implementing innovative strategies to meet evolving consumer expectations, including enhanced online experiences and sustainable practices.",
    url: "https://example.com/retail-consumer-habits-adaptation",
    urlToImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
    publishedAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
    source: {
      id: "retail-dive",
      name: "Retail Dive",
    },
  },
];

// Combined demo news data for backward compatibility
export const demoNewsData: NewsArticle[] = [
  ...demoFinancialNews,
  ...demoCryptoNews,
  ...demoBusinessNews,
];

// Generate more demo data
export const generateMoreCryptoData = (count: number): CoinGeckoCoin[] => {
  const symbols = [
    "DOGE",
    "XRP",
    "DOT",
    "AVAX",
    "MATIC",
    "LINK",
    "UNI",
    "LTC",
    "BCH",
    "ATOM",
  ];
  const names = [
    "Dogecoin",
    "XRP",
    "Polkadot",
    "Avalanche",
    "Polygon",
    "Chainlink",
    "Uniswap",
    "Litecoin",
    "Bitcoin Cash",
    "Cosmos",
  ];

  return Array.from({ length: count }, (_, index) => {
    const symbol = symbols[index % symbols.length];
    const name = names[index % names.length];
    const basePrice = 0.1 + Math.random() * 100;

    return {
      id: symbol.toLowerCase(),
      symbol: symbol.toLowerCase(),
      name,
      image: `https://assets.coingecko.com/coins/images/${
        1000 + index
      }/large/${symbol.toLowerCase()}.png`,
      current_price: basePrice,
      market_cap: basePrice * (1000000000 + Math.random() * 10000000000),
      market_cap_rank: index + 6,
      fully_diluted_valuation:
        basePrice * (1000000000 + Math.random() * 10000000000),
      total_volume: basePrice * (100000000 + Math.random() * 1000000000),
      high_24h: basePrice * (1 + Math.random() * 0.1),
      low_24h: basePrice * (1 - Math.random() * 0.1),
      price_change_24h: basePrice * (Math.random() - 0.5) * 0.1,
      price_change_percentage_24h: (Math.random() - 0.5) * 15,
      market_cap_change_24h: basePrice * (Math.random() - 0.5) * 100000000,
      market_cap_change_percentage_24h: (Math.random() - 0.5) * 8,
      circulating_supply: 1000000000 + Math.random() * 10000000000,
      total_supply: 1000000000 + Math.random() * 10000000000,
      max_supply: null,
      ath: basePrice * (1.5 + Math.random()),
      ath_change_percentage: -Math.random() * 50,
      ath_date: "2021-01-01T00:00:00.000Z",
      atl: basePrice * (0.1 + Math.random() * 0.5),
      atl_change_percentage: Math.random() * 1000,
      atl_date: "2020-01-01T00:00:00.000Z",
      roi: null,
      last_updated: new Date().toISOString(),
    };
  });
};

// Generate more demo news with better variety
export const generateMoreNewsData = (
  count: number,
  category?: "financial" | "crypto" | "business"
): NewsArticle[] => {
  const financialTitles = [
    "Interest Rate Cuts Expected as Inflation Eases",
    "Bond Market Volatility Reaches 6-Month High",
    "Banking Sector Faces New Regulatory Challenges",
    "Housing Market Shows Mixed Signals in Q4",
    "Commodity Prices Stabilize After Recent Volatility",
    "Insurance Industry Adapts to Climate Change Risks",
    "Pension Funds Increase Alternative Investment Allocations",
    "Credit Markets Show Signs of Tightening",
    "Municipal Bonds Gain Popularity Among Investors",
    "Real Estate Investment Trusts Report Strong Performance",
  ];

  const cryptoTitles = [
    "Altcoin Season Begins as Bitcoin Dominance Declines",
    "Staking Rewards Reach New Highs Across Major Networks",
    "Cross-Chain Bridge Technology Shows Significant Progress",
    "Meme Coins Experience Unexpected Rally",
    "Privacy Coins Face Increased Regulatory Scrutiny",
    "Smart Contract Security Audits Become Industry Standard",
    "Decentralized Exchanges Surpass Centralized Trading Volume",
    "Crypto Mining Industry Adapts to Energy Efficiency Standards",
    "Stablecoin Market Cap Approaches $200 Billion",
    "Web3 Gaming Sector Attracts Major Investment",
  ];

  const businessTitles = [
    "Remote Work Policies Reshape Corporate Real Estate",
    "Artificial Intelligence Integration Accelerates Across Industries",
    "Sustainability Initiatives Drive Corporate Strategy Changes",
    "Supply Chain Resilience Becomes Top Priority",
    "Digital Transformation Investments Reach Record Levels",
    "Talent Acquisition Strategies Evolve in Competitive Market",
    "Customer Experience Innovation Drives Revenue Growth",
    "Data Privacy Regulations Impact Business Operations",
    "Partnership Ecosystems Expand Across Technology Sectors",
    "Operational Efficiency Gains Through Process Automation",
  ];

  const financialSources = [
    "Financial Times",
    "Bloomberg",
    "Wall Street Journal",
    "Reuters",
    "CNBC",
    "Market Watch",
    "Yahoo Finance",
    "Investor's Business Daily",
    "Barron's",
    "The Economist",
  ];

  const cryptoSources = [
    "CoinDesk",
    "CoinTelegraph",
    "Crypto News",
    "Blockchain Weekly",
    "DeFi Pulse",
    "The Block",
    "Decrypt",
    "CryptoSlate",
    "Bitcoin Magazine",
    "Crypto Briefing",
  ];

  const businessSources = [
    "Forbes",
    "Harvard Business Review",
    "Fortune",
    "Business Insider",
    "Fast Company",
    "Inc. Magazine",
    "Entrepreneur",
    "Wired",
    "TechCrunch",
    "VentureBeat",
  ];

  const getTitlesAndSources = (cat?: string) => {
    switch (cat) {
      case "financial":
        return { titles: financialTitles, sources: financialSources };
      case "crypto":
        return { titles: cryptoTitles, sources: cryptoSources };
      case "business":
        return { titles: businessTitles, sources: businessSources };
      default:
        return {
          titles: [...financialTitles, ...cryptoTitles, ...businessTitles],
          sources: [...financialSources, ...cryptoSources, ...businessSources],
        };
    }
  };

  const { titles, sources } = getTitlesAndSources(category);

  return Array.from({ length: count }, (_, index) => {
    const title = titles[index % titles.length];
    const source = sources[index % sources.length];
    const hoursAgo = Math.floor(Math.random() * 72); // Random time within last 72 hours

    // Generate more realistic descriptions
    const descriptions = [
      `Market analysts are closely monitoring recent developments as ${title.toLowerCase()} continues to impact investor sentiment.`,
      `Industry experts suggest that current trends in ${title.toLowerCase()} may signal broader changes in the market landscape.`,
      `Recent data indicates significant shifts in ${title.toLowerCase()} as stakeholders adapt to evolving market conditions.`,
      `The latest developments in ${title.toLowerCase()} highlight the importance of strategic planning in today's dynamic environment.`,
      `Market participants are evaluating the implications of ${title.toLowerCase()} on long-term investment strategies.`,
    ];

    // Create unique URLs and titles to prevent duplicates
    const uniqueId = `${category || "general"}-${index}-${Date.now()}`;
    const uniqueTitle = `${title} - Update ${index + 1}`;

    return {
      title: uniqueTitle,
      description: descriptions[index % descriptions.length],
      url: `https://example.com/news-${uniqueId}`,
      urlToImage: `https://images.unsplash.com/photo-${
        1550000000000 + index + Math.floor(Math.random() * 1000)
      }?w=400&h=250&fit=crop`,
      publishedAt: new Date(
        Date.now() - hoursAgo * 60 * 60 * 1000
      ).toISOString(),
      source: {
        id: source.toLowerCase().replace(/\s+/g, "-"),
        name: source,
      },
    };
  });
};
