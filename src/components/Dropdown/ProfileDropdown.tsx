import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // or useNavigate for react-router-dom v6

interface ProfileDropdownProps {
  userName: string;
  userEmail: string;
  onLogout: () => void; // Function to handle logout action
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ userName, userEmail, onLogout }) => {
  const navigate = useNavigate(); // or useNavigate for react-router-dom v6
  const userRole = localStorage.getItem('userRole');
  const handleMenuClick = (e: any) => {
    if (e.key === 'logout') {
      onLogout();
    } else if (e.key === 'settings') {
      switch (userRole) {
        case  "ADMIN":
          navigate('/admin/Settings');
          break;
        case "ENGINEER":
          navigate('/ingenieur/Settings');
          break;
        case "ASSISTANT":
          navigate('/assistant/Settings');
          break;
        default:
          // Default navigation or error handling
          break;
      }
 // Navigate to profile settings page
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.ItemGroup title={userName}>
        <Menu.Item key="userEmail">
          <span>{userEmail}</span>
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Profile Settings
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        <Avatar size="large" icon={<UserOutlined />} />
         {/* Additional span for the user's name if you want it outside the dropdown */}
      </span>
    </Dropdown>
  );
};

export default ProfileDropdown;
