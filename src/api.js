import axios from 'axios';

// Example API fetch (you can replace the URL with your actual API endpoint)
export const fetchEVData = async () => {
    try {
        const response = await axios.get("https://raw.githubusercontent.com/vedant-patil-mapup/analytics-dashboard-assessment/refs/heads/main/data-to-visualize/Electric_Vehicle_Population_Data.csv"
        ); // Use your API endpoint
        return response.data;
            
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};
