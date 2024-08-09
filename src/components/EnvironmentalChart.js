import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, ReferenceArea, Tooltip, Legend
} from 'recharts';
import { formatXAxis } from '../utils/dateUtils';

const EnvironmentalChart = ({ chartData, recipeBounds }) => {
  const defaultBounds = {
    temperature: { min: 20, max: 30 },
    humidity: { min: 40, max: 60 },
    co2: { min: 800, max: 1500 },
    vpd: { min: 0.8, max: 1.2 },
  };

  const dayBounds = recipeBounds?.day || defaultBounds;
  const nightBounds = recipeBounds?.night || defaultBounds;

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

        <YAxis yAxisId="left" domain={[0, 50]} />
        <YAxis yAxisId="right" orientation="right" domain={[300, 2000]} />

        {chartData.map((entry, index) => {
          const bounds = entry.lightOn ? dayBounds : nightBounds;
          const nextEntryTimestamp = index < chartData.length - 1 ? chartData[index + 1].timestamp : entry.timestamp;

          return (
            <>
              <ReferenceArea
                key={`temp-${entry.timestamp}`}
                x1={entry.timestamp}
                x2={nextEntryTimestamp}
                y1={bounds.temperature.min}
                y2={bounds.temperature.max}
                yAxisId="left"
                fill="blue"
                fillOpacity={0.1}
                strokeOpacity={0}
                ifOverflow="extendDomain"
                alwaysShow={true}
              />
              <ReferenceArea
                key={`humid-${entry.timestamp}`}
                x1={entry.timestamp}
                x2={nextEntryTimestamp}
                y1={bounds.humidity.min}
                y2={bounds.humidity.max}
                yAxisId="left"
                fill="green"
                fillOpacity={0.1}
                strokeOpacity={0}
                ifOverflow="extendDomain"
                alwaysShow={true}
              />
              <ReferenceArea
                key={`co2-${entry.timestamp}`}
                x1={entry.timestamp}
                x2={nextEntryTimestamp}
                y1={bounds.co2.min}
                y2={bounds.co2.max}
                yAxisId="right"
                fill="orange"
                fillOpacity={0.1}
                strokeOpacity={0}
                ifOverflow="extendDomain"
                alwaysShow={true}
              />
              <ReferenceArea
                key={`vpd-${entry.timestamp}`}
                x1={entry.timestamp}
                x2={nextEntryTimestamp}
                y1={bounds.vpd.min}
                y2={bounds.vpd.max}
                yAxisId="left"
                fill="red"
                fillOpacity={0.1}
                strokeOpacity={0}
                ifOverflow="extendDomain"
                alwaysShow={true}
              />
            </>
          );
        })}

        <Line yAxisId="left" type="monotone" dataKey="humidity" stroke="#82ca9d" dot={false} />
        <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" dot={false} />
        <Line yAxisId="right" type="monotone" dataKey="co2" stroke="#ffc658" dot={false} />
        <Line yAxisId="left" type="monotone" dataKey="vpd" stroke="#ff7300" dot={false} />

        <Tooltip labelFormatter={formatXAxis} />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EnvironmentalChart;