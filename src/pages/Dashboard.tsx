import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import React,{ useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import ClientStudyChart from '../components/Charts/ChartLine';
import LiquidChart from '../components/Charts/LiquidChart';
const { Statistic } = StatisticCard;
export default () => {
  const [responsive, setResponsive] = useState(false);

  return (
    // <RcResizeObserver
    //   key="resize-observer"
    //   onResize={(offset) => {
    //     setResponsive(offset.width < 596);
    //   }}
    // >
    //   <ProCard
        
    //     split={responsive ? 'horizontal' : 'vertical'}
    //     headerBordered
    //     bordered
    //   >
    //     <ProCard split="horizontal">
    //       <ProCard split="horizontal">
    //         <ProCard split="vertical">
    //           <StatisticCard
    //             statistic={{
    //               title: 'Total Ingénieur',
    //               value: 234,
                
    //             }}
    //             className='bg-emerald-300'
    //           />
    //           <StatisticCard
    //             statistic={{
    //               title: 'Total Client',
    //               value: 34,
    //             //   description: (
    //             //     <Statistic title="月同比" value="8.04%" trend="up" />
    //             //   ),
    //             }}
    //             className='bg-amber-200'
    //           />
    //         </ProCard>
    //         <ProCard split="vertical">
    //           <StatisticCard
    //             statistic={{
    //               title: 'Total étude',
    //               value: '56',
                  
    //             }}
    //             className='bg-gray-200'
    //           />
    //           <StatisticCard
    //             statistic={{
    //               title: 'Total assitant',
    //               value: '134',
                  
    //             }}
    //             className='bg-gray-200'
    //           />
    //         </ProCard>
    //       </ProCard>
    //       <ClientStudyChart/>
    //     </ProCard>
        
    //          <ProCard split={responsive ? 'horizontal' : 'vertical'}>
    //     <LiquidChart/>
    //     <MyChart/>
    //     </ProCard>

    //   </ProCard>
    // </RcResizeObserver>
    <RcResizeObserver
    key="resize-observer"
    onResize={(offset) => {
      setResponsive(offset.width < 596);
    }}
  >
    <ProCard
      direction="column"
      gutter={[1, responsive ? 24 : 16]}
      headerBordered
      bordered
       
    >
      {/* Statistic Cards in a Single Row */}
      <ProCard
        direction={responsive ? "column" : "row"}
        gutter={16}
        className={responsive ? "space-y-4" : "space-x-0"}
      >
        
         <StatisticCard
  className="bg-tertiare text-white rounded-lg flex mb-4 sm:mb-0"
  title={<div className="flex-1 text-l">Total Ingénieur</div>}
  statistic={{
    value: 234,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <InfoCircleOutlined className="text-white text-2xl" />
      </div>
    ),
  }}
/>
        <StatisticCard
  className="bg-quadiare text-white rounded-lg flex mb-4 sm:mb-0"
  title={<div className="flex-1 text-l">Total client</div>}
  statistic={{
    value: 34,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <InfoCircleOutlined className="text-white text-2xl" />
      </div>
    ),
  }}
/>
        <StatisticCard
  className="bg-secondaire text-white rounded-lg flex mb-4 sm:mb-0"
  title={<div className="flex-1 text-l">Total étude</div>}
  statistic={{
    value: 56,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <InfoCircleOutlined className="text-white text-2xl" />
      </div>
    ),
  }}
/>
        <StatisticCard
  className="bg-primare text-white rounded-lg flex mb-4 sm:mb-0"
  title={<div className="flex-1 text-l">Total assistant</div>}
  statistic={{
    value: 134,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <InfoCircleOutlined className="text-white text-2xl" />
      </div>
    ),
  }}
/>
        
      </ProCard>

      {/* Charts in Horizontal Layout */}
      <ProCard
        direction="row"
        gutter={16}
        wrap
        
      >
        <ProCard colSpan={responsive ? 24 : 16} bordered className='mb-4 sm:mb-0'>
          <ClientStudyChart />
        </ProCard>
        <ProCard colSpan={responsive ? 24 : 8} bordered>
          <LiquidChart />
        </ProCard>
        {/* You can include MyChart here if you want to display it as well */}
      </ProCard>
    </ProCard>
  </RcResizeObserver>
  );
};