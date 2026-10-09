import { Card, CardFooter, CardLink, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalePath } from "@/lib/use-locale-path";
import type { Meal, MealCategory } from "../api/meals";

export type MealCardProps = {
  meal?: Meal;
  category?: MealCategory;
  title?: string;
  image?: string;
  linkText?: string;
  onClick?: () => void;
  className?: string;
};

export function MealCard({
  meal,
  category,
  title,
  image,
  linkText,
  onClick,
  className,
}: MealCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const localePath = useLocalePath();

  const categoryName = category?.strCategory;
  const translatedCategory = categoryName
    ? t(`healthy.dbCategories.${categoryName}`, categoryName)
    : "";

  const displayTitle = title ?? meal?.strMeal ?? translatedCategory;
  const displayImage =
    image ?? meal?.strMealThumb ?? category?.strCategoryThumb ?? "";
  const resolvedLinkText = linkText ?? t("healthy.explore", "Explore");

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (meal?.idMeal) {
      navigate(localePath(`/healthy/${meal.idMeal}`));
    }
  };

  return (
    <Card
      variant="media"
      onClick={handleClick}
      className={[
        "h-72 sm:h-80 w-full cursor-pointer transition-transform duration-300 hover:scale-[1.02]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <img
        src={displayImage}
        alt={displayTitle}
        loading="lazy"
        className="h-full w-full object-cover rounded-[28px]"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 rounded-[28px] bg-linear-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
      <CardFooter>
        <CardTitle className="line-clamp-1">{displayTitle}</CardTitle>
        <CardLink
  to={meal?.idMeal ? localePath(`/healthy/${meal.idMeal}`) : "#"}
  onClick={(e) => {
    if (!meal?.idMeal) {
      e.preventDefault();
    }
  }}
  className="cursor-pointer"
>
  {resolvedLinkText}
</CardLink>
      </CardFooter>
    </Card>
  );
}

