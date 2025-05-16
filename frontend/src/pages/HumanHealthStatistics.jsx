"use client"

import { useState, useEffect } from "react"
import HumanModel from "../components/HumanModel"
import AdminNavbar from "../components/AdminNavbar"
import HealthSidebar from "../components/HealthSidebar"
import AgeStatistics from "../components/AgeStatistics"
import HealthRisks from "../components/HealthRisks"
import ActionPlans from "../components/ActionPlans"
import NotificationBanner from "../components/NotificationBanner"
import HealthRecommendations from "../components/HealthRecommendations"
import { Menu } from "lucide-react"

const HumanHealthStatistics = () => {
  const [selectedHealth, setSelectedHealth] = useState("Total Health")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showGeneticPopup, setShowGeneticPopup] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const [showStats, setShowStats] = useState(true)

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setShowSidebar(false)
        setShowStats(false)
      } else {
        setShowSidebar(true)
        setShowStats(true)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 1.5))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.5))
  }

  const handleCloseGeneticPopup = () => {
    setShowGeneticPopup(false)
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const toggleStats = () => {
    setShowStats(!showStats)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Toggle */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Health Statistics</h1>
            <button 
              onClick={toggleStats} 
              className="p-2 rounded-md bg-white shadow text-blue-600 hover:bg-gray-50"
            >
              {showStats ? "View Model" : "View Stats"}
            </button>
          </div>
          
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6">

        {/* Left Section with Model and Sidebar */}
        <div
          className={`${isMobile && !showStats ? "flex" : isMobile && showStats ? "hidden" : "w-full lg:w-1/2"
            } relative bg-white flex flex-col lg:flex-row h-full`}
        >
          {/* Health Sidebar */}
          <div className={`${showSidebar ? "block" : "hidden"} lg:block`}>
            <HealthSidebar />
          </div>

          <div className="flex-1 relative flex flex-col p-2 sm:p-4">
            {/* Health Type Selector */}
            <div className="mb-2 sm:mb-4">
              <div className="relative inline-block">
                <button className="flex items-center justify-between w-full sm:w-48 px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none">
                  {selectedHealth}
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Human Model */}
            <div className="flex-1 flex items-center justify-center relative min-h-[300px] sm:min-h-[400px] lg:min-h-[calc(100vh-250px)]">
              <HumanModel zoomLevel={zoomLevel} />

              {/* Zoom Controls */}
              <div className="absolute right-2 sm:right-4 bottom-16 sm:bottom-20 flex flex-col bg-white rounded-full shadow-md">
                <button onClick={handleZoomIn} className="p-1 sm:p-2 hover:bg-gray-100 rounded-t-full">
                  <span className="text-lg sm:text-xl">+</span>
                </button>
                <div className="h-px bg-gray-200"></div>
                <button onClick={handleZoomOut} className="p-1 sm:p-2 hover:bg-gray-100 rounded-b-full">
                  <span className="text-lg sm:text-xl">−</span>
                </button>
              </div>
            </div>

            {/* Genetic Test Popup - Responsive positioning */}
            {showGeneticPopup && (
              <div className="absolute left-2 sm:left-4 right-2 sm:right-auto bottom-2 sm:bottom-4 lg:bottom-20 bg-blue-50 p-3 sm:p-4 rounded-lg shadow-lg max-w-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-blue-900">16</div>
                    <div className="text-xs sm:text-sm text-blue-800">Bagong Mga Kabatiran</div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600" onClick={handleCloseGeneticPopup}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-blue-800 mt-1 sm:mt-2">
                  Tuklasin ang mga bagong kabatiran sa kalusugan upang mas maunawaan at mapabuti ang iyong kalusugan
                </p>
                <button className="mt-2 sm:mt-3 flex items-center text-xs sm:text-sm text-blue-600 bg-blue-100 px-2 sm:px-3 py-1 sm:py-2 rounded-md">
                  Umorder ng DNA Test
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                  </svg>
                </button>
              </div>
            )}
        </div>
      </div>

        {/* Right Section with Health Statistics */}
        <div
          className={`${isMobile && showStats ? "flex flex-col" : isMobile && !showStats ? "hidden" : "w-full lg:w-1/2"
            } bg-blue-50 p-2 sm:p-4 overflow-y-auto`}
        >
          <NotificationBanner />
          <div className="space-y-3 sm:space-y-4">
            <AgeStatistics />
            <HealthRisks />
            <ActionPlans />
            <HealthRecommendations />
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HumanHealthStatistics
