// Average Response Time Chart
import React, { FC } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

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
