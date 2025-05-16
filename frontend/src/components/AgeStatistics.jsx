"use client"

import { useEffect, useState } from "react"

const AgeStatistics = () => {
  const biologicalAge = 47
  const chronologicalAge = 54
  const currentValue = 54
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Calculate the position percentage for the gauge
  const min = 46
  const max = 62
  const position = ((currentValue - min) / (max - min)) * 100

  return (
    <div className="bg-white rounded-lg p-4 md:p-6 mb-4 md:mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-700">Iyong Edad</h2>

          <div className="mt-3 md:mt-4 flex items-center">
            <div className="mr-6 md:mr-8">
              <div className="text-xs md:text-sm text-gray-500">Edad Biolohikal</div>
              <div className="text-2xl md:text-4xl font-bold">
                {biologicalAge}
                <span className="text-xs md:text-sm font-normal ml-1">taon</span>
              </div>
            </div>

            <div>
              <div className="text-xs md:text-sm text-gray-500">Edad Kronolohikal</div>
              <div className="text-2xl md:text-4xl font-bold">
                {chronologicalAge}
                <span className="text-xs md:text-sm font-normal ml-1">taon</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-64 mt-4 md:mt-0">
          <div className="text-right mb-1 md:mb-2 text-xs md:text-sm font-medium">Ikaw</div>

          {/* Gauge */}
          <div className="relative h-4 md:h-6 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
              style={{ width: `${position}%` }}
            ></div>

            {/* Marker */}
            <div
              className="absolute top-0 h-full w-1 md:w-2 bg-white border-2 border-blue-600 rounded-full"
              style={{ left: `${position}%`, transform: "translateX(-50%)" }}
            ></div>
          </div>

          {/* Scale */}
          <div className="flex justify-between mt-1 text-[8px] md:text-xs text-gray-500">
            {isMobile ? (
              // Simplified scale for mobile
              <>
                <span>46</span>
                <span>50</span>
                <span>54</span>
                <span>58</span>
                <span>62</span>
              </>
            ) : (
              // Full scale for desktop
              <>
                <span>46</span>
                <span>48</span>
                <span>50</span>
                <span>52</span>
                <span>54</span>
                <span>56</span>
                <span>58</span>
                <span>60</span>
                <span>62</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgeStatistics
