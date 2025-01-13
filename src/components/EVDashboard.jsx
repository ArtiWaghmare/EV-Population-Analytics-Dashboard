import React, { useState, useEffect } from "react";
import "./Data.css"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts";

const Card = ({ children, title }) => (
  <div className="bg-white rounded-lg shadow-lg p-4">
    {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
    {children}
  </div>
);

const EVDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];


  const parseCSV = (csvString) => {
    const lines = csvString.trim().split("\n");
    const headers = lines[0]
      .split(",")
      .map((header) => header.trim().replace(/["\s]/g, "_"));

    return lines.slice(1).map((line) => {
      const values = line
        .split(",")
        .map((value) => value.trim().replace(/"/g, ""));
      return headers.reduce((obj, header, index) => {
    
        let value = values[index];
        if (
          header === "Model_Year" ||
          header === "Electric_Range" ||
          header === "Base_MSRP"
        ) {
          value = parseFloat(value) || 0;
        }
        obj[header] = value;
        return obj;
      }, {});
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/vedant-patil-mapup/analytics-dashboard-assessment/refs/heads/main/data-to-visualize/Electric_Vehicle_Population_Data.csv"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const csvText = await response.text();
        const parsedData = parseCSV(csvText);
        setData(parsedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 
  const getMakeDistribution = () => {
    const distribution = {};
    data.forEach((vehicle) => {
      distribution[vehicle.Make] = (distribution[vehicle.Make] || 0) + 1;
    });
    return Object.entries(distribution).map(([make, count]) => ({
      name: make,
      value: count,
    }));
  };

  const getYearlyTrend = () => {
    const trend = {};
    data.forEach((vehicle) => {
      trend[vehicle.Model_Year] = (trend[vehicle.Model_Year] || 0) + 1;
    });
    return Object.entries(trend)
      .map(([year, count]) => ({
        year: parseInt(year),
        count,
      }))
      .sort((a, b) => a.year - b.year);
  };

  const getAverageRange = () => {
    const rangeByMake = {};
    const countByMake = {};

    data.forEach((vehicle) => {
      if (!rangeByMake[vehicle.Make]) {
        rangeByMake[vehicle.Make] = 0;
        countByMake[vehicle.Make] = 0;
      }
      rangeByMake[vehicle.Make] += vehicle.Electric_Range;
      countByMake[vehicle.Make]++;
    });

    return Object.entries(rangeByMake).map(([make, totalRange]) => ({
      make,
      averageRange: totalRange / countByMake[make],
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-600">Error loading data: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen ">
      <h3 className="heading font-bold mb-6 ">
        EV Population Analytics Dashboard
      </h3>

      <div className="grid grid-cols md:grid-cols-2 gap-6 cards-content">
       
        <div title="Key Statistics ">
          <div className="key-style" style={{display:"flex",gap:"80px",textAlign:"center" }}>
            <Card className="p-4 bg-blue-100 rounded-lg flex">
              <h3 className="font-semibold">Total EVs</h3>
              <p className="text-xl">{data.length}</p>
            </Card>
            <Card className="p-4 bg-green-100 rounded-lg flex-1">
              <h3 className="font-semibold">Average Range</h3>
              <p className="text-xl">
                {Math.round(
                  data.reduce((acc, curr) => acc + curr.Electric_Range, 0) /
                    data.length
                )}
                <span className="text-sm"> mi</span>
              </p>
            </Card>
            <Card className="p-4 bg-yellow-100 rounded-lg flex-1">
              <h3 className="font-semibold">Most Common Make</h3>
              <p className="text-xl">
                {
                  getMakeDistribution().sort((a, b) => b.value - a.value)[0]
                    ?.name
                }
              </p>
            </Card>
            <Card className="p-4 bg-purple-100 rounded-lg border flex-1">
              <h3 className="font-semibold">Latest Year</h3>
              <p className="text-2xl">
                {Math.max(...data.map((v) => v.Model_Year))}
              </p>
            </Card>
          </div>
        </div>

        <div className="card-two ">  
            
            <Card title="EV Manufacturer Distribution" className="card Distribution">
          <PieChart width={500} height={300}>
            <Pie
              data={getMakeDistribution()}
              cx={250}
              cy={150} 
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {getMakeDistribution().map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Card>

        <Card title="EV Adoption Trend" className=" card EV-Adoption-Trend">
          <LineChart width={650} height={300} data={getYearlyTrend()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </Card></div>

        <Card title="Average Range by Manufacturer" className=" Manufacturer">
       
          <BarChart
            width={1300}
            height={400}
            data={getAverageRange()}
            barSize={20}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="make" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="averageRange" fill="#82ca9d" />
          </BarChart>
        
        </Card>
      </div>
    </div>
  );
};

export default EVDashboard;
