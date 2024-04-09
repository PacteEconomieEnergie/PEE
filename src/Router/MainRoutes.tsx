import React,{ReactNode} from "react";
import { AppLayout } from "../Layout/AppLayout";
import { HomePage } from "../pages/Home.page";
import StudiesPage from "../pages/studies/Studies.page";
import Dashboard from "../pages/Dashboard";
import { EngenieerPage } from "../pages/Engenieer/Engenieer.page";
import UserList from "../pages/Settings/UserList.page";
import TasksPage from "../pages/Ingenieur/Tasks/Tasks.page";
import { IngenieurLayout } from "../Layout/IngenieurLayout";
import AuthLayout from "../Layout/AuthLayout";
import AssistantLayout from "../Layout/AssitantLayout";
import Settings from "../pages/Ingenieur/Settings/Settings.Page";
import Overview from "../pages/Ingenieur/Overview/Overview.Page";
import Project from "../pages/Ingenieur/Projects/Project.Page";
import ClientPage from "../pages/Assistant/Clients/Client.Page";
import OverviewAssistant from "../pages/Assistant/Overview/OverviexAssistant.Page";


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
    allowedRoles?: string[]
} 

export const routes:RouteConfig[]=[
  {
    path:"/",
    layout:AuthLayout
  },
  // {
  //   path: "/reset-password",
  //   element: <ResetPassword />,
  //   // layout: AuthLayout, // You can use AuthLayout or another layout if you want a specific layout for the reset password page
  // },
    {
        path: "/admin/*",
        layout: AppLayout,
        allowedRoles: ['ADMIN'],
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
            path: "/Settings",
            element: <Settings />
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
    allowedRoles: ['ENGINEER'],
  children:[
    {
      path: "/Tasks",
      element: <TasksPage />
    },
    {
      path: "/OverView",
      element: <Overview />
    },
    {
      path: "/Settings",
      element: <Settings />
    },
    {
      path: "/Projects",
      element: <Project />
    },


  ]},
  {
      path:"/assistant/*",
      layout:AssistantLayout,
      allowedRoles: ['ASSISTANT'],
      children:[
        {
          path: "/Studies",
          element: <StudiesPage />
        },
        {
          path: "/Settings",
          element: <Settings />
        },
        {
          path: "/OverViewAssistant",
          element: <OverviewAssistant />
        },
        {
          path: "/Clients",
          element: <ClientPage />
        },
      ]

  }

    // {
    //     path:"/",
    //     element:<LandingPage/>
    // },
   

]