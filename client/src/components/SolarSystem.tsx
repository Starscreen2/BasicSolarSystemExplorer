import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Text, Html, Billboard } from "@react-three/drei";
import { Planet } from "@shared/schema";
import { useRef, useState, useEffect, createContext, useContext } from "react";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";

interface SolarSystemProps {
  planets: Planet[];
}

const SettingsContext = createContext<{
  rotationSpeedMultiplier: number;
  orbitSpeedMultiplier: number;
  isSimulationPaused: boolean;
  toggleSimulationPause: () => void;
}>({
  rotationSpeedMultiplier: 1,
  orbitSpeedMultiplier: 1,
  isSimulationPaused: false,
  toggleSimulationPause: () => {},
});

function useSettings() {
  return useContext(SettingsContext);
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

function OrbitalRing({ 
  radius, 
  planet 
}: { 
  radius: number;
  planet: Planet;
}) {
  const [hovered, setHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ringRef = useRef<THREE.Mesh>(null);

  // Enhanced ring data for specific planets
  const ringInfo = {
    Saturn: {
      hasRings: true,
      composition: "Ice particles, rocky debris, and dust",
      width: "70,000 km",
      discovery: "Galileo Galilei (1610)",
      details: "Saturn's rings are the most prominent in the solar system, made primarily of water ice and rock"
    },
    Uranus: {
      hasRings: true,
      composition: "Dark particles, likely rock and dust",
      width: "2,000 km",
      discovery: "James L. Elliot, Edward W. Dunham, and Douglas J. Mink (1977)",
      details: "Uranus has 13 known rings, which are dark and narrow"
    },
    Neptune: {
      hasRings: true,
      composition: "Ice particles with organic compounds",
      width: "50,000 km",
      discovery: "Voyager 2 (1989)",
      details: "Neptune has five main rings, which are narrow and very dark"
    }
  };

  const handlePointerMove = (event: THREE.Event) => {
    event.stopPropagation();
    setMousePosition({
      x: (event as unknown as PointerEvent).clientX,
      y: (event as unknown as PointerEvent).clientY,
    });
  };

  // Determine if the planet has rings
  const planetRings = ringInfo[planet.name as keyof typeof ringInfo];

  return (
    <group>
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
        onPointerMove={handlePointerMove}
        ref={ringRef}
      >
        <ringGeometry args={[radius, radius + 0.4, 128]} />
        <meshBasicMaterial 
          color={hovered ? "#6f8fff" : "#ffffff"} 
          opacity={hovered ? 0.5 : 0.3} 
          transparent={true} 
          side={THREE.DoubleSide}
        />
      </mesh>
      {hovered && (
        <Html
          style={{
            transform: `translate(${mousePosition.x + 15}px, ${mousePosition.y}px)`,
            pointerEvents: 'none',
            zIndex: 1000
          }}
        >
          <div className="bg-black/80 text-white p-2 rounded-lg shadow-lg w-48">
            <h3 className="font-bold mb-1">{planet.name}</h3>
            <p className="text-sm">{planet.description}</p>
            <div className="mt-2 text-xs space-y-1">
              <div>Diameter: {planet.diameter.toLocaleString()} km</div>
              <div>Distance from Sun: {Number(planet.distance).toLocaleString()} km</div>
              <div>Orbital Period: {planet.orbitalPeriod} Earth days</div>
              <div>Rotation Period: {planet.rotationPeriod} Earth days</div>
            </div>

            {/* Ring Information Section */}
            {planetRings ? (
              <div className="mt-2 pt-2 border-t border-white/20">
                <div className="font-semibold text-blue-300">Ring System</div>
                <div className="text-xs space-y-1">
                  <div>Composition: {planetRings.composition}</div>
                  <div>Width: {planetRings.width}</div>
                  <div>Discovery: {planetRings.discovery}</div>
                  <div className="mt-1 italic text-blue-200">{planetRings.details}</div>
                </div>
              </div>
            ) : (
              <div className="mt-2 pt-2 border-t border-white/20 text-xs italic">
                This planet does not have a prominent ring system.
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
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
  const { orbitSpeedMultiplier, rotationSpeedMultiplier, isSimulationPaused } = useSettings();

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
    if (planetRef.current && orbitRef.current && !isSimulationPaused) {
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

function CameraAnimation() {
  const { camera } = useThree();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) {
      camera.position.set(0, 100, 160);
      setStarted(true);
    }
  }, [camera, started]);

  useFrame(() => {
    if (started && camera.position.y > 40) {
      const dy = (40 - camera.position.y) * 0.02;
      const dz = (60 - camera.position.z) * 0.02;
      camera.position.y += dy;
      camera.position.z += dz;
    }
  });

  return null;
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

  const [isSimulationPaused, setIsSimulationPaused] = useState(false);

  const toggleSimulationPause = () => {
    setIsSimulationPaused(!isSimulationPaused);
  };

  // Calculate scaling factor for distances
  const maxDistance = Math.max(...planets.map(p => Number(p.distance)));
  const distanceScale = (distance: bigint) => {
    const planetIndex = planets.findIndex(p => p.distance === distance);
    return (planetIndex + 1) * 7;
  };

  return (
    <Canvas camera={{ position: [0, 40, 60], fov: 60 }}>
        <CameraAnimation />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} />

        <Sun />

        {planets.map((planet) => (
          <OrbitalRing 
            key={`ring-${planet.id}`} 
            radius={distanceScale(planet.distance)}
            planet={planet}
          />
        ))}

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
    </SettingsContext.Provider>
  );
}