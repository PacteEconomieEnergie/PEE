import React,{useEffect} from 'react'
import EngineerStudiesTable from '../../../components/Table/EngineerStudiesTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudiesByUserId } from '../../../store/studies/studySlice';
import { AppDispatch } from '../../../store';
function Project() {
  const dispatch = useDispatch<AppDispatch>();
  const {id}=useSelector((state:any)=>state.auth)
  const {userStudies}=useSelector((state:any)=>state.studies)
  console.log(userStudies,'the id');
  useEffect(()=>{
    dispatch(fetchStudiesByUserId(id))
  },[dispatch])
  return (
    <EngineerStudiesTable
    studies={userStudies}/>
  )
}

export default Project