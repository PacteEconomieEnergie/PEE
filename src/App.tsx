import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./Router/MainRoutes";
import { AppLayout } from "./Layout/AppLayout";
const App: React.FC = () => {
 

  return (
  //   <Router>
  //   <Routes>
  //     {routes?.map((route,) => {
  //       const { path, element, children } = route;
  //       return (
  //         <Route
  //         key={path}
  //         path={path}
  //         element={
  //           <AppLayout>
  //             <Routes>
  //               {children?.map((child:any)=>{
  //                 // const {path,element,children}=child
                  
  //                 console.log(child,'the child');
                  
  //                 return(
  //                   <Route
  //                   key={child.path}
  //                   path={child.path}
  //                   element ={
  //                   <Routes>  {
  //                   child?.children?.map((nested:any)=>(
  //                     <Route
  //                     key={nested}
  //                     path={nested.path}
  //                     element={nested?.element}/>
  //                   ))}
  //                     </Routes>}
                    
  //                   />
  //                 )
  //               })}
  //             </Routes>
  //           </AppLayout>
  //         }
  //         />
  //       );
  //     })}
  //   </Routes>
  // </Router>
  <Router>
  <Routes>
    {routes?.map((route) => {
      const { path, element, children } = route;
      return (
        <Route
          key={path}
          path={path}
          element={
            <AppLayout>
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
            </AppLayout>
          }
        />
      );
    })}
  </Routes>
</Router>
  )
}

export default App;
