import {
  Card,
  CardFooter,
  CardLink,
  CardTitle,
} from "@/components/ui/card";
import type { MealCategory } from "../api/meals";

type MealCardProps = {
  category: MealCategory;
};

export function MealCard({ category }: MealCardProps) {
  return (
    <Card
      variant="media"
      className="h-72 w-full cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
    >
      <img
        src={category.strCategoryThumb}
        alt={category.strCategory}
        className="h-full w-full object-cover rounded-[28px]"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <CardFooter>
        <CardTitle>{category.strCategory}</CardTitle>
        <CardLink>Read More</CardLink>
      </CardFooter>
    </Card>
  );
}
