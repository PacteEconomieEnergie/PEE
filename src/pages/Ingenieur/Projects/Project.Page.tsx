import React from 'react'
import EngineerStudiesTable from '../../../components/Table/EngineerStudiesTable';
import { useSelector } from 'react-redux';
import { Skeleton } from 'antd';
function Project() {
  
  const {userStudies,loading}=useSelector((state:any)=>state.studies)


  
  
  if (loading) {
    return <Skeleton active paragraph={{ rows: 1 }} />;
  }

  return <EngineerStudiesTable studies={userStudies} />;
}

export default Project