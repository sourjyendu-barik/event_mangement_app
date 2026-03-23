// Header.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import HeaderName from "../reusableComponents/HeaderName";
import { useAuthContext } from "../../context/AuthContext";
const Header = () => {
  const { user } = useAuthContext();
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };
  return (
    <header className="shadow-sm sticky-top">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
        <div className="container">
          {/* Brand */}
          <NavLink className="navbar-brand fw-bold brand-text" to="/">
            <HeaderName />
          </NavLink>

          {/* Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Items */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-lg-3 text-center">
              {[
                { path: "/", name: "Home" },
                { path: "/about", name: "About" },
                { path: "/services", name: "Services" },
                { path: "/blog", name: "Blog" },
                { path: "/contact", name: "Contact" },
              ].map((item) => (
                <li className="nav-item" key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-link px-3 ${
                        isActive ? "active fw-semibold text-warning" : ""
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
              {user?.role === "user" && (
                <li className="nav-item">
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      `nav-link px-3 ${isActive ? "active fw-semibold text-warning" : ""}`
                    }
                  >
                    Admin
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink
                  to="/profile"
                  className="nav-link d-flex align-items-center gap-2 px-3"
                >
                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                    style={{ width: "35px", height: "35px" }}
                  >
                    {getInitial(user.name)}
                  </div>

                  <span>My Profile</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
