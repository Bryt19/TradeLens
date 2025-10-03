import React from "react";
import { useFearAndGreedIndex } from "../hooks/useApi";
import Loading from "./Loading";

interface MarketSentimentGaugeProps {
  height?: number;
  className?: string;
}

const MarketSentimentGauge: React.FC<MarketSentimentGaugeProps> = ({
  height = 300,
  className = "",
}) => {
  const { data, loading, error } = useFearAndGreedIndex();

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg ${className}`}
        style={{ height }}
      >
        <Loading text="Loading market sentiment..." />
      </div>
    );
  }

  if (
    error ||
    !data?.data ||
    !Array.isArray(data.data) ||
    data.data.length === 0
  ) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg ${className}`}
        style={{ height }}
      >
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            Unable to load market sentiment
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Please try again later
          </p>
        </div>
      </div>
    );
  }

  const latestData = data.data[0];
  const value = parseInt(latestData.value);
  const label = latestData.value_classification;

  // Determine color based on value
  const getColor = (val: number) => {
    if (val <= 30) return "#EF4444"; // Red for Fear
    if (val <= 60) return "#F59E0B"; // Yellow for Neutral
    return "#10B981"; // Green for Greed
  };

  // Calculate the rotation angle for the gauge needle
  const rotation = (value / 100) * 180 - 90; // -90 to start from left side

  const gaugeColor = getColor(value);

  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md ${className}`}
      style={{ height }}
    >
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Market Sentiment
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Fear & Greed Index
        </p>
      </div>

      <div className="relative flex items-center justify-center">
        {/* Gauge Background */}
        <div className="relative w-48 h-24 overflow-hidden">
          {/* Background Arc */}
          <svg
            className="absolute top-0 left-0"
            width="192"
            height="96"
            viewBox="0 0 192 96"
          >
            {/* Gray background arc */}
            <path
              d="M 16 80 A 80 80 0 0 1 176 80"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="12"
              strokeLinecap="round"
              className="dark:stroke-gray-700"
            />

            {/* Colored arc based on value */}
            <path
              d="M 16 80 A 80 80 0 0 1 176 80"
              fill="none"
              stroke={gaugeColor}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${(value / 100) * 251.2} 251.2`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Needle */}
          <div
            className="absolute top-2 left-1/2 w-1 h-8 origin-bottom transition-transform duration-1000 ease-out"
            style={{
              transform: `translateX(-50%) rotate(${rotation}deg)`,
              transformOrigin: "50% 100%",
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{ backgroundColor: gaugeColor }}
            />
            {/* Needle point */}
            <div
              className="absolute top-0 left-1/2 w-0 h-0 border-l-2 border-r-2 border-b-4 transform -translate-x-1/2"
              style={{
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
                borderBottomColor: gaugeColor,
              }}
            />
          </div>

          {/* Center dot */}
          <div className="absolute top-10 left-1/2 w-4 h-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Value Display */}
        <div className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2">
          <div className="text-center">
            <div
              className="text-3xl font-bold mb-1"
              style={{ color: gaugeColor }}
            >
              {value}
            </div>
            <div
              className="text-sm font-medium px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${gaugeColor}20`,
                color: gaugeColor,
              }}
            >
              {label}
            </div>
          </div>
        </div>
      </div>

      {/* Scale Labels */}
      <div className="flex justify-between mt-4 px-4">
        <div className="text-left">
          <div className="text-xs text-gray-500 dark:text-gray-400">0</div>
          <div className="text-xs text-red-500 font-medium">Fear</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">50</div>
          <div className="text-xs text-yellow-500 font-medium">Neutral</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500 dark:text-gray-400">100</div>
          <div className="text-xs text-green-500 font-medium">Greed</div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-center mt-4">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Last updated:{" "}
          {new Date(latestData.timestamp * 1000).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default MarketSentimentGauge;
