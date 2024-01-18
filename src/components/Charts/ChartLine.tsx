import React, { useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';

const ClientStudyChart: React.FC = () => {
  const containerRef = useRef(null);
  // Example data: replace this with your actual data
  const newData = [
    { id: 'Client A', done: 10, toDo: 5, inProgress: 15, modification: 2 },
    { id: 'Client B', done: 20, toDo: 8, inProgress: 19, modification: 6 },
    { id: 'Client C', done: 23, toDo: 8, inProgress: 11, modification: 4 },
    { id: 'Client D', done: 16, toDo: 15, inProgress: 3, modification: 1 },
    
    // ... add other clients here
  ];
  const transformedData = newData.flatMap(client => [
    { client: client.id, type: 'Done', value: client.done },
    { client: client.id, type: 'To Do', value: client.toDo },
    { client: client.id, type: 'In Progress', value: client.inProgress },
    { client: client.id, type: 'Modification', value: client.modification },
  ]);

  

  useEffect(() => {
    if (containerRef.current ) {
        const chart = new Chart({ container: containerRef.current,autoFit:true })
  
        chart
        .interval()
        .data(transformedData)
        .encode('x', 'client')
        .encode('y', 'value')
        .encode('color', 'type')
        .transform({ type: 'dodgeX' })
        .interaction('elementHighlight', { background: true });
        chart.render();
  
        return () => chart.destroy();
      
     
    }
  }, [transformedData]);

  return <div ref={containerRef} />;
};
export default ClientStudyChart;
