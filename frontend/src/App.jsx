"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Loader from "./components/Loader"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ServicesPage from "./pages/ServicesPage"
import ApiPage from "./pages/ApiPage"
import TeamPage from "./pages/TeamPage"
import ChatbotPage from "./pages/ChatbotPage"
import "./App.css"

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Navbar />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/api" element={<ApiPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/chatbot" element={<ChatbotPage />} />
              </Routes>
            </main>
            <Footer />
          </>
        )}
      </div>
    </Router>
  )
}

export default App
