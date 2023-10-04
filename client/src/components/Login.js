import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [jwToken, setJWToken] = useState("");

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
      username: formData.username,
      password: formData.password,
    };

    fetch("http://127.0.0.1:5555/snapstore/login", {
      method: "POST",
      headers: {
        // Authorization: "Bearer {jwToken}",
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
        setJWToken(data.token);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    localStorage.setItem("jwtToken", jwToken);

    setFormData({
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    });
  };

  useEffect(() => {
    fetch("http://127.0.0.1:5555/snapstore/users", {
      headers: {
        Authorization: "Bearer {jwToken}",
      },
    })
      .then((response) => {
        if (response.message) {
          console.log(response.message);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        setJWToken(data.token);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [jwToken]);

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
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                <div class="card" style={{ borderRadius: "15px" }}>
                  <div class="card-body p-5">
                    <h2 class="text-uppercase text-center mb-5">Login</h2>

                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="username"
                          className="form-control form-control-lg"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
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
                        />
                        <label className="form-label" htmlFor="form3Example4cg">
                          Password
                        </label>
                      </div>

                      <div class="d-flex justify-content-center">
                        <button
                          type="submit"
                          class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Login
                        </button>
                      </div>

                      <p class="text-center text-muted mt-5 mb-0">
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
