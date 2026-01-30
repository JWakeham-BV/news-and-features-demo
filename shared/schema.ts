import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const content = pgTable("content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // 'news', 'operation', 'equipment'
  type: text("type").notNull(), // 'article', 'video', 'audio'
  date: text("date").notNull(),
  tags: text("tags").array(),
  imageUrl: text("image_url"),
  isFeatured: boolean("is_featured").default(false),
});

export const insertContentSchema = createInsertSchema(content).omit({ id: true });

export type Content = typeof content.$inferSelect;
export type InsertContent = z.infer<typeof insertContentSchema>;
