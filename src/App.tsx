import React from "react";
import { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { MainUserLayout } from "./layouts/MainUserLayout";
import { publicRoutes } from "./routes";

const App: React.FC = () => {

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
        </Routes>
      </div>
    </Router> 
  );
}

export default App;
