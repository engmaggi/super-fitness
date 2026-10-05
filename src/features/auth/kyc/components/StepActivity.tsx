import { cn } from "cn";
import { Circle } from "lucide-react";
import { useTranslation } from "react-i18next";

// ─── Step 6: Activity Level ───────────────────────────────────────────────────

const ACTIVITY_KEYS = [
  "level1",
  "level2",
  "level3",
  "level4",
  "level5",
] as const;

export function StepActivity({
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
          {t("kyc.activity.title")}
        </h2>
        <p className="mt-2 font-heading text-sm text-muted-foreground">
          {t("kyc.activity.subtitle")}
        </p>
      </div>

      <div className="flex w-full max-w-xs flex-col gap-3">
        {ACTIVITY_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            id={`kyc-activity-${key}`}
            onClick={() => onChange(key)}
            className={cn(
              "flex items-center justify-between rounded-full border px-5 py-3 transition-all text-left",
              value === key
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-secondary text-muted-foreground hover:border-primary/40",
            )}
          >
            <div>
              <p className="font-heading text-sm font-semibold rtl:text-right">
                {t(`kyc.activity.levels.${key}.label`)}
              </p>
              <p className="font-sans text-xs opacity-70 rtl:text-right">
                {t(`kyc.activity.levels.${key}.description`)}
              </p>
            </div>
            <span
              className={cn(
                "ml-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                value === key
                  ? "border-primary bg-primary"
                  : "border-muted-foreground",
              )}
            >
              {value === key && (
                <Circle size={8} fill="white" strokeWidth={0} />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
