// src/context/AuthContext.js
import React, { createContext, useState, useContext } from "react";
import api_url from "../components/api_url";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Login function
  const [userCredentials, setUserCredentials] = useState(null);
  const login = async (email, password, navigate) => {
    try {
      const response = await api_url.post("/user/login", { email, password });

      if (
        response.status === 200 &&
        response.data.status === "success" &&
        response.data.token
      ) {
        // Temporarily store the token
        localStorage.setItem("token", response.data.token);

        // Verify if the stored token matches the response token
        if (localStorage.getItem("token") === response.data.token) {
          localStorage.setItem("isAuthenticated", "true");

          setUserCredentials(response.data);
          localStorage.setItem(
            "userCredentials",
            JSON.stringify(response.data)
          );

          console.log(
            "Login successful, isAuthenticated set to:",
            localStorage.getItem("isAuthenticated")
          );

          Swal.fire({
            title: "Login Successful",
            text: "You are now logged in",
            icon: "success",
            confirmButtonColor: "#1A56DB",
          });

          // Navigate to the dashboard
          navigate("/authenticated-dashboard");
        } else {
          // Clear token and set isAuthenticated to false if token mismatch
          localStorage.removeItem("token");
          localStorage.setItem("isAuthenticated", "false");
          console.error("Token mismatch. Login not authorized.");
          Swal.fire({
            title: "Login Failed",
            text: "Invalid email or password",
            icon: "error",
            confirmButtonColor: "#1A56DB",
          });
        }
      } else {
        console.error("Login failed:", response.data.message);
        Swal.fire({
          title: "Login Failed",
          text: "Invalid email or password",
          icon: "error",
          confirmButtonColor: "#1A56DB",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire({
        title: "Login Failed",
        text: "Invalid email or password",
        icon: "error",
        confirmButtonColor: "#1A56DB",
      });
    }
  };

  // Logout function
  const logout = (navigate) => {
    // You can also navigate to a specific route if needed here
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("userCredentials");
    setUserCredentials(null);
    console.log("Logout successful, isAuthenticated set to:", false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
