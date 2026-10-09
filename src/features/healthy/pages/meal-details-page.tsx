import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Flame, Bot, LoaderCircle } from "lucide-react";
import { useLocalePath } from "@/lib/use-locale-path";
import { useMealsByType } from "../api/use-meals-by-type";
import {
  fetchMealById,
  type MealType,
} from "../api/meals";

type MealDetails = NonNullable<
  Awaited<ReturnType<typeof fetchMealById>>
>;

const TABS: { id: MealType; label: string }[] = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
];

export default function MealDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const localePath = useLocalePath();

  const [meal, setMeal] = useState<MealDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] =
    useState<MealType>("breakfast");

  const {
    meals: sidebarMeals,
    isLoading: sidebarLoading,
    isError: sidebarError,
  } = useMealsByType(activeTab);

  useEffect(() => {
    let cancelled = false;

    async function loadMeal() {
      if (!id) {
        setMeal(null);
        setError(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(false);

      try {
        const result = await fetchMealById(id);

        if (!cancelled) {
          setMeal(result);
          setError(!result);
        }
      } catch {
        if (!cancelled) {
          setMeal(null);
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadMeal();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const ingredients = meal
    ? Array.from({ length: 20 }, (_, index) => {
        const number = index + 1;

        const ingredient =
          meal[`strIngredient${number}` as keyof MealDetails];

        const measure =
          meal[`strMeasure${number}` as keyof MealDetails];

        return {
          ingredient:
            typeof ingredient === "string"
              ? ingredient.trim()
              : "",
          measure:
            typeof measure === "string" ? measure.trim() : "",
        };
      }).filter((item) => item.ingredient)
    : [];

  const description =
    meal?.strInstructions?.replace(/\s+/g, " ").trim() ?? "";

  if (loading) {
    return (
      <main className="min-h-screen bg-[#202020] px-5 py-12 text-white">
        <div className="mx-auto max-w-6xl animate-pulse space-y-6">
          <div className="h-80 rounded-2xl bg-white/10" />
          <div className="h-8 w-48 rounded bg-white/10" />
          <div className="h-32 rounded-xl bg-white/10" />
        </div>
      </main>
    );
  }

  if (error || !meal) {
    return (
      <main className="flex min-h-screen flex-col  items-center justify-center gap-4 bg-[#202020] px-5 text-center text-white">
        <p className="text-xl font-semibold">
          {t(
            "healthy.mealNotFound",
            "Meal details could not be loaded",
          )}
        </p>

        <Link
          to={localePath("/healthy")}
          className="inline-flex items-center gap-2 text-sm text-[#ff4b0b] hover:underline"
        >
          <ArrowLeft className="size-4" />
          {t("healthy.backToMeals", "Back to meals")}
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#202020] px-4 mt-14 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="min-w-0 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.025]">
          {/* Meal type tabs */}
          <div className="grid grid-cols-3 gap-1 border-b border-white/5 p-2">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={isActive}
                  className={[
                    "rounded-full px-2 py-2 text-xs font-semibold transition sm:text-sm",
                    isActive
                      ? "bg-[#ff4b0b] text-white"
                      : "text-white/60 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                >
                  {t(
                    `healthy.categories.${tab.id}`,
                    tab.label,
                  )}
                </button>
              );
            })}
          </div>

          {/* Back to meals */}
          <Link
            to={localePath("/healthy")}
            className="flex items-center gap-3 border-b border-white/5 p-4 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft className="size-4 shrink-0" />
            {t("healthy.backToMeals", "Back to meals")}
          </Link>

          {/* Current meal */}
          <div className="border-b border-white/5 p-3">
            <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-white/50">
              {t("healthy.currentMeal", "Current meal")}
            </p>

            <div className="overflow-hidden rounded-xl border border-[#ff4b0b]/40 bg-[#ff4b0b]/5">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="aspect-video w-full object-cover"
              />

              <div className="p-3">
                <p className="text-sm font-semibold leading-5">
                  {meal.strMeal}
                </p>

                <p className="mt-1 text-xs text-white/50">
                  {meal.strArea || meal.strCategory}
                </p>
              </div>
            </div>
          </div>

          {/* Meals list */}
          <div className="p-3">
            <h2 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-white/50">
              {t("healthy.moreMeals", "Explore meals")}
            </h2>

            {sidebarLoading && (
              <div className="flex items-center justify-center gap-2 py-8 text-sm text-white/50">
                <LoaderCircle className="size-4 animate-spin" />
                {t("common.loading", "Loading meals...")}
              </div>
            )}

            {sidebarError && !sidebarLoading && (
              <p className="py-5 text-center text-xs leading-5 text-white/50">
                {t(
                  "healthy.errors.loadMealsFailed",
                  "Could not load meals. Please try again.",
                )}
              </p>
            )}

            {!sidebarLoading &&
              !sidebarError &&
              sidebarMeals.length === 0 && (
                <p className="py-5 text-center text-xs text-white/50">
                  {t(
                    "healthy.noMealsFound",
                    "No meals found for this category.",
                  )}
                </p>
              )}

            {!sidebarLoading && !sidebarError && (
              <div className="max-h-[460px] space-y-2 overflow-y-auto pr-1">
                {sidebarMeals.map((item) => {
                  const isCurrent = item.idMeal === id;

                  return (
                    <button
                      key={item.idMeal}
                      type="button"
                      onClick={() => {
                        if (!isCurrent) {
                          navigate(
                            localePath(`/healthy/${item.idMeal}`),
                          );
                        }
                      }}
                      disabled={isCurrent}
                      aria-current={isCurrent ? "page" : undefined}
                      className={[
                        "flex w-full items-center gap-3 rounded-xl border p-2 text-left transition",
                        isCurrent
                          ? "cursor-default border-[#ff4b0b]/50 bg-[#ff4b0b]/10"
                          : "border-transparent hover:border-white/10 hover:bg-white/5",
                      ].join(" ")}
                    >
                      <img
                        src={item.strMealThumb}
                        alt=""
                        loading="lazy"
                        className="size-14 shrink-0 rounded-lg object-cover"
                      />

                      <span className="min-w-0 flex-1">
                        <span className="block line-clamp-2 text-xs font-medium leading-5">
                          {item.strMeal}
                        </span>

                        {isCurrent && (
                          <span className="mt-1 block text-[10px] font-semibold text-[#ff4b0b]">
                            {t("healthy.current", "Current")}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* Meal details */}
        <section className="min-w-0">
          {/* Hero */}
          <div className="relative flex min-h-[350px] items-end overflow-hidden rounded-2xl bg-[#292929] sm:min-h-[400px]">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="absolute inset-0 size-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-black/55 to-black/5" />

            <div className="relative z-10 w-full p-5 sm:p-8">
              {meal.strCategory && (
                <span className="mb-3 inline-block rounded-full bg-[#ff4b0b] px-3 py-1 text-xs font-semibold">
                  {meal.strCategory}
                </span>
              )}

              <h1 className="text-3xl font-bold sm:text-4xl">
                {meal.strMeal}
              </h1>

              <p className="mt-4 line-clamp-4 max-w-3xl text-sm leading-6 text-white/75">
                {description ||
                  t(
                    "healthy.noDescription",
                    "No description available.",
                  )}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs">
                  <Flame className="size-4 text-[#ff4b0b]" />
                  <span>{meal.strArea || "Meal"}</span>
                </div>

                {meal.strTags && (
                  <div className="rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs">
                    {meal.strTags}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <section className="mt-7">
            <h2 className="text-xl font-semibold sm:text-2xl">
              {t("healthy.ingredients", "Ingredients")}
            </h2>

            {ingredients.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 gap-x-8 rounded-xl border border-white/5 bg-white/[0.025] p-4 sm:grid-cols-2 sm:p-5">
                {ingredients.map((item, index) => (
                  <div
                    key={`${item.ingredient}-${index}`}
                    className="flex items-center justify-between gap-4 border-b border-white/5 py-3 text-sm"
                  >
                    <span className="text-white/80">
                      {item.ingredient}
                    </span>

                    <span className="shrink-0 text-[#ff4b0b]">
                      {item.measure || "—"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-white/50">
                {t(
                  "healthy.ingredientsUnavailable",
                  "Ingredients are not available.",
                )}
              </p>
            )}
          </section>
        </section>
      </div>

      {/* Floating assistant */}
      <button
        type="button"
        aria-label={t("healthy.askAssistant", "Ask AI assistant")}
        className="fixed bottom-6 right-5 z-50 flex items-center gap-2 rounded-full bg-[#ff4b0b] px-4 py-3 text-sm font-semibold shadow-[0_0_30px_rgba(255,75,11,0.4)] transition hover:scale-105"
      >
        <Bot className="size-5" />
        Hey Ask Me
      </button>
    </main>
  );
}

export { MealDetailsPage };