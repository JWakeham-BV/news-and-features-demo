import { z } from "zod";
import { content } from "./schema";

export const api = {
  content: {
    list: {
      method: "GET",
      path: "/api/content",
      input: z.object({
        query: z.string().optional(),
        category: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof content.$inferSelect>()),
      },
    },
  },
};
