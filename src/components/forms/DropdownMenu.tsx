import React from "react";
import { Logout } from "../Logout";

interface DropDownProps{
    isOpen : boolean;
    handleLogout:()=>void
}

export const DropdownMenu:React.FC<DropDownProps>=({isOpen, handleLogout})=>{
    const dropdownClasses = isOpen
    ? "absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 justify-center"
    : "hidden";
    return(
        <div className={dropdownClasses}>
        <ul className="py-1">
          <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Profile Settings
          </li>
          <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            App Settings
          </li>
          <li className="block px-4 py-2">
          <Logout onLogout={handleLogout} />
        </li>
        </ul>
      </div>
    )
}