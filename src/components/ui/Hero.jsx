import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Ring, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function FloatingRings() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Ring args={[2, 2.2, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color="#ff8fa3"
          emissive="#ff8fa3"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </Ring>
      <Ring args={[2.5, 2.7, 64]} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
        <meshStandardMaterial
          color="#ff6b8a"
          emissive="#ff6b8a"
          emissiveIntensity={0.5}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </Ring>
    </Float>
  )
}

function GlowingSphere() {
  const meshRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.2
    meshRef.current.rotation.y = t * 0.3
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial
          color="#ff8fa3"
          emissive="#ff8fa3"
          emissiveIntensity={2}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  )
}

function Particles() {
  const count = 50
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ff8fa3"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff8fa3" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b8a" />
      <FloatingRings />
      <GlowingSphere />
      <Particles />
    </>
  )
}

function Hero({ onStartBooth }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-soft via-white to-pink-50" />

      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Scene />
        </Canvas>
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-syncopate text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
            <span className="gradient-text-pink">Capture</span>
          </h1>
          <h1 className="font-syncopate text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-gray-700">Your Reality</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-500 font-exo mb-8"
        >
          Your AI-Powered Futuristic Photo Booth
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={onStartBooth}
            className="px-10 py-4 pink-button rounded-full font-orbitron font-bold text-lg pink-box"
          >
            <span className="relative z-10">Start Booth</span>
          </button>
          <button
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 glass rounded-full font-orbitron font-semibold text-lg text-gray-600 hover:bg-pink-50 transition-all"
          >
            Explore Filters
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-pink-primary"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero