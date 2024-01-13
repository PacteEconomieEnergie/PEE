import React,{ReactNode} from "react";
import { AppLayout } from "../Layout/AppLayout";
import { LandingPage } from "../pages/Landing.Page";
import { HomePage } from "../pages/Home.page";
import StudiesPage from "../pages/studies/Studies.page";
import Dashboard from "../pages/Dashboard";
// import { Engineer } from "../modules/Engenieer/Engenieer.modules";
import { EngenieerPage } from "../pages/Engenieer/Engenieer.page";
import UserList from "../pages/Settings/UserList.page";
import { UserDetails } from "../pages/Settings/UserDetails.page";


interface Route{
    path:string;
    element?:ReactNode;
    children?:NestedRoute[]
}

interface NestedRoute{
    path:string;
    element?:ReactNode;
    children?:NestedRoute[]

}  
interface RouteConfig{
    path?:string,
    layout?:React.FC,
    element?:ReactNode,
    children?:NestedRoute[],
} 
interface MainLayout{
    children?:React.ReactNode
}
export const routes:RouteConfig[]=[
    {
        path: "/admin/*",
        layout: AppLayout,
        children: [
          {
            path: "/home",
            element: <HomePage />
          },
          {
            path: "/Studies",
            element: <StudiesPage />
          },
          {
            path: '/Dashboard',
            element: <Dashboard />
          },
          {
            path: "/Engenieer",
            element: <EngenieerPage />
          },
        //   {
        //     path: "/Settings/:userType/:userId",
        //     element: <UserList />
        //     // children: [
        //     //   {
        //     //     path: ':userType/',
        //     //     element: <UserList />,
        //     //     // children: [
        //     //     //   {
        //     //     //     path: ':userId',
        //     //     //     element: <UserDetails />
        //     //     //   }
        //     //     // ]
        //     //   }
        //     // ]
        //   }
        {
            path: "/Settings/:userType/",
            element: <UserList />,
            // children: [
            //   {
            //     path: ':userId',
            //     element: <UserDetails />
            //   }
            // ]
          }
        ]
      }
    // {
    //     path:"/",
    //     element:<LandingPage/>
    // },
   

]