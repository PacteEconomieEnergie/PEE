import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardOutlined, BookOutlined, SettingOutlined,LogoutOutlined, } from '@ant-design/icons';
import { AiOutlineUser } from 'react-icons/ai';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Link } from 'react-router-dom';
import {Dropdown} from 'antd'
interface AppLayoutProps{
    children?:React.ReactNode
}

export const AppLayout:React.FC<AppLayoutProps>=({ children})=>{
    let location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
   

    
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
      const menuData = transformItemsToMenuData(items);
    return (
    //   <div className="flex min-h-screen">
    //   {/* Sidebar */}
    //   <div className="flex flex-none">
    //     <Sidebar currentPath={currentPath} showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    //   </div>

    //   <div className="flex flex-col flex-1 min-w-0">
    //     {/* Header */}
    //     <Header onLogout={handleLogout} setShowSidebar={setShowSidebar} />

    //     <div className="flex-1 flex flex-col overflow-hidden">
    //       {/* Main Content */}
    //       <main className="flex-1 px-4 sm:px-28 overflow-x-auto">
    //         {children}
    //       </main>
    //     </div>
    //   </div>
    // </div>
    <ProLayout
    location={{ pathname: location.pathname }}
    menuDataRender={() => menuData}
    menuItemRender={(menuItemProps, defaultDom) => (
      <Link to={menuItemProps.path || '/'}>{defaultDom}</Link>
    )}
    collapsed={collapsed}
    onCollapse={setCollapsed}
    title="PEE"
    fixedHeader={true}
    logo={<img src="/images/logoPee.png" alt="Company Logo" />}
    avatarProps={{
      src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      size: 'small',
      title: 'header',
      render: (props:any, dom:any) => {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: 'logout',
                },
              ],
            }}
          >
            {dom}
          </Dropdown>
        );
      },
    }}
    // You can customize the header here if needed
    // If you want to use a default header, you can remove this line
    // headerContentRender={() => (<Header onLogout={handleLogout} setShowSidebar={setCollapsed} />)}
  >
    
    <PageContainer>
      {/* Main Content */}
      {children}
    </PageContainer>
  </ProLayout>
      );
}