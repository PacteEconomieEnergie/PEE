import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task as TaskType } from './TaskTypes';
import { useDispatch } from 'react-redux';
import { showStudySidePanel } from '../../store/sidebar/studySidePanelSlice';
interface TaskProps {
  task: TaskType;
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(showStudySidePanel({ studyData: task}));
  }
 
  
  return (
    <Draggable draggableId={task.id} index={index}>
  {(provided) => (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="bg-white p-4 rounded-md shadow border border-gray-200 cursor-pointer"
      onClick={handleClick}
    >
      {task.name}
    </div>
  )}
</Draggable>
  );
};

export default Task;
