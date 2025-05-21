"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Hospitals", path: "/hospitals" },
    { name: "API", path: "/api" },
    { name: "Team", path: "/team" },
    { name: "Chatbot", path: "/chatbot" },
    { name: "Admin Login", path: "/adminlogin" },
  ]

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20"> {/* Increased height to h-20 */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/Gemini_Generated_Image_rhsphhrhsphhrhsp 1.jpg" 
                alt="Medicode Logo" 
                className="h-16 w-auto object-contain" // Added object-contain
              />
              {/* Optional: Add text logo next to image */}
              <span className="ml-2 text-xl font-bold text-blue-600 hidden sm:block">Medicode</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                    location.pathname === link.path
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {link.name === "Admin Login" ? (
                    <span className="flex items-center gap-2">
                      {link.name}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                  ) : (
                    link.name
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center"> {/* Added flex items-center */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none h-10 w-10" // Added fixed dimensions
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3"> {/* Increased pb-4 */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-3 rounded-md text-base font-medium ${ // Increased py-3
                  location.pathname === link.path
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name === "Admin Login" ? (
                  <span className="flex items-center gap-2">
                    {link.name}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                ) : (
                  link.name
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar