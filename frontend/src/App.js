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
import PayrollContent from "./pages/GetStarted/Authenticated/PayrollNameContent/PayrollContent";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications
import ViewPayrollProfile from "./pages/GetStarted/Authenticated/PayrollNameContent/ViewPayrollProfile";
import UnauthenticatedRoute from "./hooks/UnauthenticatedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer // Add ToastContainer here
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition="Bounce" // Corrected syntax for transition
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={
              <UnauthenticatedRoute>
                <Login />
              </UnauthenticatedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <UnauthenticatedRoute>
                <Register />
              </UnauthenticatedRoute>
            }
          />
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
          <Route
            path="/PayrollContent/:id/:name"
            element={
              <AuthenticatedRoute>
                <PayrollContent />
              </AuthenticatedRoute>
            }
          />
          <Route path="/api/view/:token" element={<ViewPayrollProfile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
