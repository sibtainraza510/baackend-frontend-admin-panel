import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Applayout from "./pseudopages/Applayout";
import Home from "./pages/Home";
import {Contact} from "./pages/Contact";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import About from "./pages/About";
import {Services} from "./pages/Services";
import Error from "./pages/Error";
import Logout from "./pages/Logout";
import { AdminApplayout } from "./pseudopages/AdminApplayout";
import { AdminUsers } from "./pseudopages/AdminUsers";
import { AdminContacts } from "./pseudopages/AdminContacts";
import {AdminUpdates} from "./pseudopages/AdminUpdates"

const App = () =>{
  const router = createBrowserRouter([
    {path: "/" , element : <Applayout/> , 
      children : [
        {path : "/", element : <Home/>},
        {path : "/contact", element : <Contact/>},
        {path : "/register", element : <Register/>},
        {path : "/signin", element : <Signin/>},        
        {path : "/about", element : <About/>},
        {path : "/services", element : <Services/>},
        {path : "/logout" , element : <Logout/>},
        {
          path: "/admin",
          element: <AdminApplayout />,
          children: [
            { path: "users", element: <AdminUsers /> },
            { path: "contacts", element: <AdminContacts /> },
            {path : "users/:id/edit", element : <AdminUpdates />}
          ],
        },

        {path : "*" , element : <Error/> },
        
      ]}
  ])

  return <RouterProvider router = {router} />
}

export default App;