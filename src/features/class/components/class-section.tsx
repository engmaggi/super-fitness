import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalePath } from "@/lib/use-locale-path";
import { useClassCategories } from "../api/use-class";
import { ClassCard } from "./class-card";
import { ClassSectionHeader } from "./class-section-header";
import { ClassSectionSkeleton} from "./class-section-skeleton";

export function ClassSection() {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useClassCategories();
  const navigate = useNavigate();
  const localePath = useLocalePath();

  return (
    <ClassSectionHeader>
      {/* Skeleton */}
      {isLoading && <ClassSectionSkeleton />}

      {isError && (
        <p className="text-center text-white/70">
          {t(
            "healthy.errors.loadCategoriesFailed",
            "Failed to load meal categories. Please try again later.",
          )}
        </p>
      )}

      {data && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {(["breakfast", "lunch", "dinner"] as const).map((type) => {
            const first = data[type][0];
            if (!first) return null;
            const label = t(`healthy.categories.${type}`, type);
            return (
              <ClassCard
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
    </ClassSectionHeader>
  );
}

