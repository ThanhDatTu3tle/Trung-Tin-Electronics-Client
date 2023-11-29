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

import DetailCategory from "../pages/DetailCategory";
import DetailProduct from "../pages/DetailProduct";
import Cart from "../pages/Cart";

// Admin Page
import LoginAdmin from "../pages/LoginAdmin";
import Dashboard from "../pages/Admin/Dashboard";
import Product from "../pages/Admin/Product";
import ProductManagement from "../pages/Admin/ProductManagement";
import Category from "../pages/Admin/Category";
import Brand from "../pages/Admin/Brand";
import Invoice from "../pages/Admin/Invoice";
import Bill from "../pages/Admin/Bill";
import User from "../pages/Admin/User";
import Combo from "../pages/Admin/Combo";
import Event from "../pages/Admin/Event";

const publicRoutes = [
  { path: config.routes.home, component: Home, layout: MainUserLayout },
  { path: config.routes.introduce, component: Introduce, layout: MainUserLayout },
  { path: config.routes.discount, component: Discount, layout: MainUserLayout },
  { path: config.routes.news, component: News, layout: MainUserLayout },
  { path: config.routes.contact, component: Contact, layout: MainUserLayout },

  { path: config.routes.detailCategory, component: DetailCategory, layout: MainUserLayout },
  { path: config.routes.detailProduct, component: DetailProduct, layout: MainUserLayout },
  { path: config.routes.cart, component: Cart, layout: MainUserLayout },

  { path: config.routes.login, component: LoginAdmin, layout: null },
];

const privateRoutes = [
    { path: config.routes.admin, component: Dashboard, layout: MainAdminLayout },
    { path: config.routes.product, component: Product, layout: MainAdminLayout },
      { path: config.routes.productManagement, component: ProductManagement, layout: MainAdminLayout },
    { path: config.routes.category, component: Category, layout: MainAdminLayout },
    { path: config.routes.brand, component: Brand, layout: MainAdminLayout },
    { path: config.routes.invoice, component: Invoice, layout: MainAdminLayout },
    { path: config.routes.bill, component: Bill, layout: MainAdminLayout },
    { path: config.routes.user, component: User, layout: MainAdminLayout },
    { path: config.routes.combo, component: Combo, layout: MainAdminLayout },
    { path: config.routes.event, component: Event, layout: MainAdminLayout },
];

export { publicRoutes, privateRoutes };
