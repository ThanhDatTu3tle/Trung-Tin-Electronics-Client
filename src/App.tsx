import React from "react";
import { useState, useEffect } from 'react';
import { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { MainUserLayout } from "./layouts/MainUserLayout";
import { publicRoutes, authenticatedRoutes  } from "./routes";

import LoginAdmin from "./pages/LoginAdmin";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticatedInLocalStorage = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(isAuthenticatedInLocalStorage);
  }, []);

  const handleLogin = (username: string, password: string) => {
    if (username === 'tu3tle' && password === 'sodana') {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      setIsAuthenticated(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  console.log("IsAuthenticated:", isAuthenticated);

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
                    <Page isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
                  </Layout>
                }
              />
            )
          })}

          {authenticatedRoutes.map((route, index) => {
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
                    <Page isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
                  </Layout>
                }
              />
            );
          })}

          <Route path="/login" element={<LoginAdmin handleLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router> 
  );
}

export default App;
