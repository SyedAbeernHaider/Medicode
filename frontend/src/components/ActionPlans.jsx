"use client"

import { useState } from "react"

const ActionPlans = () => {
  const [activeTab, setActiveTab] = useState("action")

  const tabs = [
    { id: "action", label: "Planong Aksyon" },
    { id: "recommendations", label: "Susunog na Pangangalaga" },
    { id: "supplements", label: "Mga Suplemento" },
    { id: "treatments", label: "Pamumuhay" },
  ]

  return (
    <div className="bg-white rounded-lg p-3 md:p-4 mb-4 md:mb-6">
      {/* Tabs - Scrollable on mobile */}
      <div className="flex overflow-x-auto border-b hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-2 md:px-4 py-2 text-xs md:text-sm font-medium whitespace-nowrap ${activeTab === tab.id ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-3 md:py-4">
        <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
          Recommended next steps based on your health data:
        </p>

        {activeTab === "recommendations" && (
          <div className="bg-blue-50 p-3 md:p-4 rounded-lg flex items-start">
            <div className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center mr-2 md:mr-3 mt-0.5">
              <span className="text-xs md:text-sm font-bold">7</span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm md:text-base font-medium">Susunog na Pangangalaga</h3>
              <div className="flex justify-between items-center mt-3 md:mt-4">
                <div className="flex items-center">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-100 rounded-md flex items-center justify-center mr-2">
                    <span className="text-blue-600 text-xs">🧬</span>
                  </div>
                  <span className="text-xs md:text-sm">Take Genetic Health Risk Tests</span>
                </div>
                <div className="text-xs md:text-sm text-gray-500 hidden md:block">Activity</div>
              </div>
            </div>
            <button className="ml-auto text-gray-400 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ActionPlans
