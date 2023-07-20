import config from "../config";
import { privateRoutes } from "./privateRoutes";

// Layouts
import { MainUserLayout } from "../layouts/MainUserLayout";
import { MainAdminLayout } from "../layouts/MainAdminLayout";

// Pages
import Home from "../pages/Home";

// Admin Page
import Admin from "../pages/Admin";


const publicRoutes = [
    { path: config.routes.home, component: Home, layout: MainUserLayout },
]

const adminRoute = { path: config.routes.admin, component: Admin, layout: MainAdminLayout };
  
const authenticatedRoutes = [...publicRoutes, adminRoute, ...privateRoutes];
  
export { publicRoutes, authenticatedRoutes  };
