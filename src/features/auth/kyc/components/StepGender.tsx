import { cn } from "cn";
import { Mars, Venus } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { KycData } from "./KycWizard";

// ─── Step 1: Gender ───────────────────────────────────────────────────────────

export function StepGender({
  value,
  onChange,
}: {
  value: KycData["gender"] | "";
  onChange: (v: KycData["gender"]) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-extrabold uppercase text-foreground">
          {t("kyc.gender.title")}
        </h2>
        <p className="mt-2 font-heading text-sm text-muted-foreground">
          {t("kyc.gender.subtitle")}
        </p>
      </div>

      <div className="flex gap-6">
        {(["male", "female"] as const).map((g) => (
          <button
            key={g}
            type="button"
            id={`kyc-gender-${g}`}
            onClick={() => onChange(g)}
            className={cn(
              "flex h-24 w-24 flex-col items-center justify-center gap-2 rounded-full border-2 transition-all",
              value === g
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-secondary text-muted-foreground hover:border-primary/50",
            )}
          >
            {g === "male" ? (
              <Mars size={32} strokeWidth={1.5} />
            ) : (
              <Venus size={32} strokeWidth={1.5} />
            )}
            <span className="font-heading text-xs font-semibold capitalize">
              {t(`kyc.gender.${g}`)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
