import { useQuery } from "@tanstack/react-query";
import {
  classifyMealsByType,
  fetchMealCategories,
  type MealsByType,
} from "./meals";

export const MEALS_QUERY_KEY = ["meal-categories"] as const;

export function useMeals() {
  return useQuery<MealsByType, Error>({
    queryKey: MEALS_QUERY_KEY,
    queryFn: async () => {
      const data = await fetchMealCategories();
      return classifyMealsByType(data.categories);
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
