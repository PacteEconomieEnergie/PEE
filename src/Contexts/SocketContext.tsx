// src/contexts/SocketContext.js
import React, { createContext, useContext, useEffect, ReactNode,useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { notification } from 'antd';

interface SocketContextType {
    socket: Socket | null;
  }
  const SocketContext = createContext<SocketContextType | null>(null);

  interface SocketProviderProps {
    children: ReactNode;
    
  }
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const authToken=useSelector((state:any)=>state.auth.token)
    
    // const userToken = localStorage.getItem('authToken') || null;
    const socketRef = useRef<Socket | null>(null);
    const apiUrl = process.env.REACT_APP_SERVER_URL;
    useEffect(() => {
        // Disconnect existing socket connection
        if (socketRef.current) {
            socketRef.current.disconnect();
        }
        // console.log("REACT_APP_SERVER_URL:", window.REACT_APP_SERVER_URL, "Final URL:", window.REACT_APP_SERVER_URL || 'http://localhost:3002');
        // Establish a new socket connection
        socketRef.current = io('http://localhost:3002', {
            auth: { token: authToken },
        });


        const socket = socketRef.current;
        socket.on('connect', () => {
            
        });

        if (authToken) {
            socket.emit('authenticate', authToken);
            socket.on('newStudyCreated', (study) => {
              
                notification.open({
                    message: 'New Study Assigned',
                    description: `You have been assigned a new study for the client: ${study.title || 'New Study'}.`,
                    onClick: () => {
                        console.log('Notification Clicked!');
                        // You can add logic here to navigate the user to the study details
                    },
                })
                // Handle the new study notification here
            });
            socket.on('studyStatusUpdate', ({ studyId, status, studyNature, clientName, uploadedBy }) => {
                notification.open({
                    message: 'Study Status Updated',
                    description: `Status of study ${studyId} (${studyNature}) updated to ${status}. Client: ${clientName}. Updated by: ${uploadedBy}.`,
                    onClick: () => {
                        console.log('Notification Clicked!');
                        // Logic to navigate to the updated study's details, if necessary
                    },
                });
            });
            socket.on('syntheseFileUploaded', ({ studyId, status, studyNature, clientName, uploadedBy }) => {
                notification.open({
                    message: 'Synthes File Uploaded',
                    description: `Synthesis file uploaded for study ${studyId} (${studyNature}) and marked as ${status}. Client: ${clientName}. Updated by: ${uploadedBy}.`,
                    onClick: () => {
                        console.log('Notification Clicked!');
                        // Add any additional logic here, such as refreshing the data or navigating to a different view
                    },
                });
            });
        }

        return () => {
            socket.disconnect();
        };
    }, [authToken]);

    return (
        <SocketContext.Provider value={{ socket: socketRef.current }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
