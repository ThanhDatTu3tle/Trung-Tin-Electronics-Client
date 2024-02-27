import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { publicRoutes, privateRoutes } from "./routes";
import ProtectedRoute from "./ProtectedRoute";

import { MainUserLayout } from "./layouts/MainUserLayout";
import { MainAdminLayout } from "./layouts/MainAdminLayout";
import DetailCategory from "./pages/DetailCategory";
import DetailProduct from "./pages/DetailProduct";

import { AuthContext } from "./Context/AuthContext";
import { BrandProvider } from "./Context/BrandContext";
import { CategoryProvider } from "./Context/CategoryContext";
import { ProductProvider } from "./Context/ProductContext";
import { CartProvider } from "./Context/CartContext";
import { ComboProvider } from "./Context/ComboContext";
import { EventProvider } from "./Context/EventContext";
import { InvoiceProvider } from "./Context/InvoiceContext";

import CartButton from "./components/CartButton";

const App: React.FC = () => {
  const [search, setSearch] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const clearLocalStorageAfter24Hours = () => {
    setTimeout(() => {
      localStorage.removeItem("seen");
    }, 24 * 60 * 60 * 1000);
  };

  const clearLocalStorageAfter18Hours = () => {
    setTimeout(() => {
      localStorage.removeItem("seen");
    }, 24 * 60 * 60 * 1000);
  };

  clearLocalStorageAfter24Hours();
  clearLocalStorageAfter18Hours();

  return (
    <AuthContext.Provider value={{ token, setToken, search, setSearch }}>
      <InvoiceProvider>
        <EventProvider>
          <ComboProvider>
            <BrandProvider>
              <CategoryProvider>
                <ProductProvider>
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
                            );
                          })}
                          {privateRoutes.map((route, index) => {
                            const Page = route.component;

                            let Layout = MainAdminLayout;

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
                            );
                          })}
                          <Route
                            path="/detailCategory/:name/*"
                            element={<DetailCategory />}
                          />
                          <Route
                            path="/detailProduct/:id/*"
                            element={<DetailProduct />}
                          />
                        </Routes>
                        <CartButton />
                      </div>
                    </Router>
                  </CartProvider>
                </ProductProvider>
              </CategoryProvider>
            </BrandProvider>
          </ComboProvider>
        </EventProvider>
      </InvoiceProvider>
    </AuthContext.Provider>
  );
};

export default App;
