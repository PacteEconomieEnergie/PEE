// src/pages/TasksPage.tsx
import React,{useEffect, useMemo} from 'react';
import TasksBoard from '../../../modules/Tasks/TasksBoard.module';
import { ColumnsState } from '../../../modules/Tasks/TaskTypes';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudiesByUserId } from '../../../store/studies/studySlice';
import { getAuthInfo } from '../../../utils/storage/tokenUtils';
import { AppDispatch } from '../../../store';
const TasksPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = getAuthInfo()?.id; // Assuming getAuthInfo() returns the logged-in user's info or undefined
  const { userStudies, loading, error } = useSelector((state: any) => state.studies);
  console.log("===>1",userStudies);
  
  useEffect(() => {
    const numericUserId = Number(userId);
    if (!isNaN(numericUserId) && numericUserId > 0) { // Check if userId is a valid number and greater than 0
      dispatch(fetchStudiesByUserId(numericUserId));
    }else {console.log("something is happening here ");
    }
  }, [dispatch, userId]);

  const initialColumnsState: ColumnsState = useMemo(() => {
    // Assuming these statuses match the enum values in your schema
    const statuses = ['toDo', 'inProgress', 'Done', 'ManqueInformation'];
    const columns: ColumnsState = {};

    statuses.forEach((status) => {
      columns[status] = {
        id: status,
        name: status,
        tasks: userStudies?.filter((study: any) => study.studies.Status === status).map((study: any) => ({
          id: study.studies.IdStudies.toString(),
          name: `${study.studies.FullName} - ${study.studies.TypeEtude} - ${study.studies.Category} - ${study.studies.Nature} - ${study.studies.client?.ClientName || 'Unknown Client'}`,
          studyData: study,
        })),
        tint: statuses.indexOf(status) + 1, // or any other logic to determine tint
      };
    });

    return columns;
  }, [userStudies]);
  console.log(initialColumnsState,'from the first one');
  
  return (
    <div className='flex grid-column-3'>
      <TasksBoard initialColumnState={initialColumnsState} loading={loading} />
    </div>
  );
};

export default TasksPage;
