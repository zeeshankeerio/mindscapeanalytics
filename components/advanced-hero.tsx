"use client"

import type React from "react"

import { useMemo } from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, Play, Sparkles, Star, BarChart2, Layers, X } from "lucide-react"
import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, MeshDistortMaterial, OrbitControls } from "@react-three/drei"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// 3D Scene Components
function NeuralNetworkSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })

  return (
    <group>
      <mesh ref={meshRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color="#ff3333"
          attach="material"
          distort={0.4}
          speed={3}
          roughness={0.2}
          metalness={0.8}
          emissive="#ff0000"
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </mesh>
    </group>
  )
}

function NeuralConnections() {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const { viewport } = useThree()

  // Generate random points
  const pointCount = 100
  const points = useMemo(() => {
    const temp = []
    for (let i = 0; i < pointCount; i++) {
      const x = (Math.random() - 0.5) * 6
      const y = (Math.random() - 0.5) * 6
      const z = (Math.random() - 0.5) * 6
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [pointCount])

  // Generate lines between close points
  const linePositions = useMemo(() => {
    const temp = []
    const threshold = 2 // Distance threshold for connecting points

    for (let i = 0; i < pointCount; i++) {
      const x1 = points[i * 3]
      const y1 = points[i * 3 + 1]
      const z1 = points[i * 3 + 2]

      for (let j = i + 1; j < pointCount; j++) {
        const x2 = points[j * 3]
        const y2 = points[j * 3 + 1]
        const z2 = points[j * 3 + 2]

        const distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2))

        if (distance < threshold) {
          temp.push(x1, y1, z1, x2, y2, z2)
        }
      }
    }

    return new Float32Array(temp)
  }, [points, pointCount])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = clock.getElapsedTime() * 0.05
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.08
    }

    if (linesRef.current) {
      linesRef.current.rotation.x = clock.getElapsedTime() * 0.05
      linesRef.current.rotation.y = clock.getElapsedTime() * 0.08

      // Pulse the opacity of the lines
      linesRef.current.material.opacity = (Math.sin(clock.getElapsedTime() * 0.5) + 1) * 0.25 + 0.2
    }
  })

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={points} count={pointCount} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#ff3333" sizeAttenuation transparent opacity={0.8} />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={linePositions}
            count={linePositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ff3333" transparent opacity={0.2} />
      </lineSegments>
    </group>
  )
}

function FloatingParticles({ count = 50 }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const { viewport } = useThree()

  useEffect(() => {
    if (mesh.current) {
      const dummy = new THREE.Object3D()
      const particles = []

      for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 10
        const y = (Math.random() - 0.5) * 10
        const z = (Math.random() - 0.5) * 10

        particles.push({ x, y, z, velocity: Math.random() * 0.02 + 0.01 })
      }

      // Animation loop
      const animate = () => {
        for (let i = 0; i < count; i++) {
          const particle = particles[i]

          // Move particles upward with slight randomness
          particle.y += particle.velocity
          particle.x += (Math.random() - 0.5) * 0.01
          particle.z += (Math.random() - 0.5) * 0.01

          // Reset particles that go out of bounds
          if (particle.y > 5) {
            particle.y = -5
            particle.x = (Math.random() - 0.5) * 10
            particle.z = (Math.random() - 0.5) * 10
          }

          dummy.position.set(particle.x, particle.y, particle.z)
          dummy.updateMatrix()
          mesh.current.setMatrixAt(i, dummy.matrix)
        }

        mesh.current.instanceMatrix.needsUpdate = true
        requestAnimationFrame(animate)
      }

      animate()
    }
  }, [count])

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#ff6666" transparent opacity={0.6} />
    </instancedMesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="city" />

      <NeuralNetworkSphere />
      <NeuralConnections />
      <FloatingParticles />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

// Animated Text Component
function AnimatedText({ text, className }: { text: string; className?: string }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={cn("flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      animate={controls}
    >
      {words.map((word, index) => (
        <motion.span key={index} className="mr-2 mt-2" variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-red-500/50 transition-colors duration-300 group"
    >
      <div className="p-3 bg-red-500/10 rounded-lg w-fit mb-4 group-hover:bg-red-500/20 transition-colors">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </motion.div>
  )
}

// Stat Card Component
function StatCard({
  value,
  label,
  icon,
  delay = 0,
}: { value: string; label: string; icon: React.ReactNode; delay?: number }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.5,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col items-center text-center"
    >
      <div className="p-3 bg-red-500/10 rounded-full w-fit mb-4">{icon}</div>
      <div className="text-3xl md:text-4xl font-bold mb-1">{value}</div>
      <div className="text-white/70">{label}</div>
    </motion.div>
  )
}

// Main Hero Component
export default function AdvancedHero() {
  const [videoModal, setVideoModal] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>

      {/* Animated Gradient Border */}
      <div className="absolute inset-0 bg-black [mask-image:radial-gradient(circle_at_center,transparent_50%,black)]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent animate-gradient-x"></div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div className="flex-1" style={{ y }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
                Next-Gen AI Platform
              </Badge>
            </motion.div>

            <AnimatedText
              text="Revolutionize Your Business with Advanced AI Solutions"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-white/70 mb-8 max-w-2xl"
            >
              Harness the power of artificial intelligence to drive innovation, efficiency, and growth. Our platform
              combines computer vision, natural language processing, and predictive analytics to deliver transformative
              results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white/10 hover:bg-white/5 group"
                onClick={() => setVideoModal(true)}
              >
                <Play className="mr-2 h-4 w-4 text-red-500 group-hover:text-red-400" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-black bg-gradient-to-br from-red-400 to-red-600"
                  ></div>
                ))}
              </div>
              <div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <div className="text-sm text-white/70">Trusted by 500+ enterprises worldwide</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-1 h-[500px] w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="h-full w-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-xl blur-xl opacity-30"></div>
              <div className="absolute inset-0.5 bg-black/80 rounded-xl border border-white/10"></div>
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <Scene />
                </Canvas>
              </div>

              {/* Floating UI Elements */}
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                <Badge className="bg-black/50 backdrop-blur-sm border-white/10">AI Platform v3.0</Badge>
                <Badge className="bg-green-500/20 text-green-500 backdrop-blur-sm border-green-500/20">Live Demo</Badge>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <div className="flex gap-2 mb-2">
                    <Button size="sm" variant="default" className="bg-red-600 hover:bg-red-700 text-white">
                      <Sparkles className="h-4 w-4 mr-1" />
                      <span>AI Models</span>
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5">
                      <span>Features</span>
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5">
                      <span>Analytics</span>
                    </Button>
                  </div>
                  <p className="text-sm text-white/70">
                    Explore our advanced neural networks with 99.2% accuracy and real-time processing capabilities.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard
            value="99.2%"
            label="Model Accuracy"
            icon={<Target className="h-6 w-6 text-red-500" />}
            delay={0.1}
          />
          <StatCard
            value="500+"
            label="Enterprise Clients"
            icon={<Building className="h-6 w-6 text-red-500" />}
            delay={0.2}
          />
          <StatCard
            value="50M+"
            label="API Requests Daily"
            icon={<Activity className="h-6 w-6 text-red-500" />}
            delay={0.3}
          />
          <StatCard
            value="24/7"
            label="Expert Support"
            icon={<HeadphonesIcon className="h-6 w-6 text-red-500" />}
            delay={0.4}
          />
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">Core Capabilities</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Powerful AI <span className="text-red-500">Features</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Our platform offers a comprehensive suite of AI capabilities designed to address your most complex
              business challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Search className="h-6 w-6 text-red-500" />}
              title="Computer Vision"
              description="Analyze images and videos to detect objects, recognize faces, and extract valuable insights from visual content."
              delay={0.1}
            />
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6 text-red-500" />}
              title="Natural Language Processing"
              description="Understand and generate human language for sentiment analysis, content creation, and conversational AI."
              delay={0.2}
            />
            <FeatureCard
              icon={<BarChart2 className="h-6 w-6 text-red-500" />}
              title="Predictive Analytics"
              description="Forecast trends and outcomes based on historical data to make informed business decisions."
              delay={0.3}
            />
            <FeatureCard
              icon={<Database className="h-6 w-6 text-red-500" />}
              title="Data Processing"
              description="Clean, transform, and analyze large datasets to extract meaningful patterns and insights."
              delay={0.4}
            />
            <FeatureCard
              icon={<Layers className="h-6 w-6 text-red-500" />}
              title="Custom AI Models"
              description="Develop and deploy tailored AI models designed to address your specific business requirements."
              delay={0.5}
            />
            <FeatureCard
              icon={<Code className="h-6 w-6 text-red-500" />}
              title="API Integration"
              description="Seamlessly integrate our AI capabilities into your existing systems and workflows via our robust API."
              delay={0.6}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-sm text-white/60 mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black/90 rounded-xl border border-white/10 overflow-hidden max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 flex justify-between items-center border-b border-white/10">
                <h3 className="font-medium">Mindscape AI Platform Demo</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                  onClick={() => setVideoModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="aspect-video bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Mindscape AI Platform Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// Missing components
function Target(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function Building(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}

function Activity(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}

function HeadphonesIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  )
}

function MessageSquare(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function Search(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function Database(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  )
}

function Code(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

