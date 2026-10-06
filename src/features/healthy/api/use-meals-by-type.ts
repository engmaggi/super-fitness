import { useQueries } from "@tanstack/react-query";
import { fetchMealsByCategory, MEAL_TYPE_CATEGORIES, type Meal, type MealType } from "./meals";

/** Fetches all individual meals for a given meal type (e.g. "breakfast")
 *  by parallel-querying every underlying DB category mapped to that type.
 */
export function useMealsByType(type: MealType) {
  const categoryNames = MEAL_TYPE_CATEGORIES[type] as readonly string[];

  const results = useQueries({
    queries: categoryNames.map((cat) => ({
      queryKey: ["meals-by-category", cat],
      queryFn: () => fetchMealsByCategory(cat),
      staleTime: 1000 * 60 * 10,
    })),
  });

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);
  const meals: Meal[] = results.flatMap((r) => r.data ?? []);

  return { meals, isLoading, isError };
}
