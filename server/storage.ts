import { type Planet, type InsertPlanet, type Quiz, type InsertQuiz } from "@shared/schema";
import { planetData } from "@shared/planetData";
import { quizData } from "@shared/quizData";

export interface IStorage {
  getAllPlanets(): Promise<Planet[]>;
  getPlanet(id: number): Promise<Planet | undefined>;
  createPlanet(planet: InsertPlanet): Promise<Planet>;
  getAllQuizzes(): Promise<Quiz[]>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
}

const seededPlanets: Planet[] = planetData.map((planet, index) => ({
  id: index + 1,
  ...planet,
}));

const seededQuizzes: Quiz[] = quizData.map((quiz, index) => ({
  id: index + 1,
  ...quiz,
}));

export class MemoryStorage implements IStorage {
  private planets: Planet[] = [...seededPlanets];
  private quizzes: Quiz[] = [...seededQuizzes];

  async getAllPlanets(): Promise<Planet[]> {
    return [...this.planets].sort((a, b) => a.distance - b.distance);
  }

  async getPlanet(id: number): Promise<Planet | undefined> {
    return this.planets.find((planet) => planet.id === id);
  }

  async createPlanet(insertPlanet: InsertPlanet): Promise<Planet> {
    const planet: Planet = {
      id: this.planets.length + 1,
      ...insertPlanet,
    };
    this.planets.push(planet);
    return planet;
  }

  async getAllQuizzes(): Promise<Quiz[]> {
    return [...this.quizzes];
  }

  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const quiz: Quiz = {
      id: this.quizzes.length + 1,
      ...insertQuiz,
    };
    this.quizzes.push(quiz);
    return quiz;
  }
}

export const storage = new MemoryStorage();
