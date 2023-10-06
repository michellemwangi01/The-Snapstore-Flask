import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, jwToken, ...rest }) => {
  return (
    <Route
      {...rest}
      element={jwToken ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
