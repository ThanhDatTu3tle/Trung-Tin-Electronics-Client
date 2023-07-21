import React from "react";
import { useState, useEffect } from 'react';
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

import LoginAdmin from "./pages/LoginAdmin";

const App: React.FC = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const isAuthenticatedInLocalStorage = localStorage.getItem('isAuthenticated') === 'true';
  //   setIsAuthenticated(isAuthenticatedInLocalStorage);
  // }, []);

  // const handleLogin = (username: string, password: string) => {
  //   if (username === 'tu3tle' && password === 'sodana') {
  //     setIsAuthenticated(true);
  //     localStorage.setItem('isAuthenticated', 'true');
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // };

  // const handleLogout = () => {
  //   setIsAuthenticated(false);
  //   localStorage.removeItem('isAuthenticated');
  // };

  const [search, setSearch] = useState<string | null>(null);
  // const [user,setUser] = useState<string | null>(null);
  const [ token, setToken]  = useState<string|null>(null);

  return (
    <AuthContext.Provider value={{ token, setToken, search, setSearch }}>
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
          </Routes>
        </div>
      </Router> 
    </AuthContext.Provider>
  );
}

export default App;
