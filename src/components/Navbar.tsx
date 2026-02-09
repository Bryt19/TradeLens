import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Coins,
  BarChart3,
  Newspaper,
  Monitor,
  Menu,
  X,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import UserProfile from "./UserProfile";
import { useAuth } from "../contexts/AuthContext";
import { PillBase } from "./ui/3d-adaptive-navigation-bar";
import { ThemeToggle } from "./ui/theme-toggle";

const Navbar: React.FC = () => {
  const { state, dispatch } = useApp();
  const { authState } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Show navbar at the top of the page
          if (currentScrollY < 10) {
            setIsVisible(true);
          } 
          // Hide navbar when scrolling down, show when scrolling up
          else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY.current) {
            setIsVisible(true);
          }
          
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/", icon: TrendingUp },
    { name: "Crypto", href: "/crypto", icon: Coins },
    { name: "Stocks", href: "/stocks", icon: BarChart3 },
    { name: "Platforms", href: "/platforms", icon: Monitor },
    { name: "News", href: "/news", icon: Newspaper },
  ];

  // Navigation items for 3D pill (matching the navigation structure)
  const pillNavItems = navigation.map((item) => ({
    label: item.name,
    id: item.name.toLowerCase(),
    href: item.href,
  }));

  const handleThemeChange = (newTheme: "light" | "dark") => {
    if (newTheme !== state.theme) {
      dispatch({ type: "SET_THEME", payload: newTheme });
    }
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
    <nav 
      className={`sticky top-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-gray-200/80 dark:border-white/10 shadow-soft transition-transform duration-300 ease-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow duration-300">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                TradeLens
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - 3D Adaptive Pill */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <PillBase
              navItems={pillNavItems}
              theme={state.theme}
              onItemClick={(href) => {
                const item = navigation.find(nav => nav.href === href);
                const isProtected = item?.href !== "/"; // Home is not protected
                    if (isProtected) {
                  handleNavigation(href);
                    } else {
                  navigate(href);
                    }
                  }}
            />
          </div>

          {/* Theme Toggle, Auth, & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <ThemeToggle
              theme={state.theme}
              onThemeChange={handleThemeChange}
              className="backdrop-blur-sm"
            />

            {authState.user && <UserProfile />}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors backdrop-blur-sm"
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-300/50 dark:border-gray-700/50 bg-white/98 dark:bg-black/98 backdrop-blur-md">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isProtected = item.href !== "/"; // Home is not protected
                const classes = `flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${
                  isActive(item.href)
                    ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold"
                    : "text-gray-700 dark:text-gray-200"
                } ${
                  !authState.user && isProtected
                    ? "opacity-75 hover:opacity-100"
                    : "hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/80 dark:hover:bg-gray-700/80"
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
