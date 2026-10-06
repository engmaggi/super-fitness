import { cn } from "cn"
import { Card, CardFooter, CardLink, CardTitle } from "@/components/ui/card"
import type { MealTypeCard } from "../types/meals-categories-types"
import { useTranslation } from "react-i18next"

interface MealsCardsProps {
  meal: MealTypeCard
  isActive?: boolean
  onSelect: (id: string) => void
}

export function MealsCards({ meal, isActive, onSelect }: MealsCardsProps) {
  const { t } = useTranslation();
  return (
    <Card
      variant="media"
      onClick={() => onSelect(meal.id)}
      className={cn(
  "cursor-pointer transition hover:shadow-lg h-80 md:h-100",
  isActive && "data-[variant=media]:ring-2 data-[variant=media]:ring-primary"
)}
    >
      <img
        src={meal.image}
        alt={meal.title}
        loading="lazy"
        className="h-full w-full object-cover"
      />
      <CardFooter>
        <CardTitle>{meal.title}</CardTitle>
        <CardLink to={meal.href} onClick={(e) => e.stopPropagation()}>
    {t("meals.readMore")}
  </CardLink>
      </CardFooter>
    </Card>
  )
}