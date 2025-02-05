import { users, type User, type InsertUser } from "@shared/schema";
import { planets, type Planet, type InsertPlanet } from "@shared/schema";
import { planetData } from "@shared/planetData";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllPlanets(): Promise<Planet[]>;
  getPlanet(id: number): Promise<Planet | undefined>;
  createPlanet(planet: InsertPlanet): Promise<Planet>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // Initialize the database with sample data if it's empty
    this.initializeData().catch(console.error);
  }

  private async initializeData() {
    const existingPlanets = await this.getAllPlanets();
    if (existingPlanets.length === 0) {
      for (const planet of planetData) {
        await this.createPlanet(planet);
      }
    }
  }

  async getAllPlanets(): Promise<Planet[]> {
    return await db.select().from(planets).orderBy(planets.distance);
  }

  async getPlanet(id: number): Promise<Planet | undefined> {
    const [planet] = await db.select().from(planets).where(eq(planets.id, id));
    return planet;
  }

  async createPlanet(insertPlanet: InsertPlanet): Promise<Planet> {
    const [planet] = await db.insert(planets).values(insertPlanet).returning();
    return planet;
  }

  async getUser(id: number): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  async getUserByUsername(username: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  async createUser(user: InsertUser): Promise<User> {
    throw new Error("Method not implemented.");
  }
}

export const storage = new DatabaseStorage();