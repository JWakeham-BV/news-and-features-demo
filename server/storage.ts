import { type Content, type InsertContent } from "@shared/schema";

export interface IStorage {
  getAllContent(): Promise<Content[]>;
  searchContent(query: string): Promise<Content[]>;
  createContent(content: InsertContent): Promise<Content>;
}

export class MemStorage implements IStorage {
  private content: Map<number, Content>;
  private currentId: number;

  constructor() {
    this.content = new Map();
    this.currentId = 1;
  }

  async getAllContent(): Promise<Content[]> {
    return Array.from(this.content.values());
  }

  async searchContent(query: string): Promise<Content[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.content.values()).filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  }

  async createContent(insertContent: InsertContent): Promise<Content> {
    const id = this.currentId++;
    const content: Content = { ...insertContent, id, tags: insertContent.tags || [] };
    this.content.set(id, content);
    return content;
  }
}

export const storage = new MemStorage();
