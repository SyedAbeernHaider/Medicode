import { useNavigate } from 'react-router-dom';

function ServiceCard({ title, description, icon, image }) {
  const navigate = useNavigate();
  
  const handleConsultClick = () => {
    navigate('/consult', { state: { service: title } });
  };
  return (
    <div className="service-card bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="h-48 overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button className="btn-outline flex-1 py-2 px-4 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            View Detail
          </button>
          <button 
            onClick={handleConsultClick}
            className="btn-primary flex-1 py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
          >
            Consult
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
