import { pgTable, text, serial, integer, boolean, index, real, bigint } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const planets = pgTable("planets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  diameter: integer("diameter").notNull(),
  distance: bigint("distance", { mode: "number" }).notNull(),
  temperature: integer("temperature").notNull(),
  imageUrl: text("image_url").notNull(),
  facts: text("facts").array().notNull(),
  orbitalPeriod: real("orbital_period").notNull(),
  rotationPeriod: real("rotation_period").notNull(),
}, (table) => ({
  nameIdx: index("name_idx").on(table.name),
}));

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  planetId: integer("planet_id").notNull(),
  question: text("question").notNull(),
  options: text("options").array().notNull(),
  correctAnswer: integer("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
}, (table) => ({
  planetIdx: index("planet_id_idx").on(table.planetId),
}));

export const insertPlanetSchema = createInsertSchema(planets).pick({
  name: true,
  description: true,
  diameter: true,
  distance: true,
  temperature: true,
  imageUrl: true,
  facts: true,
  orbitalPeriod: true,
  rotationPeriod: true,
});

export const insertQuizSchema = createInsertSchema(quizzes).pick({
  planetId: true,
  question: true,
  options: true,
  correctAnswer: true,
  explanation: true,
});

export type InsertPlanet = z.infer<typeof insertPlanetSchema>;
export type Planet = typeof planets.$inferSelect;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type Quiz = typeof quizzes.$inferSelect;