import React,{useState,useEffect} from 'react'
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { InfoCircleOutlined,CheckCircleOutlined, SyncOutlined, ClockCircleOutlined,SettingOutlined,EditOutlined } from '@ant-design/icons';
// import { AnimatedCard } from '../../../components/Cards/AnimatedCard';
import RcResizeObserver from 'rc-resize-observer';
import { Table,Avatar,Tooltip } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import { ConfigProvider } from 'antd';
import { useSelector } from 'react-redux';
import studyService from '../../../Services/Api/Studies/StudiesService';
import { Skeleton } from 'antd';
function OverviewAssistant() {

  const {studyStats}=useSelector((state:any)=>state.studies)
  const [responsive, setResponsive] = useState(false);
  const [engineers, setEngineers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Start loading
    studyService.getEngineersStudies().then((response:any) => {
      setEngineers(response);
      setLoading(false); // Stop loading once the data is fetched
    }).catch((error) => {
      console.error("Error fetching engineers' studies:", error);
      setLoading(false); // Stop loading on error as well
    });
  }, []);
  




const determineEngineerStatus = (engineer:any) => {
  // Assuming that engineer object includes counts for studiesReceived, studiesCompleted, studiesInProgress, and studiesToDo
  const { studiesReceived, studiesCompleted, studiesInProgress, studiesToDo } = engineer;

  

  if (studiesReceived === studiesCompleted) {
    return 'ready'; // Ready for new studies
  } else if (studiesInProgress ) {
    return 'inProgress';
  } else if (studiesCompleted > studiesToDo) {
    return 'available';
  } else {
    return 'available'; // Default to available if none of the above conditions match
  }
};
  
  const getStatusIcon = (status:any, engineer:any) => {
    let icon;
    let tooltipText;
  
    // Extracting study counts from the engineer object
    const { studiesReceived, studiesCompleted, studiesInProgress, studiesToDo } = engineer;
  
    switch (status) {
      case 'inProgress':
        icon = <SyncOutlined spin style={{ color: 'orange' }} />;
        tooltipText = `In Progress: ${studiesInProgress} study/studies`;
        break;
      case 'ready':
        icon = <CheckCircleOutlined style={{ color: 'green' }} />;
        tooltipText = `Ready for new studies. Completed: ${studiesCompleted}/${studiesReceived} received`;
        break;
      case 'available':
      default:
        icon = <ClockCircleOutlined style={{ color: 'blue' }} />;
        tooltipText = `Available. To Do: ${studiesToDo}, Completed: ${studiesCompleted}`;
        break;
    }
  
    return (
      <Tooltip title={tooltipText}>
        <div className="cursor-pointer">
          {icon}
        </div>
      </Tooltip>
    );
  };
  
  // const isWithinTimeFrame = (date:any, timeFrame:any) => {
  //   const now = new Date();
  //   const targetDate = new Date(date);
  
  //   switch (timeFrame) {
  //     case 'day':
  //       return targetDate.toDateString() === now.toDateString();
  //     case 'week':
  //       const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
  //       return targetDate > oneWeekAgo;
  //     case 'month':
  //       const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  //       return targetDate > oneMonthAgo;
  //     default:
  //       return true;
  //   }
  // };


  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: (text: any, record: any) => {
        // Determine the display text: if 'text' is not 'unnamed engineer', use 'text'; otherwise, use record.email
        const displayText = text !== 'Unnamed Engineer' ? text : record.Email;
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={record.photo} />
            <span style={{ marginLeft: 8 }}>{displayText}</span>
          </div>
        );
      },
      
    },
    {
      title: 'Status',
      key: 'status',
      render: (_:any, engineer:any) => (
        <div style={{ textAlign: 'center' }}>
          {getStatusIcon(determineEngineerStatus(engineer), engineer)}
        </div>
      ),
    },
    {
      title: 'Étude Reçu',
      // key: 'studiesReceived',
      dataIndex: 'studiesReceived',
      // render: (studiesReceived:any) => (
      //   <div style={{ textAlign: 'center' }}>{studiesReceived}</div>
      // ),
      sorter:(a:any,b:any)=>a.studiesReceived - b.studiesReceived
    },
    {
      title: 'Étude Terminer',
      key: 'studiesCompleted',
      dataIndex: 'studiesCompleted',
      sorter: (a:any,b:any) => a.studiesCompleted - b.studiesCompleted,
      // render: (studiesCompleted:any) => (
      //   <div style={{ textAlign: 'center' }}>{studiesCompleted}</div>
      // ),
    },
    {
      title: 'Étude En Cour',
      key: 'studiesInProgress',
      dataIndex: 'studiesInProgress',
      render: (studiesInProgress:any) => (
        <div style={{ textAlign: 'center' }}>{studiesInProgress}</div>
      ),
    },
    {
      title: 'Étude à faire',
      key: 'studiesToDo',
      dataIndex: 'studiesToDo',
      render: (studiesToDo:any) => (
        <div style={{ textAlign: 'center' }}>{studiesToDo}</div>
      ),
    },

  ];


  // const getStudyStatusColor = (status:any) => {
  //   switch (status) {
  //     case 'Done': return 'green';
  //     case 'inProgress': return 'orange';
  //     case 'toDo': return 'red';
  //     default: return 'default';
  //   }
  // };







  const paginationConfig = {
    defaultPageSize: 5,
    showSizeChanger: true,
    pageSizeOptions: ['5','10', '20', '30'],
    
  };









  return (
    <ConfigProvider locale={enUS}>
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
      className="shadow-xl rounded-lg">
         <ProCard
        direction={responsive ? "column" : "row"}
        gutter={16}
        className={responsive ? "space-y-4" : "space-x-0"}
      >

<StatisticCard
  className="shadow-lg rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 mb-4 sm:mb-0 text-white transform transition duration-500 hover:scale-105"
  title={<div className="flex-1 text-l">Total étude </div>}
  statistic={{
    value: studyStats.total,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <SettingOutlined className="text-white text-2xl" />
      </div>
    ),
  }}
/>
  
        <StatisticCard
  className="shadow-lg rounded-xl bg-gradient-to-r from-green-500 to-green-400 mb-4 sm:mb-0 text-white transform transition duration-500 hover:scale-105"
 
  title={<div className="flex-1 text-l">Total noveaux étude </div>}
  statistic={{
    value: studyStats.typeEtude.NouvelleEtude,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <InfoCircleOutlined className="text-white text-2xl" />
      </div>
    ),
  }}
/>
        <StatisticCard
  className="shadow-lg rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-400 mb-4 sm:mb-0 text-white transform transition duration-500 hover:scale-105"
  title={<div className="flex-1 text-l">Total étude Modifier</div>}
  statistic={{
    value: studyStats.typeEtude.Retouche,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <EditOutlined className="text-white text-2xl" />
      </div>
    ),
  }}
/>

        </ProCard>
       
        <ProCard
          title="Engineers List"
          bordered
          headerBordered
          style={{ height: '100%', maxWidth: '96%',margin:10 }}
        >
            {loading ? (
    <Skeleton active paragraph={{ rows: 4 }} />
  ) : (
    <Table
      columns={columns}
      dataSource={engineers}
      pagination={paginationConfig}
    />
  )}

        </ProCard>
     






      </ProCard>
    </RcResizeObserver>
    </ConfigProvider>
  )
}

export default OverviewAssistant