import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ProfileIconImage from "../assets/profile-icon.svg";
import PhotosIconImage from "../assets/photos-svgrepo-com.svg";
import Login from "./Login";
import "../styles/mystyles.css";

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (word) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
}

function Navbar({
  jwToken,
  setJWToken,
  setUsername,
  username,
  setIsLoggedIn,
  isLoggedIn,
  btnText,
  setBtnText,
}) {
  const navigate = useNavigate();
  console.log(isLoggedIn);

  const logoutHandler = () => {
    if (isLoggedIn) {
      console.log("----------------");
      setBtnText("Login");
      localStorage.removeItem("jwtToken");
      setJWToken("");
      setUsername("");
      setIsLoggedIn(false);
      navigate("/login");
    }
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={PhotosIconImage}
              alt="Photos Icon"
              style={{ width: "32px", height: "32px", marginRight: "5px" }}
            />
            <span style={{ fontWeight: "bold", fontSize: "24px", margin: "0" }}>
              <span style={{ color: "Black" }}>Snap</span>
              <span style={{ color: "Purple" }}>Store</span>
            </span>
          </div>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <NavLink
                to="/"
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
          <button
            onClick={() => (isLoggedIn ? logoutHandler() : navigate("/login"))}
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
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
