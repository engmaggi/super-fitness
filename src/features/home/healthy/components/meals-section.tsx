import healthyBg from "@/assets/healthy-section.jpg";
import { Dumbbell } from "lucide-react";
import { useMeals } from "../api/use-meals";

function MealsSectionSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="h-80 w-full animate-pulse rounded-[28px] bg-white/10"
        />
      ))}
    </div>
  );
}

export function MealsSection() {
  const { data, isLoading, isError } = useMeals();

  return (
    <section
      id="meals-section"
      className="relative w-screen overflow-hidden py-20 -mx-[calc((100vw-100%)/2)] px-0"
    >
      {/* ── Background image ── */}
      <img
        src={healthyBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* ── overlay to darken the BG like the design ── */}
      <div className="absolute top-17 left-0 right-0 z-2 bottom-44 bg-secondary/90 backdrop-blur-md" />

      {/* ── Content ── */}
      <div className="relative mx-auto w-full max-w-screen-2xl z-3 px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-primary relative before:-z-10 before:pointer-events-none before:absolute before:-top-10 before:-left-10 before:hidden before:font-heading before:text-5xl before:font-bold before:uppercase before:tracking-[0.08em] before:text-foreground/8 before:content-['Healthy'] lg:before:block">
            <Dumbbell className="size-4" />
            Healthy Nutritions
          </div>

          <h2 className="font-heading text-4xl font-bold uppercase leading-tight text-white sm:text-5xl">
            Fuel Your Fitness Journey With <br className="hidden sm:block" />
            Customized <span className="text-primary">Meal Plans</span> For You
          </h2>
        </div>

        {/* Cards */}
        {isLoading && <MealsSectionSkeleton />}

        {isError && (
          <p className="text-center text-white/70">
            Failed to load meal categories. Please try again later.
          </p>
        )}

        {data && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {(["breakfast", "lunch", "dinner"] as const).map((type) => {
              const first = data[type][0];
              if (!first) return null;
              const label =
                type === "breakfast"
                  ? "Breakfast"
                  : type === "lunch"
                    ? "Lunch"
                    : "Dinner";
              return (
                <MealCard
                  key={type}
                  thumbUrl={first.strCategoryThumb}
                  label={label}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function MealCard({ thumbUrl, label }: { thumbUrl: string; label: string }) {
  return (
    <div className="group/meal relative h-80 w-full cursor-pointer overflow-hidden rounded-[28px] transition-transform duration-300 hover:scale-[1.02]">
      <img
        src={thumbUrl}
        alt={label}
        className="h-full w-full object-cover transition-transform duration-500 group-hover/meal:scale-105"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Footer bar — matches the blurred grey strip in the design */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2.5 rounded-b-[28px] bg-[#24242480] px-5 py-4 backdrop-blur-[10px]">
        <p className="font-heading text-base font-bold uppercase tracking-[0.18em] text-white">
          {label}
        </p>
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
        >
          Read More
          <span className="grid size-6 place-items-center rounded-full bg-primary text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
