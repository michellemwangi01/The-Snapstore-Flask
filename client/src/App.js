// App.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Home from "./components/Home";
import PhotoPurchase from "./components/PhotoPurchase";
import Transactions from "./components/Transactions";
import Profile from "./components/Profile"; // Import the Profile component
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import "./App.css";
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
                <div className="container">
                  <Routes>
                    <Route path="/home" element={<Home jwToken={jwToken} />} />
                    <Route
                      path="/photopurchase"
                      element={
                        jwToken != "" ? (
                          <Transactions jwToken={jwToken} />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/transaction"
                      element={
                        jwToken ? (
                          <PhotoPurchase jwToken={jwToken} />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        jwToken ? (
                          <Profile jwToken={jwToken} />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/gallery"
                      element={
                        jwToken ? (
                          <Gallery jwToken={jwToken} />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/logout"
                      element={
                        jwToken ? (
                          <Logout setJWToken={setJWToken} />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/categories"
                      element={
                        jwToken ? (
                          <Categories jwToken={jwToken} />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                      path="/login"
                      element={
                        <Login jwToken={jwToken} setJWToken={setJWToken} />
                      }
                    />
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
