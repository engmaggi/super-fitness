import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalePath } from "@/lib/use-locale-path";
import type { Class, ClassCategory } from "../api/class";
import { ClassCard } from "./class-card";

type ClassCategorySectionProps = {
  category: ClassCategory;
  exercises: Class[];
};

export function ClassCategorySection({
  category,
  exercises,
}: ClassCategorySectionProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const localePath = useLocalePath();

  if (exercises.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="font-heading text-lg font-bold uppercase tracking-widest text-muted-foreground">
        {category.name}
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercise) => (
          <ClassCard
            key={exercise._id}
            classes={exercise}
            title={exercise.exercise}
            linkText={t("healthy.explore", "Explore")}
            onClick={() => navigate(localePath(`/classes/${exercise._id}`))}
          />
        ))}
      </div>
    </div>
  );
}
