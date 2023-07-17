import config from "../config";

// Layouts
import { MainUserLayout } from "../layouts/MainUserLayout";

// Pages
import Home from "../pages/Home";


const publicRoutes = [
    { path: config.routes.home, component: Home, layout: MainUserLayout },
]
  
const privateRoutes: any = [
    // { path: config.routes.admin, component: Admin, layout: AdminLayout },
]
  
export { publicRoutes, privateRoutes };
