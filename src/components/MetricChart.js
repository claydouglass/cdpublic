import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, ReferenceArea, Tooltip, Legend
} from 'recharts';
import { formatXAxis } from '../utils/dateUtils';

const MetricChart = ({ chartData = [], recipeBounds = {}, metric }) => {
  const defaultBounds = {
    min: 0,
    max: 100,
  };

  const bounds = recipeBounds.day[metric] || recipeBounds.night[metric] || defaultBounds;

  const formatTooltipTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

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
        <YAxis domain={[bounds.min, bounds.max]} />

        {chartData.map((entry, index) => {
          if (!entry.lightOn) {
            const nextEntryTimestamp = index < chartData.length - 1 ? chartData[index + 1].timestamp : entry.timestamp;
            return (
                <ReferenceArea
                    key={`night-${entry.timestamp}`}
                    x1={entry.timestamp}
                    x2={nextEntryTimestamp}
                    y1="dataMin" // Extend shading from minimum Y-axis value
                    y2="dataMax" // Extend shading to maximum Y-axis value
                    yAxisId={metric === 'co2' ? 'right' : 'left'}
                    fill="rgba(0, 0, 0, 0.1)" // Adjust for night shading color
                    strokeOpacity={0}
                    ifOverflow="extendDomain"
                />
            );
          }
          return null;
        })}

        <Line 
          type="monotone" 
          dataKey={metric} 
          stroke="#8884d8" 
          dot={false} 
        />

        <Tooltip labelFormatter={(label) => formatTooltipTime(label)} />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MetricChart;