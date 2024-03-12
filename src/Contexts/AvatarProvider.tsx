// AvatarContext.tsx
import React, { createContext, useContext, useState, ReactNode, FC,useEffect } from 'react';
import ApiService from '../Services/Api/ApiService';

// Define an interface for the context value
interface AvatarContextType {
  avatar: string;
  updateAvatar: (newAvatar: string) => void;
}

// Create the context with an initial empty value
const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

// Custom hook for using the avatar context
export const useAvatar = (): AvatarContextType => {
  const context = useContext(AvatarContext);
  if (context === undefined) {
    throw new Error('useAvatar must be used within a AvatarProvider');
  }
  return context;
};

interface AvatarProviderProps {
  children: ReactNode;
}

export const AvatarProvider: FC<AvatarProviderProps> = ({ children }) => {
  const [avatar, setAvatar] = useState<string>('');
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      handleUserLoginOrInit(parseInt(userId));
    }
  }, []);

  const updateAvatar = (newAvatar: string) => {
    setAvatar(newAvatar);
  };

  const handleUserLoginOrInit = async (userId: number) => {
    try {
      const userProfile = await ApiService.getUserById(userId);
  
      
      // Check if the userProfile has an avatar and it's not null or empty
      if (userProfile && userProfile.Avatar) {
        // Update the avatar using the context
        updateAvatar(userProfile.Avatar);
      } else {
        // If no avatar is set for the user, keep the default avatar or update it as necessary
        updateAvatar('/path/to/default/avatar.png');
      }
    } catch (error) {
      console.error('Failed to fetch user information:', error);
      // Optionally set the avatar to default if the request fails
      updateAvatar('/path/to/default/avatar.png');
    }
  };
  return (
    <AvatarContext.Provider value={{ avatar, updateAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};
