// src/components/Charts/BarChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data }) => {
  const makeCounts = data.reduce((acc, item) => {
    acc[item.Make] = (acc[item.Make] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(makeCounts),
    datasets: [
      {
        label: "Number of EVs",
        data: Object.values(makeCounts),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BarChart;
