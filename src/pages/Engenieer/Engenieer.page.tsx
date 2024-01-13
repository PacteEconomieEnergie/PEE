import React from "react";

import { Engineer } from "../../modules/Engenieer/Engenieer.modules";
export const EngenieerPage:React.FC=()=>{
    return(
        <div className="flex-1  mt-4 px-4 sm:px-28 overflow-x-auto">
      <h1 className="mb-6 text-xl font-bold">Engenieer</h1>
      <div className="flex flex-col flex-wrap ">
        <div className="">
          <Engineer />
        </div>
      </div>
    </div>
        
    )
}