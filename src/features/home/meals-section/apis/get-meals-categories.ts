import type { mealsCategoriesResponseTypes } from "../types/meals-categories-types";

const BASE_URL = import.meta.env.VITE_API_MEADB_URL;

 export async function getMealsCategories() :Promise<mealsCategoriesResponseTypes>{
    const res= await fetch(`${BASE_URL}/categories.php`);
    if(!res.ok)throw new Error("Failed to fetch meals categories");
    return res.json();
 }