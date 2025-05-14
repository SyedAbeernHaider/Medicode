import ServiceCard from "../components/ServiceCard"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { useNavigate } from 'react-router-dom';

function ServicesPage() {

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/consult');
  };

  const services = [
    {
      id: 1,
      title: "Orthopedics",
      description: "Connect with experienced doctors from the comfort of your home through secure video consultations.",
      image: "https://media.istockphoto.com/id/1220958078/photo/doctor-and-patient-doctor-examining-of-the-leg-from-the-knee-and-ankle-and-training-broken.jpg?s=612x612&w=0&k=20&c=G1pyXV8chJBQMT2cN5ZB12tjpcd9QnJlwW9Q0HzZcvA=",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
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
      id: 2,
      title: "General Medicine",
      description: "Comprehensive health assessments and preventive care to keep you in optimal health.",
      image: "https://media.istockphoto.com/id/530284279/photo/checking-blood-pressure.jpg?s=612x612&w=0&k=20&c=KJdCdv6vs7tva5BXefiF6MfKn2JHwo9iO25_h2CbqI8=",
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
    },
    {
      id: 3,
      title: "Prediatrics",
      description: "Get connected with the right specialists for your specific health needs.",
      image: "https://thumbs.dreamstime.com/b/pediatrician-doctor-examines-baby-stethoscope-boy-checking-heart-beat-62382149.jpg",
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
    },
    {
      id: 4,
      title: "Obstertics & Gynecology",
      description: "Receive electronic prescriptions and medication management through our secure platform.",
      image: "https://www.shutterstock.com/shutterstock/photos/2310961573/display_1500/stock-photo-happy-pregnant-woman-has-appointment-with-doctor-at-clinic-female-gynaecologist-ob-gyn-medic-2310961573.jpg",
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
    },
    {
      id: 5,
      title: "Neurology",
      description: "Access professional mental health services and resources for emotional wellbeing.",
      image: "https://bansalgroup-assets.s3.ap-south-1.amazonaws.com/PRD/Bansal_Hospital/2020/09/Neurology-1.jpg",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          ></path>
        </svg>
      ),
    },
    {
      id: 6,
      title: "Dermatology",
      description: "Comprehensive care plans and monitoring for patients with chronic conditions.",
      image: "https://media.istockphoto.com/id/1359714290/photo/female-dermatologist-performing-a-procedure-on-a-client.jpg?s=612x612&w=0&k=20&c=hQFfkec2QcDGvXBavNx3Dc4tBtdNk_2frpUqkh6YjVA=",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path>
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">Our Services</h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8">
            We offer a comprehensive range of healthcare services designed to meet your needs. Our team of experts is
            dedicated to providing you with the highest quality care.
          </p>
          <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:bg-blue-50 transition-colors duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Consult Now
          </button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
              >
                <div className="h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.svg";
                      e.target.className = "w-full h-full object-contain bg-gray-100 p-4";
                    }}
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mr-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <button className="flex-1 py-2 px-4 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      View Detail
                    </button>
                    <button
      className="flex-1 py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
      onClick={handleRedirect}
    >
      Consult Now
    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Model Section */}
      <section className="py-12 md:py-20 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-10">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4 md:mb-6">Advanced Medical Technology</h2>
              <p className="text-gray-700 mb-4 md:mb-6">
                At MediConsult, we leverage cutting-edge medical technology to provide you with the most accurate
                diagnoses and effective treatments.
              </p>
              <p className="text-gray-600 mb-6 md:mb-8">
                Our platform integrates with the latest medical devices and systems to ensure that you receive the best
                possible care, whether you're consulting with us online or in person.
              </p>
              <button className="btn-primary">Learn More About Our Technology</button>
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
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-8 md:mb-12">What Our Patients Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 md:p-8 rounded-xl shadow-md">
                <div className="flex justify-center mb-4 md:mb-6">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-4 md:mb-6">
                  {item === 1 ? '"The online consultation service saved me so much time. I was able to speak with a specialist without having to travel or wait in a clinic. Highly recommended!"' :
                    item === 2 ? '"The doctors at MediConsult are not only knowledgeable but also very caring. They took the time to explain everything and answer all my questions."' :
                      '"Managing my chronic condition has become so much easier with MediConsult. The regular check-ins and personalized care plan have made a huge difference in my quality of life."'}
                </p>
                <div>
                  <h4 className="font-bold text-gray-800">
                    {item === 1 ? 'Robert Johnson' : item === 2 ? 'Maria Garcia' : 'David Kim'}
                  </h4>
                  <p className="text-blue-600">
                    {item === 1 ? 'Patient since 2020' : item === 2 ? 'Patient since 2019' : 'Patient since 2021'}
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Ready to Experience Better Healthcare?</h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto">
            Book your first consultation today and take the first step towards a healthier you.
          </p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-2 px-6 md:py-3 md:px-8 rounded-lg text-base md:text-lg transition-all duration-300">
            Book a Consultation
          </button>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
