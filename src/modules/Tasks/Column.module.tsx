import React, { useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task.module';
import { Column as ColumnType } from './TaskTypes';
import { Skeleton } from 'antd';

interface ColumnProps {
  column: ColumnType;
  loading: boolean;
}

const Column: React.FC<ColumnProps> = ({ column, loading }) => {
  
  useEffect(()=>{},[loading])
  return (
    <div className="bg-gray-200 rounded-lg shadow w-96 min-w-96 p-4 flex flex-col gap-4">
    <h2 className="text-lg font-bold mb-3">{column.name}</h2>
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`flex flex-col gap-2 ${snapshot.isDraggingOver ? 'bg-gray-100' : ''}`}
          style={{
            minHeight: '50px', // Ensure the droppable area has a minimum height
            backgroundColor: snapshot.isDraggingOver ? 'gray-400' : 'inherit',
          }}
        >
          {loading ? (
              // Render Skeleton instead of actual tasks when loading
              <Skeleton active paragraph={{ rows: 1 }} />
            ) : (
              column.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))
            )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
  );
};

export default Column;


