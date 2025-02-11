import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Planet } from "@shared/schema";
import { WithErrorBoundary } from "@/components/WithErrorBoundary";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Text, Html, Billboard } from "@react-three/drei";
import * as THREE from "three";

const ORBITAL_ZONES = [
  { radius: 7, label: "Inner Zone" },
  { radius: 14, label: "Middle Zone" },
  { radius: 21, label: "Outer Zone" },
  { radius: 28, label: "Far Zone" }
];

const PLANET_COLORS = {
  Mercury: "#A0522D",
  Venus: "#DEB887",
  Earth: "#4169E1",
  Mars: "#CD5C5C",
  Jupiter: "#DAA520",
  Saturn: "#F4A460",
  Neptune: "#4682B4",
  Pluto: "#808080"
};

interface PlacedPlanet extends Planet {
  orbitRadius: number;
  angle: number;
  speed: number;
}

function OrbitalRing({ radius, isHovered }: { radius: number; isHovered: boolean }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius, radius + 0.1, 64]} />
      <meshBasicMaterial color={isHovered ? "#6f8fff" : "#666666"} opacity={0.3} transparent side={THREE.DoubleSide} />
    </mesh>
  );
}

function Planet3D({ planet, color }: { planet: PlacedPlanet; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!meshRef.current) return;
    const angle = planet.angle + planet.speed * 0.01;
    meshRef.current.position.x = Math.cos(angle) * planet.orbitRadius;
    meshRef.current.position.z = Math.sin(angle) * planet.orbitRadius;
  }, [planet]);

  return (
    <group>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Billboard follow={true}>
        <Text position={[0, 1, 0]} fontSize={0.5} color="white">
          {planet.name}
        </Text>
      </Billboard>
    </group>
  );
}

export default function SolarSystemBuilder() {
  const [planets, setPlanets] = useState<PlacedPlanet[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [hoveredZone, setHoveredZone] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleZoneClick = (zoneIndex: number) => {
    if (!selectedPlanet) return;

    const zone = ORBITAL_ZONES[zoneIndex];
    const newPlanet: PlacedPlanet = {
      ...selectedPlanet,
      orbitRadius: zone.radius,
      angle: Math.random() * Math.PI * 2,
      speed: 1 / (zone.radius / 7)
    };

    setPlanets(prev => [...prev, newPlanet]);
    setSelectedPlanet(null);
  };

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        3D Solar System Designer
      </h1>

      <Card className="p-4 mb-8 bg-black/50">
        <WithErrorBoundary>
          <div className="flex gap-4 flex-wrap">
            <div className="relative w-[800px] h-[600px]">
              <Canvas camera={{ position: [0, 20, 30], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Stars radius={100} depth={50} count={5000} factor={4} />

                {/* Sun */}
                <mesh>
                  <sphereGeometry args={[1, 32, 32]} />
                  <meshStandardMaterial color="#FFD700" emissive="#FFD700" />
                </mesh>

                {/* Orbital Rings */}
                {ORBITAL_ZONES.map((zone, index) => (
                  <group key={zone.label} onClick={() => handleZoneClick(index)}>
                    <OrbitalRing 
                      radius={zone.radius} 
                      isHovered={hoveredZone === index} 
                    />
                  </group>
                ))}

                {/* Placed Planets */}
                {planets.map((planet, index) => (
                  <Planet3D
                    key={`${planet.name}-${index}`}
                    planet={planet}
                    color={PLANET_COLORS[planet.name as keyof typeof PLANET_COLORS]}
                  />
                ))}

                <OrbitControls />
              </Canvas>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Available Planets</h3>
              {Object.entries(PLANET_COLORS).map(([name]) => (
                <Button
                  key={name}
                  onClick={() => setSelectedPlanet({ name } as Planet)}
                  variant={selectedPlanet?.name === name ? "secondary" : "outline"}
                >
                  {name}
                </Button>
              ))}
              <Button 
                onClick={() => setIsAnimating(!isAnimating)}
                variant="default"
                className="mt-4"
              >
                {isAnimating ? "Stop Orbits" : "Start Orbits"}
              </Button>
              <Button 
                onClick={() => setPlanets([])} 
                variant="destructive"
                className="mt-2"
              >
                Reset
              </Button>
            </div>
          </div>
        </WithErrorBoundary>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 bg-black/50">
          <h2 className="text-xl font-semibold mb-4">How to Use</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Select a planet from the list on the right</li>
            <li>Click on an orbital zone to place the planet</li>
            <li>Use mouse to rotate and zoom the view</li>
            <li>Click "Start Orbits" to animate the system</li>
          </ul>
        </Card>

        <Card className="p-4 bg-black/50">
          <h2 className="text-xl font-semibold mb-4">Learning Notes</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Inner planets orbit faster than outer planets</li>
            <li>Each orbit zone represents different regions of space</li>
            <li>Try to recreate the real solar system arrangement!</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}