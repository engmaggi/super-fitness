import { useQuery } from "@tanstack/react-query";
import {
  BEGINNER_LEVEL_ID,
  fetchMealsByCategory,
  fetchPrimeMoverMuscles,
} from "./class";

export function useClassesByType(type: string | null) {
  const query = useQuery({
    queryKey: ["classes-by-category", type, BEGINNER_LEVEL_ID],
    queryFn: async () => {
      if (!type) return [];

      const muscles = await fetchPrimeMoverMuscles(type);

      const exercisesByMuscle = await Promise.all(
        muscles.map((muscle) =>
          fetchMealsByCategory(muscle._id, BEGINNER_LEVEL_ID),
        ),
      );

      const exercises = exercisesByMuscle.flat();

      console.log("Final exercises:", exercises);

      return exercises;
    },
    enabled: Boolean(type),
    staleTime: 1000 * 60 * 10,
  });

  return {
    ...query,
    classes: query.data ?? [],
  };
}