import React, { useState, useEffect } from 'react';
import { Table,Tooltip } from 'antd';
import type { TableColumnsType } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import enUS from 'antd/lib/locale/en_US';
import { ConfigProvider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { fetchClientsStudies } from '../../../store/Clients/clientSlice';

interface StudySummaryType {
  key: React.Key;
  clientName: string;
  totalStudies: number;
  newStudies: number;
  studiesToModify: number;
  doneStudies: number;
  inProgressStudies: number;
  toDoStudies: number;
  retoucheStudies: {
    total: number;
    completed: number;
    inProgress: number;
    toDo: number;
  };
}

const ClientPage: React.FC = () => {
  const { clientsStudies } = useSelector((state: any) => state.client);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchClientsStudies());
  }, [dispatch]);

  // Convert the fetched data to the format expected by the table
  useEffect(() => {
    if (clientsStudies) {
      const formattedData = clientsStudies.map((client: any, index: number) => ({
        key: index,
        clientName: client.clientName,
        totalStudies: client.studiesReceived,
        newStudies: client.studies.filter((study: any) => study.type === 'NouvelleEtude').length,
        studiesToModify: client.retoucheStudies.total,
        doneStudies: client.studiesCompleted,
        inProgressStudies: client.studiesInProgress,
        toDoStudies: client.studiesToDo,
        retoucheStudies: client.retoucheStudies,
      }));
      setData(formattedData);
    }
  }, [clientsStudies]);

  const [data, setData] = useState<StudySummaryType[]>([]);

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  console.log("===> Clients Studies", clientsStudies);

  const paginationConfig = {
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '30'],
    showQuickJumper: true,
  };
  const columns: TableColumnsType<StudySummaryType> = [
    {
      title: 'Client Name',
      dataIndex: 'clientName',
      key: 'clientName',
      sorter: (a, b) => a.clientName.localeCompare(b.clientName),
    },
    {
      title: 'Total Studies',
      dataIndex: 'totalStudies',
      key: 'totalStudies',
      sorter: (a, b) => a.totalStudies - b.totalStudies,
    },
    {
      title: 'New Studies',
      dataIndex: 'newStudies',
      key: 'newStudies',
    },
    {
      title: 'Studies to Modify',
      dataIndex: 'studiesToModify',
      key: 'studiesToModify',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        <span>{text}</span> {/* Display the total number of studies to modify */}
        <Tooltip 
          title={
            <>
              <p>Completed: {record.retoucheStudies.completed}</p>
              <p>In Progress: {record.retoucheStudies.inProgress}</p>
              <p>To Do: {record.retoucheStudies.toDo}</p>
            </>
          }
        >
          <InfoCircleOutlined style={{ cursor: 'pointer',marginLeft: '10px'}} />
        </Tooltip>
      </div>
      ),
    },
    {
      title: 'Done',
      dataIndex: 'doneStudies',
      key: 'doneStudies',
    },
    {
      title: 'In Progress',
      dataIndex: 'inProgressStudies',
      key: 'inProgressStudies',
    },
    {
      title: 'To Do',
      dataIndex: 'toDoStudies',
      key: 'toDoStudies',
    }
  ]
  return (
    <ConfigProvider locale={enUS}>
      <div className="client-page-container">
        <Table 
          columns={columns} 
          dataSource={data} 
          onChange={onChange}
          pagination={paginationConfig} 
        />
      </div>
    </ConfigProvider>
  );
};

export default ClientPage;
