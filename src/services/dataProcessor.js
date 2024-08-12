import { getMonthNumber } from '../utils/dateUtils';

export const processEnvironmentalData = (rawData) => {
    console.log("Processing environmental data, raw data length:", rawData.length);
    if (!rawData || rawData.length === 0) {
        console.warn("Received empty or undefined rawData.");
        return [];
    }

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

export const detectStages = (processedData, useFixedStartDate = false) => {
    let currentStage = null;
    let stageDescription = '';
    const vegStartDate = new Date('2024-06-20T02:00:00Z'); // Example veg start date
    const flowerStartDate = new Date('2024-07-04T02:00:00Z'); // Fixed flowering start date

    const currentDate = new Date(processedData[processedData.length - 1].timestamp);
    const daysSinceVegStart = Math.floor((currentDate - vegStartDate) / (1000 * 60 * 60 * 24));
    const daysSinceFlowerStart = Math.floor((currentDate - flowerStartDate) / (1000 * 60 * 60 * 24));
    const weeksSinceFlowerStart = daysSinceFlowerStart / 7;

    if (daysSinceVegStart >= 0 && daysSinceFlowerStart < 0) {
        // Vegetative stage
        if (daysSinceVegStart <= 14) {
            currentStage = 'Veg Week 1-2';
            stageDescription = `Vegging Week ${Math.floor(daysSinceVegStart / 7) + 1}, Day ${daysSinceVegStart % 7 + 1}`;
        } else if (daysSinceVegStart > 14 && daysSinceFlowerStart < 0) {
            currentStage = 'Veg Week 3';
            stageDescription = `Vegging Week 3, Day ${daysSinceVegStart % 7 + 1}`;
        }
    } else if (weeksSinceFlowerStart >= 0) {
        // Flowering Stage
        if (weeksSinceFlowerStart <= 3) {
            currentStage = 'Flower Week 1-3';
            stageDescription = `Flowering Week ${Math.floor(weeksSinceFlowerStart)}, Day ${daysSinceFlowerStart % 7}`;
        } else if (weeksSinceFlowerStart > 3 && weeksSinceFlowerStart <= 6.5) {
            currentStage = 'Flower Week 4-6.5';
            stageDescription = `Flowering Week ${Math.floor(weeksSinceFlowerStart)}, Day ${daysSinceFlowerStart % 7}`;
        } else if (weeksSinceFlowerStart > 6.5 && weeksSinceFlowerStart <= 8.5) {
            currentStage = 'Flower Week 6.5-8.5';
            stageDescription = `Flowering Week ${Math.floor(weeksSinceFlowerStart)}, Day ${daysSinceFlowerStart % 7}`;
        } else {
            currentStage = 'Flower Week 8.5+ Harvest';
            stageDescription = `Flowering Week ${Math.floor(weeksSinceFlowerStart)}, Day ${daysSinceFlowerStart % 7}`;
        }
    }

    console.log("Detected stage data:", {
        currentStage,
        vegStartDate,
        flowerStartDate,
        stageDescription
    });

    return {
        currentStage,
        vegStartDate,
        flowerStartDate,
        stageDescription
    };
};

export const calculateRecipeBounds = (recipeData, currentStage) => {
    console.log("Calculating recipe bounds for Stage:", currentStage);

    const getBound = (key) => {
        const minValue = parseFloat(recipeData.find(row => row.stage === currentStage)?.[`${key}_min`]) || 0;
        const maxValue = parseFloat(recipeData.find(row => row.stage === currentStage)?.[`${key}_max`]) || 100;
        console.log(`${key} - min: ${minValue}, max: ${maxValue}`); // Log the min and max values
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