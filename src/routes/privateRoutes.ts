// components.ts
// import AdminDashboard from "../pages/AdminDashboard";
// import UserProfile from "../pages/UserProfile";

// Import các trang cần bảo vệ ở đây

// layouts.ts
import { MainAdminLayout } from "../layouts/MainAdminLayout";
// Import các layout cần sử dụng ở đây

const privateRoutes: any = [
    //   { path: "/admin/dashboard", component: AdminDashboard, layout: MainAdminLayout },
    //   { path: "/admin/profile", component: UserProfile, layout: MainAdminLayout },
  // Thêm các tuyến dẫn đến trang cần bảo vệ ở đây
];

export { privateRoutes };
