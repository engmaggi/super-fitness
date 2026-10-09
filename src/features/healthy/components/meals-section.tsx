import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalePath } from "@/lib/use-locale-path";
import { useMeals } from "../api/use-meals";
import { MealCard } from "./meal-card";
import { MealsSectionHeader } from "./meals-section-header";
import { MealsSectionSkeleton } from "./meals-section-skeleton";

export function MealsSection() {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useMeals();
  const navigate = useNavigate();
  const localePath = useLocalePath();

  return (
    <MealsSectionHeader>
      {/* Skeleton */}
      {isLoading && <MealsSectionSkeleton />}

      {isError && (
        <p className="text-center text-foreground/70">
          {t(
            "healthy.errors.loadCategoriesFailed",
            "Failed to load meal categories. Please try again later.",
          )}
        </p>
      )}

      {data && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {(["breakfast", "lunch", "dinner"] as const).map((type) => {
            const first = data[type][0];
            if (!first) return null;
            const label = t(`healthy.categories.${type}`, type);
            return (
              <MealCard
                key={type}
                title={label}
                image={first.strCategoryThumb}
                linkText={t("healthy.readMore", "Read More")}
                onClick={() =>
                  navigate(`${localePath("/healthy")}?type=${type}`)
                }
              />
            );
          })}
        </div>
      )}
    </MealsSectionHeader>
  );
}
