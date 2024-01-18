import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./Router/MainRoutes";
import { AppLayout } from "./Layout/AppLayout";
const App: React.FC = () => {
 

  return (
  
  <Router>
  <Routes>
    {routes?.map((route) => {
      const { path, element, children } = route;
      const Layout = route.layout || AppLayout;
      return (
        <Route
          key={path}
          path={path}
          element={
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
          }
        />
      );
    })}
  </Routes>
</Router>
  )
}

export default App;
