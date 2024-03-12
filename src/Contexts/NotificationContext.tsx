import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {ApiService} from '../Services/Api/Notification/NotificationService'; // Make sure ApiService matches your actual import

// Define the type for your notification
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

// Define the type for the context value
interface NotificationContextType {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

// Create the context with a default value
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

// NotificationProvider component
export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);


  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Assuming you store userId in localStorage
    if (userId) {
      ApiService.fetchUserNotifications(userId)
        .then((res:any)=>setNotifications(res)) // Ensure your ApiService correctly maps to the Notification type
        .catch(console.error);
    }
  }, []);


  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use notifications
export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default useNotifications;
