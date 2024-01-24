import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable,DropResult } from 'react-beautiful-dnd';
import { ColumnsState } from './TaskTypes';
import Column from './Column.module';
interface TasksBoardProps {
    initialColumnState: ColumnsState;
  }
  const TasksBoard: React.FC<TasksBoardProps> = ({ initialColumnState }) => {
  const [columns, setColumns] = useState<ColumnsState>(initialColumnState);

  const handleDragAndDrop = (result:any) => {
    console.log("dragged");
    
    const { source, destination } = result;
// console.log(`The source:${source} and The destination: ${destination}`);

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start.id === finish.id) {
      const newTaskIds = Array.from(start.tasks);
      const [reorderedItem] = newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, reorderedItem);

      const newColumn = {
        ...start,
        tasks: newTaskIds,
      };

      const newState = {
        ...columns,
        [newColumn.id]: newColumn,
      };

      setColumns(newState);
    } else {
      const startTaskIds = Array.from(start.tasks);
      const [movedTask] = startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        tasks: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.tasks);
      finishTaskIds.splice(destination.index, 0, movedTask);
      const newFinish = {
        ...finish,
        tasks: finishTaskIds,
      };

      const newState = {
        ...columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      };

      setColumns(newState);
    }
  };
  const handleDragStart = (start:any) => {
    // console.log('Dragging task with id:', start.draggableId);
  };
  return (
    <DragDropContext onDragEnd={handleDragAndDrop}>
            <div className="flex flex-row overflow-x-auto py-2 gap-4">
  {Object.entries(columns).map(([columnId, column]) => (
    <Column key={columnId} column={column} />
  ))}
</div>
        </DragDropContext>
  );
}

export default TasksBoard;

