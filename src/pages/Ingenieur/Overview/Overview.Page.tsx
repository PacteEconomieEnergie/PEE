import React,{useState,useEffect} from 'react'
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { InfoCircleOutlined } from '@ant-design/icons';
import { AnimatedCard } from '../../../components/Cards/AnimatedCard';
import RcResizeObserver from 'rc-resize-observer';
import { useDispatch, useSelector } from 'react-redux';

import RingProgress from '../../../components/Charts/RingProgress';
import { Progress, Space } from "antd";
export default function Overview() {
  const conicColors = { "0%": "#87d068", "50%": "#ffe58f", "100%": "#ffccc7" };
  const { userStudies, loading, error,studyStats } = useSelector((state: any) => state.studies);

  const [responsive, setResponsive] = useState(false);


  const donePercentage = studyStats.total > 0 ? (studyStats.status.Done / studyStats.total) * 100 : 0;
  const inProgressPercentage = studyStats.total > 0 ? (studyStats.status.inProgress / studyStats.total) * 100 : 0;
  const toDoPercentage = studyStats.total > 0 ? (studyStats.status.toDo / studyStats.total) * 100 : 0;

  
  return (
    <RcResizeObserver
    key="resize-observer"
    onResize={(offset) => {
      setResponsive(offset.width < 596);
    }}>
      


      <ProCard
      direction="column"
      gutter={[1, responsive ? 24 : 16]}
      headerBordered
      bordered
       
    >
      {/* <AnimatedCard content={"vous êtes le premier dans votre équipe "}/> */}
      {/* Statistic Cards in a Single Row */}
      <ProCard
        direction={responsive ? "column" : "row"}
        gutter={16}
        className={responsive ? "space-y-4" : "space-x-0"}
        title="Nouvelle Etude"
      >

<StatisticCard
  className="bg-tertiare text-white rounded-lg flex mb-4 sm:mb-0"
  title={<div className="flex-1 text-l">Total étude effectué</div>}
  statistic={{
    value: studyStats.total,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <InfoCircleOutlined className="text-white text-2xl" />
      </div>
    ),
  }}
/>
        <StatisticCard
  className="bg-quadiare text-white rounded-lg flex mb-4 sm:mb-0"
  title={<div className="flex-1 text-l">Total étude terminer</div>}
  statistic={{
    value: studyStats.status.Done,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <InfoCircleOutlined className="text-white text-2xl" />
      </div>
    ),
  }}
/>
        <StatisticCard
  className="bg-secondaire text-white rounded-lg flex mb-4 sm:mb-0"
  title={<div className="flex-1 text-l">Total étude en cours</div>}
  statistic={{
    value: studyStats.status.inProgress,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <InfoCircleOutlined className="text-white text-2xl" />
      </div>
    ),
  }}
/>
        <StatisticCard
  className="bg-primare text-white rounded-lg flex mb-4 sm:mb-0"
  title={<div className="flex-1 text-l">Total étude En Attend</div>}
  statistic={{
    value: studyStats.status.toDo,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <InfoCircleOutlined className="text-white text-2xl" />
      </div>
    ),
  }}
/>

        </ProCard>
        
        <ProCard
        direction={responsive ? "column" : "row"}
        gutter={16}
        className={responsive ? "space-y-4" : "space-x-0"}
        title="Modification"
      >      
      <StatisticCard
  className="bg-primare text-white rounded-lg flex mb-4 sm:mb-0"
  title={<div className="flex-1 text-l">Total Modification effectué</div>}
  statistic={{
    value: studyStats.typeEtude.Retouche,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <InfoCircleOutlined className="text-white text-2xl" />
      </div>
    ),
  }}
/>    
      <StatisticCard
  className="bg-tertiare text-white rounded-lg flex mb-4 sm:mb-0"
  title={<div className="flex-1 text-l">Total Modification Terminer</div>}
  statistic={{
    value: studyStats.retouche.done,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <InfoCircleOutlined className="text-white text-2xl" />
      </div>
    ),
  }}
/>    
      <StatisticCard
  className="bg-secondaire text-white rounded-lg flex mb-4 sm:mb-0"
  title={<div className="flex-1 text-l">Total Modification En Cours</div>}
  statistic={{
    value: studyStats.retouche.inProgress,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <InfoCircleOutlined className="text-white text-2xl" />
      </div>
    ),
  }}
/>    
      <StatisticCard
  className="bg-quadiare text-white rounded-lg flex mb-4 sm:mb-0"
  title={<div className="flex-1 text-l">Total Modification En Attend</div>}
  statistic={{
    value: studyStats.retouche.toDo,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <InfoCircleOutlined className="text-white text-2xl" />
      </div>
    ),
  }}
/>    
        </ProCard>



        
        <div className="lg:flex lg:overflow-visible lg:justify-around overflow-x-auto p-4 space-x-4">
        
      <RingProgress status="Terminer" percent={Math.round(donePercentage)}   />
      <RingProgress status="Encours" percent={Math.round(inProgressPercentage)}   />
      <RingProgress status="En Attend" percent={Math.round(toDoPercentage)}   />
    </div>



       {/* the ring progress will be here */}
      </ProCard>





    </RcResizeObserver>
  )
}
