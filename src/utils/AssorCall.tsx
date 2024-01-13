import React from "react";

interface AssorCallProps{
    className?:string
}

export const AssorCall:React.FC<AssorCallProps>=({className})=>{




    return(
        <div className= {`bg-white h-screen flex items-center justify-center ${className}`}>
           
            <img src="/images/logoPee.png" className="max-w-full max-h-full"/>




        </div>
    )
}