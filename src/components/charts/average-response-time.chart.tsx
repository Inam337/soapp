// Average Response Time Chart
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

const AvgResponseChart: FC = () => {
  const data = {
    labels: ["Thatta", "Jacobabad", "Kashmor", "Dadu", "UmerKot"],
    datasets: [
      {
        label: "Response Time (Days)",
        data: [1, 4, 100, 6, 8],
        backgroundColor: "rgb(16, 185, 129)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: "240px", width: "100%" }}>
      <Bar data={data} options={options} />
    </div>
  );
};
export default AvgResponseChart;
