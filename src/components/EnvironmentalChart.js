import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, ReferenceArea, Tooltip, Legend
} from 'recharts';
import { formatXAxis } from '../utils/dateUtils';

const EnvironmentalChart = ({ chartData = [], recipeBounds = {} }) => {
  const defaultBounds = {
    temperature: { min: 20, max: 30 },
    humidity: { min: 40, max: 60 },
    co2: { min: 800, max: 1500 },
    vpd: { min: 0.8, max: 1.2 },
  };

  const ensureBounds = (bounds) => ({
    temperature: bounds?.temperature || defaultBounds.temperature,
    humidity: bounds?.humidity || defaultBounds.humidity,
    co2: bounds?.co2 || defaultBounds.co2,
    vpd: bounds?.vpd || defaultBounds.vpd,
  });

  const dayBounds = ensureBounds(recipeBounds?.day);
  const nightBounds = ensureBounds(recipeBounds?.night);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="timestamp" 
          type="number"
          domain={['dataMin', 'dataMax']}
          tickFormatter={formatXAxis}
          tick={{ fontSize: 12 }} 
          label={{ value: "Time (24-hour period)", position: 'insideBottomRight', offset: -5 }}
          interval={0} 
          tickCount={24}
        />
        <YAxis yAxisId="left" domain={[0, 100]} />
        <YAxis yAxisId="right" orientation="right" domain={[300, 2000]} />

        {/* Add shading for night periods */}
        {chartData.map((entry, index) => {
          if (!entry.lightOn) {
            const nextEntryTimestamp = index < chartData.length - 1 ? chartData[index + 1].timestamp : entry.timestamp;
            return (
              <ReferenceArea
                key={`night-${entry.timestamp}`}
                x1={entry.timestamp}
                x2={nextEntryTimestamp}
                y1="0"
                y2="100"
                yAxisId="left"
                fill="rgba(0, 0, 0, 0.1)"
                strokeOpacity={0}
                ifOverflow="extendDomain"
              />
            );
          }
          return null;
        })}

        {chartData.map((entry, index) => {
          const bounds = entry.lightOn ? dayBounds : nightBounds;
          const nextEntryTimestamp = index < chartData.length - 1 ? chartData[index + 1].timestamp : entry.timestamp;

          return (
            <React.Fragment key={`${entry.timestamp}-${index}`}>
              {Object.entries(bounds).map(([key, value]) => (
                <ReferenceArea
                  key={`${key}-${entry.timestamp}-${index}`}
                  x1={entry.timestamp}
                  x2={nextEntryTimestamp}
                  y1={value?.min || defaultBounds[key].min}
                  y2={value?.max || defaultBounds[key].max}
                  yAxisId={key === 'co2' ? 'right' : 'left'}
                  fill={key === 'temperature' ? 'blue' : key === 'humidity' ? 'green' : key === 'co2' ? 'orange' : 'red'}
                  fillOpacity={0.1}
                  strokeOpacity={0}
                  ifOverflow="extendDomain"
                />
              ))}
            </React.Fragment>
          );
        })}

        <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" dot={false} />
        <Line yAxisId="left" type="monotone" dataKey="humidity" stroke="#82ca9d" dot={false} />
        <Line yAxisId="right" type="monotone" dataKey="co2" stroke="#ffc658" dot={false} />
        <Line yAxisId="left" type="monotone" dataKey="vpd" stroke="#ff7300" dot={false} />

        <Tooltip labelFormatter={(label) => {
          const date = new Date(label);
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          return `${hours}:${minutes}`;
        }} />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EnvironmentalChart;