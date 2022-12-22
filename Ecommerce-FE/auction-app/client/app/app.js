/**
 *
 * app.js
 *
 */

import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import store, { history } from "./store";
import { SocketProvider } from "./contexts/Socket";
import { SET_AUTH } from "./containers/Authentication/constants";
import Application from "./containers/Application";
import ScrollToTop from "./scrollToTop";
import setToken from "./utils/token";

// Import application sass styles
import "./styles/style.scss";

// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";

// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";

// react-bootstrap-table2 styles
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

// rc-slider style
import "rc-slider/assets/index.css";
import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { QueryClientHook } from "react-query-class-component";
// Authentication
const token = localStorage.getItem("token");
const queryClient = new QueryClient();
if (token) {
  // authenticate api authorization
  setToken(token);

  // authenticate routes
  store.dispatch({ type: SET_AUTH });
}

axios.defaults.baseURL = "http://localhost:5000";

const app = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <ScrollToTop>
            <Application />
          </ScrollToTop>
        </QueryClientProvider>
      </SocketProvider>
    </ConnectedRouter>
  </Provider>
);

export default app;
