import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalePath } from "@/lib/use-locale-path";
import { ClassCard } from "./class-card";
import { ClassSectionHeader } from "./class-section-header";
import { ClassSectionSkeleton } from "./class-section-skeleton";
import { useClassCategories } from "../api/use-class";
import { useClassesByType } from "../api/use-class-by-type";

const PAGE_SIZE = 6;

export function ClassPageContent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const localePath = useLocalePath();
  const [searchParams, setSearchParams] = useSearchParams();
  const rawType = searchParams.get("type");
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: TABS,
    isLoading: isLoadingMuscles,
    isError: isMusclesError,
  } = useClassCategories();

 const {
  classes = [],
  isLoading: isLoadingExercises,
  isError: isExercisesError,
} = useClassesByType(rawType);

  useEffect(() => {
    setCurrentPage(0);
  }, [rawType]);

  const handleTabChange = (type: string) => {
    setSearchParams({ type });
  };

  const totalPages = Math.max(
    1,
    Math.ceil(classes.length / PAGE_SIZE),
  );

  const visibleClasses = classes.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE,
  );

  return (
    <ClassSectionHeader isPage={true}>
      {/* Muscle Tabs */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
        {TABS?.map((tab) => {
          const isActive = rawType === tab._id;

          return (
            <button
              key={tab._id}
              type="button"
              onClick={() => handleTabChange(tab._id)}
              className={[
                "cursor-pointer rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 sm:text-base",
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-white/80 hover:bg-white/10 hover:text-white",
              ].join(" ")}
            >
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Loading */}
      {(isLoadingMuscles || isLoadingExercises) && (
        <ClassSectionSkeleton pageSize={PAGE_SIZE} />
      )}

      {/* Errors */}
      {(isMusclesError || isExercisesError) && (
        <div className="py-16 text-center">
          <p className="text-base text-white/80">
            Failed to load exercises. Please try again later.
          </p>
        </div>
      )}

      {/* No muscle categories */}
      {!isLoadingMuscles && !isMusclesError && !TABS?.length && (
        <div className="py-16 text-center">
          <p className="text-base text-white/80">
            No muscle categories found.
          </p>
        </div>
      )}

      {/* Choose a muscle */}
      {!rawType && !isLoadingMuscles && (
        <div className="py-16 text-center">
          <p className="text-base text-white/80">
            Choose a muscle group to view its exercises.
          </p>
        </div>
      )}

      {/* Exercises */}
      {rawType &&
        !isLoadingExercises &&
        !isExercisesError &&
        classes.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-base text-white/80">
              No exercises found for this muscle.
            </p>
          </div>
        )}

      {rawType &&
        !isLoadingExercises &&
        !isExercisesError &&
        visibleClasses.length > 0 && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleClasses.map((exercise) => (
                <ClassCard
                  key={exercise._id}
                  classes={exercise}
                  title={exercise.exercise}
                  linkText={t("healthy.explore", "Explore")}
                  onClick={() =>
                    navigate(
                    localePath(`/classes/${exercise._id}`),
                    )
                  }
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentPage(index)}
                    aria-label={`Go to page ${index + 1}`}
                    className={[
                      "h-2 cursor-pointer transition-all duration-300",
                      index === currentPage
                        ? "w-7 rounded-full bg-primary"
                        : "w-2 rounded-full bg-white/60 hover:bg-white",
                    ].join(" ")}
                  />
                ))}
              </div>
            )}
          </div>
        )}
    </ClassSectionHeader>
  );
}