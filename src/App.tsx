import React,{useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./Router/MainRoutes";
import { useDispatch,useSelector } from "react-redux";
import { fetchAllStudies,fetchStudiesByUserId } from "./store/studies/studySlice";
import { AppDispatch } from "./store";
import { AppLayout } from "./Layout/AppLayout";
import ProtectedRoute from "./Router/ProtectedRoute";
import { NotificationProvider } from "./Contexts/NotificationContext";
import { ConfigProvider } from 'antd';
import fr_FR from 'antd/lib/locale/fr_FR';
import { UserSessionProvider } from "./modules/UserSessionProvider/UserSessionProvider.module";
import { AvatarProvider } from "./Contexts/AvatarProvider";
const App: React.FC = () => {
  const userId=useSelector((state:any)=>state?.auth?.id)
  const IdUser=localStorage.getItem('userId')
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllStudies());
    const IdUserNumber = IdUser ? Number(IdUser) : null
    if (IdUserNumber !== null) {
      dispatch(fetchStudiesByUserId(IdUserNumber));
    } // Assuming you have the userId available
  }, [dispatch, userId]);

  return (
  
  <Router>
    <UserSessionProvider>
      <NotificationProvider>
        <ConfigProvider locale={fr_FR}>
        <AvatarProvider>
  <Routes>
    {routes?.map((route) => {
      const { path, element, children, allowedRoles } = route;
      const Layout = route.layout || React.Fragment;
      return (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute allowedRoles={allowedRoles}>
            <Layout>
              {element}
              <Routes>
                {children?.map((child: any) => {
                 
                  return (
                  <Route
                    key={child.path}
                    path={child.path}
                    element={child.element}
                  />
                )}
                
                
                )}
              </Routes>
            </Layout>
            </ProtectedRoute>
          }
        />
      );
    })}
  </Routes>
  </AvatarProvider>
  </ConfigProvider>
  </NotificationProvider>
  </UserSessionProvider>
</Router>

  )
}

export default App;
