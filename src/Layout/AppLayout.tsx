import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';
import {  DashboardOutlined,
  BookOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  MailOutlined, } from '@ant-design/icons';
import { AiOutlineUser } from 'react-icons/ai';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Link } from 'react-router-dom';
import {Dropdown, Menu, Space, Badge} from 'antd'
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
      
      const userMenu = (
        <Menu items={[
          {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
          },
        ]} />
      );
      const extraMenuItems = [
        {
          key: 'notifications',
          icon: <Badge count={5}><BellOutlined /></Badge>,
          label: 'Notifications',
        },
        {
          key: 'messages',
          icon: <Badge count={3}><MailOutlined /></Badge>,
          label: 'Messages',
        },
        // Add user profile to menu
        {
          key: 'user',
          icon: <AiOutlineUser />,
          label: <Dropdown overlay={userMenu} trigger={['click']}><img src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg" alt="Avatar" style={{ width: '32px', height: '32px', borderRadius: '50%' }} /></Dropdown>,
        },
      ]
      const menuData = [...transformItemsToMenuData(items), ...extraMenuItems]
    return (

    <ProLayout
    location={{ pathname: location.pathname }}
    menuDataRender={() => menuData}
    menuItemRender={(menuItemProps, defaultDom) => (
      <Link to={menuItemProps.path || '/'}>{defaultDom}</Link>
    )}
    collapsed={collapsed}
    onCollapse={setCollapsed}
    title="PEE"
    
    
    logo={<img src="/images/logoPee.png" alt="Company Logo" />}
    avatarProps={{
      src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      size: 'small',
      // title: 'header',
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
    
  breakpoint="md" // Customize the breakpoint if needed
 // headerContentRender={() => (
    //   <div className="flex justify-between items-center w-full px-4">
    //     <div>
    //       {/* Left side: Can be empty if you don't have anything to put here */}
    //     </div>
    //     <div className="flex items-center space-x-4">
    //       {/* Right side: Notifications, Messages, and Profile */}
    //       <Badge count={5}>
    //         <BellOutlined className="text-lg" />
    //       </Badge>
    //       <Badge count={3}>
    //         <MailOutlined className="text-lg" />
    //       </Badge>
    //       {/* Profile Dropdown */}
    //       <Dropdown overlay={menu} trigger={['click']}>
    //         <img
    //           src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
    //           alt="Avatar"
    //           className="w-8 h-8 rounded-full cursor-pointer"
    //         />
    //       </Dropdown>
    //     </div>
    //   </div>
    // )}
   
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