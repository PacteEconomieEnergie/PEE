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
    
    const userToken = localStorage.getItem('authToken') || null;
    const socketRef = useRef<Socket | null>(null);
    useEffect(() => {
        // Disconnect existing socket connection
        if (socketRef.current) {
            socketRef.current.disconnect();
        }
        // console.log("REACT_APP_SERVER_URL:", window.REACT_APP_SERVER_URL, "Final URL:", window.REACT_APP_SERVER_URL || 'http://localhost:3002');
        // Establish a new socket connection
        socketRef.current = io(window.REACT_APP_SERVER_URL, {
            auth: { token: authToken },
        });


        const socket = socketRef.current;
        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        if (authToken) {
            socket.emit('authenticate', authToken);
            socket.on('newStudyNotification', (study) => {
                console.log('New study received:', study);
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
            socket.on('studyStatusUpdated', ({ message, studyId, newStatus }) => {
                notification.open({
                    message: 'Study Status Updated',
                    description: message,
                    onClick: () => {
                        console.log('Notification Clicked!');
                        // Logic to navigate to the updated study's details, if necessary
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
