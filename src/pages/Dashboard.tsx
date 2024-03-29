import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import React,{ useState,useEffect } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import ClientStudyChart from '../components/Charts/ChartLine';
import LiquidChart from '../components/Charts/LiquidChart';
import adminService from '../Services/Api/adminService';

// const { Statistic } = StatisticCard;
export default () => {
  const [responsive, setResponsive] = useState(false);
  const [stats, setStats] = useState({
    engineersCount: 0,
    assistantsCount: 0,
    clientsCount: 0,
    studiesCount: 0,
  });
  useEffect(() => {
    adminService.fetchDashboardData().then((response) => {
      setStats(response);
    });
  }, []);
  
  
  return (
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
  className="bg-yellow-400 text-white rounded-lg flex mb-4 sm:mb-0"
  title={<div className="flex-1 text-l">Total Ingénieur</div>}
  statistic={{
    value: stats.engineersCount,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <InfoCircleOutlined className="text-white text-2xl" />
      </div>
    ),
  }}
/>
        <StatisticCard
  className="bg-cyan-400 text-white rounded-lg flex mb-4 sm:mb-0"
  title={<div className="flex-1 text-l">Total client</div>}
  statistic={{
    value: stats.clientsCount,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <InfoCircleOutlined className="text-white text-2xl" />
      </div>
    ),
  }}
/>
        <StatisticCard
  className="bg-rose-500 text-white rounded-lg flex mb-4 sm:mb-0"
  title={<div className="flex-1 text-l">Total étude</div>}
  statistic={{
    value: stats.studiesCount,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <InfoCircleOutlined className="text-white text-2xl" />
      </div>
    ),
  }}
/>
        <StatisticCard
  className="bg-lime-500/75 text-white rounded-lg flex mb-4 sm:mb-0"
  title={<div className="flex-1 text-l">Total assistant</div>}
  statistic={{
    value: stats.assistantsCount,
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
