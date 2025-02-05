import type { InsertPlanet } from "./schema";

export const planetData: InsertPlanet[] = [
  {
    name: "Mercury",
    description: "The smallest and innermost planet in the Solar System, Mercury is a rocky world with extreme temperatures.",
    diameter: 4879,
    distance: 57900000,
    temperature: 167,
    imageUrl: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5",
    facts: [
      "Mercury has no moons",
      "It completes an orbit around the Sun every 88 Earth days",
      "Despite being closest to the Sun, Venus is actually hotter"
    ]
  },
  {
    name: "Venus",
    description: "Often called Earth's sister planet due to their similar size, Venus has a toxic atmosphere and extreme surface pressure.",
    diameter: 12104,
    distance: 108200000,
    temperature: 464,
    imageUrl: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6",
    facts: [
      "Venus rotates backwards compared to most planets",
      "It has the longest rotation period of any planet",
      "Its atmospheric pressure is 90 times that of Earth"
    ]
  },
  {
    name: "Earth",
    description: "Our home planet is the only known world to support life. Its distance from the Sun and physical properties make it perfect for living organisms.",
    diameter: 12742,
    distance: 149600000,
    temperature: 15,
    imageUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4",
    facts: [
      "Earth is the only planet known to have liquid water on its surface",
      "The atmosphere is composed mainly of nitrogen and oxygen",
      "It has one natural satellite - the Moon"
    ]
  },
  {
    name: "Mars",
    description: "Often called the Red Planet, Mars has long captured human imagination. It's a cold desert world with signs of ancient water flows.",
    diameter: 6779,
    distance: 227900000,
    temperature: -63,
    imageUrl: "https://images.unsplash.com/photo-1614728263952-84ea256f9679",
    facts: [
      "Mars has two small moons: Phobos and Deimos",
      "It has the largest volcano in the solar system - Olympus Mons",
      "The red color comes from iron oxide (rust) in its soil"
    ]
  }
];
