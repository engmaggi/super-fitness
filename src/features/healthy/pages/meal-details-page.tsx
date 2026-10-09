import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { useLocalePath } from "@/lib/use-locale-path";

export default function MealDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const localePath = useLocalePath();

  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-[60vh] px-4 py-24 text-center">
      <div className="space-y-4">
        <h1 className="font-heading text-3xl font-bold uppercase text-foreground sm:text-4xl">
          {t("healthy.mealsDetailPageTitle", "Meals Detail Page")}
          </h1>
        {id && (
          <p className="text-sm text-muted-foreground">
            Meal ID: <span className="font-mono text-primary">{id}</span>
          </p>
        )}
        <div className="pt-4">
          <Link
            to={localePath("/healthy")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="size-4" />
            Back to Healthy Meals
          </Link>
        </div>
      </div>
    </div>
  );
}

export { MealDetailsPage };
