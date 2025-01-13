// src/components/Charts/PieChart.jsx
import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ data }) => {
  const typeCounts = data.reduce((acc, item) => {
    acc[item["Electric Vehicle Type"]] =
      (acc[item["Electric Vehicle Type"]] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(typeCounts),
    datasets: [
      {
        data: Object.values(typeCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
