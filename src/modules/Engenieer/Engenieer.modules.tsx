import React, { useState, useEffect } from "react";
// import { EyeOutlined, EditOutlined, DeleteOutlined, CaretDownOutlined } from '@ant-design/icons'; // Import necessary icons
import { ProCard } from '@ant-design/pro-components';
import {  Col, Row,Avatar ,Table} from 'antd';
// import { AnimatedCard } from "../../components/Cards/AnimatedCard";
import BulletChart from "../../components/Charts/BulletChart";
import studyService from "../../Services/Api/Studies/StudiesService";
export const Engineer:React.FC = () => {
    // const [dropdownItem, setDropdownItem] = useState<any>(null);
  // Sample data for demonstration (replace this with your actual data or fetch it)
  const [engineers, setEngineers] = useState<any>(null);
  useEffect(() => {
    studyService.getEngineersStudies().then((response:any) => {
     
      setEngineers(response);
    }).catch((error) => {
      console.error("Error fetching engineers' studies:", error);
    });
  }, []);
  
  // Sort engineers by studies done to identify top performers
  // const sortedEngineers = engineers?.sort((a:any, b:any) => b.studiesCompleted- a.studiesCompleted);
  // const topThreeEngineers = sortedEngineers.slice(0, 3);

 
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
      dataIndex: 'Email',
      key: 'email',
    },
    {
      title: 'studies Completed',
      dataIndex: 'studiesCompleted',
      key: 'studiesCompleted',
    },
  ];
  return (
   <>
   {/* <AnimatedCard/>  */}
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


