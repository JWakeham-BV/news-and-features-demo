import { useQuery } from "@tanstack/react-query";
import { api, type Content } from "@shared/routes";

// Using the shared API definition to fetch content
export function useContent(params?: { query?: string; category?: string }) {
  // Construct URL with query parameters manually since fetch doesn't do it automatically from object
  const url = new URL(api.content.list.path, window.location.origin);
  if (params?.query) url.searchParams.append("query", params.query);
  if (params?.category) url.searchParams.append("category", params.category);

  return useQuery({
    queryKey: [api.content.list.path, params],
    queryFn: async () => {
      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch content");
      
      const data = await res.json();
      return api.content.list.responses[200].parse(data);
    },
  });
}

// Helper to filter content client-side if needed (for instant interactions)
export function useFeaturedContent(allContent: Content[] = []) {
  return allContent.find(c => c.isFeatured) || allContent[0];
}

export function useContentByCategory(allContent: Content[] = [], category: string) {
  return allContent.filter(c => c.category === category);
}
