import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardOutlined, BookOutlined, SettingOutlined, LogoutOutlined, ToolOutlined } from '@ant-design/icons';
import { AiOutlineUser } from 'react-icons/ai';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Link } from 'react-router-dom';
import { Dropdown } from 'antd';

interface IngenieurLayoutProps {
    children?: React.ReactNode;
}

export const IngenieurLayout: React.FC<IngenieurLayoutProps> = ({ children }) => {
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
            key: 'overview',
            icon: <DashboardOutlined className="h-8 w-8" />,
            label: 'Overview',
            link: '/ingenieur/overview',
        },
        {
            key: 'projects',
            icon: <BookOutlined className="h-8 w-8" />,
            label: 'Projects',
            link: '/ingenieur/Tasks',
        },
        {
            key: 'tools',
            icon: <ToolOutlined className='h-6 w-6' />,
            label: 'Tools',
            link: '/ingenieur/tools',
        },
        {
            key: 'profile',
            icon: <AiOutlineUser className="h-6 w-6" />,
            label: 'Profile',
            link: '/ingenieur/profile',
        },
        {
            key: 'settings',
            icon: <SettingOutlined className='h-6 w-6' />,
            label: 'Settings',
            link: '/ingenieur/settings',
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
            title="Ingenieur Dashboard"
            fixedHeader={true}
            logo={<img src="/images/logoPee.png" alt="Company Logo" />}
            avatarProps={{
                src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
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
