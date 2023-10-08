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
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [btnText, setBtnText] = useState("Login");

  useEffect(() => {
    setCurrentUser("Mamamia");
  }, []);

  const handleFilterPhotosByCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };
  return (
    <div className="theRoot">
      <Router>
        <div>
          <Navbar
            username={username}
            setUsername={setUsername}
            jwToken={jwToken}
            setJWToken={setJWToken}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            btnText={btnText}
            setBtnText={setBtnText}
          />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="container_main">
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
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
                        //   jwToken === "" ? (
                        //     <>
                        //       <Navigate to="/redirect" />
                        //     </>
                        //   ) : (
                        <Gallery
                          jwToken={jwToken}
                          category_id={selectedCategoryId}
                        />
                        // )
                      }
                    />
                    <Route
                      path="/categories"
                      element={
                        // jwToken === "" ? (
                        //   <Navigate to="/redirect" />
                        // ) : (
                        <Categories
                          to="/categories"
                          filterPhotosByCategory={handleFilterPhotosByCategory}
                        />
                        // )
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
                        <Login
                          username={username}
                          setUsername={setUsername}
                          jwToken={jwToken}
                          setJWToken={setJWToken}
                          setIsLoggedIn={setIsLoggedIn}
                          setBtnText={setBtnText}
                          isLoggedIn={isLoggedIn}
                        />
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
