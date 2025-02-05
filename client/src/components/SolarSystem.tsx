import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import { Planet } from "@shared/schema";

interface SolarSystemProps {
  planets: Planet[];
}

function Planet3D({ position, color, name, diameter }: { 
  position: [number, number, number]; 
  color: string;
  name: string;
  diameter: number;
}) {
  // Scale factor to make planets visible while maintaining relative sizes
  const scaleFactor = diameter / 12742; // Earth's diameter as reference
  const size = Math.max(0.5, scaleFactor); // Minimum size of 0.5 for visibility

  return (
    <group position={position}>
      <mesh>
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

      {planets.map((planet, index) => (
        <Planet3D
          key={planet.id}
          position={[planet.distance * distanceScale, 0, 0]}
          color={colors[index]}
          name={planet.name}
          diameter={planet.diameter}
        />
      ))}

      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
    </Canvas>
  );
}