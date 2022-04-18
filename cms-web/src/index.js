import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CmsAuthProvider from "./store/CmsAuthProvider";

ReactDOM.render(
  <CmsAuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter> 
  </CmsAuthProvider>,
  document.getElementById("root")
);

