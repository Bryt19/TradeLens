import { useState, useEffect } from "react";
import { X, User, Mail, Shield, Bell, Palette } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useApp } from "../contexts/AppContext";
import Avatar from "./Avatar";
import AnimatedBackground from "./ui/animated-background";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { authState } = useAuth();
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !authState.user) return null;

  const user = authState.user;
  const displayName = user.user_metadata?.full_name || user.email.split("@")[0];

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ];

  const handleThemeToggle = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  const toggleFavoriteAddedNotif = () => {
    dispatch({
      type: "SET_NOTIFICATION_PREF",
      payload: {
        key: "favoriteAdded",
        value: !(state.notifications?.favoriteAdded ?? true),
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '35vh' }}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm sm:max-w-md md:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden mx-auto">
        {/* Mobile Header */}
        <div className="sm:hidden p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Settings
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row">
          {/* Sidebar - Hidden on mobile, shown on desktop */}
          <div className="hidden sm:block w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Settings
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <nav className="p-4 space-y-2">
              <AnimatedBackground
                defaultValue={activeTab}
                onValueChange={(id) => id && setActiveTab(id)}
                className="rounded-lg bg-blue-100 dark:bg-blue-900"
                transition={{
                  type: 'spring',
                  bounce: 0.2,
                  duration: 0.6,
                }}
                enableHover={false}
              >
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      data-id={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? "text-blue-700 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </AnimatedBackground>
            </nav>
          </div>

          {/* Mobile Tab Selector */}
          <div className="sm:hidden border-b border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto relative">
              <AnimatedBackground
                defaultValue={activeTab}
                onValueChange={(id) => id && setActiveTab(id)}
                className="rounded-t-lg bg-blue-100 dark:bg-blue-900"
                transition={{
                  type: 'spring',
                  bounce: 0.2,
                  duration: 0.6,
                }}
                enableHover={false}
              >
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      data-id={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors relative ${
                        activeTab === tab.id
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden xs:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </AnimatedBackground>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6">
              {activeTab === "profile" && (
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4">
                      Profile Information
                    </h3>

                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <Avatar
                          src={user.user_metadata?.avatar_url}
                          alt={displayName}
                          size="lg"
                          className="w-12 h-12 sm:w-16 sm:h-16"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {displayName}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            Profile picture from{" "}
                            {user.user_metadata?.avatar_url
                              ? "Google"
                              : "default"}
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email Address
                        </label>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-900 dark:text-white break-all">
                            {user.email}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          User ID
                        </label>
                        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-mono break-all">
                          {user.id}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "appearance" && (
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4">
                      Appearance Settings
                    </h3>

                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Theme
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            Choose your preferred color scheme
                          </p>
                        </div>
                        <button
                          onClick={handleThemeToggle}
                          className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors w-full sm:w-auto"
                        >
                          <Palette className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {state.theme === "light" ? "Light" : "Dark"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4">
                      Notification Preferences
                    </h3>

                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Favorite Added Notifications
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            Show a toast when you add a coin or stock to
                            favorites
                          </p>
                        </div>
                        <button
                          onClick={toggleFavoriteAddedNotif}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto ${
                            state.notifications?.favoriteAdded ?? true
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {state.notifications?.favoriteAdded ?? true
                            ? "On"
                            : "Off"}
                        </button>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Welcome Notifications
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            Show welcome message when you log in
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            Always enabled
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4">
                      Security Settings
                    </h3>

                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Authentication Method
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            How you signed in to TradeLens
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {user.user_metadata?.avatar_url
                              ? "Google OAuth"
                              : "Email/Password"}
                          </span>
                        </div>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 rounded-lg">
                        <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200">
                          Your account is secured with Supabase authentication.
                          All data is encrypted and protected.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
