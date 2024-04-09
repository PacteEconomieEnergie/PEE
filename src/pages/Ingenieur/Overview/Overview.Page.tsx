import React,{useState,useEffect} from 'react'
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { InfoCircleOutlined, CheckCircleOutlined, SyncOutlined, ClockCircleOutlined, EditOutlined, CheckOutlined, HourglassOutlined, SettingOutlined } from '@ant-design/icons';
import { AnimatedCard } from '../../../components/Cards/AnimatedCard';
import RcResizeObserver from 'rc-resize-observer';
import { useDispatch, useSelector } from 'react-redux';

import RingProgress from '../../../components/Charts/RingProgress';
import { Progress, Space } from "antd";
export default function Overview() {
  const conicColors = { "0%": "#87d068", "50%": "#ffe58f", "100%": "#ffccc7" };
  const { userStudies, loading, error,userStudyStats } = useSelector((state: any) => state.studies);

  const [responsive, setResponsive] = useState(false);


  const donePercentage = userStudyStats?.total > 0 ? (userStudyStats.status.Done / userStudyStats.total) * 100 : 0;
  const inProgressPercentage = userStudyStats.total > 0 ? (userStudyStats.status.inProgress / userStudyStats.total) * 100 : 0;
  const toDoPercentage = userStudyStats.total > 0 ? (userStudyStats.status.toDo / userStudyStats.total) * 100 : 0;

  
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
      className="shadow-xl rounded-lg"
       
    >
      {/* <AnimatedCard content={"vous êtes le premier dans votre équipe "}/> */}
      {/* Statistic Cards in a Single Row */}
      <ProCard
        direction={responsive ? "column" : "row"}
        gutter={16}
        className={responsive ? "space-y-4" : "space-x-0"}
        title="Study Overview"
      >

<StatisticCard
  className="shadow-lg rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 mb-4 sm:mb-0 text-white transform transition duration-500 hover:scale-105"
  title={<div className="flex-1 text-l">Total Studies</div>}
  statistic={{
    value: userStudyStats.total,
    prefix:(
      <div className="absolute top-10 right-6  ">
        <SettingOutlined className="text-white" />
      </div>
    ) 
    
  }}
/>
        <StatisticCard
  className="shadow-lg rounded-xl bg-gradient-to-r from-green-500 to-green-400 mb-4 sm:mb-0 text-white transform transition duration-500 hover:scale-105"
  title={<div className="flex-1 text-l">Completed Studies</div>}
  statistic={{
    value: userStudyStats.status.Done,
    prefix: (
      <div className="absolute top-10 right-6  ">
         <CheckCircleOutlined className="text-white" />
      </div>
    ),
  }}
/>
        <StatisticCard
  className="shadow-lg rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-400 mb-4 sm:mb-0 text-white transform transition duration-500 hover:scale-105"
  title={<div className="flex-1 text-l">Studies in Progress</div>}
  statistic={{
    value: userStudyStats.status.inProgress,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <SyncOutlined spin className="text-white" />
      </div>
    ),
  }}
/>
        <StatisticCard
  className="shadow-lg rounded-xl bg-gradient-to-r from-red-500 to-red-400 mb-4 sm:mb-0 text-white transform transition duration-500 hover:scale-105"
  title={<div className="flex-1 text-l">Pending Studies</div>}
  statistic={{
    value: userStudyStats.status.toDo,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <ClockCircleOutlined className="text-white" />
      </div>
    ),
  }}
/>

        </ProCard>
        
        <ProCard
        direction={responsive ? "column" : "row"}
        gutter={16}
        className={responsive ? "space-y-4" : "space-x-0"}
        title="Modifications Overview"
      >      
      <StatisticCard
  className="shadow-lg rounded-xl bg-gradient-to-r from-purple-500 to-purple-400 mb-4 sm:mb-0 text-white transform transition duration-500 hover:scale-105"
  title={<div className="flex-1 text-l">Total Modifications</div>}
  statistic={{
    value: userStudyStats.typeEtude.Retouche,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <EditOutlined className="text-white" />
      </div>
    ),
  }}
/>    
      <StatisticCard
  className="shadow-lg rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-white mb-4 sm:mb-0 transform transition duration-500 hover:scale-105"
  title={<div className="flex-1 text-l">Completed Modifications</div>}
  statistic={{
    value: userStudyStats.retouche.done,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <CheckOutlined className="text-white" />
      </div>
    ),
  }}
/>    
      <StatisticCard
  className="shadow-lg rounded-xl bg-gradient-to-r from-lime-500 to-lime-400 text-white mb-4 sm:mb-0 transform transition duration-500 hover:scale-105"
  title={<div className="flex-1 text-l">Modifications in Progress</div>}
  statistic={{
    value: userStudyStats.retouche.inProgress,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <HourglassOutlined className="text-white" />
      </div>
    ),
  }}
/>    
      <StatisticCard
  className="shadow-lg rounded-xl bg-gradient-to-r from-pink-500 to-pink-400 text-white mb-4 sm:mb-0 transform transition duration-500 hover:scale-105"
  title={<div className="flex-1 text-l">Pending Modifications</div>}
  statistic={{
    value: userStudyStats.retouche.toDo,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <InfoCircleOutlined className="text-white" />
      </div>
    ),
  }}
/>    
        </ProCard>



        
        <div className="flex justify-around overflow-x-auto p-4 space-x-4">
        
      <RingProgress status="Terminer" percent={Math.round(donePercentage)}   />
      <RingProgress status="Encours" percent={Math.round(inProgressPercentage)}   />
      <RingProgress status="En Attend" percent={Math.round(toDoPercentage)}   />
    </div>



       {/* the ring progress will be here */}
      </ProCard>





    </RcResizeObserver>
  )
}
