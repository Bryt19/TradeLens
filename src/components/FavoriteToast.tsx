import React, { useEffect, useState } from "react";
import { CheckCircle, Star } from "lucide-react";
import { useApp } from "../contexts/AppContext";

const FavoriteToast: React.FC = () => {
  const { state } = useApp();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handler = (e: Event) => {
      if (!(state.notifications?.favoriteAdded ?? true)) return;
      const event = e as CustomEvent<{ type: "crypto" | "stock"; id: string }>;
      const kind = event.detail.type === "crypto" ? "coin" : "stock";
      setMessage(`Added ${kind} to favorites`);
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 2500);
      return () => clearTimeout(t);
    };

    window.addEventListener("favorite:add", handler as EventListener);
    return () =>
      window.removeEventListener("favorite:add", handler as EventListener);
  }, [state.notifications?.favoriteAdded]);

  if (!visible) return null;

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="flex items-start space-x-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-3">
        <div className="text-green-600 dark:text-green-400">
          <CheckCircle className="w-5 h-5" />
        </div>
        <div className="text-sm">
          <p className="text-gray-900 dark:text-white font-medium flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{message}</span>
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            You can turn this off in Settings → Notifications
          </p>
        </div>
      </div>
    </div>
  );
};

export default FavoriteToast;
