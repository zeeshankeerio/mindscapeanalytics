"use client"

import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Setup scene
      const scene = new THREE.Scene()

    // Setup camera
      const camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      )
    camera.position.z = 15
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setClearColor(0x000000, 0)
      containerRef.current.appendChild(renderer.domElement)
    
    // Add orbital controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)
    
    // Create particles
    const particleCount = 1000
    const particles = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30
      positions[i + 1] = (Math.random() - 0.5) * 30
      positions[i + 2] = (Math.random() - 0.5) * 30
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xff0000,
      size: 0.1,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    })
    
    const particleSystem = new THREE.Points(particles, particleMaterial)
    scene.add(particleSystem)
    
    // Create a central sphere
    const sphereGeometry = new THREE.SphereGeometry(3, 32, 32)
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      emissive: 0xff0000,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.8,
    })
    
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    scene.add(sphere)
    
    // Create connecting lines
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.3,
    })
    
    const nodeCount = 12
    const nodes: THREE.Vector3[] = []
    const nodeObjects: THREE.Mesh[] = []
    
    for (let i = 0; i < nodeCount; i++) {
      const radius = 8
      const phi = Math.acos(-1 + (2 * i) / nodeCount)
      const theta = Math.sqrt(nodeCount * Math.PI) * phi
      
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      
      const point = new THREE.Vector3(x, y, z)
      nodes.push(point)
      
      const nodeGeometry = new THREE.SphereGeometry(0.3, 16, 16)
      const nodeMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 0.5,
      })
      
      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial)
      nodeMesh.position.copy(point)
      scene.add(nodeMesh)
      nodeObjects.push(nodeMesh)
      
      // Create line from node to center
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        point,
        new THREE.Vector3(0, 0, 0)
      ])
      
      const line = new THREE.Line(lineGeometry, linesMaterial)
      scene.add(line)
    }
    
    // Animation loop
    let frameId: number
    
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      
      // Rotate the particle system
      particleSystem.rotation.x += 0.001
      particleSystem.rotation.y += 0.002
      
      // Rotate the sphere
      sphere.rotation.y += 0.005
      
      // Animate nodes
      nodeObjects.forEach((node, i) => {
        node.position.x += Math.sin(Date.now() * 0.001 + i) * 0.01
        node.position.y += Math.cos(Date.now() * 0.001 + i) * 0.01
        node.position.z += Math.sin(Date.now() * 0.001 + i * 0.5) * 0.01
      })
      
      controls.update()
      renderer.render(scene, camera)
      }

      animate()
      setIsLoaded(true)

      // Handle resize
      const handleResize = () => {
      if (!containerRef.current) return

        const width = containerRef.current.clientWidth
        const height = containerRef.current.clientHeight

        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }

    window.addEventListener('resize', handleResize)

      // Cleanup
      return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frameId)
        
      const container = containerRef.current
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }

      // Dispose materials and geometries to prevent memory leaks
      sphereGeometry.dispose()
      sphereMaterial.dispose()
      particles.dispose()
      particleMaterial.dispose()
      
      nodeObjects.forEach(node => {
        if (node.geometry) (node.geometry as THREE.BufferGeometry).dispose()
        if (node.material) (node.material as THREE.Material).dispose()
      })
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full rounded-xl bg-gradient-to-r from-black/80 to-black/40 backdrop-blur-sm"
    >
      {!isLoaded && (
        <div className="flex items-center justify-center h-full">
          <div className="text-white/50 text-center">
            <div className="relative flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-red-500/10 rounded-full animate-pulse absolute"></div>
              <div className="w-12 h-12 bg-red-500/20 rounded-full animate-ping absolute"></div>
              <div className="w-8 h-8 bg-red-500/40 rounded-full"></div>
            </div>
            <p>Loading 3D Visualization...</p>
          </div>
        </div>
      )}
    </div>
  )
} 