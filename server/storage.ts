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
      // Drop existing planets to ensure clean state
      await db.delete(planets);
      log(`Cleared existing planets data`, "storage");

      log(`Initializing planets data with ${planetData.length} planets`, "storage");

      // Initialize all planets
      for (const planet of planetData) {
        try {
          const created = await this.createPlanet(planet);
          log(`Created planet: ${created.name}`, "storage");
        } catch (error) {
          log(`Error creating planet ${planet.name}: ${error}`, "error");
          // Retry with explicit type conversion for distance
          try {
            const retryPlanet = {
              ...planet,
              distance: Number(planet.distance)
            };
            const created = await this.createPlanet(retryPlanet);
            log(`Successfully created planet on retry: ${created.name}`, "storage");
          } catch (retryError) {
            log(`Failed to create planet ${planet.name} even after retry: ${retryError}`, "error");
          }
        }
      }

      log("Finished initializing planets data", "storage");

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