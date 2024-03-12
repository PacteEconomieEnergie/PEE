import React from 'react';
import { useNotifications } from '../../Contexts/NotificationContext';
import { useDispatch,useSelector } from 'react-redux';
// import { showStudySidePanel } from '../../store/sidebar/studySidePanelSlice';
import { showNotificationStudyDetails } from '../../store/sidebar/notificationStudyDetailsSlice';
import { AppDispatch } from '../../store';
import NotificationStudyDetailsPanel from './NotificationStudyDetailsPanel';
// interface StudyDetails {
//   clientName: string;
//   Nature: string;
//   TypeEtude: string;
// }

interface Notification {
  id: number;
  userId: number;
  studyId: number;
  seen: boolean;
  createdAt: string;
  study: any;
}

const NotificationItem: React.FC<{ notification: Notification, onOpenStudyDetails: (studyData: any) => void }> = ({ notification, onOpenStudyDetails }) => {
  console.log(localStorage.getItem('userId'))
  const handleClick = () => {
    onOpenStudyDetails(notification.study);
  };
  return (
    <li className="flex items-center mb-4 border-b border-gray-200 py-2" onClick={handleClick}>
    <p className="text-sm text-blue-900">
        New study from client "{notification.study.clientName}" with nature "{notification.study.Nature}" and type "{notification.study.TypeEtude}".
      </p>
    </li>
  );
};

const NotificationPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { visible, studyDetails } = useSelector((state:any) => state.notificationStudyDetails);
  const { notifications } = useNotifications();

const handleOpenStudyDetails = (studyData: any) => {
  // Dispatch the action with the study data to show the details panel
  dispatch(showNotificationStudyDetails(studyData));
};
  return (
    <div>
    <div className="bg-blue-100 border-t-4 border-blue-500 rounded-lg px-4 py-3 shadow-md max-h-96 overflow-y-auto">
      <h5 className="font-bold text-blue-900 mb-4">Notifications</h5>
      <ul>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification}  onOpenStudyDetails={handleOpenStudyDetails} />
        ))}
      </ul>
    </div>
    {visible && (
        <NotificationStudyDetailsPanel
          visible={visible}
          studyDetails={studyDetails}
          
        />
      )}
    </div>
  );
};

export default NotificationPanel;
