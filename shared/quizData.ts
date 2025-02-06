import type { InsertQuiz } from "./schema";

export const quizData: InsertQuiz[] = [
  {
    planetId: 1, // Mercury
    question: "What makes Mercury's temperature so extreme?",
    options: [
      "Its proximity to the Sun and lack of atmosphere",
      "Its rapid rotation",
      "Its magnetic field",
      "Its iron core"
    ],
    correctAnswer: 0,
    explanation: "Mercury experiences extreme temperatures primarily because it is the closest planet to the Sun and has virtually no atmosphere to regulate its temperature."
  },
  {
    planetId: 2, // Venus
    question: "Why is Venus often called Earth's sister planet?",
    options: [
      "They have similar moons",
      "They have similar atmospheres",
      "They have similar size and mass",
      "They have similar rotation periods"
    ],
    correctAnswer: 2,
    explanation: "Venus is called Earth's sister planet because it has similar size and mass to Earth, although their environments are vastly different."
  },
  {
    planetId: 3, // Earth
    question: "What makes Earth unique in our solar system?",
    options: [
      "It's the largest planet",
      "It's the only planet with a moon",
      "It's the only planet with liquid water on its surface",
      "It's the closest planet to the Sun"
    ],
    correctAnswer: 2,
    explanation: "Earth is unique because it's the only planet known to have liquid water on its surface, which is essential for life as we know it."
  },
  {
    planetId: 4, // Mars
    question: "What gives Mars its distinctive red color?",
    options: [
      "Volcanic activity",
      "Iron oxide (rust) in its soil",
      "Reflection from its moons",
      "Its atmospheric composition"
    ],
    correctAnswer: 1,
    explanation: "Mars gets its reddish color from iron oxide (rust) present in its soil and rocks, earning it the nickname 'The Red Planet'."
  }
];
