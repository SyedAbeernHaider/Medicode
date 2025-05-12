import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"

function MedicalModel() {
  // Using a placeholder model - in a real app, you'd use an actual medical model
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#1e88e5" />
    </mesh>
  )
}

function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="w-64 h-64 mb-8">
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <MedicalModel />
          <OrbitControls autoRotate />
          <Environment preset="city" />
        </Canvas>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-2">MediCode</h2>
        <p className="text-gray-600">Loading your healthcare experience...</p>
        <div className="mt-4 w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default Loader
