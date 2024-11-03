// src/App.js
import React from "react";
import LandingPage from "./pages/landingpage/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./forms/Login";
import Register from "./forms/Register";
import Dashboard from "./pages/GetStarted/Dashboard";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
