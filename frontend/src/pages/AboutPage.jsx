import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import Counter from "../components/Counter"

function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">About MediConsult</h1>
              <p className="text-xl text-gray-700 mb-6">
                Founded in 2015, MediConsult has been at the forefront of revolutionizing healthcare delivery through
                technology. Our mission is to make quality healthcare accessible to everyone, everywhere.
              </p>
              <p className="text-gray-600 mb-8">
                We believe that healthcare should be patient-centered, convenient, and affordable. Our team of dedicated
                healthcare professionals and technology experts work together to create a seamless medical consultation
                experience that puts you in control of your health.
              </p>
            </div>

            <div className="md:w-1/2 h-64 md:h-96">
              <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <mesh>
                  <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                  <meshStandardMaterial color="#1e88e5" />
                </mesh>
                <OrbitControls autoRotate />
                <Environment preset="city" />
              </Canvas>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Our Impact</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Counter
              end={50000}
              label="Patients Served"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              }
            />

            <Counter
              end={75000}
              label="Consultations"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
              }
            />

            <Counter
              end={200}
              label="Expert Doctors"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              }
            />

            <Counter
              end={98}
              label="Satisfaction Rate %"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  ></path>
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-blue-700 p-8 rounded-xl">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-blue-100 mb-4">
                To create a world where quality healthcare is accessible to everyone, regardless of location or
                socioeconomic status.
              </p>
              <p className="text-blue-100">
                We envision a future where technology bridges the gap between patients and healthcare providers, making
                medical consultations more efficient, personalized, and effective.
              </p>
            </div>

            <div className="bg-blue-700 p-8 rounded-xl">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-blue-100 mb-4">
                To provide high-quality, patient-centered healthcare services through innovative technology solutions.
              </p>
              <p className="text-blue-100">
                We are committed to empowering patients with the knowledge and tools they need to take control of their
                health, while supporting healthcare providers in delivering the best possible care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Leadership</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Meet the dedicated professionals who are leading the way in transforming healthcare delivery.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="w-full h-64 mb-6 overflow-hidden rounded-lg">
                <img
                  src="https://media.istockphoto.com/id/1346711310/photo/portrait-of-smiling-female-doctor-wearing-uniform-standing.jpg?s=612x612&w=0&k=20&c=nPsBL7HwQ7y14HP6J7lcCyKl51X5pPSPGnweXHFzT9o="
                  alt="Dr. Sarah Johnson"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.svg?height=256&width=256";
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Dr. Sarah Johnson</h3>
              <p className="text-blue-600 mb-4">Chief Executive Officer</p>
              <p className="text-gray-600">
                With over 20 years of experience in healthcare management and innovation, Dr. Johnson leads our vision
                for the future of medical consultations.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="w-full h-64 mb-6 overflow-hidden rounded-lg">
                <img
                  src="https://www.shutterstock.com/image-photo/happy-confident-mature-45-years-600nw-2426323943.jpg"
                  alt="Michael Chen"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.svg?height=256&width=256";
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Michael Chen</h3>
              <p className="text-blue-600 mb-4">Chief Technology Officer</p>
              <p className="text-gray-600">
                A pioneer in healthcare technology, Michael brings his expertise in AI and telemedicine to create our
                cutting-edge consultation platform.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="w-full h-64 mb-6 overflow-hidden rounded-lg">
                <img
                  src="https://www.shutterstock.com/image-photo/confident-portrait-mature-businessman-office-600nw-2453209099.jpg"
                  alt="Dr. Emily Rodriguez"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.svg?height=256&width=256";
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Dr. Emily Rodriguez</h3>
              <p className="text-blue-600 mb-4">Chief Medical Officer</p>
              <p className="text-gray-600">
                Dr. Rodriguez ensures that all our medical services meet the highest standards of quality and patient
                care.
              </p>
            </div>
          </div>

          <a href="/team" className="inline-block mt-12 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Meet Our Full Team
          </a>
        </div>
      </section>
    </div>
  )
}

export default AboutPage