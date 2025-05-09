// Stats by District Chart
import React, { FC, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

const DistrictStatsChart: FC = () => {
  const data = {
    labels: [
      "Hyderabad",
      "Sukkur",
      "Larkana",
      "Nawabshah",
      "Mirpurkhas",
      "Thatta",
      "Badin",
      "Tharparkar",
      "Karachi",
      "Shikarpur",
    ],
    datasets: [
      {
        label: "Resolve",
        data: [40, 35, 60, 50, 70, 55, 45, 30, 65, 50],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.5)",
        fill: true,
      },
      {
        label: "New",
        data: [20, 25, 50, 30, 40, 35, 25, 20, 55, 30],
        borderColor: "rgb(234, 179, 8)",
        backgroundColor: "rgba(234, 179, 8, 0.5)",
        fill: true,
      },
    ],
  };
  return <Line data={data} />;
};

// Date Range Dropdown
const DateRange: FC = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">Date Range ▼</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>This Week</DropdownMenuItem>
      <DropdownMenuItem>This Month</DropdownMenuItem>
      <DropdownMenuItem>Last Month</DropdownMenuItem>
      <DropdownMenuItem>Custom Range</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
export default DistrictStatsChart;
