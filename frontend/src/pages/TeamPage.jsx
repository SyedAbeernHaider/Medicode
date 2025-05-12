import TeamMember from "../components/TeamMember"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"

function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Chief Executive Officer",
      image: "https://media.istockphoto.com/id/1346711310/photo/portrait-of-smiling-female-doctor-wearing-uniform-standing.jpg?s=612x612&w=0&k=20&c=nPsBL7HwQ7y14HP6J7lcCyKl51X5pPSPGnweXHFzT9o=",
      bio: "With over 20 years of experience in healthcare management and innovation, Dr. Johnson leads our vision for the future of medical consultations.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image: "https://www.shutterstock.com/image-photo/happy-confident-mature-45-years-600nw-2426323943.jpg",
      bio: "A pioneer in healthcare technology, Michael brings his expertise in AI and telemedicine to create our cutting-edge consultation platform.",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      role: "Chief Medical Officer",
      image: "https://www.shutterstock.com/image-photo/confident-portrait-mature-businessman-office-600nw-2453209099.jpg",
      bio: "Dr. Rodriguez ensures that all our medical services meet the highest standards of quality and patient care.",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      role: "Head of Cardiology",
      image: "https://thumbs.dreamstime.com/b/young-male-doctor-close-up-happy-looking-camera-56751540.jpg",
      bio: "A renowned cardiologist with a passion for preventive care and patient education.",
    },
    {
      id: 5,
      name: "Dr. Aisha Patel",
      role: "Head of Pediatrics",
      image: "https://t3.ftcdn.net/jpg/05/04/25/70/360_F_504257032_jBtwqNdvdMN9Xm6aDT0hcvtxDXPZErrn.jpg",
      bio: "Specializing in pediatric care, Dr. Patel is dedicated to ensuring the health and wellbeing of our youngest patients.",
    },
    {
      id: 6,
      name: "Dr. Robert Kim",
      role: "Head of Neurology",
      image: "https://static.vecteezy.com/system/resources/previews/006/971/633/large_2x/portrait-of-young-asian-male-doctor-on-blue-background-photo.JPG",
      bio: "With a focus on neurological disorders, Dr. Kim brings cutting-edge research and treatment options to our patients.",
    },
    {
      id: 7,
      name: "Lisa Thompson",
      role: "Head of Patient Experience",
      image: "https://c8.alamy.com/comp/J9N78T/latin-american-female-doctor-sitting-at-the-table-and-working-by-computer-J9N78T.jpg",
      bio: "Lisa ensures that every patient interaction with MediConsult is seamless, supportive, and satisfying.",
    },
    {
      id: 8,
      name: "Dr. Carlos Mendez",
      role: "Head of Research",
      image: "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg",
      bio: "Leading our research initiatives, Dr. Mendez works to integrate the latest medical advancements into our consultation services.",
    },
    {
      id: 9,
      name: "Sophia Lee",
      role: "Head of Operations",
      image: "https://plus.unsplash.com/premium_photo-1664475450083-5c9eef17a191?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmVtYWxlJTIwZG9jdG9yfGVufDB8fDB8fHww",
      bio: "Sophia oversees the day-to-day operations of MediConsult, ensuring that everything runs smoothly for both patients and staff.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Team</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Our team of dedicated healthcare professionals and technology experts work together to provide you with the
            best medical consultation experience.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamMember key={member.id} name={member.name} role={member.role} image={member.image} bio={member.bio} />
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Join Our Team</h2>
              <p className="text-gray-700 mb-6">
                We're always looking for talented and passionate individuals to join our team. If you're dedicated to
                improving healthcare through technology and innovation, we'd love to hear from you.
              </p>
              <p className="text-gray-600 mb-8">
                At MediConsult, we offer a collaborative and supportive work environment, competitive compensation, and
                the opportunity to make a real difference in people's lives.
              </p>
              <button className="btn-primary">View Open Positions</button>
            </div>

            <div className="md:w-1/2 h-64 md:h-96">
              <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <mesh rotation={[0, Math.PI / 4, 0]}>
                  <dodecahedronGeometry args={[1.5, 0]} />
                  <meshStandardMaterial color="#1e88e5" />
                </mesh>
                <OrbitControls autoRotate />
                <Environment preset="city" />
              </Canvas>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-12">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Patient-Centered</h3>
              <p className="text-gray-600">
                We put patients at the center of everything we do, focusing on their needs, preferences, and
                experiences.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-blue-600"
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
              <h3 className="text-xl font-bold text-gray-800 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in all aspects of our work, from medical care to technology and customer
                service.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We embrace innovation and continuously seek new ways to improve healthcare delivery and patient
                outcomes.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-blue-600"
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
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Collaboration</h3>
              <p className="text-gray-600">
                We believe in the power of collaboration, working together across disciplines to provide comprehensive
                care.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TeamPage
