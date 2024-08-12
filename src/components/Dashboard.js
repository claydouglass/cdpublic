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

  useEffect(() => {
    const loadData = async () => {
      try {
        const envData = await fetchEnvironmentalData();
        const processedData = processEnvironmentalData(envData);

        setChartData(processedData);

        const stageData = detectStages(processedData, true);
        console.log('Detected stage data:', stageData);

        if (stageData.currentStage) {
          setCurrentStage(stageData.currentStage);
          setStageInfo(stageData.stageDescription);

          const recipeData = await fetchRecipeData();
          const bounds = calculateRecipeBounds(recipeData, stageData.currentStage);

          console.log('Calculated bounds:', bounds);

          setRecipeBounds(bounds);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [timeScale, selectedRoom]);

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'Overview':
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Environmental Controls - Last {timeScale}</h2>
            <p className="text-lg mb-2">It's {chartData.some(data => data.lightOn) ? 'daytime' : 'nighttime'}, {stageInfo}</p>
  
            <h2 className="text-xl font-bold mb-4 mt-8">VPD</h2>
            <MetricChart chartData={chartData} recipeBounds={recipeBounds} metric="vpd" />
  
            <h2 className="text-xl font-bold mb-4 mt-8">Temperature</h2>
            <MetricChart chartData={chartData} recipeBounds={recipeBounds} metric="temperature" />
  
            <h2 className="text-xl font-bold mb-4 mt-8">Humidity</h2>
            <MetricChart chartData={chartData} recipeBounds={recipeBounds} metric="humidity" />
  
            <h2 className="text-xl font-bold mb-4 mt-8">CO2</h2>
            <MetricChart chartData={chartData} recipeBounds={recipeBounds} metric="co2" />
  
            <AIAnalysis 
              chartData={chartData} 
              recipeBounds={recipeBounds} 
              currentStage={currentStage} 
              stageInfo={stageInfo}
            />
          </>
        );
      // Other cases here...
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
      {renderCurrentTab()}
    </div>
  );
};

export default Dashboard;