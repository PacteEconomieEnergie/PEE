import React from 'react';
import { Bar } from '@ant-design/plots';

const RankingBarGraph = () => {
  const data = [
    { rank: '1st', value: 30 },
    { rank: '2nd', value: 25 },
    { rank: '3rd', value: 20 },
    { rank: '4th', value: 18 },
  ];

  const config = {
    data,
    xField: 'rank',
    yField: 'value',
    seriesField: 'rank',
    legend: false, // You might want to disable legend if it's not needed
    barStyle: {
      radius: [0, 0, 0, 0], // Adjust bar border radius as needed
    },
    label: {
      position: 'top', // Position the label on top of the bar
      style: {
        fill: '#fff', // White color for the labels
      }
    },
    yAxis: {
      label: {
        formatter: (v:any) => `Rank ${v}`,
      },
    },
    xAxis: {
      line: null, // Hides the xAxis line
      tickLine: null, // Hides the tick line
      label: null, // Hides the label
    },
    tooltip: false, // Disables the tooltip if not needed
    // Set the color of each bar using the color mapping
    color: ({ rank }:any) => {
      const colorMapping:any = {
        '1st': '#1890ff',
        '2nd': '#73c0de',
        '3rd': '#facc14',
        '4th': '#fa8c16',
      };
      return colorMapping[rank];
    },
  };

  return <Bar {...config} />;
};

export default RankingBarGraph;
