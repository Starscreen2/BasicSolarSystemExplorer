import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text, Html } from "@react-three/drei";
import { Planet } from "@shared/schema";
import { useRef, useState } from "react";
import * as THREE from "three";

interface SolarSystemProps {
  planets: Planet[];
}

function OrbitalRing({ radius }: { radius: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius, radius + 0.1, 64]} />
      <meshBasicMaterial color="#ffffff" opacity={0.1} transparent={true} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Planet3D({ position, color, name, diameter, description }: { 
  position: [number, number, number]; 
  color: string;
  name: string;
  diameter: number;
  description: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Rotate the planet
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
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
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[0, size + 0.5, 0]}
        fontSize={1.2}
        color="white"
        anchorX="center"
        anchorY="bottom"
      >
        {name}
      </Text>
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

      {/* Sun */}
      <group position={[0, 0, 0]}>
        <mesh>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial color="#ffdd00" emissive="#ffdd00" emissiveIntensity={0.5} />
        </mesh>
        <Text
          position={[0, 3, 0]}
          fontSize={1.2}
          color="white"
          anchorX="center"
          anchorY="bottom"
        >
          Sun
        </Text>
      </group>

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