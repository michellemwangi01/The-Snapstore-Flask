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
import Footer from './components/Footer';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [jwToken, setJWToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(`jwtoken ${jwToken}`);

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
                    <Route
                      path="/login"
                      element={<Login setJWToken={setJWToken} />}
                    />


                    <Route path="/" element={<Home />} jwToken={jwToken} />
                    <Route
                      path="/photopurchase"
                      element={
                        jwToken ? <Transactions /> : <Navigate to="/login" />
                      }
                    />
                    <Route
                      path="/transaction"
                      element={
                        jwToken ? <PhotoPurchase /> : <Navigate to="/login" />
                      }
                      jwToken={jwToken}
                    />
                    <Route
                      path="/profile"
                      element={jwToken ? <Profile /> : <Navigate to="/login" />}
                    />
                    <Route
                      path="/logout"
                      element={
                        jwToken ? (
                          <Logout setJWToken={setJWToken} />
                        ) : (
                          <Navigate to="/logout" />
                        )
                      }
                    />
                    <Route
                      path="/categories"
                      element={
                        jwToken ? <Categories /> : <Navigate to="/logout" />
                      }
                    />
                    <Route path="/signup" element={<Signup />} />
                  </Routes>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </Router>

  );
}

export default App;
