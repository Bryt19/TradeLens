import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Coins,
  BarChart3,
  Newspaper,
  Monitor,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import UserProfile from "./UserProfile";
import { useAuth } from "../contexts/AuthContext";

const Navbar: React.FC = () => {
  const { state, dispatch } = useApp();
  const { authState } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigation = [
    { name: "Home", href: "/", icon: TrendingUp },
    { name: "Crypto", href: "/crypto", icon: Coins },
    { name: "Stocks", href: "/stocks", icon: BarChart3 },
    { name: "Platforms", href: "/platforms", icon: Monitor },
    { name: "News", href: "/news", icon: Newspaper },
  ];

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigation = (href: string) => {
    if (!authState.user) {
      // Redirect to login with the intended destination
      navigate("/login", { state: { from: { pathname: href } } });
    } else {
      navigate(href);
    }
  };

  return (
    <nav className="bg-white dark:bg-black shadow-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                TradeLens
              </span>
            </Link>
          </div>

          {/* Desktop Navigation (disabled when logged out) */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isProtected = item.href !== "/"; // Home is not protected
              const content = (
                <div
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    isActive(item.href)
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "text-gray-600 dark:text-gray-300"
                  } ${
                    !authState.user && isProtected
                      ? "opacity-75 hover:opacity-100"
                      : "hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  title={
                    !authState.user && isProtected
                      ? "Click to sign in"
                      : undefined
                  }
                  onClick={() => {
                    if (isProtected) {
                      handleNavigation(item.href);
                    } else {
                      navigate(item.href);
                    }
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
              );

              return <div key={item.name}>{content}</div>;
            })}
          </div>

          {/* Theme Toggle, Auth, & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {state.theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {authState.user ? (
              <UserProfile />
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isProtected = item.href !== "/"; // Home is not protected
                const classes = `flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${
                  isActive(item.href)
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-300"
                } ${
                  !authState.user && isProtected
                    ? "opacity-75 hover:opacity-100"
                    : "hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }`;

                return (
                  <div
                    key={item.name}
                    className={classes}
                    title={
                      !authState.user && isProtected
                        ? "Click to sign in"
                        : undefined
                    }
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (isProtected) {
                        handleNavigation(item.href);
                      } else {
                        navigate(item.href);
                      }
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
