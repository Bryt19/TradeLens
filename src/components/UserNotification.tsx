import React, { useState, useEffect, useRef } from "react";
import { User, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import Avatar from "./Avatar";

const UserNotification: React.FC = () => {
  const { authState } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const previousUserRef = useRef<string | null>(null);

  useEffect(() => {
    // Show notification only when user logs in (not on page refresh or initial load)
    if (authState.user && !isDismissed) {
      const currentUserId = authState.user.id;

      // Check if this is a new login (user changed from null/undefined to a user)
      if (
        previousUserRef.current !== currentUserId &&
        previousUserRef.current !== null
      ) {
        setIsVisible(true);
        // Auto-hide after 2.5 seconds
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 2500);
        return () => clearTimeout(timer);
      }

      // Update the previous user reference
      previousUserRef.current = currentUserId;
    } else if (!authState.user) {
      // Reset when user logs out
      previousUserRef.current = null;
      setIsDismissed(false);
    }
  }, [authState.user, isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (!authState.user || !isVisible) return null;

  const user = authState.user;
  const displayName = user.user_metadata?.full_name || user.email.split("@")[0];

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-sm">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Avatar
              src={user.user_metadata?.avatar_url}
              alt={displayName}
              size="sm"
            />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Welcome back, {displayName}!
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Ready to explore your financial dashboard?
            </p>
          </div>

          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserNotification;
