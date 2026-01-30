import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.content.list.path, async (req, res) => {
    const query = req.query.query as string | undefined;
    if (query) {
      const results = await storage.searchContent(query);
      res.json(results);
    } else {
      const all = await storage.getAllContent();
      res.json(all);
    }
  });

  // Seed data
  const existing = await storage.getAllContent();
  if (existing.length === 0) {
    const seedData = [
      {
        title: "RAF's Gladiator support contract with Boeing Defence UK extended for two years",
        description: "Bridging contract for RAF's synthetic training system will maintain vital multi-domain training capability until 2026.",
        category: "news",
        type: "article",
        date: "29 October 2025",
        tags: ["RAF", "Boeing", "Training"],
        isFeatured: true,
      },
      {
        title: "Flying into the danger zone | Top Guns: Inside the RAF | Channel 4",
        description: "The Joint Aviation Command (JAC) has officially welcomed the Jupiter HC2 into service.",
        category: "operations",
        type: "video",
        date: "19 January 2026",
        tags: ["JAC", "Jupiter HC2"],
      },
      {
        title: "Remembrance Commemorations From Across the Nation",
        description: "The Joint Aviation Command (JAC) has officially welcomed the Jupiter HC2 into service.",
        category: "operations",
        type: "audio",
        date: "12 November 2025",
        tags: ["Remembrance", "JAC"],
      },
      {
        title: "RAF Typhoon fleet strengthened in £205 million boost for British jobs",
        description: "Investment in Typhoon fleet ensures operational readiness and supports UK industry.",
        category: "equipment",
        type: "article",
        date: "19 January 2026",
        tags: ["Aircraft", "Typhoon"],
      },
      {
        title: "Legacy to Lightning: Air Chief Marshal Harv Smyth on 5th-Gen Tactics",
        description: "Discussing the evolution of air combat and integration of F-35B Lightning.",
        category: "equipment",
        type: "article",
        date: "03 November 2025",
        tags: ["Aircraft", "Senior Leadership"],
      },
      {
        title: "RAF and French Air & Space Force Strengthen Ties",
        description: "Board-to-Board Meeting in Lyon strengthens strategic partnership.",
        category: "news",
        type: "article",
        date: "10 December 2025",
        tags: ["Senior Leadership", "International"],
      },
      {
        title: "National Engineering Day 2024",
        description: "Celebrating role models from RAF Cosford talking about their RAF Careers.",
        category: "news",
        type: "article",
        date: "13 November 2024",
        tags: ["Cyberspace", "Engineering"],
      },
      {
        title: "First Jupiter HC2 Takes Flight in the UK",
        description: "The Joint Aviation Command (JAC) has officially welcomed the Jupiter HC2 into service.",
        category: "equipment",
        type: "article",
        date: "17 December 2025",
        tags: ["Aircraft", "Helicopter"],
      }
    ];

    for (const item of seedData) {
      await storage.createContent(item);
    }
  }

  return httpServer;
}
