import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://fitness.elevateegy.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export type ClassCategory = {
  _id: string;
  name: string;
};

type ClassCategoriesResponse = {
  message: string;
  musclesGroup: ClassCategory[];
};

export async function fetchClassCategories(): Promise<ClassCategory[]> {
  const { data } = await apiClient.get<ClassCategoriesResponse>("/muscles");
  return data.musclesGroup ?? [];
}

export type PrimeMoverMuscle = {
  _id: string;
  name: string;
  image: string;
};

type PrimeMoverMusclesResponse = {
  message: string;
  totalMuscles: number;
  muscles: PrimeMoverMuscle[];
};

export async function fetchPrimeMoverMuscles(
  muscleGroupId: string,
): Promise<PrimeMoverMuscle[]> {
  const { data } = await apiClient.get<PrimeMoverMusclesResponse>(
    "/musclesGroup/by-muscle-group",
    {
      params: { muscleGroupId },
    },
  );

  return data.muscles ?? [];
}

export type Class = {
  _id: string;
  exercise: string;
  difficulty_level: string;
  target_muscle_group: string;
  prime_mover_muscle: string;
  primary_equipment: string;
  short_youtube_demonstration_link: string | null;
  in_depth_youtube_explanation_link: string | null;
};

type ExercisesResponse = {
  message: string;
  totalExercises: number;
  totalPages: number;
  currentPage: number;
  exercises: Class[];
};

export async function fetchMealsByCategory(
  primeMoverMuscleId: string,
  difficultyLevelId: string,
): Promise<Class[]> {
  const { data } = await apiClient.get<ExercisesResponse>(
    "/exercises/by-muscle-difficulty",
    {
      params: {
        primeMoverMuscleId,
        difficultyLevelId,
      },
    },
  );

  return data.exercises ?? [];
}

export const BEGINNER_LEVEL_ID = "69d982ed85f6bfa972bf2216";


export async function fetchExerciseById(
  id: string,
): Promise<Class> {
  const { data } = await apiClient.get<ExercisesResponse>(
    "/exercises",
    {
      params: {
        page: 1,
        limit: 3000,
      },
    },
  );

  const exercise = data.exercises.find(
    (item) => item._id === id,
  );

  if (!exercise) {
    throw new Error("Exercise not found");
  }

  return exercise;
}