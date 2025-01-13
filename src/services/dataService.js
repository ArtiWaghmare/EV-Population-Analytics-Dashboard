// src/services/dataService.js
import axios from "axios";
import Papa from "papaparse";

const DATA_URL =
  "https://raw.githubusercontent.com/vedant-patil-mapup/analytics-dashboard-assessment/refs/heads/main/data-to-visualize/Electric_Vehicle_Population_Data.csv";

export const fetchEVData = async () => {
  try {
    const response = await axios.get(DATA_URL);
    const { data } = Papa.parse(response.data, {
      header: true,
      skipEmptyLines: true,
    });
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
