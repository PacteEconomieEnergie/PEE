import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./Router/MainRoutes";
import { AppLayout } from "./Layout/AppLayout";
import ProtectedRoute from "./Router/ProtectedRoute";
import { NotificationProvider } from "./Contexts/NotificationContext";
import { UserSessionProvider } from "./modules/UserSessionProvider/UserSessionProvider.module";
const App: React.FC = () => {
 

  return (
  
  <Router>
    <UserSessionProvider>
      <NotificationProvider>
  <Routes>
    {routes?.map((route) => {
      const { path, element, children, allowedRoles } = route;
      const Layout = route.layout || AppLayout;
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
  </NotificationProvider>
  </UserSessionProvider>
</Router>

  )
}

export default App;
