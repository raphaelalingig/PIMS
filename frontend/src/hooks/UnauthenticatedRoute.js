// src/components/UnauthenticatedRoute.js
import { Navigate, useLocation } from "react-router-dom";

const UnauthenticatedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const location = useLocation();

  if (isAuthenticated) {
    // Redirect to the authenticated dashboard if already authenticated
    return <Navigate to="/authenticated-dashboard" replace />;
  }

  return children;
};

export default UnauthenticatedRoute;
