import React,{useEffect} from 'react';
import StudiesTable from '../../components/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStudies } from '../../store/studies/studySlice';
import { AppDispatch } from '../../store';
import { Spin, Alert } from 'antd';
const Studies: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { studies, isLoading, error } = useSelector((state: any) => state.studies);
  

  useEffect(() => {
    dispatch(fetchAllStudies()); // Dispatch action to fetch studies
  }, [dispatch]);
  const downloadFile = (file: string) => {
    // Logic to download the selected file (replace with your actual download logic)
    
  };
  
  const handleActionClick = (action: string, record: any) => {
    
    // Add logic for each action here
  };
  if (isLoading) {
    return <Spin size="large" />;
  }

  // Render error message
  if (error) {
    return <Alert message="Error loading studies" type="error" />;
  }
  return ( <div className=" overflow-y-auto">
  <StudiesTable
    studies={studies}
    onActionClick={handleActionClick}
    onFileDownload={downloadFile}
  />
</div>
   
  );
};

 export default Studies;
