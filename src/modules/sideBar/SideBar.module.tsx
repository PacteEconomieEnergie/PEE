import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SettingOutlined, DashboardOutlined, BookOutlined } from '@ant-design/icons';
import { AiOutlineUser } from "react-icons/ai";
import Drawer from '../../components/Drawer/Drawer';

interface SidebarProps {
  currentPath: string;
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPath = "", showSidebar, setShowSidebar }) => {


  // const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [settingsDropdownOpen, setSettingsDropdownOpen] = useState<boolean>(false);
  const location = useLocation();
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsSmallScreen(e.matches);
      if (e.matches) {
        setShowSidebar(false); // Automatically hide the sidebar on small screens
      }
    };

    setIsSmallScreen(mediaQuery.matches);
    if (mediaQuery.matches) {
      setShowSidebar(false);
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [setShowSidebar, settingsDropdownOpen]);
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
  const toggleSettingsDropdown = () => {
    
    setSettingsDropdownOpen(!settingsDropdownOpen);
    
  };

  const closeSidebarAndDropdown = () => {
    setShowSidebar(false);
    setSettingsDropdownOpen(false);
  };

  return (

    <>
      {isSmallScreen ? (
        // Show the Drawer component on small screens
        <Drawer isOpen={showSidebar} setIsOpen={setShowSidebar}>
          {items.map((item) => (
            <div key={item.key}>
              {item.key === 'settings' ? (
                <div
                  className={`p-4 block cursor-pointer ${currentPath.startsWith(item.link ?? '') ? 'bg-gray-300' : ''}`}
                  onClick={toggleSettingsDropdown}
                >
                  <div className="flex items-center">
                    <span className={`ml-4 ${currentPath.startsWith(item.link ?? '') ? 'text-white' : ''}`}>
                      {item.icon}
                    </span>
                    <span className={`ml-4 font-bold ${currentPath.startsWith(item.link ?? '') ? 'text-white' : ''}`}>
                      {item.label}
                    </span>
                    <span className={`ml-auto ${settingsDropdownOpen ? 'transform rotate-180' : ''}`}>
                      {settingsDropdownOpen ? '▼' : '▲'}
                    </span>
                  </div>
                </div>
              ) : item.children ? (
                <div style={{ display: settingsDropdownOpen && item.key === 'settings' ? 'block' : 'none' }}>
                  <div
                    className={`p-4 block ${currentPath === item.link ? 'bg-gray-300' : ''}`}
                    onClick={() => setShowSidebar(false)}
                  >
                    <div className="flex items-center">
                      <span className={`ml-4 ${currentPath === item.link ? 'text-white' : ''}`}>
                        {item.icon}
                      </span>
                      <span className={`ml-4 font-bold ${currentPath === item.link ? 'text-white' : ''}`}>
                        {item.label}
                      </span>
                    </div>
                  </div>
                  <ul>
                    {item.children.map((child) => (
                      <li key={child.key}>
                        <Link
                          to={child.link}
                          className={`p-4 block ${currentPath === child.link ? 'bg-gray-300' : ''}`}
                        >
                          <div className="flex items-center">
                            <span className={`ml-8 ${currentPath === child.link ? 'text-white' : ''}`}>
                              {child.icon}
                            </span>
                            <span className={`ml-4 font-bold ${currentPath === child.link ? 'text-white' : ''}`}>
                              {child.label}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  to={item.link}
                  className={`p-4 block ${currentPath === item.link ? 'bg-gray-300' : ''}`}
                >
                  <div className="flex items-center">
                    <span className={`ml-4 ${currentPath === item.link ? 'text-white' : ''}`}>
                      {item.icon}
                    </span>
                    <span className={`ml-4 font-bold ${currentPath === item.link ? 'text-white' : ''}`}>
                      {item.label}
                    </span>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </Drawer>
      ) : (
        // Show the Sidebar component on larger screens
        <aside className="bg-gray-200 w-1/8 fixed h-full top-0 left-0 sm:block">
          <div className="h-full flex flex-col justify-between">
            <div className="my-8">
              <div className="flex items-center justify-center mb-8">
                <Link to="/admin/home">
                  <img
                    src="/images/logoPee.png"
                    alt="Company Logo"
                    className="h-28 w-auto cursor-pointer"
                  />
                </Link>
              </div>
              <ul>
                {items.map((item) => (
                  <li key={item.key}>
                    {item.key === 'settings' ? (
                      <div
                        className={`p-4 block cursor-pointer ${currentPath.startsWith(item.link ?? '') ? 'bg-gray-300' : ''}`}
                        onClick={toggleSettingsDropdown}
                      >
                        <div className="flex items-center">
                          <span className={`ml-4 ${currentPath.startsWith(item.link ?? '') ? 'text-white' : ''}`}>
                            {item.icon}
                          </span>
                          <span className={`ml-4 font-bold ${currentPath.startsWith(item.link ?? '') ? 'text-white' : ''}`}>
                            {item.label}
                          </span>
                          <span className={`ml-auto ${settingsDropdownOpen ? 'transform rotate-180' : ''}`}>
                            {settingsDropdownOpen ? '▲' : '▼'}
                          </span>
                        </div>
                        {item.key === 'settings' && settingsDropdownOpen && (
                          <ul>
                            {item.children?.map((child) => (
                              <li key={child.key}>
                                <Link
                                  to={child.link}
                                  className={`p-4 block ${currentPath === child.link ? 'bg-gray-300' : ''}`}
                                >
                                  <div className="flex items-center">
                                    <span className={`ml-8 ${currentPath === child.link ? 'text-white' : ''}`}>
                                      {child.icon}
                                    </span>
                                    <span className={`ml-4 font-bold ${currentPath === child.link ? 'text-white' : ''}`}>
                                      {child.label}
                                    </span>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : item.children ? (
                      <div
                        className={`p-4 block cursor-pointer ${currentPath.startsWith(item.link ?? '') ? 'bg-gray-300' : ''}`}
                        onClick={toggleSettingsDropdown}
                      >
                        <div className="flex items-center">
                          <span className={`ml-4 ${currentPath.startsWith(item.link ?? '') ? 'text-white' : ''}`}>
                            {item.icon}
                          </span>
                          <span className={`ml-4 font-bold ${currentPath.startsWith(item.link ?? '') ? 'text-white' : ''}`}>
                            {item.label}
                          </span>
                          <span className={`ml-auto ${settingsDropdownOpen ? 'transform rotate-180' : ''}`}>
                            {settingsDropdownOpen ? '▲' : '▼'}
                          </span>
                        </div>
                        {item.key === 'settings' && settingsDropdownOpen && (
                          <ul>
                            {item.children?.map((child) => (
                              <li key={child.key}>
                                <Link
                                  to={child.link}
                                  className={`p-4 block ${currentPath === child.link ? 'bg-gray-300' : ''}`}
                                >
                                  <div className="flex items-center">
                                    <span className={`ml-8 ${currentPath === child.link ? 'text-white' : ''}`}>
                                      {child.icon}
                                    </span>
                                    <span className={`ml-4 font-bold ${currentPath === child.link ? 'text-white' : ''}`}>
                                      {child.label}
                                    </span>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.link}
                        className={`p-4 block ${currentPath === item.link ? 'bg-gray-300' : ''}`}
                      >
                        <div className="flex items-center">
                          <span className={`ml-4 ${currentPath === item.link ? 'text-white' : ''}`}>
                            {item.icon}
                          </span>
                          <span className={`ml-4 font-bold ${currentPath === item.link ? 'text-white' : ''}`}>
                            {item.label}
                          </span>
                        </div>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};


