import React from "react";
import { useState } from 'react';
import { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { MainUserLayout } from "./layouts/MainUserLayout";
import { publicRoutes, privateRoutes  } from "./routes";
import { AuthContext } from "./Context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import DetailProduct from "./pages/DetailProduct";
import { CartProvider } from "./Context/CartContext";
import CartButton from "./components/CartButton";
import DetailBrand from "./pages/DetailBrand";
import DetailCategory from "./pages/DetailCategory";

const App: React.FC = () => {
  const [search, setSearch] = useState<string | null>(null);
  const [token, setToken]  = useState<string|null>(null);

  return (
    <AuthContext.Provider value={{ token, setToken, search, setSearch }}>
      <CartProvider>
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

              {privateRoutes.map((route, index) => {
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
                      <ProtectedRoute>
                        <Layout>
                          <Page />
                        </Layout>
                      </ProtectedRoute>
                    }
                  />
                )
              })}
              <Route path="/detailBrand/:name/*" element={<DetailBrand />} />
              <Route path="/detailCategory/:name/*" element={<DetailCategory />} />
              <Route path="/detailProduct/:id/*" element={<DetailProduct />} />
            </Routes>
            <CartButton />
          </div>
        </Router>
      </CartProvider> 
    </AuthContext.Provider>
  );
}

export default App;
