import { getMonthNumber } from '../utils/dateUtils';

// Function to process environmental data
export const processEnvironmentalData = (rawData) => {
  console.log("Processing environmental data, raw data length:", rawData.length);
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const processedData = rawData
    .map(row => {
      if (!row.ct_tm) return null;

      const [day, month, year, time] = row.ct_tm.split(' ');
      const [hour, minute] = time.split(':');
      const monthNumber = getMonthNumber(month);
      if (monthNumber === undefined) return null;

      const date = new Date(Date.UTC(parseInt(year), monthNumber, parseInt(day), parseInt(hour), parseInt(minute)));

      if (isNaN(date.getTime())) return null;

      return {
        timestamp: date.getTime(),
        hour: date.getUTCHours(),
        temperature: parseFloat(((parseFloat(row.tp) - 32) * 5 / 9).toFixed(1)),
        humidity: parseFloat(row.hy),
        co2: parseFloat(row.co2),
        vpd: parseFloat(row.vpd),
        lightOn: row.d_n === '1',  // Interpreting '1' as day (light on)
      };
    })
    .filter(row => row && row.timestamp >= twentyFourHoursAgo.getTime() && row.timestamp <= now.getTime())
    .sort((a, b) => a.timestamp - b.timestamp);

  console.log("Processed data length:", processedData.length);
  if (processedData.length > 0) {
    console.log("First processed row:", processedData[0]);
    console.log("Last processed row:", processedData[processedData.length - 1]);
  } else {
    console.log("No data processed");
  }
  return processedData;
};

// Function to calculate recipe bounds
export const calculateRecipeBounds = (recipeData, currentPhase) => {
  console.log("Calculating recipe bounds for phase:", currentPhase);

  const getBound = (key) => {
    const minValue = parseFloat(recipeData.find(row => row.stage === currentPhase)?.[`${key}_min`]) || 0;
    const maxValue = parseFloat(recipeData.find(row => row.stage === currentPhase)?.[`${key}_max`]) || 100;
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