import {
  User,
  Heart,
  TreesIcon as Lungs,
  StickerIcon as Stomach,
  Brain,
  Activity,
  Thermometer,
  BarChart3,
} from "lucide-react"

const HealthSidebar = () => {
  const icons = [
    { icon: <User size={24} />, active: true },
    { icon: <Heart size={24} />, active: false, notification: 3 },
    { icon: <Lungs size={24} />, active: false },
    { icon: <Stomach size={24} />, active: false },
    { icon: <Brain size={24} />, active: false },
    { icon: <Activity size={24} />, active: false },
    { icon: <Thermometer size={24} />, active: false },
    { icon: <BarChart3 size={24} />, active: false },
  ]

  return (
    <div className="w-14 md:w-16 flex flex-col items-center py-4 border-r">
      {icons.map((item, index) => (
        <div key={index} className="relative mb-4 md:mb-6">
          <button
            className={`p-2 md:p-3 rounded-full ${item.active ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              }`}
          >
            {item.icon}
          </button>

          {item.notification && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full">
              {item.notification}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default HealthSidebar
