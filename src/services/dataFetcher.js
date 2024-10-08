import recipeData from '../data/recipeData'; // Adjust the path as needed
import Papa from 'papaparse';

const ENVIRONMENTAL_DATA_URL = 'https://docs.google.com/spreadsheets/d/1Ki2hmGSihyuaxp_t7hFca3BUY9gZRCAkEGfPAcr-Foc/pub?output=csv';

export const fetchEnvironmentalData = async () => {
  console.log("Attempting to fetch environmental data");
  try {
    const response = await fetch(ENVIRONMENTAL_DATA_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();
    console.log("Environmental data fetched:", csvText.slice(0, 200)); // Logs first 200 characters of the CSV data
    const result = Papa.parse(csvText, { header: true });
    console.log("Parsed environmental data:", result.data.slice(0, 2)); // Logs the first 2 entries of parsed data
    return result.data;
  } catch (error) {
    console.error("Error fetching environmental data:", error);
    throw error;
  }
};

export const fetchRecipeData = async () => {
  console.log("Using local recipe data");
  console.log("Recipe data content:", recipeData); // Logs the full recipe data to check its structure and content
  return recipeData;
};