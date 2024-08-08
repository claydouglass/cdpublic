import { getMonthNumber } from '../utils/dateUtils';

export const processEnvironmentalData = (rawData) => {
  console.log("Processing environmental data, raw data length:", rawData.length);
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  console.log("Now:", now, "24 hours ago:", twentyFourHoursAgo);

  const processedData = rawData
    .map(row => {
      console.log("Raw row:", row);
      if (!row.ct_tm) {
        console.log("Skipping row due to missing ct_tm");
        return null;
      }

      // Parse the ct_tm string
      const [day, month, year, time] = row.ct_tm.split(' ');
      const [hour, minute] = time.split(':');

      console.log("Parsed date components:", { day, month, year, hour, minute });

      const monthNumber = getMonthNumber(month);
      if (monthNumber === undefined) {
        console.log("Invalid month:", month);
        return null;
      }

      // Use UTC methods to avoid timezone issues
      const date = new Date(Date.UTC(parseInt(year), monthNumber, parseInt(day), parseInt(hour), parseInt(minute)));
      
      console.log("Resulting date:", date);

      if (isNaN(date.getTime())) {
        console.log("Skipping row due to invalid date");
        return null;
      }

      return {
        timestamp: date.getTime(),
        hour: date.getUTCHours(),
        temperature: parseFloat(((parseFloat(row.tp) - 32) * 5 / 9).toFixed(1)),
        humidity: parseFloat(row.hy),
        co2: parseFloat(row.co2),
        vpd: parseFloat(row.vpd),
        lightOn: row.d_n === '1',
      };
    })
    .filter(row => {
      if (row === null) return false;
      const inRange = row.timestamp >= twentyFourHoursAgo.getTime() && row.timestamp <= now.getTime();
      console.log("Filtering row:", new Date(row.timestamp), "In range:", inRange);
      return inRange;
    })
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

export const calculateRecipeBounds = (recipeData, currentPhase) => {
  console.log("Calculating recipe bounds for phase:", currentPhase);
  const phaseData = recipeData.find(row => row.stage === currentPhase) || recipeData[0];

  if (phaseData) {
    const bounds = {
      temperature: { 
        min: parseFloat(phaseData.temp_c_day_low) || 0, 
        max: parseFloat(phaseData.temp_c_day_high) || 50 
      },
      humidity: { 
        min: parseFloat(phaseData.humid_rh_day_low) || 0, 
        max: parseFloat(phaseData.humid_rh_day_high) || 100 
      },
      co2: { 
        min: parseFloat(phaseData.co2_ppm_day_low) || 300, 
        max: parseFloat(phaseData.co2_ppm_day_high) || 2000 
      },
      vpd: { 
        min: parseFloat(phaseData.vpd_low) || 0, 
        max: parseFloat(phaseData.vpd_high) || 3 
      },
    };
    console.log("Calculated bounds:", bounds);
    return bounds;
  } else {
    console.warn("No phase data found. Using default values.");
    return {
      temperature: { min: 20, max: 30 },
      humidity: { min: 40, max: 60 },
      co2: { min: 800, max: 1500 },
      vpd: { min: 0.8, max: 1.2 },
    };
  }
};