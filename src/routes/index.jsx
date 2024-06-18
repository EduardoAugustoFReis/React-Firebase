import { Routes, Route, BrowserRouter } from "react-router-dom";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

function Router(){
  return(
    <BrowserRouter>
      <AppRoutes/>  
    </BrowserRouter>
  )
}

export default Router;