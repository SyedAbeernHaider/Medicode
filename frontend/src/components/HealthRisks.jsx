"use client"

import { useEffect, useState } from "react"
import { Heart, Activity, AlertCircle } from "lucide-react"

const HealthRisks = () => {
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

  const risks = [
    {
      id: 1,
      title: "Atrial Fibrillation",
      icon: <Heart className="text-red-500" />,
      status: "Mataas",
      statusColor: "text-red-500",
      description: "Mataas na kolesterol antas at iba pang 2 mga kadahilanan",
      statusIcon: <AlertCircle size={16} className="text-red-500" />,
    },
    {
      id: 2,
      title: "Stroke",
      icon: <Activity className="text-red-500" />,
      status: "Mataas",
      statusColor: "text-red-500",
      description: "Mababang oral na glucose antas at iba pang 1 mga kadahilanan",
      statusIcon: <AlertCircle size={16} className="text-red-500" />,
    },
    {
      id: 3,
      title: "Sakit sa Coronary Artery",
      icon: <Heart className="text-orange-500" />,
      status: "Katamtaman",
      statusColor: "text-orange-500",
      description: "High coronary artery calcium level antas at iba pang 1 mga kadahilanan",
      statusIcon: <AlertCircle size={16} className="text-orange-500" />,
    },
  ]

  return (
    <div className="mb-4 md:mb-6">
      <div className="flex justify-between items-center mb-3 md:mb-4">
        <h2 className="text-base md:text-lg font-semibold">Mga Pangunahing Lugar ng Alalahanin</h2>
        <button className="text-blue-500 text-xs md:text-sm">Tingnan Lahat</button>
      </div>

      <div className={`grid ${isMobile ? "grid-cols-1 gap-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}`}>
        {risks.map((risk) => (
          <div key={risk.id} className="bg-white rounded-lg p-3 md:p-4">
            <div className="flex items-center mb-2">
              <div className="p-1.5 md:p-2 bg-blue-50 rounded-full mr-2">{risk.icon}</div>
              <div className={`flex items-center ${risk.statusColor}`}>
                {risk.statusIcon}
                <span className="ml-1 text-xs md:text-sm">{risk.status}</span>
              </div>
            </div>

            <h3 className="text-sm md:text-base font-medium mb-1">{risk.title}</h3>
            <p className="text-xs md:text-sm text-gray-600">{risk.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HealthRisks
