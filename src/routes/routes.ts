// routes.ts
import config from "../config";
// import { privateRoutes } from "./privateRoutes";

// Layouts
import { MainUserLayout } from "../layouts/MainUserLayout";
import { MainAdminLayout } from "../layouts/MainAdminLayout";

// Pages
import Home from "../pages/Home";

// Admin Page
import LoginAdmin from "../pages/LoginAdmin";
import Admin from "../pages/Admin";

const publicRoutes = [
  { path: config.routes.home, component: Home, layout: MainUserLayout },
  { path: config.routes.login, component: LoginAdmin, layout: null },
];

const privateRoutes = [
    { path: config.routes.admin, component: Admin, layout: MainAdminLayout },
];

const adminRoute = { path: config.routes.admin, component: Admin, layout: MainUserLayout };

const authenticatedRoutes = [...publicRoutes, adminRoute, ...privateRoutes];

export { publicRoutes, authenticatedRoutes };
