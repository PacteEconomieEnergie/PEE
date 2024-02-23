import React, { useEffect, useRef,useState } from 'react';
import { Chart } from '@antv/g2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientsStudies } from '../../store/Clients/clientSlice';
import { AppDispatch } from '../../store';
const ClientStudyChart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clientsStudies } = useSelector((state: any) => state.client);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltipInfo, setTooltipInfo] = useState({ display: 'none', content: '', x: 0, y: 0 });
  // Example data: replace this with your actual data
  useEffect(() => {
    dispatch(fetchClientsStudies());
  }, [dispatch]);

  

  

  useEffect(() => {
    // Ensure containerRef.current and clientsStudies are valid before proceeding
    if (containerRef.current && clientsStudies) {
      const transformedData = clientsStudies.flatMap((client: any) => [
        { client: client.clientName, type: 'Done', value: client.studiesCompleted },
        { client: client.clientName, type: 'To Do', value: client.studiesToDo },
        { client: client.clientName, type: 'In Progress', value: client.studiesInProgress },
        { client: client.clientName, type: 'Modification', value: client.retoucheStudies.total },
      ]);

      const chart = new Chart({
        container: containerRef.current,
        autoFit: true,
        height: 500, // You can adjust the height as needed
      });

      // chart
      //   .interval()
      //   .data(transformedData)
      //   .encode('x', 'client')
      //   .encode('y', 'value')
      //   .encode('color', 'type')
      //   .transform({ type: 'dodgeX' })
      //   .interaction('elementHighlight', { background: true });
        
        chart.data(transformedData)
        .interval()
        .encode('x', 'client')
        .encode('y', 'value')
        .encode('color', 'type')
                .transform({ type: 'dodgeX' })
        .interaction('elementHighlight', { background: true });
        chart.on('interval:mousemove', (ev) => {
          const { data } = ev.data;
          const content = `<p>${data.client}: ${data.type} - ${data.value}</p>`;
          setTooltipInfo({
            display: 'block',
            content: data.value === 0 ? `No ${data.type.toLowerCase()} studies` : content,
            x: ev.x,
            y: ev.y,
          });
        });
  
        chart.on('interval:mouseleave', () => {
          setTooltipInfo({ ...tooltipInfo, display: 'none' });
        });
chart.render();
      // Cleanup function to prevent memory leaks
      return () => chart.destroy();
    }
  }, [clientsStudies]);

  return <div ref={containerRef} />;
};
export default ClientStudyChart;
