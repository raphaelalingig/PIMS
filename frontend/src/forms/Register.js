import React, { useState } from "react";
import Navbar from "../components/Navbar";
import api_url from "../components/api_url";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Check if passwords match
    if (password !== confirm_password) {
      setPasswordsMatch(false); // Set state to indicate passwords do not match
      console.error("Passwords do not match");
      // Optional: Focus the password input
      document.getElementById("password").focus();
      return;
    } else {
      setPasswordsMatch(true); // Set state to indicate passwords match
    }
    try {
      const response = await api_url.post("/user/register", {
        email,
        first_name,
        last_name,
        mobile_number,
        password,
        confirm_password,
      });

      if (response.status === 200 && response.data.status === "success") {
        console.log("Registration successful");
        navigate("/login");
      } else {
        console.error("Registration failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen">
      <Navbar />
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="animate__animated animate__fadeIn w-full max-w-7xl px-4 py-8 mx-auto">
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="first_name"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="last_name"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Doe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={mobile_number}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@company.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  !passwordsMatch ? "focus:ring-red-600" : ""
                }`}
                placeholder="•••••••••"
                required
              />
              {!passwordsMatch && (
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span class="font-medium">Error: </span> Password do not
                  match.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirm_password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="password"
                id="confirm_password"
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  !passwordsMatch ? "focus:ring-red-600" : ""
                }`}
                placeholder="•••••••••"
                required
              />
              {!passwordsMatch && (
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span class="font-medium">Error: </span> Confirm password do not
                  match.
                </p>
              )}
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                I agree with the{" "}
                <di className="text-blue-600 hover:underline dark:text-blue-500">
                  terms and conditions
                </di>
                .
              </label>
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
