// Navbar.js
import React from "react";
import { Link, NavLink } from "react-router-dom";
import ProfileIconImage from "../assets/profile-icon.svg";
import PhotosIconImage from "../assets/photos-svgrepo-com.svg";
import Login from "./Login";
import "../styles/mystyles.css";

function Navbar({ jwToken }) {
  const btnText = jwToken === "" ? "Login" : "Logout";
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Your App Name
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? "active navbar_buttons btn btn-lg btn-block"
                    : "inactive navbar_buttons btn btn-lg btn-block"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/gallery"
                className={({ isActive }) =>
                  isActive
                    ? "active navbar_buttons btn btn-lg btn-block"
                    : "inactive navbar_buttons btn btn-lg btn-block"
                }
              >
                Gallery
              </NavLink>

              <NavLink
                to="/history"
                className={({ isActive }) =>
                  isActive
                    ? "active navbar_buttons btn btn-lg btn-block"
                    : "inactive navbar_buttons btn btn-lg btn-block"
                }
              >
                History
              </NavLink>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? "active navbar_buttons btn btn-lg btn-block"
                    : "inactive navbar_buttons btn btn-lg btn-block"
                }
              >
                Cart
              </NavLink>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  isActive
                    ? "active navbar_buttons btn btn-lg btn-block"
                    : "inactive navbar_buttons btn btn-lg btn-block"
                }
              >
                Categories
              </NavLink>
            </li>
          </ul>
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{
                padding: "5px 10px",
                margin: "3px",
                border: "1px purple solid",
                color: "purple",
              }}
            />
            <button
              class="btn btn-outline-success"
              type="submit"
              style={{
                padding: "5px 10px",
                margin: "3px",
                border: "1px purple solid",
                color: "purple",
              }}
            >
              Search
            </button>
          </form>
          {jwToken ? (
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                isActive
                  ? "active navbar_buttons btn btn-lg btn-block"
                  : "inactive navbar_buttons btn btn-lg btn-block"
              }
              style={{
                padding: "3px 10px",
                margin: "1rem",
                border: "1px purple solid",
                color: "white",
                background: "purple",
              }}
            >
              {btnText}
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "login_out active navbar_buttons btn btn-lg btn-block"
                  : "login_out inactive navbar_buttons btn btn-lg btn-block"
              }
              style={{
                padding: "3px 10px",
                margin: "1rem",
                border: "1px purple solid",
                color: "white",
                background: "purple",
              }}
            >
              {btnText}
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
