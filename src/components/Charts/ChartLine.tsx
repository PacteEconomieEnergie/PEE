import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ClientStudyChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  // Example data: replace this with your actual data
  const data = {
    labels: ['Client A', 'Client B', 'Client C', 'Client D', 'Client E'],
    datasets: [
      {
        label: "Numéro D'étude'",
        data: [10, 15, 8, 20, 12], // Replace this with your study counts for each client
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.5,
      },
    ],
  };

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const chart = new Chart(ctx, {
          type: 'line',
          data: data,
          options: {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Studies',
                  color: 'black',
                  font: {
                    size: 14,
                  },
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Clients',
                  color: 'black',
                  font: {
                    size: 14,
                  },
                },
              },
            },
          },
        });

        return () => {
          chart.destroy();
        };
      }
    }
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <canvas ref={chartRef} />
    </div>
  );
};

export default ClientStudyChart;
