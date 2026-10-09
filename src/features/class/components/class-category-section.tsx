import { useTranslation } from "react-i18next";
import type { MealType } from "../api/class";
import type { MealCategory } from "../api/class";
import { ClassCard } from "./class-card";

type ClassCategorySectionProps = {
  type: MealType;
  categories: MealCategory[];
};

const TYPE_LABELS: Record<MealType, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

export function ClassCategorySection({
  type,
  categories,
}: ClassCategorySectionProps) {
  const { t } = useTranslation();

  if (categories.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-heading font-bold uppercase tracking-widest text-muted-foreground">
        {t(`healthy.categories.${type}`, TYPE_LABELS[type])}
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <ClassCard key={cat.idCategory} category={cat} />
        ))}
      </div>
    </div>
  );
}

