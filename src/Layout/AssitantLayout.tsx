import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardOutlined,SettingOutlined, UserOutlined,BookOutlined,CalendarOutlined} from '@ant-design/icons';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { HeaderContent } from '../modules/Header/Header.module';
import type { ProSettings } from '@ant-design/pro-components';

interface AssistantLayoutProps {
    children?: React.ReactNode;
}

export const AssistantLayout: React.FC<AssistantLayoutProps> = ({ children }) => {
    let location = useLocation();


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
            title=""
            
            logo={<img src="/images/Picture1.png" alt="Company Logo" />} // Change to your assistant logo
            headerContentRender={() => <HeaderContent  />}
        >
            <PageContainer>
                {children}
            </PageContainer>
        </ProLayout>
    );
}

export default AssistantLayout;


