import React from "react";

interface LogoutProps{
    onLogout:()=>void
}
export const Logout:React.FC<LogoutProps>=({onLogout})=>(
    <button onClick={onLogout} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none">
      Logout
    </button>
)