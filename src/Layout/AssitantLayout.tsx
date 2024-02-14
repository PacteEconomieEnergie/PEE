import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardOutlined,SettingOutlined, CalendarOutlined, UserOutlined, LogoutOutlined ,BellOutlined,
    MailOutlined,BookOutlined} from '@ant-design/icons';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Link } from 'react-router-dom';
import {Dropdown, Menu, Space, Badge,Popover,List, Avatar, Button} from 'antd'
import { useDispatch } from 'react-redux';
import { logout } from '../store/auth/authSlice';
import { HeaderContent } from '../modules/Header/Header.module';
import type { ProSettings } from '@ant-design/pro-components';

interface AssistantLayoutProps {
    children?: React.ReactNode;
}

export const AssistantLayout: React.FC<AssistantLayoutProps> = ({ children }) => {
    let location = useLocation();
    const dispatch = useDispatch();

    const [collapsed, setCollapsed] = useState(false);

    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
        fixSiderbar: true,
        layout: 'mix',
        
      });

    const transformItemsToMenuData = (items: any) => {
        return items.map((item: any) => ({
            path: item.link,
            name: item.label,
            icon: item.icon,
            children: item.children ? transformItemsToMenuData(item.children) : undefined,
        }));
    };
    const headerContentProps = {
      notifications: [{ id: '1', message: 'Notification 1' },{ id: '2', message: 'Notification 2' }], // Your notifications data specific to Ingenieur layout
      messages: [
        { id: '1', message: 'New message from John' },
        { id: '2', message: 'Reminder for tomorrow\'s meeting' },
        // ... more messages
      ],      // Your messages data specific to Ingenieur layout
      userName: "",
      userEmail: "ingenieur@email.com",
    };
    
      
    const items = [
      {
        key: 'overview',
        icon: <DashboardOutlined className="h-8 w-8" />,
        label: 'Overview',
        link: '/assistant/OverViewAssistant',
    },
        {
          key: 'studies',
          icon: <BookOutlined className="h-8 w-8" />, // Tailwind classes for size
          label: 'Studies',
            link: '/assistant/Studies',
        },
        {
            key: 'appointments',
            icon: <CalendarOutlined className="h-8 w-8" />,
            label: 'Appointments',
            link: '/assistant/appointments',
        },
        {
            key: 'clients',
            icon: <UserOutlined className="h-8 w-8" />,
            label: 'Clients',
            link: '/assistant/clients',
        },
        {
            key: 'settings',
            icon: <SettingOutlined className='h-6 w-6' />,
            label: 'Settings',
            link: '/assistant/settings',
        },
    ];

    const menuData = transformItemsToMenuData(items);


  

    return (
        <ProLayout
            {...settings}
            location={{ pathname: location.pathname }}
            menuDataRender={() => menuData}
            menuItemRender={(menuItemProps, defaultDom) => (
                <Link to={menuItemProps.path || '/'}>{defaultDom}</Link>
            )}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            title="PEE"
            
            logo={<img src="/images/logoPee.png" alt="Company Logo" />} // Change to your assistant logo
            headerContentRender={() => <HeaderContent {...headerContentProps} />}
        >
            <PageContainer>
                {children}
            </PageContainer>
        </ProLayout>
    );
}

export default AssistantLayout;


