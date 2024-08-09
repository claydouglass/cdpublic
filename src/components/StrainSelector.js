import React from 'react';

const StrainSelector = ({ selectedStrain, setSelectedStrain }) => {
  return (
    <select 
      value={selectedStrain} 
      onChange={(e) => setSelectedStrain(e.target.value)} 
      className="p-2 border rounded"
    >
      <option value="Papaya Terpz">Papaya Terpz</option>
      <option value="Strain 2">Strain 2</option>
      <option value="Strain 3">Strain 3</option>
      {/* Add more strains as needed */}
    </select>
  );
};

export default StrainSelector;
