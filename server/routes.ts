import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  app.get("/api/planets", async (_req, res) => {
    const planets = await storage.getAllPlanets();
    res.json(planets);
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