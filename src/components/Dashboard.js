import React, { useState } from 'react';
import Header from './Header';
import Tabs from './Tabs';
import EnvironmentalChart from './EnvironmentalChart';
import AIAnalysis from './AIAnalysis';

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState('Overview');
  const [timeScale, setTimeScale] = useState('24h');
  const [selectedRoom, setSelectedRoom] = useState('Room 1');
  const [selectedStrain, setSelectedStrain] = useState('Papaya Terpz');

  const chartData = [];
  const recipeBounds = {
    temperature: { min: 20, max: 30 },
    humidity: { min: 40, max: 60 },
    co2: { min: 800, max: 1500 },
    vpd: { min: 0.8, max: 1.2 },
  };

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