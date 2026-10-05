export interface mealsCategoriesTypes{
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

export interface mealsCategoriesResponseTypes{
    categories: mealsCategoriesTypes[];
}
export interface MealTypeCard {
  id: string;
  title: string;        
  image: string;        
  apiCategories: string[]; 
}