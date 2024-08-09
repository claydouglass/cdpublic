import React from 'react';

const StrainSelector = ({ selectedStrain, setSelectedStrain }) => {
  return (
    <select 
      value={selectedStrain} 
      onChange={(e) => setSelectedStrain(e.target.value)} 
      className="p-2 border rounded"
    >
      <option value="Papaya Terpz">Papaya Terpz</option>
      <option value="Kandy Terpz">Kandy Terpz</option>
      {/* Add more strains as needed */}
    </select>
  );
};

export default StrainSelector;
