import React from "react";
import { Link, NavLink } from "react-router-dom";
import ProfileIconImage from "../assets/profile-icon.svg";
import PhotosIconImage from "../assets/photos-svgrepo-com.svg";
import Login from "./Login";
import "../styles/mystyles.css";

function Navbar({ jwToken }) {
  const btnText = jwToken ? "Logout" : "Login";
  return (
    // <nav className="navbar navbar-expand-lg navbar-dark bg-orangered">
    //   <div className="container">
    //     <Link to="/" className="navbar-brand">
    //       {" "}
    //       {/* Wrap the logo in Link */}
    //       <div style={{ display: "flex", alignItems: "center" }}>
    //         <img
    //           src={PhotosIconImage}
    //           alt="Photos Icon"
    //           style={{ width: "32px", height: "32px", marginRight: "5px" }}
    //         />
    //         <span style={{ fontWeight: "bold", fontSize: "24px", margin: "0" }}>
    //           <span style={{ color: "green" }}>Snap</span>
    //           <span style={{ color: "yellow" }}>Store</span>
    //         </span>
    //       </div>
    //     </Link>
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarNav"
    //       aria-controls="navbarNav"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>

    //     <div className="d-flex flex-grow-1 justify-content-center align-items-center">
    //       <div className="input-group">
    //         <input
    //           type="text"
    //           placeholder="Search..."
    //           className="form-control py-2 border-right-0 border"
    //           style={{ borderRadius: "20px 0 0 20px" }}
    //         />
    //         <span className="input-group-append">
    //           <button
    //             className="btn btn-light py-2 px-3 border-left-0 border"
    //             type="button"
    //             style={{ borderRadius: "0 20px 20px 0" }}
    //           >
    //             Search
    //           </button>
    //         </span>
    //       </div>
    //     </div>
    //     <div className="d-flex align-items-center">
    //       <Link
    //         to="/profile"
    //         className="nav-link"
    //         style={{ marginLeft: "10px" }}
    //       >
    //         <img
    //           src={ProfileIconImage}
    //           alt="Profile Icon"
    //           style={{ width: "32px", height: "32px" }}
    //         />
    //       </Link>
    //     </div>
    //     <button type="button" class="btn btn-primary btn-sm">
    //       Small button
    //     </button>
    //     {/* <Login /> */}
    //   </div>
    // </nav>

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
                to="/photopurchase"
                className={({ isActive }) =>
                  isActive
                    ? "active navbar_buttons btn btn-lg btn-block"
                    : "inactive navbar_buttons btn btn-lg btn-block"
                }
              >
                Cart
              </NavLink>
              <NavLink
                to="/transaction"
                className={({ isActive }) =>
                  isActive
                    ? "active navbar_buttons btn btn-lg btn-block"
                    : "inactive navbar_buttons btn btn-lg btn-block"
                }
              >
                Purchases
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
            />
            <button class="btn btn-outline-success" type="submit">
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
            >
              {btnText}
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "active navbar_buttons btn btn-lg btn-block"
                  : "inactive navbar_buttons btn btn-lg btn-block"
              }
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
