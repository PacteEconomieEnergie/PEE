import React, { useState } from 'react';
import { DashboardOutlined, 
BookOutlined,ToolOutlined } from '@ant-design/icons';

import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Link } from 'react-router-dom';
import type { ProSettings } from '@ant-design/pro-components';



import { HeaderContent } from '../modules/Header/Header.module';


interface IngenieurLayoutProps {
    children?: React.ReactNode;
}

export const IngenieurLayout: React.FC<IngenieurLayoutProps> = ({ children }) => {
    
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
            title=""
            fixedHeader={true}
            logo={<img src="/images/Picture1.png" alt="Company Logo" />}
            headerContentRender={() => <HeaderContent  />}
        >
            <PageContainer>
                {children}
            </PageContainer>
        </ProLayout>
    );
}
