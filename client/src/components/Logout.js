import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setJWToken }) => {
  const navigate = useNavigate();
  localStorage.removeItem("jwtToken");

  setJWToken(null);

  navigate("/login");

  return <></>;
};

export default Logout;
