import React,{useRef,useEffect} from "react";
import  Chart  from "chart.js/auto";

const ChartBar:React.FC=()=>{
    const chartRef=useRef<HTMLCanvasElement>(null )
    const data = {
        labels: ['Ingenieur A', 'Ingenieur B', 'Ingenieur C', 'Ingenieur D'], // Names of different engineers
        datasets: [
          {
            label: 'Total etude', // Label for the dataset
            data: [85, 70, 90, 80], // Performance scores for each engineer (adjust these values)
            backgroundColor: ['#5be7a9', '#fda403', '#ff4b68', '#3366CC'], // Background colors for bars
            borderColor: ['#5be7a9', '#fda403', '#ff4b68', '#3366CC'], // Border colors for bars
            borderWidth: 1,
            barThickness: 8, 
          },
        ],
      };
      useEffect(() => {
        if (chartRef && chartRef.current) {
          const ctx = chartRef.current.getContext('2d');
    
          if (ctx) {
            const chart = new Chart(ctx, {
                type: 'bar',
          data: data,
          options: {
            indexAxis: 'x', // Display bars vertically
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 10,
                },
              },
            },
                plugins: {
                  legend: {
                    display: false, // Hide legend for this chart
                  },
                  title: {
                    display: true,
                    text: 'Performance des études d’ingénieur', // Title for the chart
                    font: {
                      size: 18,
                    },
                  },
                },
                responsive: true, // Enable responsiveness
                maintainAspectRatio: false,
              },
            });
    
            return () => {
              chart.destroy();
            };
          }
        }
      }, []);



      return (
        <div className="p-4 bg-white rounded-lg shadow-md object-cover  ">
          <canvas ref={chartRef}  />
        </div>
      );
}


export default ChartBar