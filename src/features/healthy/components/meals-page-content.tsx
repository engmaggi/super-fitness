import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalePath } from "@/lib/use-locale-path";
import { useMealsByType } from "../api/use-meals-by-type";
import type { MealType } from "../api/meals";
import { MealCard } from "./meal-card";
import { MealsSectionHeader } from "./meals-section-header";
import { MealsSectionSkeleton } from "./meals-section-skeleton";

const PAGE_SIZE = 6;

const TABS: { id: MealType; label: string }[] = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
];

export function MealsPageContent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const localePath = useLocalePath();
  const [searchParams, setSearchParams] = useSearchParams();

  const rawType = searchParams.get("type");
  const activeTab: MealType =
    rawType === "lunch" || rawType === "dinner" || rawType === "breakfast"
      ? rawType
      : "breakfast";

  const [currentPage, setCurrentPage] = useState(0);

  const { meals, isLoading, isError } = useMealsByType(activeTab);

  const handleTabChange = (type: MealType) => {
    setCurrentPage(0);
    setSearchParams({ type });
  };

  const totalPages = Math.max(
    1,
    Math.min(3, Math.ceil(meals.length / PAGE_SIZE)),
  );
  const visibleMeals = meals.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE,
  );

  return (
    <MealsSectionHeader isPage={true}>
      {/* ── Tabs ── */}
      <div className="mb-10 flex items-center justify-center gap-3">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={[
                "rounded-full px-6 py-2.5 text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer",
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-foreground/80 hover:text-foreground hover:bg-foreground/10",
              ].join(" ")}
            >
              {t(`healthy.categories.${tab.id}`, tab.label)}
            </button>
          );
        })}
      </div>

      {/* ── Content ── */}
      {isLoading && <MealsSectionSkeleton pageSize={PAGE_SIZE} />}

      {isError && (
        <div className="py-16 text-center">
          <p className="text-base text-foreground/80">
            {t("healthy.errors.loadMealsFailed", {
              category: t(`healthy.categories.${activeTab}`, activeTab),
              defaultValue: `Failed to load meals for ${activeTab}. Please try again later.`,
            })}
          </p>
        </div>
      )}

      {!isLoading && !isError && meals.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-base text-foreground/80">
            {t("healthy.noMealsFound", "No meals found for this category.")}
          </p>
        </div>
      )}

      {!isLoading && !isError && visibleMeals.length > 0 && (
        <div className="space-y-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleMeals.map((meal) => (
              <MealCard
                key={meal.idMeal}
                meal={meal}
                linkText={t("healthy.explore", "Explore")}
                onClick={() => navigate(localePath(`/healthy/${meal.idMeal}`))}
              />
            ))}
          </div>


          {/* ── Pagination Dots ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              {Array.from({ length: totalPages }).map((_, index) => {
                const isActive = index === currentPage;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentPage(index)}
                    aria-label={t("healthy.goToPage", {
                      page: index + 1,
                      defaultValue: `Go to page ${index + 1}`,
                    })}
                    className={[
                      "h-2 transition-all duration-300 cursor-pointer",
                      isActive
                        ? "w-7 rounded-full bg-primary"
                        : "w-2 rounded-full bg-foreground/40 hover:bg-foreground/70",
                    ].join(" ")}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </MealsSectionHeader>
  );
}
