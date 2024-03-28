import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { ColumnsState } from './TaskTypes';
import { notification,Modal } from 'antd';
import Column from './Column.module';
import { useSelector,useDispatch } from 'react-redux';
import StudySidePanel from '../../components/Panel/StudyPanel';
import { closeStudySidePanel } from '../../store/sidebar/studySidePanelSlice';
import studyService from '../../Services/Api/Studies/StudiesService';
import UploadSyntheseModal from '../../components/modals/uploadSynthéseModal';
import { ConfigProvider } from 'antd';
import fr_FR from 'antd/lib/locale/fr_FR';

interface TasksBoardProps {
    initialColumnState: ColumnsState;
    loading: boolean;
  }
  const TasksBoard: React.FC<TasksBoardProps> = ({ initialColumnState, loading }) => {
  const [columns, setColumns] = useState<ColumnsState>(initialColumnState);
  const studySidePanelVisible = useSelector((state: any) => state.studySidePanel.visible);
  const studySidePanelData = useSelector((state: any) => state.studySidePanel.studyData);
  const dispatch = useDispatch();


  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
const [selectedStudyId, setSelectedStudyId] = useState<number | null>(null);



  const handleDragAndDrop = async (result:any) => {
    const { source, destination, draggableId } = result;
  
  
    // Exit if dropped outside the list
    if (!destination) return;
  
    // No need to do anything if dropped in the same place
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
  
    const sourceColumn = columns[source.droppableId];
    
    
    const destinationColumn = columns[destination.droppableId];
    
    
    const movedTask = sourceColumn.tasks.find(task => task.id === draggableId);
  
    // Confirmation modal before moving task
    if (destination.droppableId === 'Done') { // Adjust 'doneColumnId' to your actual Done column ID
      // Trigger the upload modal here instead of directly updating the status
      setSelectedStudyId(parseInt(draggableId));
      setIsUploadModalVisible(true);
    } else {
      // Proceed with the confirmation modal for status change if not moving to "Done"
      Modal.confirm({
        title: `Confirm Status Change`,
        content: `Are you sure you want to move "${movedTask?.name}" to "${destinationColumn.name}"?`,
        onOk: async () => {
          try {
            // Assuming you have mapped your column IDs to their corresponding status
            await studyService.updateStudyStatus(parseInt(draggableId), destinationColumn.name);
  
            // Manually update the state as before
            const updatedSourceTasks = sourceColumn.tasks.filter(task => task.id !== draggableId);
            const updatedDestinationTasks = [...destinationColumn.tasks, movedTask].sort((a:any, b:any) => a.index - b.index);
  
            setColumns(prev => ({
              ...prev,
              [source.droppableId]: {
                ...sourceColumn,
                tasks: updatedSourceTasks,
              },
              [destination.droppableId]: {
                ...destinationColumn,
                tasks: updatedDestinationTasks,
              },
            }));
  
            notification.success({
              message: 'Status Updated Successfully',
              description: `The status of "${movedTask?.name}" has been updated.`,
            });
          } catch (error) {
            notification.error({
              message: 'Status Update Failed',
              description: 'There was an error updating the study status.',
            });
          }
        },
        onCancel() {
          // Optionally handle the cancel event
        },
      });
    }
  };

    

  


  
  return (
    <ConfigProvider locale={fr_FR}>
    <DragDropContext onDragEnd={handleDragAndDrop}>
            <div className="flex flex-row overflow-x-auto py-2 gap-8">
  {Object.entries(columns).map(([columnId, column]) => (
    <Column key={columnId} column={column} loading={loading} />
  ))}
</div>
        </DragDropContext>
        <StudySidePanel
        visible={studySidePanelVisible}
        studyData={studySidePanelData}
        onClose={() => dispatch(closeStudySidePanel())}
      />
      {isUploadModalVisible && selectedStudyId && (
            <UploadSyntheseModal
                visible={isUploadModalVisible}
                studyId={selectedStudyId}
                onClose={() => {
                    setIsUploadModalVisible(false);
                    setSelectedStudyId(null); // Reset selectedStudyId when the modal is closed
                    // Optionally refresh your tasks or studies list here
                }}
            />
        )}
        </ConfigProvider>
  );
}

export default TasksBoard;

