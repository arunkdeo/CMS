import React from "react";
import * as Icon from "react-feather";
import { NavLink } from "react-router-dom";

const NavMenu = ()=>{
    return <ul className="nav flex-column">
    <li className="nav-item">
      <NavLink activeClassName="active" to="/"  className="nav-link">
        <Icon.Home className="feather feathre-home" />
        Dashboard
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink activeClassName="active" to="/cms/contact"  className="nav-link">
        <Icon.Users className="feather feathre-users" />
        Contact
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink activeClassName="active" to="/cms/address"  className="nav-link">        
        <Icon.MapPin className="feather feathre-mapin" />
        Address
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink activeClassName="active" to="/cms/photos"  className="nav-link">
        <Icon.Image className="feather feathre-image" />
        Photo
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink activeClassName="active" to="/cms/events"  className="nav-link">
        <Icon.Gift className="feather feathre-gift" /> Events{" "}
      </NavLink>
    </li>
    <hr />
    <li className="nav-item">
      <NavLink activeClassName="active" to="/cms/search" className="nav-link">
        <Icon.Search className="feather feathre-search" />
        Search
      </NavLink>
    </li>
  </ul>
}

export default NavMenu;