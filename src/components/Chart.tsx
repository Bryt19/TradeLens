import React from "react";
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
import { formatCurrency, formatDate } from "../utils/helpers";

interface ChartProps {
  data: ChartDataPoint[] | CandlestickData[];
  type: "line" | "area" | "bar" | "candlestick";
  height?: number;
  color?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  xAxisKey?: string;
  yAxisKey?: string;
  dataKey?: string;
  name?: string;
}

const Chart: React.FC<ChartProps> = ({
  data,
  type,
  height = 300,
  color = "#3B82F6",
  showGrid = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  xAxisKey = "timestamp",
  yAxisKey = "value",
  dataKey = "value",
  name = "Price",
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

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {data.formattedTime || label}
          </p>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {name}: {formatCurrency(data[dataKey] || data.value)}
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
        tick={{ fontSize: 12, fill: "#6B7280" }}
        axisLine={{ stroke: "#E5E7EB" }}
        tickLine={{ stroke: "#E5E7EB" }}
      />
    ) : null,
    yAxis: showYAxis ? (
      <YAxis
        tickFormatter={formatYAxisTick}
        tick={{ fontSize: 12, fill: "#6B7280" }}
        axisLine={{ stroke: "#E5E7EB" }}
        tickLine={{ stroke: "#E5E7EB" }}
      />
    ) : null,
  };

  const grid = showGrid ? (
    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
  ) : null;

  const tooltip = showTooltip ? <Tooltip content={<CustomTooltip />} /> : null;

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
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: color }}
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
              <linearGradient
                id={`gradient-${color}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              fill={`url(#gradient-${color})`}
              strokeWidth={2}
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
            <Bar dataKey={dataKey} fill={color} />
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
              type="monotone"
              dataKey="close"
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: color }}
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
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: color }}
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
