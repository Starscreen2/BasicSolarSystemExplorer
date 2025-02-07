import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Text, Html, Billboard } from "@react-three/drei";
import { Planet } from "@shared/schema";
import { useRef, useState, useEffect, createContext, useContext } from "react";
import * as THREE from "three";

interface SolarSystemProps {
  planets: Planet[];
}

const SettingsContext = createContext({
  isPaused: false,
  setIsPaused: (paused: boolean) => {},
  resetAnimation: () => {},
});

export function useSettings() {
  return useContext(SettingsContext);
}

function Planet3D({
  position,
  color,
  name,
  diameter,
  description,
  orbitalPeriod,
  rotationPeriod,
  resetKey,
}: {
  position: [number, number, number];
  color: string;
  name: string;
  diameter: number;
  description: string;
  orbitalPeriod: number;
  rotationPeriod: number;
  resetKey: number;
}) {
  const orbitRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { isPaused } = useSettings();

  // Store initial position and angle
  const initialPosition = useRef<[number, number, number]>([position[0], 0, 0]);
  const angleRef = useRef(0);

  // Calculate speeds
  const baseOrbitalSpeed = (2 * Math.PI) / (orbitalPeriod * 0.3);
  const baseRotationSpeed = (2 * Math.PI) / (Math.abs(rotationPeriod) * 3.0);

  // Reset handler
  useEffect(() => {
    if (orbitRef.current) {
      orbitRef.current.position.set(initialPosition.current[0], 0, 0);
      angleRef.current = 0;
    }
  }, [resetKey]); // Reset when resetKey changes

  useFrame(() => {
    if (!orbitRef.current || !planetRef.current || isPaused) return;

    // Handle planet rotation
    const rotationDirection = rotationPeriod < 0 ? -1 : 1;
    planetRef.current.rotation.y += baseRotationSpeed * rotationDirection;

    // Handle orbital motion
    const orbitRadius = position[0];
    angleRef.current += baseOrbitalSpeed * 0.016;

    orbitRef.current.position.x = Math.cos(angleRef.current) * orbitRadius;
    orbitRef.current.position.z = Math.sin(angleRef.current) * orbitRadius;
  });

  const scaleFactor = Math.max(0.3, Math.min(1.5, diameter / 12742 * 0.8));

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
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
      <Billboard follow={true}>
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
  );
}

function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { isPaused } = useSettings();

  useFrame(() => {
    if (sunRef.current && !isPaused) {
      sunRef.current.rotation.y += 0.005;
    }
  });

  return (
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
      />
    </mesh>
  );
}

export default function SolarSystem({ planets }: SolarSystemProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [resetKey, setResetKey] = useState(0);

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

  const resetAnimation = () => {
    setIsPaused(true);
    setResetKey(prev => prev + 1);
  };

  // Calculate scaling factor for distances
  const maxDistance = Math.max(...planets.map(p => Number(p.distance)));
  const distanceScale = (distance: bigint) => {
    const planetIndex = planets.findIndex(p => p.distance === distance);
    return (planetIndex + 1) * 7;
  };

  return (
    <SettingsContext.Provider value={{
      isPaused,
      setIsPaused,
      resetAnimation,
    }}>
      <Canvas camera={{ position: [0, 40, 60], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} />

        <Sun />

        {planets.map((planet, index) => (
          <Planet3D
            key={`${planet.id}-${resetKey}`}
            position={[distanceScale(planet.distance), 0, 0]}
            color={colors[index]}
            name={planet.name}
            diameter={planet.diameter}
            description={planet.description}
            orbitalPeriod={planet.orbitalPeriod}
            rotationPeriod={planet.rotationPeriod}
            resetKey={resetKey}
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
    </SettingsContext.Provider>
  );
}