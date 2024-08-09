import React from 'react';

const TimeScaleSelector = ({ timeScale, setTimeScale }) => {
  return (
    <select 
      value={timeScale} 
      onChange={(e) => setTimeScale(e.target.value)} 
      className="p-2 border rounded"
    >
      <option value="24h">Last 24 Hours</option>
      <option value="3d">Last 3 Days</option>
      <option value="week">Last Week</option>
      <option value="start">From Start</option>
    </select>
  );
};

export default TimeScaleSelector;
