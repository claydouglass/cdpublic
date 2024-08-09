import React from 'react';

export const generateInsights = (chartData, recipeBounds) => {
  const insights = [];

  // Defensive check for temperature bounds
  const tempBounds = recipeBounds?.day?.temperature || { min: 0, max: 100 }; // Fallback values

  if (chartData.some(data => data.temperature > tempBounds.max)) {
    insights.push("Temperature is too high.");
  }
  if (chartData.some(data => data.temperature < tempBounds.min)) {
    insights.push("Temperature is too low.");
  }

  // Defensive check for humidity bounds
  const humidityBounds = recipeBounds?.day?.humidity || { min: 0, max: 100 }; // Fallback values

  if (chartData.some(data => data.humidity > humidityBounds.max)) {
    insights.push("Humidity is too high.");
  }
  if (chartData.some(data => data.humidity < humidityBounds.min)) {
    insights.push("Humidity is too low.");
  }

  // Repeat similar checks for co2 and vpd
  const co2Bounds = recipeBounds?.day?.co2 || { min: 300, max: 2000 }; // Fallback values
  const vpdBounds = recipeBounds?.day?.vpd || { min: 0, max: 3 }; // Fallback values

  if (chartData.some(data => data.co2 > co2Bounds.max)) {
    insights.push("CO2 levels are too high.");
  }
  if (chartData.some(data => data.co2 < co2Bounds.min)) {
    insights.push("CO2 levels are too low.");
  }

  if (chartData.some(data => data.vpd > vpdBounds.max)) {
    insights.push("VPD is too high.");
  }
  if (chartData.some(data => data.vpd < vpdBounds.min)) {
    insights.push("VPD is too low.");
  }

  return insights;
};

const AIAnalysis = ({ chartData, recipeBounds }) => {
  const insights = generateInsights(chartData, recipeBounds);

  return (
    <div className="analysis-section">
      <h2>AI-Driven Insights</h2>
      {insights.length > 0 ? (
        <ul>
          {insights.map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
      ) : (
        <p>No insights available at the moment. The conditions seem to be within optimal ranges.</p>
      )}
    </div>
  );
};

export default AIAnalysis;