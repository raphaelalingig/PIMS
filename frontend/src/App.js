// src/App.js
import React from "react";
import LandingPage from "./pages/landingpage/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./forms/Login";
import Register from "./forms/Register";
import UnAuthenticatedDashboard from "./pages/GetStarted/UnAuthenticated/UnauthenticatedDashboard";
import AuthenticatedDashboard from "./pages/GetStarted/Authenticated/AuthenticatedDashboard";
import { AuthProvider } from "./context/AuthContext";
import AuthenticatedRoute from "./components/CheckifAuthenticated/AuthenticatedRoute";
function App() {
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
            element={
              <AuthenticatedRoute>
                <AuthenticatedDashboard />
              </AuthenticatedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
