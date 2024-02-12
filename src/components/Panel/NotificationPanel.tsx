import React from 'react';
import { useNotifications } from '../../Contexts/NotificationContext';

interface StudyDetails {
  clientName: string;
  Nature: string;
  TypeEtude: string;
}

interface Notification {
  id: number;
  userId: number;
  studyId: number;
  seen: boolean;
  createdAt: string;
  study: StudyDetails;
}

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
  return (
    <li className="flex items-center mb-4 border-b border-gray-200 py-2">
    <p className="text-sm text-blue-900">
        New study from client "{notification.study.clientName}" with nature "{notification.study.Nature}" and type "{notification.study.TypeEtude}".
      </p>
    </li>
  );
};

const NotificationPanel: React.FC = () => {
  const { notifications } = useNotifications();

  return (
    <div className="bg-blue-100 border-t-4 border-blue-500 rounded-lg px-4 py-3 shadow-md max-h-96 overflow-y-auto">
      <h5 className="font-bold text-blue-900 mb-4">Notifications</h5>
      <ul>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </ul>
    </div>
  );
};

export default NotificationPanel;
