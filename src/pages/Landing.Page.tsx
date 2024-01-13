import React from "react";
import { AssorCall } from "../utils/AssorCall";
import { SignIn } from "../modules/Auth/SignIn/SignIn.module";

export const LandingPage:React.FC=()=>{
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* AssorCall component */}
      <AssorCall className="h-screen md:h-full" />

      {/* SignIn component */}
      <div className="flex items-center justify-center h-screen md:h-full">
        <SignIn />
      </div>

      {/* AssorCall for larger screens (hidden on smaller screens) */}
      {/* <AssorCall className="hidden md:block" /> */}
    </div>
    )
}