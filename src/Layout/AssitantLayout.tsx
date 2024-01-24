import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageOutlined,SettingOutlined, CalendarOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Link } from 'react-router-dom';
import { Dropdown } from 'antd';

interface AssistantLayoutProps {
    children?: React.ReactNode;
}

export const AssistantLayout: React.FC<AssistantLayoutProps> = ({ children }) => {
    let location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

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
            key: 'messages',
            icon: <MessageOutlined className="h-8 w-8" />,
            label: 'Messages',
            link: '/assistant/messages',
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
            location={{ pathname: location.pathname }}
            menuDataRender={() => menuData}
            menuItemRender={(menuItemProps, defaultDom) => (
                <Link to={menuItemProps.path || '/'}>{defaultDom}</Link>
            )}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            title="Assistant Dashboard"
            fixedHeader={true}
            logo={<img src="/images/logoAssistant.png" alt="Assistant Logo" />} // Change to your assistant logo
            avatarProps={{
                src: 'https://example.com/assistant-avatar.jpg', // Change to your avatar image
                size: 'small',
                title: 'header',
                render: (props: any, dom: any) => (
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: 'logout',
                                    icon: <LogoutOutlined />,
                                    label: 'Logout',
                                },
                            ],
                        }}
                    >
                        {dom}
                    </Dropdown>
                ),
            }}
        >
            <PageContainer>
                {children}
            </PageContainer>
        </ProLayout>
    );
}

export default AssistantLayout;
