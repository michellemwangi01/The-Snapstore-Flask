import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import AddProductForm from "./components/AddProductForm";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [jwToken, setJWToken] = useState("");
  const [username, setUsername] = useState("");
  const [user_id, setUserid] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [btnText, setBtnText] = useState("Login");

  console.log(`jwtoken ${jwToken}`);
  console.log(`user id ${user_id}`);

  useEffect(() => {
    setCurrentUser("Mamamia");
  }, []);

  const handleFilterPhotosByCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };
  return (
    <div className="theRoot">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="dark"
      />
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
                      path="/addproduct"
                      element={
                        jwToken ? (
                          <AddProductForm
                            jwToken={jwToken}
                            username={username}
                          />
                        ) : (
                          <Navigate to="/redirect" />
                        )
                      }
                    />

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
                          <Gallery
                            jwToken={jwToken}
                            category_id={selectedCategoryId}
                            userID={user_id}
                          />
                        )
                      }
                    />
                    <Route
                      path="/categories"
                      element={
                        jwToken === "" ? (
                          <Navigate to="/redirect" />
                        ) : (
                          <Categories
                            to="/categories"
                            filterPhotosByCategory={
                              handleFilterPhotosByCategory
                            }
                          />
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
                        <Login
                          username={username}
                          setUsername={setUsername}
                          jwToken={jwToken}
                          setJWToken={setJWToken}
                          setIsLoggedIn={setIsLoggedIn}
                          setBtnText={setBtnText}
                          isLoggedIn={isLoggedIn}
                          user_Id={user_id} 
                          setUserid={setUserid}
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
