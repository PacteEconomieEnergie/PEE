import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';
import {  DashboardOutlined,
  BookOutlined,
  SettingOutlined,
 } from '@ant-design/icons';
import { AiOutlineUser } from 'react-icons/ai';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Link } from 'react-router-dom';
// import {Dropdown, Menu, Space, Badge,Popover,List, Avatar, Button} from 'antd'
import { useDispatch } from 'react-redux';
import { logout } from '../store/auth/authSlice';

import { HeaderContent } from '../modules/Header/Header.module';
import type { ProSettings } from '@ant-design/pro-components';


interface AppLayoutProps{
    children?:React.ReactNode
}

export const AppLayout:React.FC<AppLayoutProps>=({ children})=>{
  const dispatch = useDispatch();
    let location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
  
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
      fixSiderbar: true,
      layout: 'mix',
      
    });
    
    
      const transformItemsToMenuData = (items:any) => {
        return items.map((item:any) => ({
          path: item.link,
          name: item.label,
          icon: item.icon,
          children: item.children ? transformItemsToMenuData(item.children) : undefined,
        }));
      };

      const items = [
        {
          key: 'dashboard',
          icon: <DashboardOutlined className="h-8 w-8" />, // Tailwind classes for size
          label: 'Dashboard',
          link: '/admin/Dashboard',
        },
        {
          key: 'studies',
          icon: <BookOutlined className="h-8 w-8" />, // Tailwind classes for size
          label: 'Studies',
          link: '/admin/studies',
        },
        {
          key: 'engenieer',
          icon: <AiOutlineUser className="h-6 w-6" />, // Tailwind classes for size
          label: 'engenieer',
          link: '/admin/engenieer',
        },
        {
          key: 'settings',
          icon: <SettingOutlined className='h-6 w-6' />,
          label: 'Settings',
          children: [
            {
              key: 'engenieer',
              icon: <AiOutlineUser className="h-6 w-6" />,
              label: 'Engenieer',
              link: '/admin/Settings/engenieer',
            },
            {
              key: 'client',
              icon: <AiOutlineUser className="h-6 w-6" />,
              label: 'Client',
              link: '/admin/Settings/client',
            },
            {
              key: 'assistant',
              icon: <AiOutlineUser className="h-6 w-6" />,
              label: 'Assistant',
              link: '/admin/Settings/assistant',
            },
          ],
        },
      ];
      
;const headerContentProps = {
  notifications: [{ id: '1', message: 'Notification 1' },{ id: '2', message: 'Notification 2' }], // Your notifications data specific to Ingenieur layout
  messages: [
    { id: '1', message: 'New message from John' },
    { id: '2', message: 'Reminder for tomorrow\'s meeting' },
    // ... more messages
  ],      // Your messages data specific to Ingenieur layout
  userName: "Ingenieur Name",
  userEmail: "ingenieur@email.com",
};

      const menuData = transformItemsToMenuData(items)
    
      
    
      






    return (
<>

    <ProLayout
    {...settings}
    location={{ pathname: location.pathname }}
    menuDataRender={() => menuData}
    menuItemRender={(menuItemProps, defaultDom) => (
      <Link to={menuItemProps.path || '/'}>{defaultDom}</Link>
    )}
    title=""
    
    
    logo={<img src="/images/Picture1.png" alt="Company Logo" />}
    collapsed={collapsed}
      onCollapse={setCollapsed}

      headerContentRender={() => <HeaderContent  />}

   >
   
    <PageContainer>
      {/* Main Content */}
      {children}
    </PageContainer>
  </ProLayout> 
  </>
      );
}