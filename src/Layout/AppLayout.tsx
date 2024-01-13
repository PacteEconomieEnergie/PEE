import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../modules/sideBar/SideBar.module';
import { Header } from '../modules/Header/Header.module';

interface AppLayoutProps{
    children?:React.ReactNode
}

export const AppLayout:React.FC<AppLayoutProps>=({ children})=>{
    let location = useLocation();
    let currentPath=location.pathname.slice(1)
    const [showSidebar, setShowSidebar] = useState<boolean>(true);

    const handleLogout = () => {
        // Logic for logout
        // ...
      };
    return (
      <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="flex flex-none">
        <Sidebar currentPath={currentPath} showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <Header onLogout={handleLogout} setShowSidebar={setShowSidebar} />

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Main Content */}
          <main className="flex-1 px-4 sm:px-28 overflow-x-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
      );
}