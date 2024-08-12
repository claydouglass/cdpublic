// Function to calculate recipe bounds based on current phase and optionally, room/batch
export const calculateRecipeBounds = (recipeData, currentPhase) => {
  console.log("Calculating recipe bounds for phase:", currentPhase);

  if (!recipeData || recipeData.length === 0) {
      console.warn("Recipe data is empty or undefined.");
      return defaultBounds();
  }

  const currentRecipeRow = recipeData.find(row => row.stage === currentPhase);
  if (!currentRecipeRow) {
      console.warn(`No recipe data found for the phase: ${currentPhase}`);
      console.log("Available stages in recipeData:", recipeData.map(row => row.stage));
      return defaultBounds();
  }

  console.log("Found recipe data for current phase:", currentRecipeRow);

  const getBound = (key) => {
      const minValue = parseFloat(currentRecipeRow[`${key}_min`]) || 0;
      const maxValue = parseFloat(currentRecipeRow[`${key}_max`]) || 100;
      console.log(`Bounds for ${key}: min = ${minValue}, max = ${maxValue}`);
      return { min: minValue, max: maxValue };
  };

  const bounds = {
      day: {
          temperature: getBound('temp(c)_day'),
          humidity: getBound('humid(%rh)_day'),
          co2: getBound('co2(ppm)_day'),
          vpd: getBound('vpd'),
      },
      night: {
          temperature: getBound('temp(c)_night'),
          humidity: getBound('humid(%rh)_night'),
          co2: getBound('co2(ppm)_night'),
          vpd: getBound('vpd'),
      }
  };

  console.log("Calculated bounds:", bounds);
  return bounds;
};

// Fallback default bounds if no data is available
const defaultBounds = () => ({
  day: {
      temperature: { min: 20, max: 30 },
      humidity: { min: 40, max: 60 },
      co2: { min: 800, max: 1500 },
      vpd: { min: 0.8, max: 1.2 },
  },
  night: {
      temperature: { min: 20, max: 30 },
      humidity: { min: 40, max: 60 },
      co2: { min: 400, max: 600 },
      vpd: { min: 0.8, max: 1.2 },
  }
});

export { calculateRecipeBounds };