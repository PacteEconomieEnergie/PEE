import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { DashboardOutlined, 
BookOutlined, SettingOutlined, LogoutOutlined,
ToolOutlined,BellOutlined,MailOutlined,UserOutlined } from '@ant-design/icons';
import { AiOutlineUser } from 'react-icons/ai';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Link } from 'react-router-dom';
import type { ProSettings } from '@ant-design/pro-components';
import { useDispatch } from 'react-redux';


import { HeaderContent } from '../modules/Header/Header.module';


interface IngenieurLayoutProps {
    children?: React.ReactNode;
}

export const IngenieurLayout: React.FC<IngenieurLayoutProps> = ({ children }) => {
    const dispatch = useDispatch();
    let location = useLocation();
    const navigate=useNavigate()
    const [collapsed, setCollapsed] = useState(false);

    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
        fixSiderbar: true,
        layout: 'mix',
        
      });

      
      const headerContentProps = {
        notifications: [{ id: '1', message: 'Notification 1' },{ id: '2', message: 'Notification 2' }], // Your notifications data specific to Ingenieur layout
        messages: [
          { id: '1', message: 'New message from John' },
          { id: '2', message: 'Reminder for tomorrow\'s meeting' },
          // ... more messages
        ],      // Your messages data specific to Ingenieur layout
        userName: "Ingenieur Name",
        
      };

    const transformItemsToMenuData = (items: any) => {
        return items.map((item: any) => ({
            path: item.link,
            name: item.label,
            icon: item.icon,
            children: item.children ? transformItemsToMenuData(item.children) : undefined,
        }));
    };

    const items = [
        {
            key: 'overview',
            icon: <DashboardOutlined className="h-8 w-8" />,
            label: 'Overview',
            link: '/ingenieur/overview',
        },
        {
            key: 'projects',
            icon: <BookOutlined className="h-8 w-8" />,
            label: 'Project',
            link: '/ingenieur/Projects',
        },
        {
            key: 'tools',
            icon: <ToolOutlined className='h-6 w-6' />,
            label: 'Tasks',
            link: '/ingenieur/Tasks',
        },
        
       
    ];

    const menuData = transformItemsToMenuData(items);
    
;
    
      
    return (
        <ProLayout
        {...settings}
            menuDataRender={() => menuData}
            menuItemRender={(menuItemProps, defaultDom) => (
                <Link to={menuItemProps.path || '/'}>{defaultDom}</Link>
            )}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            title="Ingenieur Dashboard"
            fixedHeader={true}
            logo={<img src="/images/logoPee.png" alt="Company Logo" />}
            headerContentRender={() => <HeaderContent {...headerContentProps} />}
        >
            <PageContainer>
                {children}
            </PageContainer>
        </ProLayout>
    );
}
