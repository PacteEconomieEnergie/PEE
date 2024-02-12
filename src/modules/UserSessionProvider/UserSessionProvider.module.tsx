// src/context/UserSessionContext.tsx
import React, { createContext, useEffect, ReactNode, useContext,useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from '../../store/rootReducer'; // Update with the correct path

interface UserSessionContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserSessionContext = createContext<UserSessionContextType | null>(null);

interface UserSessionProviderProps {
  children: ReactNode;
}

export const UserSessionProvider: React.FC<UserSessionProviderProps> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    
    if (isAuthenticated) {
      setIsLoggedIn(true);
      if (location.pathname === '/') {
        const role = localStorage.getItem('userRole') || ''; // Alternatively, get role from Redux state if it's stored there
        
        
        switch (role) {
          case "ADMIN":
            navigate('/admin/dashboard');
            break;
          case "ENGINEER":
            navigate('/ingenieur/overview');
            break;
          case "ASSISTANT":
            navigate('/assistant/Studies');
            break;
          default:
            navigate('/');
        }
      }
    } else if (location.pathname !== '/') {
      setIsLoggedIn(true);
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <UserSessionContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserSessionContext.Provider>
  );
};

// export const useUserSession = () => useContext(UserSessionContext);
