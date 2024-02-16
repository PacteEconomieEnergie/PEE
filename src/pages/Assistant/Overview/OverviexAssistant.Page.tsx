import React,{useState} from 'react'
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { InfoCircleOutlined,CheckCircleOutlined, SyncOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { AnimatedCard } from '../../../components/Cards/AnimatedCard';
import RcResizeObserver from 'rc-resize-observer';
import { Table,Col,Avatar, Row,Tooltip } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import { ConfigProvider } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
function OverviewAssistant() {

  const {studyStats}=useSelector((state:any)=>state.studies)
  const [responsive, setResponsive] = useState(false);
  const [engineers, setEngineers] = useState([
    { id: 1, name: "Engineer A", tasks: [{ status: 'Todo' }, { status: 'In Progress' }], photo: "/assets/icons/avatar1.svg", studiesReceived: 20, 
    studiesCompleted: 15, 
    studiesInProgress: 3
    ,studiesToDo:2, lastActivityDate: new Date('2023-08-01') },
    { id: 2, name: "Engineer B", tasks: [{ status: 'Done' }], photo: "/assets/icons/avatar2.svg", studiesReceived: 10, 
    studiesCompleted: 10, 
    studiesInProgress: 3
    ,studiesToDo:2, lastActivityDate: new Date('2023-08-10') },
    { id: 3, name: "Engineer C", tasks: [{ status: 'Todo' }], photo: "/assets/icons/avatar1.svg" ,studiesReceived: 2,lastActivityDate: new Date('2023-09-01') },
    { id: 4, name: "Engineer D", tasks: [], photo: "/assets/icons/avatar2.svg" , studiesReceived: 30, 
    studiesCompleted: 5, 
    studiesInProgress: 3
    ,studiesToDo:2,
    lastActivityDate: new Date('2023-10-01')},
    // ... more engineers
  ]);
console.log("====> stats",studyStats);

  const determineEngineerStatus = (engineerTasks:any) => {
    const hasInProgressTask = engineerTasks.some((task:any) => task.status === 'In Progress');
    const hasTodoTask = engineerTasks.some((task:any) => task.status === 'Todo');
    const hasDoneTask = engineerTasks.some((task:any) => task.status === 'Done');
  
    if (hasInProgressTask || hasTodoTask) {
      return 'inProgress';
    } else if (hasDoneTask && !hasInProgressTask && !hasTodoTask) {
      return 'done';
    } else {
      return 'available';
    }
  };
  
  const getStatusIcon = (status:any) => {
    let icon;
    let tooltipText;
  
    switch (status) {
      case 'inProgress':
        icon = <SyncOutlined spin style={{ color: 'orange' }} />;
        tooltipText = "In Progress";
        break;
      case 'done':
        icon = <CheckCircleOutlined style={{ color: 'green' }} />;
        tooltipText = "Done";
        break;
      case 'available':
      default:
        icon = <ClockCircleOutlined style={{ color: 'blue' }} />;
        tooltipText = "Available";
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
  const isWithinTimeFrame = (date:any, timeFrame:any) => {
    const now = new Date();
    const targetDate = new Date(date);
  
    switch (timeFrame) {
      case 'day':
        return targetDate.toDateString() === now.toDateString();
      case 'week':
        const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        return targetDate > oneWeekAgo;
      case 'month':
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        return targetDate > oneMonthAgo;
      default:
        return true;
    }
  };
  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: (text:any, record:any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={record.photo} />
          <span style={{ marginLeft: 8 }}>{text}</span>
        </div>
      ),
      
    },
    {
      title: 'Status',
      key: 'status',
      render: (_:any, engineer:any) => (
        <div style={{ textAlign: 'center' }}>
          {getStatusIcon(determineEngineerStatus(engineer.tasks))}
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
    {
      title: 'Last Activity',
      dataIndex: 'lastActivityDate',
      render: (date:any) => date.toLocaleDateString(),
      filters: [
        { text: 'Day', value: 'day' },
        { text: 'Week', value: 'week' },
        { text: 'Month', value: 'month' }
      ],
      onFilter: (value:any, record:any) => isWithinTimeFrame(record.lastActivityDate, value),
    },
  ];










  const paginationConfig = {
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '30'],
    showQuickJumper: true,
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
      bordered>
         <ProCard
        direction={responsive ? "column" : "row"}
        gutter={16}
        className={responsive ? "space-y-4" : "space-x-0"}
      >

<StatisticCard
  className="bg-tertiare text-white rounded-lg flex mb-4 sm:mb-0"
  title={<div className="flex-1 text-l">Total étude </div>}
  statistic={{
    value: studyStats.total,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <InfoCircleOutlined className="text-white text-2xl" />
      </div>
    ),
  }}
/>
  {/* <StatisticCard
  className="bg-quadiare text-white rounded-lg flex mb-4 sm:mb-0"
  title={<div className="flex-1 text-l">Total étude Dispatché</div>}
  statistic={{
    value: 34,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <InfoCircleOutlined className="text-white text-2xl" />
      </div>
    ),
  }}
/> */}
        <StatisticCard
  className="bg-secondaire text-white rounded-lg flex mb-4 sm:mb-0"
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
  className="bg-primare text-white rounded-lg flex mb-4 sm:mb-0"
  title={<div className="flex-1 text-l">Total étude Modifier</div>}
  statistic={{
    value: studyStats.typeEtude.Retouche,
    prefix: (
      <div className="absolute top-10 right-6  ">
        <InfoCircleOutlined className="text-white text-2xl" />
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
          <Table
            columns={columns}
            dataSource={engineers}
            pagination={paginationConfig} 
          />
        </ProCard>
     






      </ProCard>
    </RcResizeObserver>
    </ConfigProvider>
  )
}

export default OverviewAssistant