import React from 'react';

const AIAnalysis = ({ chartData, recipeBounds }) => {
  // Placeholder analysis logic - Replace this with actual AI-driven analysis
  const generateInsights = () => {
    // Example logic (replace with actual AI/ML processing)
    const insights = [];

    if (chartData.length > 0) {
      const latestData = chartData[chartData.length - 1];

      if (latestData.temperature > recipeBounds.temperature.max) {
        insights.push('Temperature is above the optimal range. Consider adjusting your climate control.');
      } else if (latestData.temperature < recipeBounds.temperature.min) {
        insights.push('Temperature is below the optimal range. Consider increasing the temperature.');
      }

      if (latestData.humidity > recipeBounds.humidity.max) {
        insights.push('Humidity is above the optimal range. Consider using a dehumidifier.');
      } else if (latestData.humidity < recipeBounds.humidity.min) {
        insights.push('Humidity is below the optimal range. Consider using a humidifier.');
      }

      if (latestData.co2 > recipeBounds.co2.max) {
        insights.push('CO2 levels are too high. Ensure proper ventilation.');
      } else if (latestData.co2 < recipeBounds.co2.min) {
        insights.push('CO2 levels are too low. Consider CO2 supplementation.');
      }

      if (latestData.vpd > recipeBounds.vpd.max) {
        insights.push('VPD is above the optimal range. Adjust temperature or humidity to reach optimal VPD.');
      } else if (latestData.vpd < recipeBounds.vpd.min) {
        insights.push('VPD is below the optimal range. Adjust temperature or humidity to reach optimal VPD.');
      }
    }

    return insights;
  };

  const insights = generateInsights();

  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-4">
      <h3 className="text-xl font-bold mb-2">AI-Driven Insights</h3>
      {insights.length > 0 ? (
        <ul className="list-disc list-inside">
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
