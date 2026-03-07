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
      className={`sticky top-0 z-[999] bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-gray-200/80 dark:border-white/10 shadow-soft transition-transform duration-200 ease-out ${
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
            <div className="mx-2 mb-4 p-2 bg-white/95 dark:bg-black/95 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="grid grid-cols-1 gap-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isProtected = item.href !== "/";
                  const active = isActive(item.href);
                  
                  return (
                    <div
                      key={item.name}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        if (isProtected) {
                          handleNavigation(item.href);
                        } else {
                          navigate(item.href);
                        }
                      }}
                      className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                        active
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${active ? "bg-blue-500/20" : "bg-gray-100 dark:bg-white/5"}`}>
                        <Icon className="w-3 h-3" />
                      </div>
                      <span className="flex-1">{item.name}</span>
                      {active && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-glow-sm" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
