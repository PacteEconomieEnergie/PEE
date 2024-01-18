import React, { useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';

const MyChart: React.FC = () => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    // Ensure the container ref is present
    if (chartContainerRef.current) {
      // Create a new Chart instance
      const chart = new Chart({
        container: chartContainerRef.current,
        autoFit:true,
        
      });

      // Configure the chart
      chart.coordinate({ type: 'theta', innerRadius: 0.25, outerRadius: 0.8 });
      chart
        .interval()
        .data([
          { type: 'Finis', value: 12 },
          { type: 'En cours', value: 19 },
          { type: 'En attend', value: 3 },
        ])
        .transform({ type: 'stackY' })
        .encode('y', 'value')
        .encode('color', 'type')
        .scale('color', {
          range: ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb'],
        })
        .label({
          text: 'value',
          fontWeight: 'bold',
          offset: 14,
        })
        .label({
          text: 'type',
          position: 'spider',
          connectorDistance: 0,
          fontWeight: 'bold',
          textBaseline: 'bottom',
          textAlign: (d:any) => (['Finis', 'sass'].includes(d.id) ? 'end' : 'start'),
          dy: -4,
        })
        .style('radius', 4)
        .style('stroke', '#fff')
        .style('lineWidth', 2)
        .animate('enter', { type: 'waveIn' })
        .legend('color', { position: 'bottom', layout: { justifyContent: 'center' },itemSpacing: 10
       })

      // Render the chart
      chart.render();

      // Cleanup function to destroy the chart when the component unmounts
      return () => chart.destroy();
    }
  }, []);

  return <div ref={chartContainerRef} />;
};

export default MyChart;
