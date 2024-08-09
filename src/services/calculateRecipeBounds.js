export const calculateRecipeBounds = (recipeData, currentPhase) => {
  console.log("Calculating recipe bounds for phase:", currentPhase);
  
  // Find the column index that corresponds to the current phase
  const phaseIndex = recipeData[0] ? Object.values(recipeData[0]).indexOf(currentPhase) : -1;
  
  if (phaseIndex === -1) {
    console.warn("No phase data found for the current phase. Using default values.");
    return {
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
      }
    };
  }

  const bounds = {
    day: {
      temperature: {
        min: parseFloat(recipeData.find(row => row.stage === 'temp(c)_day_low')[currentPhase]) || 0,
        max: parseFloat(recipeData.find(row => row.stage === 'temp(c)_day_high')[currentPhase]) || 50,
      },
      humidity: {
        min: parseFloat(recipeData.find(row => row.stage === 'humid(%rh)_day_low')[currentPhase]) || 0,
        max: parseFloat(recipeData.find(row => row.stage === 'humid(%rh)_day_high')[currentPhase]) || 100,
      },
      co2: {
        min: parseFloat(recipeData.find(row => row.stage === 'co2(ppm)_day_low')[currentPhase]) || 300,
        max: parseFloat(recipeData.find(row => row.stage === 'co2(ppm)_day_high')[currentPhase]) || 2000,
      },
      vpd: {
        min: parseFloat(recipeData.find(row => row.stage === 'vpd_low')[currentPhase]) || 0,
        max: parseFloat(recipeData.find(row => row.stage === 'vpd_high')[currentPhase]) || 3,
      },
    },
    night: {
      temperature: {
        min: parseFloat(recipeData.find(row => row.stage === 'temp(c)_night_low')[currentPhase]) || 0,
        max: parseFloat(recipeData.find(row => row.stage === 'temp(c)_night_high')[currentPhase]) || 50,
      },
      humidity: {
        min: parseFloat(recipeData.find(row => row.stage === 'humid(%rh)_night_low')[currentPhase]) || 0,
        max: parseFloat(recipeData.find(row => row.stage === 'humid(%rh)_night_high')[currentPhase]) || 100,
      },
      co2: {
        min: parseFloat(recipeData.find(row => row.stage === 'co2(ppm)_night_low')[currentPhase]) || 300,
        max: parseFloat(recipeData.find(row => row.stage === 'co2(ppm)_night_high')[currentPhase]) || 2000,
      },
      vpd: {
        min: parseFloat(recipeData.find(row => row.stage === 'vpd_low')[currentPhase]) || 0,
        max: parseFloat(recipeData.find(row => row.stage === 'vpd_high')[currentPhase]) || 3,
      },
    }
  };

  console.log("Calculated bounds:", bounds);
  return bounds;
};