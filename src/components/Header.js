import React from 'react';
import RoomSelector from './RoomSelector';
import StrainSelector from './StrainSelector';
import TimeScaleSelector from './TimeScaleSelector';

const Header = ({ selectedRoom, setSelectedRoom, selectedStrain, setSelectedStrain, timeScale, setTimeScale }) => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img 
          src="/cdpublic/images/vervana_logo.png" 
          alt="Vervana logo" 
          className="w-48 h-auto"
        />
      </div>
      <div className="selectors flex items-center space-x-4">
        <RoomSelector selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
        <StrainSelector selectedStrain={selectedStrain} setSelectedStrain={setSelectedStrain} />
        <TimeScaleSelector timeScale={timeScale} setTimeScale={setTimeScale} />
      </div>
    </header>
  );
};

export default Header;