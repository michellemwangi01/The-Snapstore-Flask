import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../styles/mystyles.css";

const Login = ({
  jwToken,
  setJWToken,
  setUsername,
  setIsLoggedIn,
  setBtnText,
  isLoggedIn,
  user_id,
  setUserid,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;

    const userData = {
      username: username,
      password: password,
    };

    fetch("http://127.0.0.1:5555/snapstore/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        localStorage.setItem("jwtToken", data.access_token);
        localStorage.setItem("userID", data.user_id);
        setIsLoggedIn(true);
        // setUserid(data.user_id)
        const username_uppper = toTitleCase(data.username);
        setBtnText(`Logout, ${username_uppper}`);
        navigate("/");
        setFormData({
          username: "",
          email: "",
          password: "",
          repeatPassword: "",
        });
        setJWToken(data.access_token);
        setUsername(data.username);
        setUserid(data.user_id);
      })
      .catch((response) => {
        console.error("Error:", response.message);
      });
    console.log(jwToken);
    console.log(user_id);
  };

  return (
    <div>
      <section
        class="vh-100 bg-image"
        style={{
          backgroundImage:
            "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
          position: "top",
        }}
      >
        <div class="mask d-flex align-items-center h-100 gradient-custom-3">
          <div class="container h-100">
            <div class="loginBackgroundContainer">
              <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                <div
                  class="card"
                  style={{
                    borderRadius: "15px",
                    background: "transparent",
                    border: "0",
                  }}
                >
                  <div class="card-body p-5">
                    <h2
                      class="text-uppercase text-center mb-5"
                      style={{
                        color: "purple",
                        fontFamily: "cursive",
                        fontSize: "3rem",
                      }}
                    >
                      LOGIN
                    </h2>

                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="username"
                          className="form-control form-control-lg"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          style={{ borderColor: "purple" }}
                        />
                        <label className="form-label" htmlFor="form3Example1cg">
                          Username
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          style={{ borderColor: "purple" }}
                        />
                        <label className="form-label" htmlFor="form3Example4cg">
                          Password
                        </label>
                      </div>

                      <div class="d-flex justify-content-center">
                        <button
                          class="btn "
                          type="submit"
                          style={{
                            border: "1px purple solid",
                            color: "white",
                            backgroundColor: "purple",
                            padding: "10px 20px ",
                            fontSize: "1.2rem",
                          }}
                        >
                          Login
                        </button>
                      </div>

                      <p
                        class="text-center text-muted mt-5 mb-0"
                        style={{ fontSize: "20px" }}
                      >
                        Don't have an account?{" "}
                        <Link to="/signup">Sign up here</Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
