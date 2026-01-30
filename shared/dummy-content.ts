import type { Content } from "./schema";

/**
 * Demo/POC dummy data - client-only, no server or API.
 * Used for local demo and prototyping.
 */
export const DUMMY_CONTENT: Content[] = [
  {
    id: 1,
    title: "RAF's Gladiator support contract with Boeing Defence UK extended for two years",
    description: "Bridging contract for RAF's synthetic training system will maintain vital multi-domain training capability until 2026.",
    category: "news",
    type: "article",
    date: "29 October 2025",
    tags: ["RAF", "Boeing", "Training"],
    isFeatured: true,
  },
  {
    id: 2,
    title: "Flying into the danger zone | Top Guns: Inside the RAF | Channel 4",
    description: "The Joint Aviation Command (JAC) has officially welcomed the Jupiter HC2 into service.",
    category: "operations",
    type: "video",
    date: "19 January 2026",
    tags: ["JAC", "Jupiter HC2"],
    isFeatured: false
  },
  {
    id: 3,
    title: "Remembrance Commemorations From Across the Nation",
    description: "The Joint Aviation Command (JAC) has officially welcomed the Jupiter HC2 into service.",
    category: "operations",
    type: "audio",
    date: "12 November 2025",
    tags: ["Remembrance", "JAC"],
    isFeatured: false
  },
  {
    id: 4,
    title: "RAF Typhoon fleet strengthened in £205 million boost for British jobs",
    description: "Investment in Typhoon fleet ensures operational readiness and supports UK industry.",
    category: "equipment",
    type: "article",
    date: "19 January 2026",
    tags: ["Aircraft", "Typhoon"],
    isFeatured: false
  },
  {
    id: 5,
    title: "Legacy to Lightning: Air Chief Marshal Harv Smyth on 5th-Gen Tactics",
    description: "Discussing the evolution of air combat and integration of F-35B Lightning.",
    category: "equipment",
    type: "article",
    date: "03 November 2025",
    tags: ["Aircraft", "Senior Leadership"],
    isFeatured: false
  },
  {
    id: 6,
    title: "RAF and French Air & Space Force Strengthen Ties",
    description: "Board-to-Board Meeting in Lyon strengthens strategic partnership.",
    category: "news",
    type: "article",
    date: "10 December 2025",
    tags: ["Senior Leadership", "International"],
    isFeatured: false
  },
  {
    id: 7,
    title: "National Engineering Day 2024",
    description: "Celebrating role models from RAF Cosford talking about their RAF Careers.",
    category: "news",
    type: "article",
    date: "13 November 2024",
    tags: ["Cyberspace", "Engineering"],
    isFeatured: false
  },
  {
    id: 8,
    title: "First Jupiter HC2 Takes Flight in the UK",
    description: "The Joint Aviation Command (JAC) has officially welcomed the Jupiter HC2 into service.",
    category: "equipment",
    type: "article",
    date: "17 December 2025",
    tags: ["Aircraft", "Helicopter"],
    isFeatured: false
  },
];

export function getContent(params?: { query?: string; category?: string }): Content[] {
  let items = DUMMY_CONTENT;

  if (params?.query?.trim()) {
    const q = params.query.toLowerCase().trim();
    items = items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  if (params?.category?.trim()) {
    const cat = params.category.toLowerCase().trim();
    items = items.filter((item) => item.category.toLowerCase() === cat);
  }

  return items;
}
