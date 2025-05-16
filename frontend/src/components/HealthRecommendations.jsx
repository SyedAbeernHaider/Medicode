import { ArrowRight } from "lucide-react"

const HealthRecommendations = () => {
  return (
    <div className="bg-white rounded-lg p-3 md:p-4">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h3 className="text-sm md:text-base font-medium">Recommended next steps based on your health data:</h3>
      </div>

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
          <ArrowRight size={16} className="md:w-5 md:h-5" />
        </button>
      </div>
    </div>
  )
}

export default HealthRecommendations
