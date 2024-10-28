import React from "react";
import LandingPage from "./pages/landingpage/LandingPage";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Login from "./forms/Login";
import Register from "./forms/Register";
import Dashboard from "./pages/GetStarted/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/getstarted" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
