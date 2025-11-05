import React, { useEffect, useState } from "react";

const ConnectionStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotification, setShowNotification] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (wasOffline) {
        setShowNotification(true);
        // Auto-hide after 2 seconds (YouTube style)
        const timer = setTimeout(() => {
          setShowNotification(false);
        }, 2000);
        return () => clearTimeout(timer);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
      setShowNotification(true);
    };

    // Set initial state
    if (!navigator.onLine) {
      setWasOffline(true);
      setShowNotification(true);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [wasOffline]);

  if (!showNotification) return null;

  return (
    <>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 pb-4">
        <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-lg px-4 py-3 shadow-lg animate-slide-up">
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
