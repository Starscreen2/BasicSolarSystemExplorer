import { planets, type Planet, type InsertPlanet } from "@shared/schema";
import { quizzes, type Quiz, type InsertQuiz } from "@shared/schema";
import { planetData } from "@shared/planetData";
import { quizData } from "@shared/quizData";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { log } from "./vite";

export interface IStorage {
  getAllPlanets(): Promise<Planet[]>;
  getPlanet(id: number): Promise<Planet | undefined>;
  createPlanet(planet: InsertPlanet): Promise<Planet>;
  getAllQuizzes(): Promise<Quiz[]>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // Initialize the database with sample data if it's empty
    this.initializeData().catch(console.error);
  }

  private async initializeData() {
    try {
      const allPlanets = await db.select().from(planets).orderBy(planets.distance);
      log(`Found ${allPlanets.length} existing planets in database`, "storage");

      if (allPlanets.length === 0) {
        log(`Initializing planets data with ${planetData.length} planets`, "storage");
        for (const planet of planetData) {
          await this.createPlanet(planet);
        }
        log("Finished initializing planets data", "storage");
      }

      const existingQuizzes = await this.getAllQuizzes();
      if (existingQuizzes.length === 0) {
        for (const quiz of quizData) {
          await this.createQuiz(quiz);
        }
      }
    } catch (error) {
      log(`Error during database initialization: ${error}`, "error");
      throw error;
    }
  }

  async getAllPlanets(): Promise<Planet[]> {
    const allPlanets = await db.select().from(planets).orderBy(planets.distance);
    log(`Retrieved ${allPlanets.length} planets from database`, "storage");
    return allPlanets;
  }

  async getPlanet(id: number): Promise<Planet | undefined> {
    const [planet] = await db.select().from(planets).where(eq(planets.id, id));
    return planet;
  }

  async createPlanet(insertPlanet: InsertPlanet): Promise<Planet> {
    const [planet] = await db.insert(planets).values(insertPlanet).returning();
    log(`Created planet: ${planet.name}`, "storage");
    return planet;
  }

  async getAllQuizzes(): Promise<Quiz[]> {
    return await db.select().from(quizzes);
  }

  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const [quiz] = await db.insert(quizzes).values(insertQuiz).returning();
    return quiz;
  }
}

export const storage = new DatabaseStorage();