import type { InsertPlanet } from "./schema";

export const planetData: InsertPlanet[] = [
  {
    name: "Mercury",
    description: "Mercury is the smallest planet and the closest one to the Sun. It's a rocky world covered in craters, kind of like our Moon. Because it has almost no air, daytime is extremely hot, but at night, it gets super cold!",
    diameter: 4879,
    distance: BigInt(57900000),
    temperature: 167,
    imageUrl: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5",
    facts: [
      "Mercury is the fastest planet, zooming around the Sun in just 88 days!",
      "A day on Mercury (one full spin) takes about 59 Earth days.",
      "It has no atmosphere to hold heat, so it can be scorching hot in the day and freezing cold at night.",
      "Mercury has no moons or rings.",
      "If you stood on Mercury, the Sun would look three times bigger than it does from Earth!"
    ],
    orbitalPeriod: 88,
    rotationPeriod: 58.6
  },
  {
    name: "Venus",
    description: "Venus is Earth's twin in size, but it's a very different place. It is the hottest planet because its thick, poisonous clouds trap heat like a giant oven. It also spins in the opposite direction of most planets!",
    diameter: 12104,
    distance: BigInt(108200000),
    temperature: 464,
    imageUrl: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6",
    facts: [
      "Venus is hotter than Mercury, even though it's farther from the Sun!",
      "Its clouds are made of sulfuric acid, which is extremely dangerous.",
      "A day on Venus lasts longer than a whole year on Venus!",
      "Venus spins backward, meaning the Sun would rise in the west and set in the east.",
      "There are more volcanoes on Venus than on any other planet."
    ],
    orbitalPeriod: 224.7,
    rotationPeriod: 243
  },
  {
    name: "Earth",
    description: "Earth is our home and the only planet we know that has life! It has air to breathe, water to drink, and land to live on. Earth is just the right distance from the Sun to keep things warm but not too hot.",
    diameter: 12742,
    distance: BigInt(149600000),
    temperature: 15,
    imageUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4",
    facts: [
      "About 70% of Earth's surface is covered in water.",
      "The Earth's core is as hot as the surface of the Sun!",
      "It takes Earth 24 hours to spin once (a day) and 365.25 days to orbit the Sun (a year).",
      "The Moon is slowly drifting away from Earth by about 3.8 cm per year.",
      "Earth’s atmosphere protects us from harmful space rocks and radiation."
    ],
    orbitalPeriod: 365.2,
    rotationPeriod: 1
  },
  {
    name: "Mars",
    description: "Mars is called the Red Planet because of its rusty-colored soil. It’s a cold desert world, and scientists think it may have had rivers and lakes long ago!",
    diameter: 6779,
    distance: BigInt(227900000),
    temperature: -63,
    imageUrl: "https://images.unsplash.com/photo-1614728263952-84ea256f9679",
    facts: [
      "Mars has two tiny moons, Phobos and Deimos.",
      "It has the tallest volcano in the Solar System, Olympus Mons!",
      "A day on Mars is just a little longer than a day on Earth—about 24.6 hours.",
      "Mars has giant dust storms that can cover the entire planet!",
      "Scientists think Mars might have had water billions of years ago."
    ],
    orbitalPeriod: 687,
    rotationPeriod: 1.03
  },
  {
    name: "Jupiter",
    description: "Jupiter is the biggest planet in the Solar System! It's a giant ball of gas with a huge storm called the Great Red Spot, which has been raging for hundreds of years.",
    diameter: 139820,
    distance: BigInt(778500000),
    temperature: -110,
    imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421789f10",
    facts: [
      "Jupiter is so big that more than 1,300 Earths could fit inside it!",
      "It has at least 95 moons, including Ganymede, the biggest moon in the Solar System.",
      "Its Great Red Spot is a storm bigger than Earth!",
      "Jupiter spins super fast, completing one spin in just 10 hours.",
      "It has faint rings made of dust."
    ],
    orbitalPeriod: 4333,
    rotationPeriod: 0.41
  },
  {
    name: "Saturn",
    description: "Saturn is famous for its beautiful rings, which are made of ice and rock. It's a giant planet made mostly of gas, and it's the least dense planet in the Solar System.",
    diameter: 116460,
    distance: BigInt(1434000000),
    temperature: -140,
    imageUrl: "https://images.unsplash.com/photo-1614314107768-6018061c7932",
    facts: [
      "Saturn’s rings are over 280,000 km wide but only 10 meters thick!",
      "It has 146 known moons, including Titan, which has rivers and lakes of liquid methane.",
      "Saturn is so light it could float in water (if you had a big enough bathtub!).",
      "Saturn takes 29.5 Earth years to orbit the Sun!",
      "It is mostly made of hydrogen and helium, like the Sun."
    ],
    orbitalPeriod: 10759,
    rotationPeriod: 0.45
  },
  {
    name: "Neptune",
    description: "Neptune is the farthest planet from the Sun. It has powerful winds and storms that move faster than the speed of sound!",
    diameter: 49244,
    distance: BigInt(4495000000),
    temperature: -200,
    imageUrl: "https://images.unsplash.com/photo-1614313914157-4211a33c53d2",
    facts: [
      "Neptune has winds that blow up to 2,400 km/h!",
      "It has 14 known moons, the biggest one being Triton.",
      "Neptune is named after the Roman god of the sea because of its blue color.",
      "It takes Neptune 165 Earth years to orbit the Sun!",
      "Neptune was the first planet discovered using math before being seen!"
    ],
    orbitalPeriod: 60190,
    rotationPeriod: 0.67
  },
  {
    name: "Pluto",
    description: "Pluto is a dwarf planet far away from the Sun. It’s smaller than Earth’s Moon and has a heart-shaped glacier on its surface!",
    diameter: 2377,
    distance: BigInt(5906380000),
    temperature: -230,
    imageUrl: "https://images.unsplash.com/photo-1614313915167-d9d971c4d9df",
    facts: [
      "Pluto used to be the ninth planet until it was reclassified as a dwarf planet in 2006.",
      "It has five moons, and its biggest one, Charon, is almost as big as Pluto itself!",
      "Pluto’s orbit is different from other planets; it even crosses Neptune’s orbit sometimes!",
      "A year on Pluto is 248 Earth years long!",
      "It has mountains made of frozen water and plains of frozen nitrogen!"
    ],
    orbitalPeriod: 90560,
    rotationPeriod: 6.39
  }
];
