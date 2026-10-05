import { cn } from "cn"
import { Card, CardFooter, CardLink, CardTitle } from "@/components/ui/card"
import type { MealTypeCard } from "../types/meals-categories-types"

interface MealsCardsProps {
  meal: MealTypeCard
  isActive?: boolean
  onSelect: (id: string) => void
}

export function MealsCards({ meal, isActive, onSelect }: MealsCardsProps) {
  return (
    <Card
      variant="media"
      onClick={() => onSelect(meal.id)}
      className={cn(
        "cursor-pointer transition hover:shadow-lg",
        isActive && "data-[variant=media]:ring-2 data-[variant=media]:ring-primary"
      )}
    >
      <img
        src={meal.image}
        alt={meal.title}
        loading="lazy"
        className="aspect-4/3 w-full object-cover"
      />
      <CardFooter>
        <CardTitle>{meal.title}</CardTitle>
        <CardLink>Read More</CardLink>
      </CardFooter>
    </Card>
  )
}