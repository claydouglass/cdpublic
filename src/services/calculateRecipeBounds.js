export const calculateRecipeBounds = (recipeData, currentPhase) => {
    console.log("Calculating recipe bounds for phase:", currentPhase);
  
    // Helper function to get bounds for a given stage and phase
    const getBounds = (stage, currentPhase) => {
      const minValue = parseFloat(recipeData.find(row => row.stage === `${stage}_low`)?.[currentPhase]);
      const maxValue = parseFloat(recipeData.find(row => row.stage === `${stage}_high`)?.[currentPhase]);
      
      return { 
        min: !isNaN(minValue) ? minValue : 0, 
        max: !isNaN(maxValue) ? maxValue : 100 
      };
    };
  
    // If no valid phase data found, return default values
    if (!recipeData || recipeData.length === 0 || !recipeData[0].hasOwnProperty(currentPhase)) {
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
  
    // Calculate bounds based on current phase
    const bounds = {
      day: {
        temperature: getBounds('temp(c)_day', currentPhase),
        humidity: getBounds('humid(%rh)_day', currentPhase),
        co2: getBounds('co2(ppm)_day', currentPhase),
        vpd: getBounds('vpd', currentPhase),
      },
      night: {
        temperature: getBounds('temp(c)_night', currentPhase),
        humidity: getBounds('humid(%rh)_night', currentPhase),
        co2: getBounds('co2(ppm)_night', currentPhase),
        vpd: getBounds('vpd', currentPhase),
      }
    };
  
    console.log("Calculated bounds:", bounds);
    return bounds;
  };