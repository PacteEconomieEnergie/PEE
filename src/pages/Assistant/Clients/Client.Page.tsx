import React, { useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import { ConfigProvider } from 'antd';
// Define the data structure for the table
interface StudySummaryType {
  key: React.Key;
  clientName: string;
  totalStudies: number;
  newStudies: number;
  studiesToModify: number;
  doneStudies: number;
  inProgressStudies: number;
  toDoStudies: number;
}

// Define the columns for the table


// Mock data for the table
const mockData: StudySummaryType[] = [
  {
    key: '1',
    clientName: 'Client X',
    totalStudies: 100,
    newStudies: 80,
    studiesToModify: 20,
    doneStudies: 50,
    inProgressStudies: 30,
    toDoStudies: 20,
  },
  {
    key: '2',
    clientName: 'Client A',
    totalStudies: 150,
    newStudies: 80,
    studiesToModify: 70,
    doneStudies: 80,
    inProgressStudies: 40,
    toDoStudies: 30,
  },
  {
    key: '3',
    clientName: 'Client Z',
    totalStudies: 200,
    newStudies: 160,
    studiesToModify: 40,
    doneStudies: 110,
    inProgressStudies: 60,
    toDoStudies:30,
  },
  // ...additional data for other clients
];
const clientNames = [...new Set(mockData.map(item => item.clientName))];

const columns: TableColumnsType<StudySummaryType> = [
    {
      title: 'Client Name',
      dataIndex: 'clientName',
      filters: clientNames.map(name => ({ text: name, value: name })),
      onFilter: (value, record) => record.clientName.includes(value as string),
      width: '20%',
      sorter: (a, b) => a.clientName.localeCompare(b.clientName),
      fixed: 'left'
    },
    {
      title: 'Total Studies',
      dataIndex: 'totalStudies',
      sorter: (a, b) => a.totalStudies - b.totalStudies,
    },
    {
      title: 'New Studies',
      dataIndex: 'newStudies',
    },
    {
      title: 'Studies to Modify',
      dataIndex: 'studiesToModify',
    },
    {
      title: 'Done',
      dataIndex: 'doneStudies',
    },
    {
      title: 'In Progress',
      dataIndex: 'inProgressStudies',
    },
    {
      title: 'To Do',
      dataIndex: 'toDoStudies',
    },
  ];
const ClientPage: React.FC = () => {
  const [data, setData] = useState(mockData); // State to hold data

  const onChange = (pagination:any, filters:any, sorter:any, extra:any) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const paginationConfig = {
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '30'],
    showQuickJumper: true,
  };
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
