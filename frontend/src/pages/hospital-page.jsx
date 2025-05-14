"use client"

import { useState, useEffect } from "react"
import HospitalCard from "../components/hospital-card"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"

function HospitalPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredHospitals, setFilteredHospitals] = useState([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const hospitals = [
    {
      id: 1,
      name: "City General Hospital",
      description:
        "A leading healthcare facility offering comprehensive medical services with state-of-the-art equipment and experienced specialists.",
      image:
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "123 Main Street, Downtown",
      phone: "(555) 123-4567",
      rating: 4.8,
      isEmergency: true,
      specialties: ["Cardiology", "Neurology", "Orthopedics"],
    },
    {
      id: 2,
      name: "Riverside Medical Center",
      description:
        "Providing compassionate care in a healing environment with a focus on patient comfort and advanced treatment options.",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "456 River Road, Westside",
      phone: "(555) 234-5678",
      rating: 4.6,
      isEmergency: true,
      specialties: ["Oncology", "Pediatrics", "Obstetrics"],
    },
    {
      id: 3,
      name: "Sunshine Children's Hospital",
      description:
        "Specialized pediatric care in a child-friendly environment with dedicated staff trained to work with young patients.",
      image:
        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "789 Sunshine Blvd, Eastside",
      phone: "(555) 345-6789",
      rating: 4.9,
      isEmergency: true,
      specialties: ["Pediatric Surgery", "Child Psychology", "Neonatology"],
    },
    {
      id: 4,
      name: "Memorial Health Institute",
      description:
        "A research-focused hospital combining clinical excellence with innovative medical research to provide cutting-edge treatments.",
      image:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "101 Research Parkway, Northside",
      phone: "(555) 456-7890",
      rating: 4.7,
      isEmergency: false,
      specialties: ["Research", "Clinical Trials", "Specialized Treatments"],
    },
    {
      id: 5,
      name: "Valley Community Hospital",
      description:
        "A community-centered healthcare provider focused on accessible care for all residents with a wide range of services.",
      image:
        "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "202 Valley View, Southside",
      phone: "(555) 567-8901",
      rating: 4.5,
      isEmergency: true,
      specialties: ["Family Medicine", "Emergency Care", "Community Health"],
    },
    {
      id: 6,
      name: "University Medical Center",
      description:
        "An academic medical center affiliated with the local university, offering teaching opportunities alongside exceptional patient care.",
      image:
        "https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "303 University Ave, College District",
      phone: "(555) 678-9012",
      rating: 4.7,
      isEmergency: true,
      specialties: ["Academic Medicine", "Research", "Specialized Care"],
    },
    {
      id: 7,
      name: "Lakeside Rehabilitation Center",
      description:
        "Specialized rehabilitation services for patients recovering from injuries, surgeries, or managing chronic conditions.",
      image: "https://images.unsplash.com/photo-1559000357-f6b52ddfcb90?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "404 Lakeside Drive, Waterfront",
      phone: "(555) 789-0123",
      rating: 4.8,
      isEmergency: false,
      specialties: ["Physical Therapy", "Occupational Therapy", "Speech Therapy"],
    },
    {
      id: 8,
      name: "Greenfield Mental Health Clinic",
      description:
        "Comprehensive mental health services in a supportive environment with a focus on holistic well-being.",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "505 Greenfield Road, Parkside",
      phone: "(555) 890-1234",
      rating: 4.6,
      isEmergency: false,
      specialties: ["Psychiatry", "Psychology", "Counseling"],
    },
    {
      id: 9,
      name: "Oakwood Surgical Center",
      description:
        "Specialized surgical facility with advanced technology and expert surgeons for both inpatient and outpatient procedures.",
      image:
        "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "606 Oakwood Lane, Forestview",
      phone: "(555) 901-2345",
      rating: 4.9,
      isEmergency: false,
      specialties: ["General Surgery", "Minimally Invasive Surgery", "Specialty Procedures"],
    },
    {
      id: 10,
      name: "Bayside Women's Health Center",
      description:
        "Dedicated to women's health across all life stages, providing comprehensive gynecological and obstetric care.",
      image:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "707 Bayside Blvd, Harborview",
      phone: "(555) 012-3456",
      rating: 4.8,
      isEmergency: false,
      specialties: ["Obstetrics", "Gynecology", "Women's Health"],
    },
    {
      id: 11,
      name: "Highland Urgent Care",
      description:
        "Walk-in medical care for non-emergency situations, providing quick and efficient treatment for minor injuries and illnesses.",
      image:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "808 Highland Ave, Uptown",
      phone: "(555) 123-4567",
      rating: 4.5,
      isEmergency: false,
      specialties: ["Urgent Care", "Minor Injuries", "Illness Treatment"],
    },
    {
      id: 12,
      name: "Pinecrest Long-Term Care Facility",
      description:
        "Compassionate long-term care and assisted living services for seniors in a comfortable, home-like environment.",
      image:
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "909 Pinecrest Road, Hillside",
      phone: "(555) 234-5678",
      rating: 4.7,
      isEmergency: false,
      specialties: ["Geriatric Care", "Assisted Living", "Memory Care"],
    },
    {
      id: 13,
      name: "Metro Diagnostic Imaging Center",
      description:
        "Advanced diagnostic imaging services including MRI, CT scans, X-rays, and ultrasounds with quick results and expert interpretation.",
      image:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "1010 Metro Circle, Downtown",
      phone: "(555) 345-6789",
      rating: 4.8,
      isEmergency: false,
      specialties: ["Diagnostic Imaging", "Radiology", "Medical Testing"],
    },
    {
      id: 14,
      name: "Clearview Eye Institute",
      description:
        "Comprehensive eye care services from routine exams to advanced surgical procedures for all vision-related conditions.",
      image:
        "https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "1111 Clearview Street, Eastside",
      phone: "(555) 456-7890",
      rating: 4.9,
      isEmergency: false,
      specialties: ["Ophthalmology", "Optometry", "Eye Surgery"],
    },
    {
      id: 15,
      name: "Wellness Integrative Health Center",
      description:
        "Combining conventional medicine with complementary therapies for a holistic approach to health and wellness.",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "1212 Wellness Way, Westside",
      phone: "(555) 567-8901",
      rating: 4.6,
      isEmergency: false,
      specialties: ["Integrative Medicine", "Preventive Care", "Holistic Health"],
    },
  ]

  useEffect(() => {
    setFilteredHospitals(hospitals)
  }, [])

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredHospitals(hospitals)
    } else {
      const filtered = hospitals.filter(
        (hospital) =>
          hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hospital.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hospital.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase())),
      )
      setFilteredHospitals(filtered)
    }
  }, [searchTerm])

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">Our Hospitals</h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto">
            Find the best healthcare facilities in your area. Our network includes top-rated hospitals with specialized
            departments and experienced medical professionals.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-2xl mx-auto">
            <div
              className={`flex items-center border-2 rounded-lg overflow-hidden transition-all ${isSearchFocused ? "border-blue-500 shadow-lg" : "border-gray-300"}`}
            >
              <div className="pl-4">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search hospitals by name, location, or specialty..."
                className="w-full py-3 px-4 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchTerm && (
                <button className="pr-4" onClick={() => setSearchTerm("")}>
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Hospitals Grid */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredHospitals.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No hospitals found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  {searchTerm ? `Search Results (${filteredHospitals.length})` : "All Hospitals"}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredHospitals.map((hospital) => (
                  <HospitalCard key={hospital.id} hospital={hospital} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* 3D Model Section */}
      <section className="py-12 md:py-20 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-10">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4 md:mb-6">Advanced Medical Facilities</h2>
              <p className="text-gray-700 mb-4 md:mb-6">
                Our network of hospitals is equipped with cutting-edge medical technology to provide you with the most
                accurate diagnoses and effective treatments.
              </p>
              <p className="text-gray-600 mb-6 md:mb-8">
                Each facility in our network is carefully selected based on their commitment to excellence, patient care
                standards, and technological advancement in healthcare delivery.
              </p>
              <button className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Learn More About Our Standards
              </button>
            </div>

            <div className="lg:w-1/2 w-full h-64 sm:h-80 md:h-96">
              <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <mesh rotation={[0, Math.PI / 4, 0]}>
                  <torusGeometry args={[1.5, 0.5, 16, 100]} />
                  <meshStandardMaterial color="#1e88e5" />
                </mesh>
                <OrbitControls autoRotate />
                <Environment preset="city" />
              </Canvas>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-8 md:mb-12">What Our Patients Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-md">
                <div className="flex justify-center mb-4 md:mb-6">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-4 md:mb-6">
                  {item === 1
                    ? '"The care I received at City General Hospital was exceptional. The staff was attentive, and the doctors took the time to explain everything thoroughly."'
                    : item === 2
                      ? '"Riverside Medical Center has the most caring nurses I\'ve ever encountered. They made a difficult time much easier for my family and me."'
                      : '"The pediatric team at Sunshine Children\'s Hospital was amazing with my daughter. They knew exactly how to make her comfortable and less afraid."'}
                </p>
                <div>
                  <h4 className="font-bold text-gray-800">
                    {item === 1 ? "Sarah Johnson" : item === 2 ? "Michael Chen" : "Emily Rodriguez"}
                  </h4>
                  <p className="text-blue-600">
                    {item === 1
                      ? "Patient at City General Hospital"
                      : item === 2
                        ? "Patient at Riverside Medical Center"
                        : "Parent of patient at Sunshine Children's Hospital"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Need Help Finding the Right Hospital?</h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto">
            Our healthcare advisors can help you find the best facility for your specific needs.
          </p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-2 px-6 md:py-3 md:px-8 rounded-lg text-base md:text-lg transition-all duration-300">
            Contact an Advisor
          </button>
        </div>
      </section>
    </div>
  )
}

export default HospitalPage
