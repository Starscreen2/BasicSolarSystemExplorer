import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import { useState, useRef } from "react";
import * as THREE from "three";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Planet } from "@shared/schema";

interface CustomPlanet extends Planet {
  position: [number, number, number];
  velocity: [number, number, number];
  mass: number;
}

// Constants for physics simulation
const G = 6.67430e-11; // Gravitational constant
const TIME_STEP = 1 / 60; // 60 FPS
const SCALE_FACTOR = 1e9; // Scale factor for visualization

function DraggablePlanet({ 
  planet,
  onDragEnd,
}: { 
  planet: CustomPlanet;
  onDragEnd: (position: [number, number, number]) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState<[number, number, number]>(planet.position);
  const dragPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));
  const intersection = useRef(new THREE.Vector3());

  const handlePointerDown = (e: THREE.Event) => {
    e.stopPropagation();
    setIsDragging(true);
    if (meshRef.current) {
      const worldPosition = new THREE.Vector3();
      meshRef.current.getWorldPosition(worldPosition);
      setDragPosition([worldPosition.x, worldPosition.y, worldPosition.z]);
    }
  };

  const handlePointerMove = (e: THREE.Event) => {
    if (isDragging && meshRef.current) {
      e.stopPropagation();
      const event = e as unknown as PointerEvent;
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      raycaster.setFromCamera(mouse, (e as any).camera);
      raycaster.ray.intersectPlane(dragPlane.current, intersection.current);

      // Limit the drag distance to prevent planets from going too far
      const maxDistance = 50;
      const distance = intersection.current.length();
      if (distance > maxDistance) {
        intersection.current.normalize().multiplyScalar(maxDistance);
      }

      meshRef.current.position.set(
        intersection.current.x,
        0,
        intersection.current.z
      );
      setDragPosition([
        intersection.current.x,
        0,
        intersection.current.z
      ]);
    }
  };

  const handlePointerUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd(dragPosition);
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={planet.position}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <sphereGeometry args={[planet.diameter / 100000, 32, 32]} />
      <meshStandardMaterial 
        color={isDragging ? "#6f8fff" : "#4444ff"}
        metalness={0.2}
        roughness={0.8}
      />
      <Html>
        <div className="bg-black/80 text-white px-2 py-1 rounded text-sm">
          {planet.name}
        </div>
      </Html>
    </mesh>
  );
}

function Sun() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color="#ffdd00"
        emissive="#ffdd00"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export default function SolarSystemBuilder() {
  const [planets, setPlanets] = useState<CustomPlanet[]>([]);
  const [simulating, setSimulating] = useState(false);
  const [timeScale, setTimeScale] = useState(1);

  const addPlanet = () => {
    const newPlanet: CustomPlanet = {
      id: planets.length + 1,
      name: `Planet ${planets.length + 1}`,
      description: "A custom planet",
      diameter: 12742, // Earth-like diameter
      distance: BigInt(0),
      temperature: 15,
      imageUrl: "",
      facts: ["A custom planet"],
      position: [10, 0, 0],
      velocity: [0, 0, 0.1],
      mass: 5.972e24, // Earth-like mass
      orbitalPeriod: 365,
      rotationPeriod: 1,
    };
    setPlanets([...planets, newPlanet]);
  };

  const handleDragEnd = (index: number, newPosition: [number, number, number]) => {
    const updatedPlanets = [...planets];
    updatedPlanets[index] = {
      ...updatedPlanets[index],
      position: newPosition,
    };
    setPlanets(updatedPlanets);
  };

  const toggleSimulation = () => {
    setSimulating(!simulating);
  };

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        Solar System Builder
      </h1>

      <Card className="p-4 mb-8 bg-black/50">
        <div className="flex gap-4 mb-4">
          <Button onClick={addPlanet}>Add Planet</Button>
          <Button onClick={toggleSimulation}>
            {simulating ? "Stop Simulation" : "Start Simulation"}
          </Button>
          <div className="flex items-center gap-2 ml-4">
            <span className="text-sm">Time Scale:</span>
            <Slider
              value={[timeScale]}
              onValueChange={([value]) => setTimeScale(value)}
              min={0.1}
              max={10}
              step={0.1}
              className="w-32"
            />
            <span className="text-sm">{timeScale}x</span>
          </div>
        </div>

        <div className="h-[600px]">
          <Canvas camera={{ position: [0, 20, 20], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} />

            <Sun />

            {planets.map((planet, index) => (
              <DraggablePlanet
                key={planet.id}
                planet={planet}
                onDragEnd={(position) => handleDragEnd(index, position)}
              />
            ))}

            <OrbitControls 
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              maxDistance={50}
              minDistance={10}
            />
          </Canvas>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 bg-black/50">
          <h2 className="text-xl font-semibold mb-4">How to Play</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Click "Add Planet" to create a new planet</li>
            <li>Drag planets to position them in orbit</li>
            <li>Click "Start Simulation" to see orbital motion</li>
            <li>Adjust time scale to speed up or slow down the simulation</li>
          </ul>
        </Card>

        <Card className="p-4 bg-black/50">
          <h2 className="text-xl font-semibold mb-4">Physics Notes</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Planets interact through gravitational forces</li>
            <li>The Sun's mass affects orbital stability</li>
            <li>Initial velocity determines orbital path</li>
            <li>Try different arrangements to create stable systems</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}