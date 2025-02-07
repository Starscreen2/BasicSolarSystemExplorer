import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text, Html, Billboard } from "@react-three/drei";
import { Planet } from "@shared/schema";
import { useRef, useState, useEffect } from "react";
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
      <meshBasicMaterial color="#ffffff" opacity={0.3} transparent={true} side={THREE.DoubleSide} /> {/* Increased opacity */}
    </mesh>
  );
}

function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const texture = createTexturePattern();
  const { rotationSpeedMultiplier } = useSettings();

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.005 * rotationSpeedMultiplier;
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
      <group>
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
  const orbitRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const texture = createTexturePattern();
  const { orbitSpeedMultiplier, rotationSpeedMultiplier } = useSettings();

  // Store initial angle
  const angleRef = useRef(0);
  const lastSpeedRef = useRef(orbitSpeedMultiplier);
  const [isResetting, setIsResetting] = useState(false);
  const targetAngleRef = useRef(0);

  // Calculate relative speeds
  const baseOrbitalSpeed = (2 * Math.PI) / (orbitalPeriod * 0.3);
  const baseRotationSpeed = (2 * Math.PI) / (Math.abs(rotationPeriod) * 3.0);

  useEffect(() => {
    if (orbitSpeedMultiplier !== lastSpeedRef.current) {
      // Store current angle as target for smooth transition
      if (orbitRef.current) {
        const currentX = orbitRef.current.position.x;
        const currentZ = orbitRef.current.position.z;
        targetAngleRef.current = Math.atan2(currentZ, currentX);
        setIsResetting(true);
      }
      lastSpeedRef.current = orbitSpeedMultiplier;
    }
  }, [orbitSpeedMultiplier]);

  useFrame((state) => {
    if (planetRef.current && orbitRef.current) {
      // Handle planet rotation
      const rotationDirection = rotationPeriod < 0 ? -1 : 1;
      planetRef.current.rotation.y += baseRotationSpeed * rotationSpeedMultiplier * rotationDirection;

      const orbitRadius = position[0];

      if (isResetting) {
        // Smoothly interpolate to target angle
        const currentX = orbitRef.current.position.x;
        const currentZ = orbitRef.current.position.z;
        const currentAngle = Math.atan2(currentZ, currentX);

        // Calculate the shortest path to target angle
        let angleDiff = targetAngleRef.current - currentAngle;
        if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

        // Smoothly interpolate
        const t = 0.1; // Adjust for faster/slower transition
        const newAngle = currentAngle + angleDiff * t;

        orbitRef.current.position.x = Math.cos(newAngle) * orbitRadius;
        orbitRef.current.position.z = Math.sin(newAngle) * orbitRadius;

        // Check if we're close enough to target
        if (Math.abs(angleDiff) < 0.01) {
          setIsResetting(false);
          angleRef.current = newAngle;
        }
      } else {
        // Normal orbital motion
        const time = state.clock.getElapsedTime();
        angleRef.current += baseOrbitalSpeed * orbitSpeedMultiplier * 0.016; // Assuming 60fps

        orbitRef.current.position.x = Math.cos(angleRef.current) * orbitRadius;
        orbitRef.current.position.z = Math.sin(angleRef.current) * orbitRadius;
      }
    }
  });

  // Scale factor to make planets visible while maintaining relative sizes
  const scaleFactor = Math.max(0.3, Math.min(1.5, diameter / 12742 * 0.8)); // Earth's diameter as reference

  return (
    <group ref={orbitRef}>
      <mesh
        ref={planetRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[scaleFactor, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          map={texture}
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
      <group>
        <Billboard
          follow={true}
          lockX={false}
          lockY={false}
          lockZ={false}
        >
          <Text
            position={[0, scaleFactor + 0.5, 0]}
            fontSize={0.8}
            color="white"
            anchorX="center"
            anchorY="bottom"
          >
            {name}
          </Text>
        </Billboard>
        {hovered && (
          <Html position={[scaleFactor + 1, 0, 0]}>
            <div className="bg-black/80 text-white p-2 rounded-lg shadow-lg w-48">
              <h3 className="font-bold mb-1">{name}</h3>
              <p className="text-sm">{description}</p>
              <div className="mt-1 text-xs">
                <div>Diameter: {diameter.toLocaleString()} km</div>
                <div>Orbital Period: {orbitalPeriod} Earth days</div>
              </div>
            </div>
          </Html>
        )}
      </group>
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
  // Linear spacing with fixed gaps between planets
  const distanceScale = (distance: number) => {
    // Get the index of the current planet based on its distance
    const planetIndex = planets.findIndex(p => p.distance === distance);
    // Create even spacing with 5 units between each planet
    return (planetIndex + 1) * 7; // Start at 7 units and increment by 7 for each planet
  };

  return (
    <Canvas camera={{ position: [0, 40, 60], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} />

      <Sun />

      {/* Orbital Rings */}
      {planets.map((planet) => (
        <OrbitalRing key={`ring-${planet.id}`} radius={distanceScale(planet.distance)} />
      ))}

      {/* Planets */}
      {planets.map((planet, index) => (
        <Planet3D
          key={planet.id}
          position={[distanceScale(planet.distance), 0, 0]}
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
        maxDistance={150}
        minDistance={20}
      />
    </Canvas>
  );
}