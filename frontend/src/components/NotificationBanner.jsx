import { AlertCircle } from "lucide-react"

const NotificationBanner = () => {
  return (
    <div className="bg-blue-100 rounded-lg p-2 md:p-3 mb-4 md:mb-6 flex items-center">
      <AlertCircle className="text-blue-500 mr-2 flex-shrink-0" size={16} />
      <p className="text-xs md:text-sm text-blue-800">
        Manatiling nakatutok. Sinusuri namin ang iyong{" "}
        <span className="font-medium">dashboard.health_conditions.cholesterol</span> inaasahang resulta sa loob ng
      </p>
    </div>
  )
}

export default NotificationBanner
