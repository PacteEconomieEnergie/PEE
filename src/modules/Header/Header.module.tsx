import React,{useState} from "react";
import { IoIosNotificationsOutline } from "react-icons/io"
import { DropdownMenu } from "../../components/forms/DropdownMenu";

interface HeaderProps{
    onLogout:()=>void;
    setShowSidebar:React.Dispatch<React.SetStateAction<boolean>>;
}
export const Header:React.FC<HeaderProps>=({onLogout,setShowSidebar  })=>{
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };
      const handleLogout = () => {
        // Perform logout logic here
        console.log("Logging out...");
      };
      const toggleDrawer = () => {
        setShowSidebar((prevShowSidebar) => !prevShowSidebar); // Toggle the sidebar/drawer visibility
      };
    return( 
        <header className="bg-gray-100 p-4 flex justify-between items-center">
  <div className="flex items-center w-full justify-end">
  <div className="p-2 sm:hidden" onClick={toggleDrawer}>
            <img src="/assets/icons/hamburger.svg" alt="Toggle Drawer" />
          </div>
    {/* Notification Icon */}
    <div className="p-2">
      <div className="text-3xl">
        <IoIosNotificationsOutline />
      </div>
    </div>
    {/* <button onClick={() => console.log("tttt")
    } className="sm:hidden">
                <img src="/assets/hamburger.svg" alt="Navigation for mobile" />
            </button> */}
    {/* Avatar for Profile Editing */}
    <div className="p-2 cursor-pointer relative" onClick={toggleDropdown}>
      <span className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
        A
      </span>
      <DropdownMenu isOpen={isDropdownOpen} handleLogout={handleLogout} />
    </div>
  </div>
</header>
  )
}