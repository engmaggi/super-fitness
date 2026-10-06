import type { MealTypeCard } from "../types/meals-categories-types";
import breakfastImg from "@/features/home/meals-section/assets/breakfast.jpg";
import lunchImg from "@/features/home/meals-section/assets/lunch.jpg";
import dinnerImg from "@/features/home/meals-section/assets/dinner.jpg";

export const MEAL_TYPES: MealTypeCard[] = [

{ id: "breakfast", title: "Breakfast", image: breakfastImg, apiCategories: ["Breakfast", "Starter"], href: "/healthy" },
{ id: "lunch",     title: "Lunch",     image: lunchImg,     apiCategories: ["Chicken", "Seafood", "Pasta", "Side"], href: "/healthy" },
{ id: "dinner",    title: "Dinner",    image: dinnerImg,    apiCategories: ["Beef", "Lamb", "Pork", "Goat", "Vegan"], href: "/healthy" },
];