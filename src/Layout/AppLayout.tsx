import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';
import {  DashboardOutlined,
  BookOutlined,
  SettingOutlined,
 } from '@ant-design/icons';
import { AiOutlineUser } from 'react-icons/ai';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';


import { HeaderContent } from '../modules/Header/Header.module';
import type { ProSettings } from '@ant-design/pro-components';


interface AppLayoutProps{
    children?:React.ReactNode
}

export const AppLayout:React.FC<AppLayoutProps>=({ children})=>{
const {role}=useSelector((state:any)=>state.auth)
console.log(role);

    let location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
  
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
      fixSiderbar: true,
      layout: 'mix',
      
    });
    
    
    const getItems = (role: string) => {
      if (role === 'CLIENT') {
        return [
          {
            key: 'Visite planifiée ',
            icon: <DashboardOutlined className="h-8 w-8" />,
            label: 'Visite planifiée ',
            link: '/client/PlannedVisits',
          },
          {
            key: 'TechnicalVisit',
            icon: <BookOutlined className="h-8 w-8" />,
            label: 'TechnicalVisit',
            link: '/client/TechnicalVisit',
          },
        ];
      } else {
        return [
          {
            key: 'dashboard',
            icon: <DashboardOutlined className="h-8 w-8 " />,
            label: 'Dashboard',
            link: '/admin/Dashboard',
          },
          {
            key: 'studies',
            icon: <BookOutlined className="h-8 w-8" />,
            label: 'Studies',
            link: '/admin/studies',
          },
          {
            key: 'engineer',
            icon: <AiOutlineUser className="h-6 w-6" />,
            label: 'Engineer',
            link: '/admin/engineer',
          },
          {
            key: 'settings',
            icon: <SettingOutlined className='h-6 w-6' />,
            label: 'Settings',
            children: [
              {
                key: 'engineer',
                icon: <AiOutlineUser className="h-6 w-6" />,
                label: 'Engineer',
                link: '/admin/Settings/engineer',
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
      }
    };
  
    const transformItemsToMenuData = (items: any) => {
      return items.map((item: any) => ({
        path: item.link,
        name: item.label,
        icon: item.icon,
        children: item.children ? transformItemsToMenuData(item.children) : undefined,
      }));
    };
  
    const items = getItems(role);
    const menuData = transformItemsToMenuData(items);
    
      
    
      






    return (
<>

    <ProLayout
    {...settings}
    // location={{ pathname: location.pathname }}
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