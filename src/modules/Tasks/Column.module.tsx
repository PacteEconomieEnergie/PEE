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
  const getBackgroundColor = (isDraggingOver: boolean) => {
    if (isDraggingOver) return 'bg-teal-700';
    return 'bg-gray-300';
  }
  return (
    <div className="bg-gray-300 rounded-lg shadow-lg w-full max-w-md p-4 flex flex-col gap-4">
    <h2 className="text-xl font-bold mb-3">{column.name}</h2>
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`flex flex-col gap-2 rounded-lg p-2 ${getBackgroundColor(snapshot.isDraggingOver)}`}
          style={{
            minHeight: '100px'
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


