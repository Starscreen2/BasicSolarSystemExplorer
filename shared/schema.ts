export interface InsertPlanet {
  name: string;
  description: string;
  diameter: number;
  distance: number;
  temperature: number;
  imageUrl: string;
  facts: string[];
  orbitalPeriod: number;
  rotationPeriod: number;
}

export interface Planet extends InsertPlanet {
  id: number;
}

export interface InsertQuiz {
  planetId: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz extends InsertQuiz {
  id: number;
}
