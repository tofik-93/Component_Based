import React from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { formatCurrency } from "@salesflow/utils";

export interface AnalyticsCardProps {
  title: string;
  value: number;
  change?: number;
  format?: "currency" | "number" | "percentage";
  period?: string;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  change,
  format = "number",
  period = "this month",
}) => {
  const formatValue = (val: number) => {
    switch (format) {
      case "currency":
        return formatCurrency(val);
      case "percentage":
        return `${val}%`;
      default:
        return val.toLocaleString();
    }
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <p className="text-2xl font-semibold">{formatValue(value)}</p>
          {change !== undefined && (
            <p className={`text-sm ${getChangeColor(change)}`}>
              {change > 0 ? "+" : ""}
              {change}%
            </p>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">vs {period}</p>
      </CardContent>
    </Card>
  );
};
