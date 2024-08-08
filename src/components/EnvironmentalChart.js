import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceArea, Tooltip, Legend } from 'recharts';
import { formatXAxis } from '../utils/dateUtils';

const EnvironmentalChart = ({ chartData, recipeBounds }) => {
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
        />
        
        <YAxis yAxisId="left" domain={[0, 50]} />
        <YAxis yAxisId="right" orientation="right" domain={[300, 2000]} />

        {/* Highlight Light On Periods */}
        {chartData.map((entry, index) => (
          entry.lightOn ? (
            <ReferenceArea
              key={index}
              x1={entry.timestamp}
              x2={index < chartData.length - 1 ? chartData[index + 1].timestamp : entry.timestamp}
              y1={0}
              y2={100}
              yAxisId="left"
              fill="yellow"
              fillOpacity={0.2}
              strokeOpacity={0}
              ifOverflow="extendDomain"
              alwaysShow={true}
            />
          ) : null
        ))}

        {/* Reference areas for bounds */}
        <ReferenceArea 
          x1={chartData[0]?.timestamp}
          x2={chartData[chartData.length - 1]?.timestamp}
          y1={recipeBounds.temperature.min} 
          y2={recipeBounds.temperature.max} 
          yAxisId="left" 
          fill="blue" 
          fillOpacity={0.1}
          strokeOpacity={0}
          ifOverflow="extendDomain"
          alwaysShow={true}
        />
        {/* Add similar ReferenceArea components for humidity, co2, and vpd */}

        <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" dot={false} />
        <Line yAxisId="left" type="monotone" dataKey="humidity" stroke="#82ca9d" dot={false} />
        <Line yAxisId="right" type="monotone" dataKey="co2" stroke="#ffc658" dot={false} />
        <Line yAxisId="left" type="monotone" dataKey="vpd" stroke="#ff7300" dot={false} />

        <Tooltip labelFormatter={formatXAxis} />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EnvironmentalChart;