import React from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  if (!email || !password) {
    // Redirect to login page or some other page if email and password are not found
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthGuard;
