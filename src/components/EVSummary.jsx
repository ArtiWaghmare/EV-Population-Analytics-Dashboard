// src/components/EVSummary.jsx
import React from "react";

const EVSummary = ({ data }) => {
  const totalEVs = data.length;
  const uniqueMakes = new Set(data.map((d) => d.Make)).size;
  const avgRange = (
    data.reduce((sum, d) => sum + parseInt(d["Electric Range"] || 0), 0) /
    totalEVs
  ).toFixed(2);

  return (
    <div className="summary">
      <h2>EV Summary</h2>
      <p>Total EVs: {totalEVs}</p>
      <p>Unique Makes: {uniqueMakes}</p>
      <p>Average Range: {avgRange} miles</p>
    </div>
  );
};

export default EVSummary;
