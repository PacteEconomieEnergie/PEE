import {DashBoard} from '../modules/Dashboard/DashBoard.modules'
import React from 'react'
export default function Dashboard(){
    return (
    
    
        <div className="flex-1  mt-4 px-4 sm:px-28 ">
            <h1 className="mb-6 text-xl font-bold">Dashboard</h1>
            <div className='flex flex-col flex-warp'>
    <DashBoard/>
    </div>
    </div>)
}