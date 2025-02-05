import { pgTable, text, serial, integer, boolean, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const planets = pgTable("planets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  diameter: integer("diameter").notNull(),
  distance: integer("distance").notNull(),
  temperature: integer("temperature").notNull(),
  imageUrl: text("image_url").notNull(),
  facts: text("facts").array().notNull(),
}, (table) => ({
  nameIdx: index("name_idx").on(table.name),
}));

export const insertPlanetSchema = createInsertSchema(planets).pick({
  name: true,
  description: true,
  diameter: true,
  distance: true,
  temperature: true,
  imageUrl: true,
  facts: true,
});

export type InsertPlanet = z.infer<typeof insertPlanetSchema>;
export type Planet = typeof planets.$inferSelect;