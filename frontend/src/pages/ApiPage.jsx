"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"

// Sample medical data structure
const sampleMedicalData = [
  {
    id: "med-001",
    category: "Medication",
    name: "Amoxicillin",
    description: "Antibiotic used to treat bacterial infections",
    dosage: "500mg",
    frequency: "Every 8 hours",
    sideEffects: ["Nausea", "Diarrhea", "Rash"],
    interactions: ["Alcohol", "Probenecid", "Allopurinol"],
    manufacturer: "MediPharma Inc.",
    approvalDate: "2018-05-12",
  },
  {
    id: "med-002",
    category: "Medication",
    name: "Lisinopril",
    description: "ACE inhibitor used to treat high blood pressure",
    dosage: "10mg",
    frequency: "Once daily",
    sideEffects: ["Dizziness", "Headache", "Dry cough"],
    interactions: ["Potassium supplements", "NSAIDs", "Lithium"],
    manufacturer: "HealthCare Pharmaceuticals",
    approvalDate: "2015-11-23",
  },
  {
    id: "cond-001",
    category: "Condition",
    name: "Hypertension",
    description: "High blood pressure condition",
    symptoms: ["Headache", "Shortness of breath", "Nosebleeds"],
    riskFactors: ["Obesity", "High sodium diet", "Stress", "Family history"],
    treatments: ["Lifestyle changes", "Medication", "Regular monitoring"],
    prevalence: "1 in 3 adults worldwide",
    researchStatus: "Ongoing clinical trials",
  },
  {
    id: "proc-001",
    category: "Procedure",
    name: "Echocardiogram",
    description: "Ultrasound test that uses sound waves to create images of the heart",
    duration: "30-60 minutes",
    preparation: "No special preparation needed",
    risks: ["None significant", "Mild discomfort"],
    aftercare: "Resume normal activities",
    cost: "$1,000 - $2,000",
    insuranceCoverage: "Typically covered by insurance",
  },
  {
    id: "med-003",
    category: "Medication",
    name: "Metformin",
    description: "Oral diabetes medicine that helps control blood sugar levels",
    dosage: "500-1000mg",
    frequency: "Twice daily with meals",
    sideEffects: ["Nausea", "Stomach upset", "Diarrhea", "Metallic taste"],
    interactions: ["Alcohol", "Contrast dyes", "Certain heart medications"],
    manufacturer: "DiabeCare Pharma",
    approvalDate: "2012-08-30",
  },
  {
    id: "cond-002",
    category: "Condition",
    name: "Type 2 Diabetes",
    description: "Chronic condition affecting how the body metabolizes sugar",
    symptoms: ["Increased thirst", "Frequent urination", "Fatigue", "Blurred vision"],
    riskFactors: ["Obesity", "Family history", "Age", "Sedentary lifestyle"],
    treatments: ["Diet management", "Exercise", "Medication", "Insulin therapy"],
    prevalence: "422 million people globally",
    researchStatus: "Multiple ongoing research initiatives",
  },
]

// Component to display JSON data in a pretty format
function JsonViewer({ data }) {
  const [expanded, setExpanded] = useState({})

  const toggleExpand = (key) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const renderValue = (value, key, depth = 0) => {
    if (Array.isArray(value)) {
      return (
        <div className="ml-4">
          <div
            className="flex items-center cursor-pointer text-blue-600 hover:text-blue-800"
            onClick={() => toggleExpand(key)}
          >
            <svg
              className={`w-4 h-4 mr-1 transition-transform ${expanded[key] ? "rotate-90" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            <span className="font-mono">[{value.length} items]</span>
          </div>
          {expanded[key] && (
            <div className="ml-4 border-l-2 border-blue-200 pl-2">
              {value.map((item, i) => (
                <div key={i} className="my-1">
                  <span className="text-gray-500 font-mono">{i}: </span>
                  {typeof item === "object" ? (
                    renderValue(item, `${key}-${i}`, depth + 1)
                  ) : (
                    <span className="text-green-600 font-mono">"{item}"</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )
    } else if (typeof value === "object" && value !== null) {
      return (
        <div className="ml-4">
          <div
            className="flex items-center cursor-pointer text-blue-600 hover:text-blue-800"
            onClick={() => toggleExpand(key)}
          >
            <svg
              className={`w-4 h-4 mr-1 transition-transform ${expanded[key] ? "rotate-90" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            <span className="font-mono">
              {"{"}
              {Object.keys(value).length} properties{"}"}
            </span>
          </div>
          {expanded[key] && (
            <div className="ml-4 border-l-2 border-blue-200 pl-2">
              {Object.entries(value).map(([k, v]) => (
                <div key={k} className="my-1">
                  <span className="text-purple-600 font-mono">"{k}": </span>
                  {typeof v === "object" ? (
                    renderValue(v, `${key}-${k}`, depth + 1)
                  ) : (
                    <span className="text-green-600 font-mono">"{v}"</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )
    } else if (typeof value === "string") {
      return <span className="text-green-600 font-mono">"{value}"</span>
    } else if (typeof value === "number") {
      return <span className="text-blue-600 font-mono">{value}</span>
    } else if (typeof value === "boolean") {
      return <span className="text-orange-600 font-mono">{value.toString()}</span>
    } else {
      return <span className="text-gray-600 font-mono">{String(value)}</span>
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 overflow-x-auto">
      <pre className="text-sm">{renderValue(data, "root")}</pre>
    </div>
  )
}

// Component for the 3D data visualization
function DataVisualization() {
  return (
    <mesh rotation={[0, Math.PI / 4, 0]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial color="#3b82f6" wireframe={true} emissive="#60a5fa" emissiveIntensity={0.5} />
    </mesh>
  )
}

function ApiPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  useEffect(() => {
    // Simulate API fetch with a delay
    const fetchData = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setData(sampleMedicalData)
        setLoading(false)
      } catch (error) {
        setError("Failed to fetch data. Please try again later.")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter data based on search term and category
  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "All" || item.category === activeCategory
    return matchesSearch && matchesCategory
  })

  // Get unique categories
  const categories = ["All", ...new Set(data.map((item) => item.category))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Health Data API</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Explore our comprehensive medical data API with detailed information on medications, conditions, and
            procedures.
          </p>
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search medications, conditions, or procedures..."
                className="w-full py-3 px-4 pl-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="w-5 h-5 text-gray-500 absolute left-3 top-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* API Explorer Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left sidebar - Categories */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${activeCategory === category
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                        }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main content area */}
            <div className="lg:w-3/4">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-md">
                  <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600">Loading API data...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg" role="alert">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6 bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">API Explorer</h2>
                    <p className="text-gray-600 mb-4">
                      Browse through our medical database using the interactive explorer below. Click on any item to
                      view detailed JSON data.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {filteredData.length === 0 ? (
                        <p className="text-gray-500 italic">No results found. Try adjusting your search criteria.</p>
                      ) : (
                        filteredData.map((item) => (
                          <div
                            key={item.id}
                            className={`
                              p-4 rounded-lg cursor-pointer transition-all duration-200 
                              ${selectedItem?.id === item.id
                                ? "bg-blue-100 border-2 border-blue-500"
                                : "bg-gray-50 hover:bg-blue-50 border-2 border-transparent"
                              }
                            `}
                            onClick={() => setSelectedItem(item)}
                          >
                            <div className="flex items-center">
                              <div
                                className={`
                                w-10 h-10 rounded-full flex items-center justify-center mr-3
                                ${item.category === "Medication"
                                    ? "bg-green-100 text-green-600"
                                    : item.category === "Condition"
                                      ? "bg-red-100 text-red-600"
                                      : "bg-purple-100 text-purple-600"
                                  }
                              `}
                              >
                                {item.category === "Medication" ? (
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                    />
                                  </svg>
                                ) : item.category === "Condition" ? (
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                ) : (
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                  </svg>
                                )}
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-800">{item.name}</h3>
                                <p className="text-sm text-gray-500">{item.category}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Selected item JSON viewer */}
                  {selectedItem && (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                      <div className="bg-blue-600 text-white p-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-bold">{selectedItem.name} API Response</h3>
                          <div className="flex space-x-2">
                            <button className="bg-white/20 hover:bg-white/30 rounded-lg px-3 py-1 text-sm transition-colors">
                              Copy JSON
                            </button>
                            <button
                              className="bg-white/20 hover:bg-white/30 rounded-lg px-3 py-1 text-sm transition-colors"
                              onClick={() => setSelectedItem(null)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                        <p className="text-blue-100 text-sm mt-1">
                          Endpoint: /api/medical/{selectedItem.category.toLowerCase()}/{selectedItem.id}
                        </p>
                      </div>
                      <JsonViewer data={selectedItem} />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3D Visualization Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Data Visualization</h2>
              <p className="text-gray-700 mb-6">
                Our API provides powerful visualization capabilities to help you understand complex health data and
                trends.
              </p>
              <p className="text-gray-600 mb-8">
                Integrate our visualization tools with your applications to create interactive dashboards, charts, and
                3D models that make medical data more accessible and understandable.
              </p>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Real-time Analytics</h3>
                      <p className="text-sm text-gray-600">Monitor health metrics with live updates and alerts</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Secure Data Exchange</h3>
                      <p className="text-sm text-gray-600">HIPAA-compliant API with end-to-end encryption</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Historical Trends</h3>
                      <p className="text-sm text-gray-600">Access and analyze historical health data patterns</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 h-64 md:h-96">
              <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <DataVisualization />
                <OrbitControls autoRotate />
                <Environment preset="city" />
              </Canvas>
            </div>
          </div>
        </div>
      </section>

      {/* API Documentation Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-800 mb-12 text-center">API Documentation</h2>

          <div className="max-w-4xl mx-auto bg-gray-50 rounded-xl overflow-hidden shadow-md">
            <div className="bg-gray-800 text-white p-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 font-mono text-sm">GET /api/medical/medication/{"{id}"}</span>
              </div>
            </div>
            <div className="p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-800">
                {`// Request
GET /api/medical/medication/med-001

// Response
{
  "id": "med-001",
  "category": "Medication",
  "name": "Amoxicillin",
  "description": "Antibiotic used to treat bacterial infections",
  "dosage": "500mg",
  "frequency": "Every 8 hours",
  "sideEffects": [
    "Nausea", 
    "Diarrhea", 
    "Rash"
  ],
  "interactions": [
    "Alcohol", 
    "Probenecid", 
    "Allopurinol"
  ],
  "manufacturer": "MediPharma Inc.",
  "approvalDate": "2018-05-12"
}`}
              </pre>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Flexible Endpoints</h3>
              <p className="text-gray-600">
                Our API provides multiple endpoints for medications, conditions, procedures, and more, with
                comprehensive filtering options.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">API Keys</h3>
              <p className="text-gray-600">
                Secure your API access with authentication tokens and rate limiting to protect sensitive medical data.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">SDK Support</h3>
              <p className="text-gray-600">
                Integrate easily with our JavaScript, Python, and Java SDKs for seamless implementation in your
                applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Integrate Our Health API?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get started with our comprehensive documentation and developer tools to build powerful healthcare
            applications.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg transition-all duration-300">
              Get API Key
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-lg transition-all duration-300">
              View Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ApiPage

