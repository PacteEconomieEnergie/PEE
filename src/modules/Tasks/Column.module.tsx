import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task.module';
import { Column as ColumnType } from './TaskTypes';

interface ColumnProps {
  column: ColumnType;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  return (
    <div className="bg-gray-200 rounded-lg shadow w-80 min-w-80 p-4 flex flex-col gap-4">
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
          {column.tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
  );
};

export default Column;


