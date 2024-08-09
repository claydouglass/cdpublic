import Papa from 'papaparse';

const ENVIRONMENTAL_DATA_URL = 'https://docs.google.com/spreadsheets/d/1Ki2hmGSihyuaxp_t7hFca3BUY9gZRCAkEGfPAcr-Foc/pub?output=csv';
const RECIPE_DATA_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS-OvMFLTAzu2aSDIEF1ma2YADXDYN-ZjjPfMBB-PMvpbisTVVADFDnyJrLGYn-YJtYei8vQLu0-U9Z/pub?output=csv';

export const fetchEnvironmentalData = async () => {
  console.log("Attempting to fetch environmental data");
  try {
    const response = await fetch(ENVIRONMENTAL_DATA_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();
    console.log("Environmental data fetched:", csvText.slice(0, 200)); // Log first 200 characters
    const result = Papa.parse(csvText, { header: true });
    console.log("Parsed environmental data:", result.data.slice(0, 2)); // Log first two rows
    return result.data;
  } catch (error) {
    console.error("Error fetching environmental data:", error);
    throw error;
  }
};

export const fetchRecipeData = async () => {
  console.log("Attempting to fetch recipe data");
  try {
    const response = await fetch(RECIPE_DATA_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();
    console.log("Recipe data fetched:", csvText.slice(0, 200)); // Log first 200 characters
    const result = Papa.parse(csvText, { header: true });
    console.log("Parsed recipe data:", result.data.slice(0, 2)); // Log first two rows
    return result.data;
  } catch (error) {
    console.error("Error fetching recipe data:", error);
    throw error;
  }
};