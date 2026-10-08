import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { cn } from "cn"
import { Card, CardFooter, CardLink, CardTitle } from "@/components/ui/card"
import { useLocalePath } from "@/lib/use-locale-path"
import type { MealTypeCard } from "../types/meals-categories-types"

interface MealsCardsProps {
  meal: MealTypeCard
  isActive?: boolean
  onSelect: (id: string) => void
}

export function MealsCards({ meal, isActive, onSelect }: MealsCardsProps) {
  const { t } = useTranslation()
  const localePath = useLocalePath()
 const href = `${localePath("/healthy")}?type=${meal.id}`

  return (
    <Card
      variant="media"
      className={cn(
        "h-80 transition hover:shadow-lg md:h-100",
        isActive && "data-[variant=media]:ring-2 data-[variant=media]:ring-primary"
      )}
    >
      <img
        src={meal.image}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover"
      />

      <CardFooter>
        <CardTitle>{t(`meals.types.${meal.id}`)}</CardTitle>
        {/* visual only, the overlay below handles the click */}
        <CardLink to={href} tabIndex={-1} aria-hidden="true">
          {t("meals.readMore")}
        </CardLink>
      </CardFooter>

      {/* covers the whole card */}
      <Link
        to={href}
        aria-label={t(`meals.types.${meal.id}`)}
        onClick={() => onSelect(meal.id)}
        className="absolute inset-0 z-10 rounded-[28px] focus-visible:outline-2 focus-visible:outline-primary"
      />
    </Card>
  )
}