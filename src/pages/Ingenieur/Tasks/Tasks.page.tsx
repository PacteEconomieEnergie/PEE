// src/pages/TasksPage.tsx
import React,{useEffect, useMemo} from 'react';
import TasksBoard from '../../../modules/Tasks/TasksBoard.module';
import { ColumnsState } from '../../../modules/Tasks/TaskTypes';
import { useSelector } from 'react-redux';

const TasksPage: React.FC = () => {
 
  const { userStudies, loading, error } = useSelector((state: any) => state.studies);
 
  
 

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
  
  
  return (
    <div className='flex grid-column-3'>
      <TasksBoard initialColumnState={initialColumnsState} loading={loading} />
    </div>
  );
};

export default TasksPage;
