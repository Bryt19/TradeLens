# TradeLens - Financial Dashboard

A modern, secure financial web application built with React and TypeScript that provides real-time cryptocurrency prices, stock market updates, financial news, and comprehensive market insights.

## ✨ Features

### 🔐 Authentication & Security

- **Multi-Provider Authentication** - Email/password, Google, GitHub, and Twitter OAuth login via Supabase
- **Protected Routes** - Secure access control for all application features
- **Session Management** - Persistent login sessions with JWT tokens
- **User Profile Management** - Personalized user experience with settings
- **OAuth Provider Detection** - Security settings show which authentication method was used

### 📊 Financial Data

- **Real-time Cryptocurrency Prices** - Live updates from CoinGecko API
- **Stock Market Data** - Comprehensive stock information via Alpha Vantage
- **Financial News** - Latest market news and insights
- **Interactive Charts** - Beautiful data visualization with Recharts
- **Market Analytics** - Price trends, volume, and market cap data

### 🎨 User Experience

- **Dark/Light Mode** - Seamless theme switching
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Favorites System** - Save and track preferred assets
- **Smart Navigation** - Auto-scroll to top on page changes
- **Collapsible FAQs** - Interactive help sections
- **User Notifications** - Welcome messages and status updates

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd TradeLens
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Environment Variables (Optional)

Create a `.env` file for enhanced functionality:

```env
REACT_APP_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
REACT_APP_NEWS_API_KEY=your_news_api_key
```

### Supabase Authentication

The app uses Supabase for authentication. The configuration is already set up with:

- Email/password authentication
- Google OAuth integration
- GitHub OAuth integration
- Twitter OAuth integration
- Secure session management

## 🛠️ Technologies

### Frontend Stack

- **React 19** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing

### Authentication & Backend

- **Supabase** - Backend-as-a-Service with authentication
- **JWT Tokens** - Secure session management
- **OAuth 2.0** - Multi-provider authentication (Google, GitHub, Twitter)

### Data & APIs

- **CoinGecko API** - Cryptocurrency market data
- **Alpha Vantage API** - Stock market information
- **NewsAPI** - Financial news aggregation

### UI Components

- **Lucide React** - Beautiful icon library
- **Recharts** - Interactive chart components
- **Custom Components** - Tailored UI elements

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Main navigation
│   ├── UserProfile.tsx # User authentication UI
│   ├── SettingsModal.tsx # User settings
│   ├── ScrollToTop.tsx # Scroll functionality
│   └── ...
├── pages/              # Application pages
│   ├── Home.tsx        # Landing page
│   ├── Crypto.tsx      # Cryptocurrency data
│   ├── Stocks.tsx      # Stock market data
│   ├── News.tsx        # Financial news
│   ├── Pricing.tsx     # Pricing plans
│   └── ...
├── contexts/           # Global state management
│   ├── AuthContext.tsx # Authentication state
│   └── AppContext.tsx  # Application state
├── lib/                # External service configurations
│   └── supabase.ts     # Supabase client setup
└── types/              # TypeScript definitions
    └── index.ts        # Type definitions
```

## 🎯 Key Features

### Authentication System

- Secure login/signup with email validation
- Multi-provider OAuth integration (Google, GitHub, Twitter)
- Protected route access
- Persistent user sessions
- User profile management
- OAuth provider detection in security settings

### Financial Dashboard

- Real-time cryptocurrency tracking
- Stock market monitoring
- Interactive price charts
- Market news aggregation
- Favorites and watchlists

### User Interface

- Modern, clean design
- Responsive mobile layout
- Dark/light theme support
- Smooth animations
- Intuitive navigation

## 📱 Pages Overview

- **Home** - Welcome page with market overview
- **Crypto** - Cryptocurrency prices and charts
- **Stocks** - Stock market data and analysis
- **News** - Latest financial news and updates
- **Pricing** - Subscription plans and FAQs
- **Features** - Detailed feature descriptions
- **Documentation** - API documentation and guides

## 🔒 Security Features

- JWT-based authentication
- Protected routes and API endpoints
- Secure session management
- Multi-provider OAuth 2.0 integration (Google, GitHub, Twitter)
- OAuth provider detection and display
- Input validation and sanitization

## 🚀 Deployment

The application is ready for deployment on platforms like:

- Vercel
- Netlify
- AWS Amplify
- Heroku

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support or questions, please open an issue in the repository.

---

**TradeLens** - Built with ❤️ using React, TypeScript, and Supabase
