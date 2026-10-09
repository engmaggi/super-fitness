import { useQuery } from "@tanstack/react-query";
import { fetchClassCategories, type ClassCategory } from "./class";

export const CLASSES_QUERY_KEY = ["class-categories"] as const;

export function useClassCategories() {
  return useQuery<ClassCategory[], Error>({
    queryKey: CLASSES_QUERY_KEY,
    queryFn: fetchClassCategories,
    staleTime: 1000 * 60 * 10,
  });
}