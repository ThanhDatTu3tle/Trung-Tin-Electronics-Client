// routes.ts
import config from "../config";

// Layouts
import { MainUserLayout } from "../layouts/MainUserLayout";
import { MainAdminLayout } from "../layouts/MainAdminLayout";

// Pages
import Home from "../pages/Home";
import Introduce from "../pages/Introduce";
import Discount from "../pages/Discount";
import News from "../pages/News";
import Contact from "../pages/Contact";

import DetailBrand from "../pages/DetailBrand";
import DetailCategory from "../pages/DetailCategory";
import DetailProduct from "../pages/DetailProduct";
import Cart from "../pages/Cart";

// Admin Page
import LoginAdmin from "../pages/LoginAdmin";
import Dashboard from "../pages/Admin/Dashboard";
import Product from "../pages/Admin/Product";
import Category from "../pages/Admin/Category";
import Brand from "../pages/Admin/Brand";

const publicRoutes = [
  { path: config.routes.home, component: Home, layout: MainUserLayout },
  { path: config.routes.introduce, component: Introduce, layout: MainUserLayout },
  { path: config.routes.discount, component: Discount, layout: MainUserLayout },
  { path: config.routes.news, component: News, layout: MainUserLayout },
  { path: config.routes.contact, component: Contact, layout: MainUserLayout },

  { path: config.routes.detailBrand, component: DetailBrand, layout: MainUserLayout },
  { path: config.routes.detailCategory, component: DetailCategory, layout: MainUserLayout },
  { path: config.routes.detailProduct, component: DetailProduct, layout: MainUserLayout },
  { path: config.routes.cart, component: Cart, layout: MainUserLayout },

  { path: config.routes.login, component: LoginAdmin, layout: null },
];

const privateRoutes = [
    { path: config.routes.admin, component: Dashboard, layout: MainAdminLayout },
    { path: config.routes.product, component: Product, layout: MainAdminLayout },
    { path: config.routes.category, component: Category, layout: MainAdminLayout },
    { path: config.routes.brand, component: Brand, layout: MainAdminLayout },
];

export { publicRoutes, privateRoutes };
