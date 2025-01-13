// src/pages/Dashboard.jsx
import React from "react";
import EVSummary from "../components/EVSummary";
import BarChart from "../components/Charts/BarChart";
import PieChart from "../components/Charts/PieChart";
import EVMap from "../components/Map/EVMap";

const Dashboard = ({ data }) => {
  return (
    <div>
      <EVSummary data={data} />
      <div className="charts">
        <BarChart data={data} />
        <PieChart data={data} />
      </div>
      <EVMap data={data} />
    </div>
  );
};

export default Dashboard;
