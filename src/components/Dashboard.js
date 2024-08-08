import React, { useState, useEffect } from 'react';
import { fetchEnvironmentalData, fetchRecipeData } from '../services/dataFetcher';
import { processEnvironmentalData, calculateRecipeBounds } from '../services/dataProcessor';
import { getCurrentPhase } from '../constants/recipePhases';
import EnvironmentalChart from './EnvironmentalChart';
import AIAnalysis from './AIAnalysis';

const Dashboard = () => {
  console.log("Dashboard component rendering");

  const [chartData, setChartData] = useState([]);
  const [recipeBounds, setRecipeBounds] = useState({
    temperature: { min: 0, max: 0 },
    humidity: { min: 0, max: 0 },
    co2: { min: 0, max: 0 },
    vpd: { min: 0, max: 0 },
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const dayOfFlowering = 38; // Example: Day 38 of flowering

  useEffect(() => {
    console.log("Dashboard useEffect running");
    const fetchData = async () => {
      try {
        console.log("Fetching environmental data...");
        const envData = await fetchEnvironmentalData();
        console.log("Environmental data fetched:", envData.slice(0, 2));

        console.log("Processing environmental data...");
        const processedData = processEnvironmentalData(envData);
        console.log("Processed data:", processedData.slice(0, 2));

        setChartData(processedData);

        console.log("Fetching recipe data...");
        const recipeData = await fetchRecipeData();
        console.log("Recipe data fetched:", recipeData.slice(0, 2));

        const currentPhase = getCurrentPhase(dayOfFlowering);
        console.log("Current phase:", currentPhase);

        const bounds = calculateRecipeBounds(recipeData, currentPhase);
        console.log("Calculated bounds:", bounds);

        setRecipeBounds(bounds);
        setLoading(false);
      } catch (error) {
        console.error("Error in fetchData:", error);
        setError("Failed to fetch data: " + error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [dayOfFlowering]);

  console.log("Current state - chartData:", chartData.length, "loading:", loading, "error:", error);

  if (loading) {
    return <div>Loading... Please check the console for debugging information.</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (chartData.length === 0) {
    return <div>No data available. Please check the console for debugging information.</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto font-sans">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Vervana Cultivation Management - Day {dayOfFlowering} of Flowering</h1>
        <img src="/api/placeholder/100/50" alt="Vervana logo" className="h-10" />
      </header>

      <h2 className="text-2xl font-bold mb-4">Environmental Controls - Last 24 Hours</h2>
      
      <EnvironmentalChart chartData={chartData} recipeBounds={recipeBounds} />
      <AIAnalysis chartData={chartData} recipeBounds={recipeBounds} />
    </div>
  );
};

export default Dashboard;