import React, { FC } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactElement;
  trend?: string;
  trendValue?: string;
  trendDirection?: "up" | "down" | "neutral";
  className?: string;
  iconContainerClassName?: string;
  contentClassName?: string;
}

const StatsCard: FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend = "+12% Since last month",
  trendDirection = "up",
  className,
  iconContainerClassName,
  contentClassName,
}) => {
  // Determine trend color based on direction
  const trendColor = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-gray-600",
  }[trendDirection];

  return (
    <Card
      className={cn(
        "flex items-start flex-row justify-between p-4 rounded-xl shadow-sm",
        className
      )}
    >
      <div className={cn("h-30", contentClassName)}>
        <p className="text-gray-600">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        {trend && <p className={cn("text-sm mt-4", trendColor)}>{trend}</p>}
      </div>
      <div
        className={cn(
          "bg-green-50 rounded p-1 w-10 h-10 justify-center items-center flex",
          iconContainerClassName
        )}
      >
        {icon}
      </div>
    </Card>
  );
};

export default StatsCard;
