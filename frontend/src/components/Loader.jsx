"use client"

import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"

function HeartModel(props) {
  const heartRef = useRef()

  // Pulsing animation
  useFrame((state) => {
    if (heartRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 1
      heartRef.current.scale.set(pulse, pulse, pulse)
    }
  })

  return (
    <group ref={heartRef} {...props}>
      {/* Main heart shape using standard Three.js geometries */}
      <group position={[0, 0, 0]}>
        {/* Left ventricle */}
        <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#e91e63" roughness={0.6} metalness={0.1} />
        </mesh>

        {/* Right ventricle */}
        <mesh position={[0.5, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#e91e63" roughness={0.6} metalness={0.1} />
        </mesh>

        {/* Bottom point of heart */}
        <mesh position={[0, -1.5, 0]} rotation={[Math.PI / 4, 0, 0]}>
          <coneGeometry args={[1, 2, 32]} />
          <meshStandardMaterial color="#e91e63" roughness={0.6} metalness={0.1} />
        </mesh>

        {/* Aorta */}
        <mesh position={[0, 1, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 1, 16]} />
          <meshStandardMaterial color="#d81b60" roughness={0.7} metalness={0.2} />
        </mesh>

        {/* Pulmonary artery */}
        <mesh position={[0.6, 0.8, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.2, 0.2, 0.8, 16]} />
          <meshStandardMaterial color="#d81b60" roughness={0.7} metalness={0.2} />
        </mesh>

        {/* Blood vessels */}
        {[...Array(8)].map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.sin((i * Math.PI) / 4) * 1.2,
              Math.cos((i * Math.PI) / 4) * 0.8,
              (Math.random() - 0.5) * 0.5,
            ]}
            rotation={[0, 0, (i * Math.PI) / 4]}
          >
            <cylinderGeometry args={[0.05, 0.05, 0.5 + Math.random() * 0.5, 8]} />
            <meshStandardMaterial color="#ad1457" roughness={0.5} metalness={0.3} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function Loader() {
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + (Math.random() * 5 + 1)
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-red-50 to-white z-50">
      <div className="w-72 h-72 mb-8">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <HeartModel rotation={[0, Math.PI / 4, 0]} />
          <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={false} enablePan={false} />
          <Environment preset="city" />
        </Canvas>
      </div>

      <div className="text-center max-w-md px-6">
        <h2 className="text-3xl font-bold text-red-600 mb-2">MediCode</h2>
        <p className="text-gray-600 mb-4">Loading your healthcare experience...</p>

        <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>

        <div className="mt-2 flex justify-between text-sm text-gray-500">
          <span>Initializing vital systems</span>
          <span className="font-medium">{Math.round(loadingProgress)}%</span>
        </div>
      </div>
    </div>
  )
}

export default Loader
