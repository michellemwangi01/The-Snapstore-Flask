// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Home from "./components/Home";
import PhotoPurchase from "./components/PhotoPurchase";
import Transactions from "./components/Transactions";
import Profile from "./components/Profile"; // Import the Profile component
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser("Mamamia");
  }, []);

  return (
    <div className="theRoot">
      <Router>
        <div>
          <Navbar />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="container">
                  {currentUser ? (
                    // Render the routes when currentUser is not empty
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route
                        path="/photopurchase"
                        element={<PhotoPurchase />}
                      />
                      <Route path="/transaction" element={<Transactions />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/profile" element={<Profile />} />
                    </Routes>
                  ) : (
                    // Render the Signup component when currentUser is empty
                    <Signup />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
