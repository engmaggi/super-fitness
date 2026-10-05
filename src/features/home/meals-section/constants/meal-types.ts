import type { MealTypeCard } from "../types/meals-categories-types";

export const MEAL_TYPES: MealTypeCard[] = [
  {
    id: "breakfast",
    title: "Breakfast",
    image: "https://www.themealdb.com/images/category/breakfast.png",
    apiCategories: ["Breakfast"],
  },
  {
    id: "lunch",
    title: "Lunch",
    image: "https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg",
    apiCategories: ["Chicken", "Pasta", "Vegetarian"],
  },
  {
    id: "dinner",
    title: "Dinner",
    image: "https://www.themealdb.com/images/media/meals/gtpvwp1763363947.jpg",
    apiCategories: ["Beef", "Seafood", "Lamb", "Pork"],
  },
];