import React from 'react';
import { Bar } from '@ant-design/plots';

const RankingBarGraph = () => {
  const data = [
    { engineer: 'Baha eddine', category: 'Done', value: 10 },
    { engineer: 'Baha eddine', category: 'In Progress', value: 5 },
    { engineer: 'Baha eddine', category: 'To Do', value: 3 },
    { engineer: 'Aziz', category: 'Done', value: 8 },
    { engineer: 'Aziz', category: 'In Progress', value: 7 },
    { engineer: 'Aziz', category: 'To Do', value: 2 },
    { engineer: 'Tej', category: 'Done', value: 8 },
    { engineer: 'Tej', category: 'In Progress', value: 7 },
    { engineer: 'Tej', category: 'To Do', value: 2 },
    // ...add data for more engineers
  ];

  const config = {
    data,
    isStack: true,
    xField: 'engineer',
    yField: 'value',
    seriesField: 'category',
    label: {
      
      content: (item:any) => {
        return item.value.toFixed(2);
      },
      style: {
        fill: '#fff',
      },
    },
    color: ['#2582a1', '#f88c24', '#c52125'],
    legend: {
      position: 'buttom',
    },
  };

  return <Bar {...config} />;
};

export default RankingBarGraph;
