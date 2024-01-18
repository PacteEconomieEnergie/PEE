import React,{useEffect, useRef,useState} from 'react';

import { Liquid } from '@ant-design/plots';

const LiquidChart = () => {
  const config = {
    statistic: {
        title: {
          offsetY: -20, // Adjust the Y-offset as needed
          style: { // Set a contrasting color for visibility
            fontSize: 16,   // Adjust the font size as needed
          },
          customHtml: (container:any, view:any, percent:any) => {
            const text = 'Your Chart Title';
            const width = container.getBoundingClientRect().width;
            return `<div style="width: ${width}px;text-align: center;font-size: 16px;">${text}</div>`;
          },
        },
      },
    
    percent: 0.2,
    radius: 0.2,
    outline: {
        border: 4,
        distance: 8,
      },
    
    wave: {
      length: 228,
    },
    style: {
        r:20,
        fill: '#72D127',
        fillOpacity: 0.5,
        stroke: '#EBF0E7',
        lineWidth: 2,
      }
  };
  return <Liquid {...config} />;

};
export default LiquidChart