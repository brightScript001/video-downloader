"use client";
import React, { useState, useEffect } from "react";
import {
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      if (newTheme) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newTheme;
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              TubeGrab
            </span>
          </div>

          <nav className="hidden sm:flex absolute left-1/2 transform -translate-x-1/2 space-x-6">
            <a href="#" className="text-gray-900 dark:text-white">
              Home
            </a>
            <a href="#" className="text-gray-900 dark:text-white">
              About
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5 text-yellow-500" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-900" />
              )}
            </button>

            <button onClick={toggleMenu} className="sm:hidden p-2">
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-900 dark:text-white" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="sm:hidden bg-white dark:bg-gray-800 p-4">
          <a href="#" className="block py-2 text-gray-900 dark:text-white">
            Home
          </a>
          <a href="#" className="block py-2 text-gray-900 dark:text-white">
            About
          </a>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
