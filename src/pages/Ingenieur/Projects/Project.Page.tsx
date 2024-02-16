import React from 'react'
import EngineerStudiesTable from '../../../components/Table/EngineerStudiesTable';
import { useSelector } from 'react-redux';

function Project() {
  
  const {userStudies}=useSelector((state:any)=>state.studies)

  
  return (
    <EngineerStudiesTable
    studies={userStudies}/>
  )
}

export default Project