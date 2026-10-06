import { cn } from "cn";
import { Circle } from "lucide-react";
import { useTranslation } from "react-i18next";

// ─── Step 5: Goal ─────────────────────────────────────────────────────────────

const GOAL_KEYS = [
  "gainWeight",
  "loseWeight",
  "getFitter",
  "moreFlexible",
  "learnBasics",
] as const;

export function StepGoal({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-extrabold text-foreground">
          {t("kyc.goal.title")}
        </h2>
        <p className="mt-2 font-heading text-sm text-muted-foreground">
          {t("kyc.goal.subtitle")}
        </p>
      </div>

      <div className="flex w-full max-w-xs flex-col gap-3">
        {GOAL_KEYS.map((key) => {
          const label = t(`kyc.goal.options.${key}`);
          return (
            <button
              key={key}
              type="button"
              id={`kyc-goal-${key}`}
              onClick={() => onChange(label)}
              className={cn(
                "flex items-center justify-between rounded-full border px-5 py-3 font-heading text-sm font-medium transition-all",
                value === label
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-secondary text-muted-foreground hover:border-primary/40",
              )}
            >
              <span>{label}</span>
              <span
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-full border",
                  value === label
                    ? "border-primary bg-primary"
                    : "border-muted-foreground",
                )}
              >
                {value === label && (
                  <Circle size={8} fill="white" strokeWidth={0} />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
