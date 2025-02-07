"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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

  const navLinks = [
    { name: "YouTube Video Downloader", path: "/" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="bg-[#FFFFFF] dark:bg-[#212121] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-[#6C5CE7]">
              Tube
              <span className="text-[#000000] dark:text-[#FFFFFF]">Grab</span>
            </span>
          </div>

          <nav className="hidden sm:flex absolute left-1/2 transform -translate-x-1/2 space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={`relative text-gray-900 dark:text-white ${
                  pathname === link.path ? "font-semibold" : ""
                }`}
              >
                {link.name}
                {pathname === link.path && (
                  <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-[#6C5CE7] dark:bg-[#A29BFE]"></span>
                )}
              </a>
            ))}
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
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className={`block py-2 text-gray-900 dark:text-white ${
                pathname === link.path ? "font-semibold underline" : ""
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
