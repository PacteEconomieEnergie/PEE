import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import React,{ useState } from 'react';
import MyChart from '../components/Charts/ChartDoughnut';
import ClientStudyChart from '../components/Charts/ChartLine';
import LiquidChart from '../components/Charts/LiquidChart';

export default () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        
        split={responsive ? 'horizontal' : 'vertical'}
        headerBordered
        bordered
      >
        <ProCard split="horizontal">
          <ProCard split="horizontal">
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: 'Total Ingénieur',
                  value: 234,
                
                }}
                className='bg-emerald-300'
              />
              <StatisticCard
                statistic={{
                  title: 'Total Client',
                  value: 34,
                //   description: (
                //     <Statistic title="月同比" value="8.04%" trend="up" />
                //   ),
                }}
                className='bg-amber-200'
              />
            </ProCard>
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: 'Total étude',
                  value: '56',
                  
                }}
                className='bg-gray-200'
              />
              <StatisticCard
                statistic={{
                  title: 'Total assitant',
                  value: '134',
                  
                }}
                className='bg-gray-200'
              />
            </ProCard>
          </ProCard>
          <ClientStudyChart/>
        </ProCard>
        
             <ProCard split={responsive ? 'horizontal' : 'vertical'}>
        <LiquidChart/>
        <MyChart/>
        </ProCard>

      </ProCard>
    </RcResizeObserver>
  );
};