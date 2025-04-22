"use client"

import React, { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useTheme } from 'next-themes'

// Add explicit types for OrbitControls
declare module "three/examples/jsm/controls/OrbitControls.js" {
  export class OrbitControls {
    constructor(camera: THREE.Camera, domElement: HTMLElement);
    update(): void;
    enableDamping: boolean;
    dampingFactor: number;
  }
}

export interface ThreeModelViewerProps {
  type: "network" | "neuralNetwork" | "cloud" | "security";
  nodeCount?: number;
  connectionCount?: number; 
  color?: string;
  rotationSpeed?: number;
  interactive?: boolean;
  onProgress?: (progress: number) => void;
  className?: string;
}

// Create a placeholder component for initial render
const ThreeModelViewerPlaceholder = () => (
  <div className="flex items-center justify-center h-full w-full bg-black/50 rounded-xl border border-white/10">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-white animate-spin mb-4"></div>
      <p className="text-white/70">Loading visualization...</p>
    </div>
  </div>
)

export function ThreeModelViewer({
  type = "network",
  nodeCount = 100,
  connectionCount = 50,
  color = "#3b82f6",
  rotationSpeed = 0.001,
  interactive = true,
  onProgress,
  className,
}: ThreeModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const frameIdRef = useRef<number>(0)
  const objectsRef = useRef<THREE.Object3D[]>([])
  const controlsRef = useRef<OrbitControls | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const [hasError, setHasError] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const lastRenderTime = useRef<number>(0)
  const frameInterval = 16 // 60 FPS

  // Add event handler to prevent click propagation
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  // Mark when component is mounted on client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Only init and animate on client side
  useEffect(() => {
    if (!isClient) return;
    
    let timeout: NodeJS.Timeout;
    
    const init = () => {
      if (!containerRef.current) return
      
      try {
        // Scene setup
        const scene = new THREE.Scene()
        scene.background = new THREE.Color("#111")
        sceneRef.current = scene
        
        // Camera setup
        const camera = new THREE.PerspectiveCamera(
          75,
          containerRef.current.clientWidth / containerRef.current.clientHeight,
          0.1,
          1000
        )
        camera.position.z = 5
        cameraRef.current = camera
        
        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
        containerRef.current.appendChild(renderer.domElement)
        rendererRef.current = renderer
        
        // Add event listener to prevent click propagation on the canvas
        renderer.domElement.addEventListener('click', (e) => {
          e.stopPropagation()
        })
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(1, 1, 1)
        scene.add(directionalLight)
        
        // Controls for interactive mode
        if (interactive) {
          const controls = new OrbitControls(camera, renderer.domElement)
          controls.enableDamping = true
          controls.dampingFactor = 0.05
          controlsRef.current = controls
          
          // Prevent controls from capturing events outside the canvas
          controls.addEventListener('start', () => {
            renderer.domElement.style.pointerEvents = 'auto'
          })
          controls.addEventListener('end', () => {
            renderer.domElement.style.pointerEvents = 'none'
          })
        }
        
        // Create geometry based on type
        createGeometry()
        
        // Simulate loading
        timeout = setTimeout(() => {
          setIsLoading(false)
          if (onProgress) onProgress(100)
        }, 1000)
        
        // Start animation
        animate()
        
        // Resize handler
        const handleResize = () => {
          if (!containerRef.current || !rendererRef.current || !cameraRef.current) return
          
          const width = containerRef.current.clientWidth
          const height = containerRef.current.clientHeight
          
          cameraRef.current.aspect = width / height
          cameraRef.current.updateProjectionMatrix()
          
          rendererRef.current.setSize(width, height)
        }
        
        window.addEventListener("resize", handleResize)
        
        return () => {
          window.removeEventListener("resize", handleResize)
        }
      } catch (error) {
        console.error("Error initializing ThreeJS:", error)
        setHasError(true)
      }
    }
    
    // Create model geometry based on selected type
    const createGeometry = () => {
      if (!sceneRef.current) return
      
      // Clear previous objects
      objectsRef.current.forEach(obj => sceneRef.current?.remove(obj))
      objectsRef.current = []
      
      const colorValue = new THREE.Color(color)
      
      switch (type) {
        case "network":
          createNetworkModel(colorValue)
          break
        case "neuralNetwork":
          createNeuralNetworkModel(colorValue)
          break
        case "cloud":
          createCloudModel(colorValue)
          break
        case "security":
          createSecurityModel(colorValue)
          break
      }
    }
    
    const createNetworkModel = (color: THREE.Color) => {
      if (!sceneRef.current) return
      
      const nodes = []
      const group = new THREE.Group()
      
      // Create nodes
      for (let i = 0; i < nodeCount; i++) {
        const geometry = new THREE.SphereGeometry(0.05, 16, 16)
        const material = new THREE.MeshPhongMaterial({ color })
        const sphere = new THREE.Mesh(geometry, material)
        
        // Client-side random positioning
        sphere.position.x = (Math.random() - 0.5) * 4
        sphere.position.y = (Math.random() - 0.5) * 4
        sphere.position.z = (Math.random() - 0.5) * 4
        
        group.add(sphere)
        nodes.push(sphere)
      }
      
      // Create connections
      for (let i = 0; i < connectionCount; i++) {
        if (nodes.length < 2) break
        
        const startNode = nodes[Math.floor(Math.random() * nodes.length)]
        const endNode = nodes[Math.floor(Math.random() * nodes.length)]
        
        if (startNode !== endNode) {
          const lineMaterial = new THREE.LineBasicMaterial({ 
            color,
            transparent: true,
            opacity: 0.4
          })
          
          const points = [startNode.position, endNode.position]
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
          const line = new THREE.Line(lineGeometry, lineMaterial)
          
          group.add(line)
        }
      }
      
      sceneRef.current.add(group)
      objectsRef.current.push(group)
    }
    
    const createNeuralNetworkModel = (color: THREE.Color) => {
      if (!sceneRef.current) return
      
      const nodes = []
      const group = new THREE.Group()
      
      // Create nodes
      for (let i = 0; i < nodeCount; i++) {
        const geometry = new THREE.SphereGeometry(0.05, 16, 16)
        const material = new THREE.MeshPhongMaterial({ color })
        const sphere = new THREE.Mesh(geometry, material)
        
        // Client-side random positioning
        sphere.position.x = (Math.random() - 0.5) * 4
        sphere.position.y = (Math.random() - 0.5) * 4
        sphere.position.z = (Math.random() - 0.5) * 4
        
        group.add(sphere)
        nodes.push(sphere)
      }
      
      // Create connections
      for (let i = 0; i < connectionCount; i++) {
        if (nodes.length < 2) break
        
        const startNode = nodes[Math.floor(Math.random() * nodes.length)]
        const endNode = nodes[Math.floor(Math.random() * nodes.length)]
        
        if (startNode !== endNode) {
          const lineMaterial = new THREE.LineBasicMaterial({ 
            color,
            transparent: true,
            opacity: 0.4
          })
          
          const points = [startNode.position, endNode.position]
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
          const line = new THREE.Line(lineGeometry, lineMaterial)
          
          group.add(line)
        }
      }
      
      sceneRef.current.add(group)
      objectsRef.current.push(group)
    }
    
    const createCloudModel = (color: THREE.Color) => {
      if (!sceneRef.current) return
      
      const group = new THREE.Group()
      
      // Main cloud platform
      const baseGeometry = new THREE.CylinderGeometry(1, 1.2, 0.2, 16)
      const baseMaterial = new THREE.MeshPhongMaterial({ 
        color,
        transparent: true,
        opacity: 0.7
      })
      
      const base = new THREE.Mesh(baseGeometry, baseMaterial)
      base.position.y = -1
      group.add(base)
      
      // Cloud servers
      for (let i = 0; i < 5; i++) {
        const serverGeometry = new THREE.BoxGeometry(0.3, 0.5, 0.2)
        const serverMaterial = new THREE.MeshPhongMaterial({ 
          color: new THREE.Color("#ffffff"),
          transparent: true,
          opacity: 0.9
        })
        
        const server = new THREE.Mesh(serverGeometry, serverMaterial)
        // Position in a semi-circle on the platform
        const angle = (i / 5) * Math.PI + Math.PI / 5
        server.position.x = Math.cos(angle) * 0.6
        server.position.z = Math.sin(angle) * 0.6
        server.position.y = -0.8
        
        group.add(server)
      }
      
      // Connection lines
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color,
        transparent: true,
        opacity: 0.5
      })
      
      // Cloud symbol
      const cloudGeometry = new THREE.SphereGeometry(0.5, 16, 16)
      const cloudMaterial = new THREE.MeshPhongMaterial({ 
        color,
        transparent: true,
        opacity: 0.6
      })
      
      const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial)
      cloud.position.y = 0.5
      group.add(cloud)
      
      // Data transfer visualization
      // Using deterministic values based on indices instead of random
      for (let i = 0; i < 10; i++) {
        const dataGeometry = new THREE.SphereGeometry(0.04, 8, 8)
        const dataMaterial = new THREE.MeshPhongMaterial({ 
          color: new THREE.Color("#ffffff"),
          transparent: true,
          opacity: 0.8
        })
        
        const data = new THREE.Mesh(dataGeometry, dataMaterial)
        
        // Position along connection line - determinstic based on index
        const t = (i / 10) // Normalized position [0-1]
        const angle = (Math.floor(i/2) / 5) * Math.PI + Math.PI / 5
        const serverX = Math.cos(angle) * 0.6
        const serverZ = Math.sin(angle) * 0.6
        
        // Start at server, end at cloud
        data.position.x = serverX * (1 - t)
        data.position.y = -0.8 * (1 - t) + 0.5 * t
        data.position.z = serverZ * (1 - t)
        
        group.add(data)
      }
      
      sceneRef.current.add(group)
      objectsRef.current.push(group)
    }
    
    const createSecurityModel = (color: THREE.Color) => {
      if (!sceneRef.current) return
      
      const group = new THREE.Group()
      
      // Create a central node
      const centerGeometry = new THREE.SphereGeometry(0.2, 32, 32)
      const centerMaterial = new THREE.MeshPhongMaterial({ color })
      const centerNode = new THREE.Mesh(centerGeometry, centerMaterial)
      group.add(centerNode)
      
      // Create surrounding nodes
      const nodeCount = 8
      const surroundingNodes = []
      
      for (let i = 0; i < nodeCount; i++) {
        const nodeGeometry = new THREE.SphereGeometry(0.1, 16, 16)
        const nodeMaterial = new THREE.MeshPhongMaterial({ color })
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial)
        
        // Position in 3D space around center
        const phi = Math.acos(-1 + (2 * i) / nodeCount)
        const theta = Math.sqrt(nodeCount * Math.PI) * phi
        
        node.position.x = 1.5 * Math.cos(theta) * Math.sin(phi)
        node.position.y = 1.5 * Math.sin(theta) * Math.sin(phi)
        node.position.z = 1.5 * Math.cos(phi)
        
        group.add(node)
        surroundingNodes.push(node)
      }
      
      // Connect nodes with lines
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color,
        transparent: true,
        opacity: 0.5
      })
      
      // Connect center to each node
      surroundingNodes.forEach(node => {
        const points = [
          new THREE.Vector3(0, 0, 0),
          node.position
        ]
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
        const line = new THREE.Line(lineGeometry, lineMaterial)
        group.add(line)
      })
      
      // Connect some nodes to each other (not all)
      for (let i = 0; i < surroundingNodes.length; i++) {
        // Connect to next node (circular)
        const nextIdx = (i + 1) % surroundingNodes.length
        
        const points = [
          surroundingNodes[i].position,
          surroundingNodes[nextIdx].position
        ]
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
        const line = new THREE.Line(lineGeometry, lineMaterial)
        group.add(line)
      }
      
      sceneRef.current.add(group)
      objectsRef.current.push(group)
    }
    
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate)
      
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return
      
      // Rotate objects
      objectsRef.current.forEach(obj => {
        obj.rotation.y += rotationSpeed
      })
      
      // Update controls if interactive
      if (controlsRef.current) {
        controlsRef.current.update()
      }
      
      // Performance optimization: limit frame rate
      const now = performance.now();
      const elapsed = now - lastRenderTime.current;
      if (elapsed < frameInterval) return;
      
      lastRenderTime.current = now - (elapsed % frameInterval);
      
      // Render
      rendererRef.current.render(sceneRef.current, cameraRef.current)
    }
    
    init()
    
    return () => {
      cancelAnimationFrame(frameIdRef.current)
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }
      
      clearTimeout(timeout)
    }
  }, [isClient, type, nodeCount, connectionCount, color, rotationSpeed, interactive, onProgress])

  // Only render the 3D content on the client side
  useEffect(() => {
    setMounted(true)
  }, [])

  if (hasError) {
    return (
      <div className={`bg-background/50 backdrop-blur-sm border rounded-lg flex items-center justify-center ${className}`} style={{ minHeight: "300px" }}>
        <div className="text-center p-4">
          <p className="text-muted-foreground mb-2">Unable to load 3D model</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
      </div>
    )
  }

  // Don't render anything on server
  if (!mounted) {
    return <ThreeModelViewerPlaceholder />
  }

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full ${className || ''}`}
      onClick={handleContainerClick}
      style={{ pointerEvents: interactive ? 'auto' : 'none' }}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
            <p className="text-muted-foreground">Loading 3D model...</p>
          </div>
        </div>
      )}
      {hasError && (
        <div className="flex items-center justify-center h-full w-full bg-black/50 rounded-xl border border-white/10">
          <div className="flex flex-col items-center">
            <p className="text-white/70">Error loading visualization</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Retry
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// Optimize rendering with frame limiting for better performance
const optimizedRender = (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) => {
  // Only render at most 60 frames per second
  let lastRender = 0;
  const minFrameTime = 1000 / 60; // 60 FPS max
  
  const animate = (time: number) => {
    const frameIdRef = requestAnimationFrame(animate);
    
    // Skip rendering if not enough time has passed
    const delta = time - lastRender;
    if (delta < minFrameTime) return frameIdRef;
    
    lastRender = time;
    
    // Update controls if available
    if (controlsRef.current) {
      controlsRef.current.update();
    }
    
    // Render scene
    renderer.render(scene, camera);
    
    return frameIdRef;
  };
  
  return animate(0);
};

// Properly dispose of all THREE.js resources
const disposeResources = () => {
  // Dispose of all materials and geometries
  objectsRef.current.forEach(obj => {
    obj.traverse(child => {
      if (child instanceof THREE.Mesh) {
        if (child.geometry) {
          child.geometry.dispose();
        }
        
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      }
    });
  });
  
  // Clear references
  objectsRef.current = [];
  
  // Dispose of renderer
  if (rendererRef.current) {
    rendererRef.current.dispose();
    rendererRef.current = null;
  }
}; 