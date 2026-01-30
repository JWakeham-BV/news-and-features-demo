import { useQuery } from "@tanstack/react-query";
import { getContent } from "@shared/dummy-content";
import type { Content } from "@shared/schema";

const CONTENT_QUERY_KEY = "content";

export function useContent(params?: { query?: string; category?: string }) {
  return useQuery({
    queryKey: [CONTENT_QUERY_KEY, params],
    queryFn: () => Promise.resolve(getContent(params)),
  });
}

export function useFeaturedContent(allContent: Content[] = []) {
  return allContent.find((c) => c.isFeatured) || allContent[0];
}

export function useContentByCategory(allContent: Content[] = [], category: string) {
  return allContent.filter((c) => c.category === category);
}
