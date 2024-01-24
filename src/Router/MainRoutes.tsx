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
import TasksPage from "../pages/Tasks/Tasks.page";
import { IngenieurLayout } from "../Layout/IngenieurLayout";
import AuthLayout from "../Layout/AuthLayout";
import AssistantLayout from "../Layout/AssitantLayout";

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
    path:"/",
    layout:AuthLayout
  },
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
      },
      {path:"/ingenieur/*",
    layout:IngenieurLayout,
  children:[
    {
      path: "/Tasks",
      element: <TasksPage />
    },


  ]},
  {
      path:"/assitant/*",
      layout:AssistantLayout,
      children:[
        {
          path:'/Projects',
          
        }
      ]

  }

    // {
    //     path:"/",
    //     element:<LandingPage/>
    // },
   

]