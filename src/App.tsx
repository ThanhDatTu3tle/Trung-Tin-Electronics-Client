import React from "react";
import { useState } from 'react';
import { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { MainUserLayout } from "./layouts/MainUserLayout";
import { publicRoutes } from "./routes";
import PrivateRoute from "./PrivateRoute";

import Admin from "./pages/Admin";
import LoginAdmin from "./pages/LoginAdmin";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Hàm xác thực người dùng
  const handleLogin = () => {
    // Thực hiện xác thực người dùng, ví dụ: gửi yêu cầu đăng nhập đến máy chủ
    // Sau khi xác thực thành công, đặt trạng thái isAuthenticated thành true
    setIsAuthenticated(true);
  };

  // Hàm đăng xuất người dùng
  const handleLogout = () => {
    // Thực hiện đăng xuất, ví dụ: gửi yêu cầu đăng xuất đến máy chủ
    // Sau khi đăng xuất thành công, đặt trạng thái isAuthenticated thành false
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {

            const Page = route.component;

            let Layout = MainUserLayout;
            
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            )
          })}

          <Route
            path="/admin"
            element={
              isAuthenticated ? (
                <Admin handleLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route path="/login" element={<LoginAdmin handleLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router> 
  );
}

export default App;
