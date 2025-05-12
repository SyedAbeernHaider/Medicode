function ServiceCard({ title, description, icon, image }) {
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
        <button className="btn-primary w-full">Learn More</button>
      </div>
    </div>
  )
}

export default ServiceCard
