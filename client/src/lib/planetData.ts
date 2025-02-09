import type { InsertPlanet } from "@shared/schema";

export const planetData: InsertPlanet[] = [
  {
    name: "Mercury",
    description: "The smallest and innermost planet in the Solar System, Mercury is a rocky world with extreme temperatures.",
    diameter: 4879,
    distance: BigInt(57900000),
    temperature: 167,
    imageUrl: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5",
    facts: [
      "Mercury has no moons",
      "It completes an orbit around the Sun every 88 Earth days",
      "Despite being closest to the Sun, Venus is actually hotter"
    ],
    orbitalPeriod: 88,
    rotationPeriod: 58.6
  },
  {
    name: "Venus",
    description: "Often called Earth's sister planet due to their similar size, Venus has a toxic atmosphere and extreme surface pressure.",
    diameter: 12104,
    distance: BigInt(108200000),
    temperature: 464,
    imageUrl: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6",
    facts: [
      "Venus rotates backwards compared to most planets",
      "It has the longest rotation period of any planet",
      "Its atmospheric pressure is 90 times that of Earth"
    ],
    orbitalPeriod: 224.7,
    rotationPeriod: -243
  }
  // Add more planets...
];