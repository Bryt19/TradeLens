import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Copy,
  Check,
  Code,
  Zap,
  Shield,
  BarChart3,
  ExternalLink,
  Key,
  Download,
  Globe,
  Clock,
} from "lucide-react";

const API: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [generatedApiKey, setGeneratedApiKey] = useState(
    "tl_live_sk_1234567890abcdef"
  );

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const generateApiKey = () => {
    const newKey = `tl_live_sk_${Math.random()
      .toString(36)
      .substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setGeneratedApiKey(newKey);
    setShowApiKey(true);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(generatedApiKey);
    setCopiedCode("api-key");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const downloadSDK = (language: string) => {
    // Simulate SDK download
    const sdkInfo = {
      javascript: {
        command: "npm install tradelens-api",
        url: "https://www.npmjs.com/package/tradelens-api",
      },
      python: {
        command: "pip install tradelens",
        url: "https://pypi.org/project/tradelens/",
      },
      php: {
        command: "composer require tradelens/api",
        url: "https://packagist.org/packages/tradelens/api",
      },
      go: {
        command: "go get github.com/tradelens/api",
        url: "https://github.com/tradelens/api",
      },
    };

    const info = sdkInfo[language as keyof typeof sdkInfo];
    if (info) {
      // Copy command to clipboard
      navigator.clipboard.writeText(info.command);
      setCopiedCode(`sdk-${language}`);
      setTimeout(() => setCopiedCode(null), 2000);

      // Open package page in new tab
      window.open(info.url, "_blank");
    }
  };

  const scrollToApiKeySection = () => {
    document.getElementById("api-key-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const codeExamples = [
    {
      id: "crypto-prices",
      title: "Get Cryptocurrency Prices",
      description: "Fetch real-time cryptocurrency prices and market data",
      language: "JavaScript",
      code: `// Get top 10 cryptocurrencies
const response = await fetch('https://api.tradelens.com/v1/crypto/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`,
    },
    {
      id: "stock-quote",
      title: "Get Stock Quote",
      description: "Retrieve real-time stock prices and market information",
      language: "Python",
      code: `import requests

# Get stock quote for Apple
url = "https://api.tradelens.com/v1/stocks/quote"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
params = {
    "symbol": "AAPL"
}

response = requests.get(url, headers=headers, params=params)
data = response.json()
print(data)`,
    },
    {
      id: "news-articles",
      title: "Get Financial News",
      description: "Fetch latest financial and cryptocurrency news articles",
      language: "cURL",
      code: `curl -X GET "https://api.tradelens.com/v1/news" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -G -d "category=crypto" \\
  -d "limit=10"`,
    },
    {
      id: "portfolio-data",
      title: "Get Portfolio Data",
      description:
        "Retrieve user portfolio information and performance metrics",
      language: "JavaScript",
      code: `// Get portfolio summary
const portfolioResponse = await fetch('https://api.tradelens.com/v1/portfolio/summary', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const portfolio = await portfolioResponse.json();
console.log('Total Value:', portfolio.total_value);
console.log('24h Change:', portfolio.change_24h);`,
    },
  ];

  const endpoints = [
    {
      method: "GET",
      path: "/v1/crypto/markets",
      description: "Get cryptocurrency market data",
      parameters: [
        {
          name: "vs_currency",
          type: "string",
          required: true,
          description: "Target currency (usd, eur, etc.)",
        },
        {
          name: "order",
          type: "string",
          required: false,
          description: "Sort order (market_cap_desc, price_asc, etc.)",
        },
        {
          name: "per_page",
          type: "integer",
          required: false,
          description: "Number of results per page (1-250)",
        },
        {
          name: "page",
          type: "integer",
          required: false,
          description: "Page number",
        },
      ],
    },
    {
      method: "GET",
      path: "/v1/crypto/coins/{id}",
      description: "Get detailed information about a specific cryptocurrency",
      parameters: [
        {
          name: "id",
          type: "string",
          required: true,
          description: "Cryptocurrency ID (bitcoin, ethereum, etc.)",
        },
        {
          name: "vs_currency",
          type: "string",
          required: false,
          description: "Target currency",
        },
        {
          name: "include_market_cap",
          type: "boolean",
          required: false,
          description: "Include market cap data",
        },
      ],
    },
    {
      method: "GET",
      path: "/v1/stocks/quote",
      description: "Get real-time stock quote",
      parameters: [
        {
          name: "symbol",
          type: "string",
          required: true,
          description: "Stock symbol (AAPL, GOOGL, etc.)",
        },
        {
          name: "region",
          type: "string",
          required: false,
          description: "Market region (US, EU, etc.)",
        },
      ],
    },
    {
      method: "GET",
      path: "/v1/news",
      description: "Get financial news articles",
      parameters: [
        {
          name: "category",
          type: "string",
          required: false,
          description: "News category (crypto, stocks, general)",
        },
        {
          name: "limit",
          type: "integer",
          required: false,
          description: "Number of articles to return",
        },
        {
          name: "offset",
          type: "integer",
          required: false,
          description: "Number of articles to skip",
        },
      ],
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Real-time Data",
      description: "Get live market data with sub-second latency",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime SLA",
    },
    {
      icon: BarChart3,
      title: "Comprehensive Coverage",
      description: "Crypto, stocks, forex, and commodities data",
    },
    {
      icon: Code,
      title: "Developer Friendly",
      description: "RESTful API with clear documentation and SDKs",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            TradeLens API
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Access real-time financial data with our powerful REST API. Build
            amazing applications with comprehensive market data.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md text-center"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* API Key Generator */}
        <div
          id="api-key-section"
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Get Your API Key
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Generate API Key
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get instant access to TradeLens API with a free API key. No
                credit card required.
              </p>
              <button
                onClick={generateApiKey}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <Key className="w-5 h-5" />
                <span>Generate API Key</span>
              </button>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Your API Key
              </h3>
              {showApiKey ? (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 relative">
                  <code className="text-sm text-gray-800 dark:text-gray-200 break-all">
                    {generatedApiKey}
                  </code>
                  <button
                    onClick={copyApiKey}
                    className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    {copiedCode === "api-key" ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ) : (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Click "Generate API Key" to get your key
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Start
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Make Your First Request
              </h3>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  curl -H "Authorization: Bearer YOUR_API_KEY" \<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;https://api.tradelens.com/v1/crypto/markets
                </code>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Test the API
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Try our interactive API explorer to test endpoints before
                integrating.
              </p>
              <a
                href="https://developers.apideck.com/api-explorer"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
              >
                <span>Open API Explorer</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Code Examples
          </h2>
          <div className="space-y-8">
            {codeExamples.map((example) => (
              <div
                key={example.id}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {example.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {example.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                        {example.language}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <pre className="p-6 bg-gray-900 text-gray-100 overflow-x-auto">
                    <code>{example.code}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(example.code, example.id)}
                    className="absolute top-4 right-4 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    {copiedCode === example.id ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Endpoints */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            API Endpoints
          </h2>
          <div className="space-y-6">
            {endpoints.map((endpoint, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      endpoint.method === "GET"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <code className="text-lg font-mono text-gray-900 dark:text-white">
                    {endpoint.path}
                  </code>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {endpoint.description}
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Parameters:
                  </h4>
                  <div className="space-y-2">
                    {endpoint.parameters.map((param, paramIndex) => (
                      <div
                        key={paramIndex}
                        className="flex items-center space-x-4 text-sm"
                      >
                        <code className="text-blue-600 dark:text-blue-400 font-mono">
                          {param.name}
                        </code>
                        <span className="text-gray-500 dark:text-gray-400">
                          {param.type}
                        </span>
                        {param.required && (
                          <span className="text-red-500 text-xs font-medium">
                            required
                          </span>
                        )}
                        <span className="text-gray-600 dark:text-gray-300">
                          {param.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SDK Downloads */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            SDK Downloads
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Get started quickly with our official SDKs and libraries
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                JavaScript
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                npm install tradelens-api
              </p>
              <button
                onClick={() => downloadSDK("javascript")}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 mx-auto"
              >
                {copiedCode === "sdk-javascript" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>
                  {copiedCode === "sdk-javascript" ? "Copied!" : "Download"}
                </span>
              </button>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Python
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                pip install tradelens
              </p>
              <button
                onClick={() => downloadSDK("python")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 mx-auto"
              >
                {copiedCode === "sdk-python" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>
                  {copiedCode === "sdk-python" ? "Copied!" : "Download"}
                </span>
              </button>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                PHP
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                composer require tradelens/api
              </p>
              <button
                onClick={() => downloadSDK("php")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 mx-auto"
              >
                {copiedCode === "sdk-php" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>{copiedCode === "sdk-php" ? "Copied!" : "Download"}</span>
              </button>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Go
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                go get github.com/tradelens/api
              </p>
              <button
                onClick={() => downloadSDK("go")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 mx-auto"
              >
                {copiedCode === "sdk-go" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>{copiedCode === "sdk-go" ? "Copied!" : "Download"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Rate Limits */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Rate Limits & Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                100
              </div>
              <div className="text-gray-600 dark:text-gray-300 mb-4">
                Free Plan
                <br />
                requests/minute
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                $0/month
              </div>
            </div>
            <div className="text-center border-2 border-green-500 rounded-lg p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Popular
                </span>
              </div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                1,000
              </div>
              <div className="text-gray-600 dark:text-gray-300 mb-4">
                Pro Plan
                <br />
                requests/minute
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                $29/month
              </div>
            </div>
            <div className="text-center border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                Unlimited
              </div>
              <div className="text-gray-600 dark:text-gray-300 mb-4">
                Enterprise Plan
                <br />
                requests/minute
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Custom pricing
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Building?</h2>
          <p className="text-xl mb-6 text-blue-100">
            Get your API key and start building amazing financial applications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToApiKeySection}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Get API Key
            </button>
            <Link
              to="/docs"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              View Documentation
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default API;
