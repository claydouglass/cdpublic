import React, { useState, useEffect } from 'react';
import Header from './Header';
import Tabs from './Tabs';
import EnvironmentalChart from './EnvironmentalChart';
import AIAnalysis from './AIAnalysis';
import { fetchEnvironmentalData, fetchRecipeData } from '../services/dataFetcher';
import { processEnvironmentalData, calculateRecipeBounds } from '../services/dataProcessor';
import { batches } from '../data/batchData';
import { calculateCurrentPhase } from '../utils/phaseCalculator';
import { updateBatchPhase } from '../utils/floweringDetector';

// Usage in your component...

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState('Overview');
  const [timeScale, setTimeScale] = useState('24h');
  const [selectedBatchId, setSelectedBatchId] = useState(1);
  const [chartData, setChartData] = useState([]);
  const [recipeBounds, setRecipeBounds] = useState({
    day: {
      temperature: { min: 20, max: 30 },
      humidity: { min: 40, max: 60 },
      co2: { min: 800, max: 1500 },
      vpd: { min: 0.8, max: 1.2 },
    },
    night: {
      temperature: { min: 20, max: 30 },
      humidity: { min: 40, max: 60 },
      co2: { min: 800, max: 1500 },
      vpd: { min: 0.8, max: 1.2 },
    },
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [lightHours, setLightHours] = useState(18); // Default to veg cycle

  const selectedBatch = batches.find(batch => batch.id === selectedBatchId);
  const currentPhase = calculateCurrentPhase(selectedBatch, currentDate);

  useEffect(() => {
    const loadData = async () => {
      try {
        const envData = await fetchEnvironmentalData();
        const processedData = processEnvironmentalData(envData);
        setChartData(processedData);

        const recipeData = await fetchRecipeData();
        const bounds = calculateRecipeBounds(recipeData, currentPhase);
        setRecipeBounds(bounds);

        if (selectedBatch) {
          updateBatchPhase(selectedBatch, currentDate, lightHours);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, [timeScale, selectedBatchId, currentDate, lightHours]);

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'Overview':
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Environmental Controls - Last {timeScale}</h2>
            <EnvironmentalChart chartData={chartData} recipeBounds={recipeBounds} />
            <AIAnalysis chartData={chartData} recipeBounds={recipeBounds} />
          </>
        );
      case 'Environmental':
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Environmental Controls</h2>
            <EnvironmentalChart chartData={chartData} recipeBounds={recipeBounds} />
            <AIAnalysis chartData={chartData} recipeBounds={recipeBounds} />
          </>
        );
      case 'Nutrients':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Nutrients</h2>
            {/* Nutrient chart logic */}
          </div>
        );
      case 'Analysis':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Analysis</h2>
            {/* Analysis chart logic */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto font-sans">
      <Header
        selectedBatch={selectedBatch}
        setSelectedBatchId={setSelectedBatchId}
        timeScale={timeScale}
        setTimeScale={setTimeScale}
        currentPhase={currentPhase}
      />
      <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="mb-4">
        <label htmlFor="lightHours" className="mr-2">Light Hours:</label>
        <input
          type="number"
          id="lightHours"
          value={lightHours}
          onChange={(e) => setLightHours(Number(e.target.value))}
          min="0"
          max="24"
          className="border rounded px-2 py-1"
        />
        <label htmlFor="currentDate" className="ml-4 mr-2">Current Date:</label>
        <input
          type="date"
          id="currentDate"
          value={currentDate.toISOString().split('T')[0]}
          onChange={(e) => setCurrentDate(new Date(e.target.value))}
          className="border rounded px-2 py-1"
        />
      </div>
      {renderCurrentTab()}
    </div>
  );
};

export default Dashboard;