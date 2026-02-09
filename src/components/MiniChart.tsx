import React from "react";

interface MiniChartProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

const MiniChart: React.FC<MiniChartProps> = ({
  data,
  width = 120,
  height = 40,
  color = "#3b82f6",
  className = "",
}) => {
  // Calculate min/max values
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const range = maxValue - minValue;

  // Create path points
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - minValue) / range) * (height * 0.8) - height * 0.1;
    return `${x},${y}`;
  });

  const pathData = `M${points.join(" L")}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
    >
      {/* Background grid lines (optional subtle) */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="100%" stopColor={color} stopOpacity={0.05} />
        </linearGradient>
      </defs>

      {/* Area under the line */}
      <path
        d={`${pathData} L${width},${height} L0,${height} Z`}
        fill="url(#gradient)"
        stroke="none"
      />

      {/* Line */}
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dots at data points */}
      {points.map((point, index) => {
        const [x, y] = point.split(",").map(Number);
        if (index === data.length - 1) {
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={2}
              fill={color}
              stroke={color}
              strokeWidth={1}
            />
          );
        }
        return null;
      })}
    </svg>
  );
};

export default MiniChart;