import React, { useEffect, useState, useRef } from "react";

const ConnectionStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotification, setShowNotification] = useState(false);
  const wasOfflineRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Only show "online" notification if we were previously offline
      if (wasOfflineRef.current) {
        setShowNotification(true);
        // Auto-hide after 2 seconds (YouTube style)
        timeoutRef.current = setTimeout(() => {
          setShowNotification(false);
          wasOfflineRef.current = false;
        }, 2000);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      wasOfflineRef.current = true;
      // Show notification immediately when going offline
      setShowNotification(true);
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    // Set initial state - show immediately if offline on page load
    if (!navigator.onLine) {
      wasOfflineRef.current = true;
      setShowNotification(true);
    }

    // Add event listeners for immediate detection
    window.addEventListener("online", handleOnline, false);
    window.addEventListener("offline", handleOffline, false);

    return () => {
      window.removeEventListener("online", handleOnline, false);
      window.removeEventListener("offline", handleOffline, false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []); // Empty dependency array - set up once

  if (!showNotification) return null;

  return (
    <>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 pb-4">
        <div
          className={`${
            isOnline
              ? "bg-green-600 dark:bg-green-700"
              : "bg-gray-900 dark:bg-gray-800"
          } text-white rounded-lg px-4 py-3 shadow-lg animate-slide-up`}
        >
          <p className="text-sm text-center">
            {isOnline ? "You're online" : "You're offline"}
          </p>
        </div>
      </div>
      <style>{`
        @keyframes slide-up {
          from {
            transform: translate(-50%, 100%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.25s ease-out;
        }
      `}</style>
    </>
  );
};

export default ConnectionStatus;
