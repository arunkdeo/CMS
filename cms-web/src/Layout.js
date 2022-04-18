import React, { Fragment } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./layout.css";
import * as Icon from "react-feather";
import Contact from "./pages/Contact";
import Address from "./pages/Address";
import { Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NavMenu from "./components/NavMenu";
import { NavLink } from "react-router-dom";
import Photos from "./pages/Photos";

const Layout = (props) => {
  
  return (
    <div className="Container">
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <NavLink to="/" className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
          <Icon.Home /> Sri Leela Narayan Charitable Trust
        </NavLink>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <input
          className="form-control form-control-dark w-100"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <a className="nav-link px-3" href="#">
              {props.email !== null &&<span>{props.email}</span>}
            </a>
          </div>
        </div>
      </header>

      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3">
              <NavMenu />
            </div>
          </nav>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/cms/contact" element={<Contact />} />
              <Route path="/cms/address" element={<Address />} />
              <Route path="/cms/photos" element={<Photos />} />              
            </Routes>
          </main>
        </div>
      </div>
      <footer className="bg-dark flex-md-nowrap top-gap-between-component">
        <div>
          <p>This version of application is for learning purpose only. Code is not optimized for Production Deployment.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
