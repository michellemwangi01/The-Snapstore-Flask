// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
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
import Logout from "./components/Logout";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  return (
    <div className="theRoot">
      <Router>
        <div>
          <Navbar />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="container">
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/photopurchase" element={<Transactions />} />
                    <Route path="/transaction" element={<PhotoPurchase />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/signup" element={<Signup />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
