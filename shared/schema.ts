import { z } from "zod";

// Demo/POC schema - plain types, no database
export const contentSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  type: z.string(),
  date: z.string(),
  tags: z.array(z.string()).optional().default([]),
  imageUrl: z.string().optional(),
  isFeatured: z.boolean().optional(),
  labelTag: z.string().optional(),
  themeTag: z.string().optional(),
  forYou: z.boolean().optional(),
  handle: z.string().optional(),
});

export const insertContentSchema = contentSchema.omit({ id: true });

export type Content = z.infer<typeof contentSchema>;
export type InsertContent = z.infer<typeof insertContentSchema>;
