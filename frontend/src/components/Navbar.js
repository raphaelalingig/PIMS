import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logoOnly.png";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("color-theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };
  return (
    <nav class="bg-white border-b border-gray-200 dark:bg-gray-900 ">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={"/"}>
          <div class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} class="h-8" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              PIMS
            </span>
          </div>
        </Link>
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="">
            <Link to={"/login"}>
              <button
                type="button"
                class="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </button>
            </Link>

            <Link to={"/register"}>
              <button
                type="button"
                class="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Register
              </button>
            </Link>
          </div>
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <button
            onClick={handleDarkMode}
            className="p-1 ml-2 rounded-md border bg-black dark:bg-white border-black dark:border-white"
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="black"
                class="size-6 fill-inherit"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="white"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            )}
          </button>
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to={"/"}>
                <div
                  href="#"
                  class="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </div>
              </Link>
            </li>

            <li>
              <a
                href="#"
                class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
