// src/components/HeaderContent/HeaderContent.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Badge, Dropdown } from 'antd';
import { BellOutlined, MailOutlined } from '@ant-design/icons';
import NotificationPanel from '../../components/Panel/NotificationPanel';
import MessagePanel from '../../components/Panel/MessagePanel';
import ProfileDropdown from '../../components/Dropdown/ProfileDropdown';
import { logout } from '../../store/auth/authSlice'; // Update path as needed
import { useNotifications } from '../../Contexts/NotificationContext';
import { useAvatar } from '../../Contexts/AvatarProvider';
import { a } from 'react-spring';

interface HeaderContentProps {
  notifications: Array<{ id: string; message: string }>;
  messages: Array<{ id: string; message: string }>;
  userName: string;

}

export const HeaderContent: React.FC = () => {
  const {avatar}=useAvatar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notifications } = useNotifications();
  const userLogged=useSelector((state:any)=>state.auth)
 
  



  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to login or home page as needed
  };

  return (
    <div className="flex justify-end items-center space-x-4">
      
      <Dropdown overlay={<NotificationPanel  />} trigger={['click']}>
        <Badge count={notifications.length}>
          <BellOutlined className="text-2xl cursor-pointer" />
        </Badge>
      </Dropdown>
      
      <ProfileDropdown userName={userLogged.userName} userEmail={userLogged.Email} onLogout={handleLogout} />
    </div>
  );
};
