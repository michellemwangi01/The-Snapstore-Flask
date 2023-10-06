import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = (addUser) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, repeatPassword } = formData;

    const userData = {
      username: username,
      email: email,
      password: password,
      repeatPassword: repeatPassword,
    };

    fetch("http://127.0.0.1:5555/snapstore/signup", {
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setFormData({
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    });
  };

  return (
    <div>
      <section
        class="vh-100 bg-image"
        style={{
          backgroundImage:
            "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
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
                      Create an account
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
                          type="email"
                          id="email"
                          className="form-control form-control-lg"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          style={{ borderColor: "purple" }}
                        />
                        <label className="form-label" htmlFor="form3Example3cg">
                          Your Email
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

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          name="repeatPassword"
                          value={formData.repeatPassword}
                          onChange={handleInputChange}
                          style={{ borderColor: "purple" }}
                        />
                        <label
                          className="form-label"
                          htmlFor="form3Example4cdg"
                        >
                          Repeat your password
                        </label>
                      </div>

                      <div class="form-check d-flex justify-content-center mb-5">
                        <input
                          class="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3cg"
                        />
                        <label class="form-check-label" for="form2Example3g">
                          I agree all statements in{" "}
                          <a href="#!" class="text-body">
                            <u>Terms of service</u>
                          </a>
                        </label>
                      </div>

                      <div class="d-flex justify-content-center">
                        <Link
                          to="/login"
                          class="btn "
                          style={{
                            border: "1px purple solid",
                            color: "white",
                            backgroundColor: "purple",
                            padding: "10px 20px ",
                            fontSize: "1.2rem",
                          }}
                        >
                          Register
                        </Link>
                      </div>

                      <p
                        class="text-center text-muted mt-5 mb-0"
                        style={{ fontSize: "20px" }}
                      >
                        Have already an account?{" "}
                        <Link to="/login">Login here</Link>
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

export default Signup;
