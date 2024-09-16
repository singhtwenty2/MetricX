import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // Get the token from localStorage (in case the AuthContext hasn't updated yet)
  const token = localStorage.getItem("token");

  if (!isAuthenticated && !token) {
    // Redirect to login page if the user is not authenticated and no token exists
    return <Navigate to="/login" />;
  }

  // If the user is authenticated or a token exists in localStorage, render the protected page
  return children;
};

export default ProtectedRoute;
