import React, { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import { ChartDataPoint, CandlestickData } from "../types";
import { formatCurrency, formatDate, formatDateTime } from "../utils/helpers";

interface ChartProps {
  data: ChartDataPoint[] | CandlestickData[];
  type: "line" | "area" | "bar" | "candlestick";
  height?: number;
  color?: string;
  // When true, the chart color is derived from price trend (green up, red down)
  useTrendColor?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  xAxisKey?: string;
  yAxisKey?: string;
  dataKey?: string;
  name?: string;
  // Interpolation type for smooth curves
  curveType?:
    | "linear"
    | "monotone"
    | "monotoneX"
    | "monotoneY"
    | "natural"
    | "step"
    | "stepAfter"
    | "stepBefore"
    | "basis"
    | "basisClosed"
    | "basisOpen"
    | "catmullRom"
    | "catmullRomClosed"
    | "catmullRomOpen";
}

const Chart: React.FC<ChartProps> = ({
  data,
  type,
  height = 300,
  color = "#3B82F6",
  useTrendColor = true,
  showGrid = false,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  xAxisKey = "timestamp",
  yAxisKey = "value",
  dataKey = "value",
  name = "Price",
  curveType = "monotoneX",
}) => {
  // Format data for different chart types
  const formatData = (data: ChartDataPoint[] | CandlestickData[]) => {
    return data.map((item, index) => ({
      ...item,
      formattedTime: formatDate(new Date(item.timestamp).toISOString()),
      index,
    }));
  };

  const formattedData = formatData(data);

  // Determine trend (up/down) to set dynamic color similar to pro trading charts
  const trendUp = useMemo(() => {
    if (!formattedData || formattedData.length < 2) return true;
    const first =
      (formattedData[0] as any)[dataKey] ?? (formattedData[0] as any)[yAxisKey];
    const last =
      (formattedData[formattedData.length - 1] as any)[dataKey] ??
      (formattedData[formattedData.length - 1] as any)[yAxisKey];
    return Number(last) >= Number(first);
  }, [formattedData, dataKey, yAxisKey]);

  // Professional green/red palette
  const upColor = "#10B981"; // emerald-500
  const downColor = "#EF4444"; // red-500
  const chartColor = useTrendColor ? (trendUp ? upColor : downColor) : color;

  // Detect dark mode (Binance-like dark theme)
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark") ||
        (window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      : false
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => setIsDark(e.matches);
    media.addEventListener("change", listener);

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      media.removeEventListener("change", listener);
      observer.disconnect();
    };
  }, []);

  const colors = {
    axisText: isDark ? "#9CA3AF" : "#6B7280",
    axisLine: isDark ? "rgba(255,255,255,0.12)" : "#E5E7EB",
    grid: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
    tooltipBg: isDark ? "bg-gray-800" : "bg-white",
    tooltipBorder: isDark ? "border-gray-700" : "border-gray-200",
    textPrimary: isDark ? "text-white" : "text-gray-900",
    textSecondary: isDark ? "text-gray-300" : "text-gray-600",
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          className={`p-3 border rounded-lg shadow-lg ${colors.tooltipBg} ${colors.tooltipBorder}`}
        >
          <p className={`text-sm ${colors.textSecondary}`}>
            {formatDateTime(new Date(data.timestamp).toISOString())}
          </p>
          <p className={`text-sm font-medium ${colors.textPrimary}`}>
            {name}: {formatCurrency(data[dataKey] ?? data.value)}
          </p>
          {data.volume && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Volume: {data.volume.toLocaleString()}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Custom X-axis tick formatter
  const formatXAxisTick = (tickItem: any) => {
    const date = new Date(tickItem);
    if (!formattedData?.length) return date.toLocaleDateString("en-US");
    const start = new Date(formattedData[0].timestamp);
    const end = new Date(formattedData[formattedData.length - 1].timestamp);
    const spanMs = end.getTime() - start.getTime();
    const twoDaysMs = 2 * 24 * 60 * 60 * 1000;
    if (spanMs < twoDaysMs) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Custom Y-axis tick formatter
  const formatYAxisTick = (tickItem: number) => {
    return formatCurrency(tickItem);
  };

  const commonProps = {
    data: formattedData,
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
  };

  const axisProps = {
    xAxis: showXAxis ? (
      <XAxis
        dataKey={xAxisKey}
        tickFormatter={formatXAxisTick}
        tick={{ fontSize: 12, fill: colors.axisText }}
        axisLine={{ stroke: colors.axisLine }}
        tickLine={{ stroke: colors.axisLine }}
        tickMargin={8}
      />
    ) : null,
    yAxis: showYAxis ? (
      <YAxis
        tickFormatter={formatYAxisTick}
        tick={{ fontSize: 12, fill: colors.axisText }}
        axisLine={{ stroke: colors.axisLine }}
        tickLine={{ stroke: colors.axisLine }}
        dataKey={yAxisKey}
        domain={["dataMin", "dataMax"]}
        allowDecimals
      />
    ) : null,
  };

  const grid = showGrid ? (
    <CartesianGrid
      strokeDasharray="3 3"
      stroke={colors.grid}
      vertical={true}
      horizontal={true}
    />
  ) : null;

  const tooltip = showTooltip ? (
    <Tooltip content={<CustomTooltip />} cursor={{ stroke: colors.axisLine }} />
  ) : null;

  // Unique gradient ID to avoid invalid IDs from hex color values
  const gradientId = useMemo(
    () => `gradient-${Math.random().toString(36).slice(2)}`,
    []
  );

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart {...commonProps}>
            {grid}
            {axisProps.xAxis}
            {axisProps.yAxis}
            {tooltip}
            <Line
              type={curveType as any}
              dataKey={dataKey}
              stroke={chartColor}
              strokeWidth={2.25}
              dot={false}
              activeDot={{ r: 3.5, fill: chartColor }}
              isAnimationActive={true}
              animationDuration={450}
              animationEasing="ease-in-out"
              animationId={
                (formattedData[formattedData.length - 1] as any)?.timestamp ??
                formattedData.length
              }
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </LineChart>
        );

      case "area":
        return (
          <AreaChart {...commonProps}>
            {grid}
            {axisProps.xAxis}
            {axisProps.yAxis}
            {tooltip}
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColor} stopOpacity={0.32} />
                <stop offset="60%" stopColor={chartColor} stopOpacity={0.12} />
                <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type={curveType as any}
              dataKey={dataKey}
              stroke={chartColor}
              fill={`url(#${gradientId})`}
              strokeWidth={2.25}
              isAnimationActive={true}
              animationDuration={500}
              animationEasing="ease-in-out"
              animationId={
                (formattedData[formattedData.length - 1] as any)?.timestamp ??
                formattedData.length
              }
              dot={false}
              activeDot={{ r: 3, fill: chartColor }}
            />
          </AreaChart>
        );

      case "bar":
        return (
          <BarChart {...commonProps}>
            {grid}
            {axisProps.xAxis}
            {axisProps.yAxis}
            {tooltip}
            <Bar
              dataKey={dataKey}
              fill={color}
              isAnimationActive
              animationDuration={500}
            />
          </BarChart>
        );

      case "candlestick":
        // For candlestick charts, we'll use a simple line chart for now
        // A proper candlestick implementation would require a specialized library
        return (
          <LineChart {...commonProps}>
            {grid}
            {axisProps.xAxis}
            {axisProps.yAxis}
            {tooltip}
            <Line
              type={curveType as any}
              dataKey="close"
              stroke={chartColor}
              strokeWidth={2.25}
              dot={false}
              activeDot={{ r: 3.5, fill: chartColor }}
              isAnimationActive={true}
              animationDuration={450}
              animationEasing="ease-in-out"
              animationId={
                (formattedData[formattedData.length - 1] as any)?.timestamp ??
                formattedData.length
              }
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </LineChart>
        );

      default:
        return (
          <LineChart {...commonProps}>
            {grid}
            {axisProps.xAxis}
            {axisProps.yAxis}
            {tooltip}
            <Line
              type={curveType as any}
              dataKey={dataKey}
              stroke={chartColor}
              strokeWidth={2.25}
              dot={false}
              activeDot={{ r: 3.5, fill: chartColor }}
              isAnimationActive={true}
              animationDuration={450}
              animationEasing="ease-in-out"
              animationId={
                (formattedData[formattedData.length - 1] as any)?.timestamp ??
                formattedData.length
              }
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </LineChart>
        );
    }
  };

  if (!data || data.length === 0) {
    return (
      <div
        className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg"
        style={{ height }}
      >
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
