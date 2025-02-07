import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { log } from "./vite";

export function registerRoutes(app: Express): Server {
  app.get("/api/planets", async (_req, res) => {
    try {
      const planets = await storage.getAllPlanets();
      log(`Fetched ${planets.length} planets from database`, "express");
      res.json(planets);
    } catch (error) {
      log(`Error fetching planets: ${error}`, "error");
      res.status(500).json({ message: "Error fetching planets" });
    }
  });

  app.get("/api/planets/:id", async (req, res) => {
    const planet = await storage.getPlanet(parseInt(req.params.id));
    if (!planet) {
      res.status(404).json({ message: "Planet not found" });
      return;
    }
    res.json(planet);
  });

  app.get("/api/quizzes", async (_req, res) => {
    const quizzes = await storage.getAllQuizzes();
    res.json(quizzes);
  });

  const httpServer = createServer(app);
  return httpServer;
}