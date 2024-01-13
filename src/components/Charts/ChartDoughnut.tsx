import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MyChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const data:any ={
    labels: ['Finis', 'En cours', 'En attend'],
  datasets: [
    {
      label: 'test',
      data: [12, 19, 3, ],
      backgroundColor: [
        '#5be7a9',
        '#fda403',
        "#ff4b68",
        
      ],
      borderColor: [
        '#5be7a9',
        '#fda403',
        '#ff4b68',
       
      ],
      borderWidth: 1,
    },
  ],
  }
  const totalStudies = data.datasets[0].data.reduce((acc:any, curr:any) => acc + curr, 0);

// Calculate percentages and update data values
data.datasets[0].data = data.datasets[0].data.map((value:any) => ((value / totalStudies) * 100).toFixed(2));

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
              plugins: {
                legend: {
                  display: true,
                  position: 'right',
                },
                title: {
                  display: true,
                  text: 'Total Studies',
                  font: {
                    size: 18,
                  },
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const label = data.labels[context.dataIndex];
                      const value = data.datasets[context.datasetIndex].data[context.dataIndex];
                      return `${label}: ${value}%`;
                    },
                  },
                },
              },
            },
          });
        return () => {
            chart.destroy();
          };;
      }
    }
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <canvas ref={chartRef} />
    </div>
  );
};

export default MyChart;
