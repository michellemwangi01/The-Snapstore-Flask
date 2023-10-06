import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Home from "./components/Home";
import PhotoPurchase from "./components/PhotoPurchase";
import Transactions from "./components/Transactions";
import Profile from "./components/Profile"; 
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import "./App.css";
import Redirect from "./components/Redirect";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [jwToken, setJWToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setCurrentUser("Mamamia");
  }, []);

  return (
    <div className="theRoot">
      <Router>
        <div>
          <Navbar jwToken={jwToken} />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">

                <div className="container_main">
                  <Routes>
                   <Route path="/" element={<LandingPage />}
                    <Route path="/home" element={<Home jwToken={jwToken} />} />
                    <Route
                      path="/history"
                      element={
                        jwToken === "" ? (
                          <>
                            <Navigate to="/redirect" />
                          </>
                        ) : (
                          <Transactions jwToken={jwToken} />
                        )
                      }
                    />
                    <Route
                      path="/cart"
                      element={
                        jwToken === "" ? (
                          <>
                            <Navigate to="/redirect" />
                          </>
                        ) : (
                          <PhotoPurchase jwToken={jwToken} />
                        )
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        jwToken === "" ? (
                          <>
                            <Navigate to="/redirect" />
                          </>
                        ) : (
                          <Profile jwToken={jwToken} />
                        )
                      }
                    />

                    <Route
                      path="/gallery"
                      element={
                        jwToken === "" ? (
                          <>
                            <Navigate to="/redirect" />
                          </>
                        ) : (
                          <Gallery jwToken={jwToken} />
                        )
                      }
                    />
                    <Route
                      path="/categories"
                      element={
                        jwToken === "" ? (
                          <Navigate to="/redirect" />
                        ) : (
                          <Categories to="/categories" />
                        )
                      }
                    />
                    <Route
                      path="/logout"
                      element={<Logout setJWToken={setJWToken} />}
                    />

                    <Route path="/signup" element={<Signup />} />
                    <Route
                      path="/login"
                      element={
                        <Login jwToken={jwToken} setJWToken={setJWToken} />
                      }
                    />
                    <Route path="/redirect" element={<Redirect />} />
                  </Routes>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
