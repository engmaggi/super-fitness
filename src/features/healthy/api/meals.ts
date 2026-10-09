import axios from "axios";

const mealDbClient = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
  headers: { "Content-Type": "application/json" },
});

export type MealCategory = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

type MealCategoriesResponse = {
  categories: MealCategory[];
};

// The categories we want to display, mapped to meal-type labels
export const MEAL_TYPE_CATEGORIES = {
  breakfast: ["Breakfast", "Starter"],
  lunch: ["Chicken", "Seafood", "Pasta", "Side"],
  dinner: ["Beef", "Lamb", "Pork", "Goat", "Vegan"],
} as const;

export type MealType = keyof typeof MEAL_TYPE_CATEGORIES;

export type MealsByType = {
  breakfast: MealCategory[];
  lunch: MealCategory[];
  dinner: MealCategory[];
};

export async function fetchMealCategories(): Promise<MealCategoriesResponse> {
  const { data } =
    await mealDbClient.get<MealCategoriesResponse>("/categories.php");
  return data;
}

export function classifyMealsByType(categories: MealCategory[]): MealsByType {
  const result: MealsByType = { breakfast: [], lunch: [], dinner: [] };

  for (const category of categories) {
    const name = category.strCategory;
    for (const [type, names] of Object.entries(MEAL_TYPE_CATEGORIES) as [
      MealType,
      readonly string[],
    ][]) {
      if ((names as readonly string[]).includes(name)) {
        result[type].push(category);
        break;
      }
    }
  }

  return result;
}

// ── Individual meals (returned by /filter.php?c=CategoryName) ──────────────

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type MealsByCategoryResponse = {
  meals: Meal[];
};

export async function fetchMealsByCategory(category: string): Promise<Meal[]> {
  const { data } = await mealDbClient.get<MealsByCategoryResponse>(
    "/filter.php",
    { params: { c: category } },
  );
  return data.meals ?? [];
}




type MealDetailsResponse = {
  meals: (Meal & {
    strInstructions: string;
    strArea: string;
    strCategory: string;
    strTags: string | null;
    [key: `strIngredient${number}`]: string | null;
    [key: `strMeasure${number}`]: string | null;
  })[] | null;
};

export async function fetchMealById(id: string) {
  const { data } = await mealDbClient.get<MealDetailsResponse>(
    "/lookup.php",
    { params: { i: id } },
  );

  return data.meals?.[0] ?? null;
}