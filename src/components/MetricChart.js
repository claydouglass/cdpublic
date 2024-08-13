import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';

const MetricChart = ({ chartData = [], recipeBounds = {}, metric }) => {
  console.log(`MetricChart rendering for ${metric}`);
  console.log('recipeBounds:', recipeBounds);

  const bounds = {
    day: recipeBounds.day?.[metric] || {},
    night: recipeBounds.night?.[metric] || {},
  };

  const allValues = chartData.map(d => Number(d[metric]));
  const dataMin = Math.min(...allValues);
  const dataMax = Math.max(...allValues);
  
  const boundsMin = Math.min(bounds.day.min, bounds.night.min);
  const boundsMax = Math.max(bounds.day.max, bounds.night.max);

  const range = Math.max(dataMax, boundsMax) - Math.min(dataMin, boundsMin);
  const buffer = range * 0.1;
  const domainMin = Math.min(dataMin, boundsMin) - buffer;
  const domainMax = Math.max(dataMax, boundsMax) + buffer;

  const renderBoundsAndNightShading = () => {
    return chartData.map((entry, index) => {
      const nextEntry = chartData[index + 1];
      if (!nextEntry) return null;

      const currentBounds = entry.lightOn ? bounds.day : bounds.night;
      const fillColor = entry.lightOn ? "rgba(0, 255, 0, 0.2)" : "rgba(0, 0, 255, 0.2)";

      return (
        <React.Fragment key={`bound-${index}`}>
          {!entry.lightOn && (
            <ReferenceArea
              x1={entry.timestamp}
              x2={nextEntry.timestamp}
              y1={domainMin}
              y2={domainMax}
              fill="rgba(0, 0, 0, 0.1)"
              fillOpacity={0.5}
            />
          )}
          <ReferenceArea
            x1={entry.timestamp}
            x2={nextEntry.timestamp}
            y1={currentBounds.min}
            y2={currentBounds.max}
            fill={fillColor}
            fillOpacity={0.3}
          />
        </React.Fragment>
      );
    });
  };

  const formatXAxis = (timestamp) => {
    const date = new Date(timestamp);
    return date.getHours().toString().padStart(2, '0') + ':00';
  };

  // Generate ticks for every hour
  const generateHourlyTicks = () => {
    const startTime = new Date(chartData[0].timestamp);
    const endTime = new Date(chartData[chartData.length - 1].timestamp);
    const ticks = [];

    for (let d = new Date(startTime); d <= endTime; d.setHours(d.getHours() + 1)) {
      ticks.push(new Date(d).setMinutes(0, 0, 0));
    }

    return ticks;
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
          ticks={generateHourlyTicks()}
          interval={0}
        />
        <YAxis 
          domain={[domainMin, domainMax]}
          label={{ value: metric, angle: -90, position: 'insideLeft' }}
          tickFormatter={(value) => value.toFixed(2)}
        />
        
        {renderBoundsAndNightShading()}
        
        <Line 
          type="monotone" 
          dataKey={metric} 
          stroke="#8884d8" 
          dot={false} 
        />
        <Tooltip 
          labelFormatter={(label) => new Date(label).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
          formatter={(value) => [Number(value).toFixed(2), metric]}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MetricChart;