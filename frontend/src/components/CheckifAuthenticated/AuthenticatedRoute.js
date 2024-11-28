// src/components/AuthenticatedRoute.js
import { Navigate } from "react-router-dom";

const AuthenticatedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const token = localStorage.getItem("token");

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthenticatedRoute;
