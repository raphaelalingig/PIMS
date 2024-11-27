// src/App.js
import React from "react";
import LandingPage from "./pages/landingpage/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./forms/Login";
import Register from "./forms/Register";
import UnAuthenticatedDashboard from "./pages/GetStarted/UnAuthenticated/UnauthenticatedDashboard";
import AuthenticatedDashboard from "./pages/GetStarted/Authenticated/AuthenticatedDashboard";
import { AuthProvider } from "./context/AuthContext";

/*************  ✨ Codeium Command ⭐  *************/
/**
 * The main application component that sets up the routing structure.
 * It wraps the application with the authentication context provider
 * and browser router, defining routes for landing, login, register,
 * and unauthenticated dashboard pages.
 */
/******  4c18b3e4-abaa-4267-bd30-8e3592e1db40  *******/ function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/unauthenticated-dashboard"
            element={<UnAuthenticatedDashboard />}
          />
          <Route
            path="/authenticated-dashboard"
            element={<AuthenticatedDashboard />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
