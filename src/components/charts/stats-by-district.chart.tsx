// Stats by District Chart
import React, { FC } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

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
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgb(16, 185, 129)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
      {
        label: "New",
        data: [20, 25, 50, 30, 40, 35, 25, 20, 55, 30],
        borderColor: "rgb(234, 179, 8)",
        backgroundColor: "rgba(234, 179, 8, 0.5)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgb(234, 179, 8)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    layout: {
      padding: {
        top: 10,
        right: 20,
        bottom: 10,
        left: 20,
      },
    },
    elements: {
      line: {
        borderJoinStyle: "round" as const,
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          boxWidth: 6,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default DistrictStatsChart;
