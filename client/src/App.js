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

const App = () => {
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
                    {/* Use a Route to display LandingPage on the root route */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/photopurchase" element={<Transactions jwToken={jwToken} />} />
                    <Route path="/transaction" element={<PhotoPurchase jwToken={jwToken} />} />
                    <Route path="/profile" element={<Profile jwToken={jwToken} />} />
                    <Route path="/gallery" element={<Gallery jwToken={jwToken} />} />
                    <Route path="/logout" element={<Logout setJWToken={setJWToken} />} />
                    <Route path="/categories" element={<Categories jwToken={jwToken} />} />
                    <Route path="/signup" element={<Signup />} />
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
