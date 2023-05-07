import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    const navBarClasses = () => (active) => {
        return "nav-link" + (active ? " bg-primary text-white" : "");
    };
    return (
        <ul className="nav nav-pills">
            <li className="nav-item">
                <NavLink exact to="/" className={navBarClasses()}>
                    Main
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/login" className={navBarClasses()}>
                    Login
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/users" className={navBarClasses()}>
                    Users
                </NavLink>
            </li>
        </ul>
    );
};

export default NavBar;
