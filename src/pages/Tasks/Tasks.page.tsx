// src/pages/TasksPage.tsx
import React from 'react';
import TasksBoard from '../../modules/Tasks/TasksBoard.module';
import { ColumnsState } from '../../modules/Tasks/TaskTypes';


const TasksPage: React.FC = () => {
    const initialColumnsState:ColumnsState = {
        '0e2f0db1-5457-46b0-949e-8032d2f9997a': {
          id: '0e2f0db1-5457-46b0-949e-8032d2f9997a',
          name: 'Todo',
          tasks: [
            { id: '26fd50b3-3841-496e-8b32-73636f6f4197', name: 'Fix bug in user interface' },
            { id: 'b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525', name: 'Update component snapshots' },
          ],
          tint: 1,
        },
        '487f68b4-1746-438c-920e-d67b7df46247': {
          id: '487f68b4-1746-438c-920e-d67b7df46247',
          name: 'In Progress',
          tasks: [
            { id: '95ee6a5d-f927-4579-8c15-2b4eb86210ae', name: 'Write unit tests for new feature' },
            { id: '5bee94eb-6bde-4411-b438-1c37fa6af364', name: 'Refactor login form' },
          ],
          tint: 2,
        },
        '25daffdc-aae0-4d73-bd31-43f73101e7c0': {
          id: '25daffdc-aae0-4d73-bd31-43f73101e7c0',
          name: 'Done',
          tasks: [
            { id: '960cbbcf-89a0-4d79-aa8e-56abbc15eacc', name: 'Deploy app to production' },
            { id: 'd3edf796-6449-4931-a777-ff66965a025b', name: 'Complete user onboarding flow' },
          ],
          tint: 3,
        },
    };
  return (
    <div>
      <TasksBoard initialColumnState={initialColumnsState} />
    </div>
  );
};

export default TasksPage;
