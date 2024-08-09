import React from 'react';
import RoomSelector from './RoomSelector';
import StrainSelector from './StrainSelector';
import TimeScaleSelector from './TimeScaleSelector';

const Header = ({ selectedRoom, setSelectedRoom, selectedStrain, setSelectedStrain, timeScale, setTimeScale }) => {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center">
      <img src="/cdpublic/vervana_logo.png" alt="Vervana logo" className="h-10" />        <h1 className="text-3xl font-bold text-teal-600">Cultivate</h1>
      </div>
      <div className="flex items-center space-x-4">
        <RoomSelector selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
        <StrainSelector selectedStrain={selectedStrain} setSelectedStrain={setSelectedStrain} />
        <TimeScaleSelector timeScale={timeScale} setTimeScale={setTimeScale} />
      </div>
    </header>
  );
};

export default Header;
