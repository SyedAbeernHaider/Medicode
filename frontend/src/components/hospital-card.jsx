"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

function HospitalCard({ hospital }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-48 sm:h-56 md:h-64 overflow-hidden relative">
        <img
          src={hospital.image || "/placeholder.svg"}
          alt={hospital.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? "scale-105" : ""}`}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = "/placeholder.svg?height=300&width=400"
            e.target.className = "w-full h-full object-contain bg-gray-100 p-4"
          }}
        />
        {hospital.isEmergency && (
          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            24/7 Emergency
          </div>
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">{hospital.name}</h3>
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-gray-700">{hospital.rating}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center text-gray-600 mb-2">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            <span className="text-sm">{hospital.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              ></path>
            </svg>
            <span className="text-sm">{hospital.phone}</span>
          </div>
        </div>

        <p className="text-gray-600 mb-6 flex-grow">{hospital.description}</p>

        <div className="flex flex-col sm:flex-row gap-2 mt-auto">
          <Link
            to={`/services`}
            className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            View Services
          </Link>
          <button className="flex-1 py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
            Contact
          </button>
        </div>
      </div>
    </div>
  )
}

export default HospitalCard
