import React, { useState, useEffect } from 'react';
import Header from './Header';
import Tabs from './Tabs';
import MetricChart from './MetricChart';
import AIAnalysis from './AIAnalysis';
import { fetchEnvironmentalData, fetchRecipeData } from '../services/dataFetcher';
import { processEnvironmentalData, detectStages, calculateRecipeBounds } from '../services/dataProcessor';

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState('Overview');
  const [timeScale, setTimeScale] = useState('24h');
  const [selectedRoom, setSelectedRoom] = useState('Room 102');
  const [selectedStrain, setSelectedStrain] = useState('Kandy Terpz');
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
  const [currentStage, setCurrentStage] = useState(null);
  const [stageInfo, setStageInfo] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setError(null); // Clear any previous errors
        console.log('Fetching environmental data...');
        const envData = await fetchEnvironmentalData(selectedRoom, timeScale);
        console.log('Received environmental data:', envData);

        console.log('Processing environmental data...');
        const processedData = processEnvironmentalData(envData);
        console.log('Processed data:', processedData);

        setChartData(processedData);

        console.log('Detecting stages...');
        const stageData = detectStages(processedData, true);
        console.log('Detected stage data:', stageData);

        if (stageData.currentStage) {
          setCurrentStage(stageData.currentStage);
          setStageInfo(stageData.stageDescription);

          console.log('Fetching recipe data...');
          const recipeData = await fetchRecipeData(selectedStrain);
          console.log('Received recipe data:', recipeData);

          console.log('Calculating recipe bounds...');
          const bounds = calculateRecipeBounds(recipeData, stageData.currentStage);
          console.log('Calculated bounds:', bounds);

          if (!bounds.day || !bounds.night) {
            console.error('Error: Calculated bounds are missing!');
            setError('Failed to calculate recipe bounds. Please check the recipe data.');
          } else {
            setRecipeBounds(bounds);
          }
        } else {
          setError('Failed to detect current growth stage. Please check the environmental data.');
        }
      } catch (error) {
        console.error("Error loading data:", error);
        setError(`Failed to load data: ${error.message}. Please try again later.`);
      }
    };

    loadData();
  }, [timeScale, selectedRoom, selectedStrain]);

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'Overview':
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Environmental Controls - Last {timeScale}</h2>
            <p className="text-lg mb-2">It's {chartData.some(data => data.lightOn) ? 'daytime' : 'nighttime'}, {stageInfo}</p>

            {['vpd', 'temperature', 'humidity', 'co2'].map((metric) => (
              <div key={metric}>
                <h2 className="text-xl font-bold mb-4 mt-8">{metric.toUpperCase()}</h2>
                <MetricChart 
                  chartData={chartData} 
                  recipeBounds={recipeBounds} 
                  metric={metric} 
                />
              </div>
            ))}

            <AIAnalysis 
              chartData={chartData} 
              recipeBounds={recipeBounds} 
              currentStage={currentStage} 
              stageInfo={stageInfo}
            />
          </>
        );
      // Add cases for other tabs as needed
      default:
        return null;
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto font-sans">
      <Header
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        selectedStrain={selectedStrain}
        setSelectedStrain={setSelectedStrain}
        timeScale={timeScale}
        setTimeScale={setTimeScale}
      />
      <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {error && <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
      {renderCurrentTab()}
    </div>
  );
};

export default Dashboard;