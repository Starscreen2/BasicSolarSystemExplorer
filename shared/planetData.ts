import type { InsertPlanet } from "./schema";

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
  },
  {
    name: "Earth",
    description: "Our home planet is the only known world to support life. Its distance from the Sun and physical properties make it perfect for living organisms.",
    diameter: 12742,
    distance: BigInt(149600000),
    temperature: 15,
    imageUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4",
    facts: [
      "Earth is the only planet known to have liquid water on its surface",
      "The atmosphere is composed mainly of nitrogen and oxygen",
      "It has one natural satellite - the Moon"
    ],
    orbitalPeriod: 365.2,
    rotationPeriod: 1
  },
  {
    name: "Mars",
    description: "Often called the Red Planet, Mars has long captured human imagination. It's a cold desert world with signs of ancient water flows.",
    diameter: 6779,
    distance: BigInt(227900000),
    temperature: -63,
    imageUrl: "https://images.unsplash.com/photo-1614728263952-84ea256f9679",
    facts: [
      "Mars has two small moons: Phobos and Deimos",
      "It has the largest volcano in the solar system - Olympus Mons",
      "The red color comes from iron oxide (rust) in its soil"
    ],
    orbitalPeriod: 687,
    rotationPeriod: 1.03
  },
  {
    name: "Jupiter",
    description: "The largest planet in our solar system, Jupiter is a gas giant with a complex system of moons and a distinctive Great Red Spot.",
    diameter: 139820,
    distance: BigInt(778500000),
    temperature: -110,
    imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421789f10",
    facts: [
      "Jupiter has the Great Red Spot, a storm that has lasted for hundreds of years",
      "It has at least 79 moons, including the four large Galilean moons",
      "Its mass is more than twice that of all other planets combined"
    ],
    orbitalPeriod: 4333,
    rotationPeriod: 0.41
  },
  {
    name: "Saturn",
    description: "Known for its spectacular ring system, Saturn is a gas giant planet with a complex atmosphere and numerous moons.",
    diameter: 116460,
    distance: BigInt(1434000000),
    temperature: -140,
    imageUrl: "https://images.unsplash.com/photo-1614314107768-6018061c7932",
    facts: [
      "Saturn's rings are made mostly of ice and rock particles",
      "It has 82 confirmed moons, including Titan, which has a thick atmosphere",
      "Saturn is the least dense planet in the Solar System"
    ],
    orbitalPeriod: 10759,
    rotationPeriod: 0.45
  },
  {
    name: "Uranus",
    description: "Uranus is an ice giant planet with a unique sideways rotation and a system of thin, dark rings.",
    diameter: 50724,
    distance: BigInt(2871000000),
    temperature: -195,
    imageUrl: "https://images.unsplash.com/photo-1614313914396-5b56fb6a2827",
    facts: [
      "Uranus rotates on its side, likely due to a massive collision",
      "It has 27 known moons, named after literary characters",
      "Its atmosphere contains frozen methane, giving it a blue-green color"
    ],
    orbitalPeriod: 30687,
    rotationPeriod: -0.72
  },
  {
    name: "Neptune",
    description: "The windiest planet in our solar system, Neptune is a distant ice giant with supersonic storms and a dynamic atmosphere.",
    diameter: 49244,
    distance: BigInt(4495000000),
    temperature: -200,
    imageUrl: "https://images.unsplash.com/photo-1614313914157-4211a33c53d2",
    facts: [
      "Neptune has the strongest winds in the Solar System, reaching 2,100 km/h",
      "It has 14 known moons, including the geologically active Triton",
      "It was the first planet located through mathematical calculations"
    ],
    orbitalPeriod: 60190,
    rotationPeriod: 0.67
  },
  {
    name: "Pluto",
    description: "Although classified as a dwarf planet since 2006, Pluto remains one of the most fascinating objects in our solar system.",
    diameter: 2377,
    distance: BigInt(5906380000),
    temperature: -230,
    imageUrl: "https://images.unsplash.com/photo-1614313915167-d9d971c4d9df",
    facts: [
      "Pluto was reclassified as a dwarf planet in 2006",
      "It has five known moons, with Charon being the largest",
      "Its orbit is highly elliptical and tilted"
    ],
    orbitalPeriod: 90560,
    rotationPeriod: -6.39
  }
];