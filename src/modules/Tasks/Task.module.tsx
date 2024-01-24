import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task as TaskType } from './TaskTypes';

interface TaskProps {
  task: TaskType;
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
  {(provided) => (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="bg-white p-4 rounded-md shadow border border-gray-200"
    >
      {task.name}
    </div>
  )}
</Draggable>
  );
};

export default Task;
