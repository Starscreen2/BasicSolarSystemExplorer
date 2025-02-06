import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text, Html, Billboard } from "@react-three/drei";
import { Planet } from "@shared/schema";
import { useRef, useState } from "react";
import * as THREE from "three";
import { useSettings } from "@/lib/settings-context";

interface SolarSystemProps {
  planets: Planet[];
}

function createTexturePattern() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext('2d')!;

  // Create a gradient pattern
  const gradient = context.createLinearGradient(0, 0, 64, 64);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)');

  // Draw some random dots
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);

  for (let i = 0; i < 32; i++) {
    context.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
    context.beginPath();
    context.arc(
      Math.random() * 64,
      Math.random() * 64,
      Math.random() * 2,
      0,
      Math.PI * 2
    );
    context.fill();
  }

  return new THREE.CanvasTexture(canvas);
}

function OrbitalRing({ radius }: { radius: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius, radius + 0.1, 64]} />
      <meshBasicMaterial color="#ffffff" opacity={0.1} transparent={true} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const texture = createTexturePattern();

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh
        ref={sunRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial 
          color="#ffdd00" 
          emissive="#ffdd00" 
          emissiveIntensity={0.5}
          map={texture}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <Text
          position={[0, 3, 0]}
          fontSize={1.2}
          color="white"
          anchorX="center"
          anchorY="bottom"
        >
          Sun
        </Text>
      </Billboard>
      {hovered && (
        <Html position={[3, 0, 0]}>
          <div className="bg-black/80 text-white p-2 rounded-lg shadow-lg w-48">
            <h3 className="font-bold mb-1">Sun</h3>
            <p className="text-sm">The star at the center of our Solar System</p>
            <div className="mt-1 text-xs">
              <div>Diameter: 1,392,700 km</div>
              <div>Surface Temperature: 5,500°C</div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function Planet3D({ 
  position, 
  color, 
  name, 
  diameter, 
  description,
  orbitalPeriod,
  rotationPeriod
}: { 
  position: [number, number, number]; 
  color: string;
  name: string;
  diameter: number;
  description: string;
  orbitalPeriod: number;
  rotationPeriod: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const texture = createTexturePattern();
  const { orbitSpeedMultiplier, rotationSpeedMultiplier } = useSettings();

  // Calculate relative speeds
  // Base speed multiplier to make orbits visible (1 Earth year = ~10 seconds)
  const baseOrbitalSpeed = (2 * Math.PI) / (orbitalPeriod * 60); // Convert to radians per frame
  const baseRotationSpeed = (2 * Math.PI) / (Math.abs(rotationPeriod) * 60);

  useFrame((state) => {
    if (meshRef.current) {
      // Adjust rotation speed based on settings and direction
      const rotationDirection = rotationPeriod < 0 ? -1 : 1;
      meshRef.current.rotation.y += baseRotationSpeed * rotationSpeedMultiplier * rotationDirection;

      // Calculate orbital position
      const time = state.clock.getElapsedTime();
      const angle = time * baseOrbitalSpeed * orbitSpeedMultiplier;

      // Update position based on orbit
      meshRef.current.position.x = position[0] * Math.cos(angle);
      meshRef.current.position.z = position[0] * Math.sin(angle);
    }
  });

  // Scale factor to make planets visible while maintaining relative sizes
  const scaleFactor = diameter / 12742; // Earth's diameter as reference
  const size = Math.max(0.5, scaleFactor); // Minimum size of 0.5 for visibility

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          map={texture}
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <Text
          position={[0, size + 0.5, 0]}
          fontSize={1.2}
          color="white"
          anchorX="center"
          anchorY="bottom"
        >
          {name}
        </Text>
      </Billboard>
      {hovered && (
        <Html position={[size + 1, 0, 0]}>
          <div className="bg-black/80 text-white p-2 rounded-lg shadow-lg w-48">
            <h3 className="font-bold mb-1">{name}</h3>
            <p className="text-sm">{description}</p>
            <div className="mt-1 text-xs">
              <div>Diameter: {diameter.toLocaleString()} km</div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

export default function SolarSystem({ planets }: SolarSystemProps) {
  const colors = [
    "#ffcc00", // Mercury
    "#ff9933", // Venus
    "#3366cc", // Earth
    "#cc3300", // Mars
    "#ff6600", // Jupiter
    "#ffcc66", // Saturn
    "#99ccff", // Uranus
    "#3333cc", // Neptune
  ];

  // Calculate scaling factor for distances
  const maxDistance = Math.max(...planets.map(p => p.distance));
  const distanceScale = 30 / maxDistance; // Scale to fit within ~30 units

  return (
    <Canvas camera={{ position: [0, 30, 35], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} />

      <Sun />

      {/* Orbital Rings */}
      {planets.map((planet, index) => (
        <OrbitalRing key={`ring-${planet.id}`} radius={planet.distance * distanceScale} />
      ))}

      {/* Planets */}
      {planets.map((planet, index) => (
        <Planet3D
          key={planet.id}
          position={[planet.distance * distanceScale, 0, 0]}
          color={colors[index]}
          name={planet.name}
          diameter={planet.diameter}
          description={planet.description}
          orbitalPeriod={planet.orbitalPeriod}
          rotationPeriod={planet.rotationPeriod}
        />
      ))}

      <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        enableRotate={true}
        maxDistance={100}
        minDistance={5}
      />
    </Canvas>
  );
}