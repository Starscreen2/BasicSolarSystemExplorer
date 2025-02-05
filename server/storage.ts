import { users, type User, type InsertUser } from "@shared/schema";
import { planets, type Planet, type InsertPlanet } from "@shared/schema";
import { planetData } from "@shared/planetData";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllPlanets(): Promise<Planet[]>;
  getPlanet(id: number): Promise<Planet | undefined>;
  createPlanet(planet: InsertPlanet): Promise<Planet>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private planets: Map<number, Planet>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.planets = new Map();
    this.currentId = 1;

    // Initialize with sample data
    planetData.forEach(planet => {
      this.createPlanet(planet).catch(console.error);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllPlanets(): Promise<Planet[]> {
    return Array.from(this.planets.values());
  }

  async getPlanet(id: number): Promise<Planet | undefined> {
    return this.planets.get(id);
  }

  async createPlanet(insertPlanet: InsertPlanet): Promise<Planet> {
    const id = this.currentId++;
    const planet: Planet = { ...insertPlanet, id };
    this.planets.set(id, planet);
    return planet;
  }
}

export const storage = new MemStorage();