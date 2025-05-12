"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, PresentationControls } from "@react-three/drei"
import LogoSlider from "../components/LogoSlider"

// Advanced 3D Medical Model
function AdvancedMedicalModel(props) {
  const group = useRef()

  // In a real application, you would load an actual 3D model
  // For this example, we'll create a more complex DNA helix model
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={group} {...props}>
      {/* DNA Helix Structure */}
      {Array.from({ length: 10 }).map((_, i) => (
        <group key={i} position={[0, i * 0.7 - 3.5, 0]}>
          {/* First strand */}
          <mesh position={[Math.sin(i * 0.6) * 2, 0, Math.cos(i * 0.6) * 2]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color="#2563eb" metalness={0.5} roughness={0.2} />
          </mesh>

          {/* Second strand */}
          <mesh position={[Math.sin(i * 0.6 + Math.PI) * 2, 0, Math.cos(i * 0.6 + Math.PI) * 2]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color="#60a5fa" metalness={0.5} roughness={0.2} />
          </mesh>

          {/* Connecting rung */}
          <mesh>
            <cylinderGeometry
              args={[
                0.05,
                0.05,
                Math.sqrt(
                  Math.pow(Math.sin(i * 0.6) * 2 - Math.sin(i * 0.6 + Math.PI) * 2, 2) +
                  Math.pow(Math.cos(i * 0.6) * 2 - Math.cos(i * 0.6 + Math.PI) * 2, 2),
                ),
              ]}
              rotation={[
                0,
                Math.atan2(
                  Math.sin(i * 0.6) * 2 - Math.sin(i * 0.6 + Math.PI) * 2,
                  Math.cos(i * 0.6) * 2 - Math.cos(i * 0.6 + Math.PI) * 2,
                ),
                Math.PI / 2,
              ]}
              position={[
                (Math.sin(i * 0.6) * 2 + Math.sin(i * 0.6 + Math.PI) * 2) / 2,
                0,
                (Math.cos(i * 0.6) * 2 + Math.cos(i * 0.6 + Math.PI) * 2) / 2,
              ]}
            />
            <meshStandardMaterial color="#bfdbfe" metalness={0.3} roughness={0.4} />
          </mesh>

          {/* Vertical connections */}
          {i < 9 && (
            <>
              <mesh>
                <cylinderGeometry
                  args={[0.05, 0.05, 0.7]}
                  position={[Math.sin(i * 0.6) * 2, 0.35, Math.cos(i * 0.6) * 2]}
                />
                <meshStandardMaterial color="#3b82f6" metalness={0.3} roughness={0.4} />
              </mesh>
              <mesh>
                <cylinderGeometry
                  args={[0.05, 0.05, 0.7]}
                  position={[Math.sin(i * 0.6 + Math.PI) * 2, 0.35, Math.cos(i * 0.6 + Math.PI) * 2]}
                />
                <meshStandardMaterial color="#3b82f6" metalness={0.3} roughness={0.4} />
              </mesh>
            </>
          )}
        </group>
      ))}

      {/* Additional molecular structures */}
      <group position={[3, 0, 0]}>
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#1d4ed8" opacity={0.7} transparent metalness={0.5} roughness={0.2} />
        </mesh>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[Math.sin((i * Math.PI) / 4) * 1.5, Math.cos((i * Math.PI) / 4) * 1.5, 0]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial color="#93c5fd" metalness={0.5} roughness={0.2} />
          </mesh>
        ))}
      </group>

      <group position={[-3, -2, 1]}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#2563eb" opacity={0.7} transparent metalness={0.5} roughness={0.2} />
        </mesh>
        {Array.from({ length: 6 }).map((_, i) => {
          const phi = Math.acos(-1 + (2 * i) / 6)
          const theta = Math.sqrt(6 * Math.PI) * phi
          return (
            <mesh
              key={i}
              position={[
                Math.cos(theta) * Math.sin(phi) * 1.5,
                Math.sin(theta) * Math.sin(phi) * 1.5,
                Math.cos(phi) * 1.5,
              ]}
            >
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial color="#60a5fa" metalness={0.5} roughness={0.2} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Modern Design */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
            alt="Medical professionals"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/70"></div>
        </div>

        <div className="container mx-auto px-4 z-10 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-white mb-10 lg:mb-0 animate-fade-in-up">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
              Next-Gen <br />
              <span className="text-blue-300">Healthcare</span> Solutions
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-xl">
              Experience the future of medical consultations with cutting-edge technology and expert care.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Book Consultation
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 font-bold py-4 px-8 rounded-lg transition-all duration-300">
                Explore Services
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 h-64 md:h-[500px] w-full">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center text-white">Loading 3D Model...</div>
              }
            >
              <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
                <ambientLight intensity={0.7} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <PresentationControls
                  global
                  zoom={0.8}
                  rotation={[0, 0, 0]}
                  polar={[-Math.PI / 4, Math.PI / 4]}
                  azimuth={[-Math.PI / 4, Math.PI / 4]}
                >
                  <AdvancedMedicalModel />
                </PresentationControls>
                <Environment preset="city" />
              </Canvas>
            </Suspense>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Features Section - Modern Cards */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Why Choose MediCode ?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with compassionate care to provide you with the best medical
              consultation experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Expert Doctors</h3>
              <p className="text-gray-600 text-center">
                Our team consists of board-certified physicians with years of experience in their respective fields.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">24/7 Availability</h3>
              <p className="text-gray-600 text-center">
                Access medical consultations anytime, anywhere through our platform. We're always here for you.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Digital Prescriptions</h3>
              <p className="text-gray-600 text-center">
                Receive digital prescriptions and medical advice directly through our secure platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare solutions designed to meet your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Telemedicine",
                description: "Virtual consultations with specialists from the comfort of your home",
                image: "https://healthwire.pk/wp-content/uploads/2021/02/140922372_454433569299400_379914323398644961_n.jpg",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    ></path>
                  </svg>
                ),
              },
              {
                title: "Health Monitoring",
                description: "Continuous tracking of vital signs and health metrics with AI analysis",
                image: "https://www.tenovi.com/wp-content/uploads/2023/04/istockphoto-1489956013-612x612-1.jpg",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                ),
              },
              {
                title: "Specialist Referrals",
                description: "Quick connections to the right specialists for your specific needs",
                image: "https://sa1s3optim.patientpop.com/filters:format(webp)/assets/images/provider/photos/2659149.jpg",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                ),
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent flex items-end">
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                      {service.icon}
                    </div>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                  <button className="mt-2 text-blue-600 font-semibold flex items-center group-hover:text-blue-800 transition-colors">
                    Learn more
                    <svg
                      className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with Images */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Patient Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from people who have transformed their healthcare experience with MediConsult
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The virtual consultations saved me so much time. I got expert medical advice without having to travel or wait in a clinic.",
                name: "Sarah Johnson",
                role: "Patient",
                image: "https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_1_1200x1200/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=1-9sfjwH",
              },
              {
                quote:
                  "The 3D visualizations helped me understand my condition better than any doctor had explained before. The platform is intuitive and the care is personalized.",
                name: "Michael Chen",
                role: "Patient",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Andrzej_Person_Kancelaria_Senatu.jpg/1200px-Andrzej_Person_Kancelaria_Senatu.jpg",
              },
              {
                quote:
                  "As someone with a chronic condition, having 24/7 access to medical professionals gives me peace of mind. The response times are quick and the advice is always helpful.",
                name: "Emily Rodriguez",
                role: "Patient",
                image: "https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-blue-50 rounded-2xl p-8 shadow-lg relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 rounded-bl-2xl rounded-tr-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-6 text-lg">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-blue-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Slider - Trusted Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Trusted by Leading Medical Institutions
          </h2>
          <LogoSlider />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Experience Modern Healthcare?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Join thousands of satisfied patients who have transformed their healthcare experience with MediConsult.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-4 px-10 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Started Today
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 font-bold py-4 px-10 rounded-lg text-lg transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

