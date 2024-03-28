import React from 'react'
import EngineerStudiesTable from '../../../components/Table/EngineerStudiesTable';
import { useSelector } from 'react-redux';

function Project() {
  
  const {userStudies,loading}=useSelector((state:any)=>state.studies)


  console.log(loading,'from the project page');
  
  return (
    <EngineerStudiesTable
    studies={userStudies}/>
  )
}

export default Project