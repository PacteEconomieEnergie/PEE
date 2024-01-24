import React, { useState, useEffect } from "react";
import { EyeOutlined, EditOutlined, DeleteOutlined, CaretDownOutlined } from '@ant-design/icons'; // Import necessary icons
import { ProCard } from '@ant-design/pro-components';
import { Card, Col, Row,List,Avatar ,Table} from 'antd';
import { AnimatedCard } from "../../components/Cards/AnimatedCard";
import BulletChart from "../../components/Charts/BulletChart";
export const Engineer:React.FC = () => {
    const [dropdownItem, setDropdownItem] = useState<any>(null);
  // Sample data for demonstration (replace this with your actual data or fetch it)
  const [engineers, setEngineers] = useState([
    { id: 1, name: "Engineer A", studiesDone: 20, email: "a@example.com", photo: "/assets/icons/avatar1.svg" },
    { id: 2, name: "Engineer B", studiesDone: 15, email: "b@example.com", photo: "/assets/icons/avatar2.svg" },
    { id: 2, name: "Engineer B", studiesDone: 15, email: "b@example.com", photo: "/assets/icons/avatar2.svg" },
    { id: 2, name: "Engineer B", studiesDone: 15, email: "b@example.com", photo: "/assets/icons/avatar2.svg" },
    // ... more engineers
  ]);

  // Sort engineers by studies done to identify top performers
  const sortedEngineers = engineers.sort((a, b) => b.studiesDone - a.studiesDone);
  const topThreeEngineers = sortedEngineers.slice(0, 3);

 
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Studies Done',
      dataIndex: 'studiesDone',
      key: 'studiesDone',
    },
  ];
  return (
   <>
   <AnimatedCard/> 
   <Row>
   <Col span={14}>
        {/* Content that will go on the left side of the line */}
        <ProCard bordered
          headerBordered style={{margin:10,marginLeft:5}}>
            <BulletChart/>
            </ProCard>
      </Col>
      <Col span={10}>
        <ProCard
          title="Engineers List"
          bordered
          headerBordered
          style={{ height: '100%', maxWidth: '96%',margin:10 }}
        >
          <Table
            columns={columns}
            dataSource={engineers}
            
          />
        </ProCard>
      </Col>
    </Row>
   </>
  );

};


