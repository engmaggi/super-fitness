import { useTranslation } from "react-i18next";
import { ScrollPicker } from "./ScrollPicker";

// ─── Step 2: Age ──────────────────────────────────────────────────────────────

export function StepAge({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-extrabold text-foreground">
          {t("kyc.age.title")}
        </h2>
        <p className="mt-2 font-heading text-sm text-muted-foreground">
          {t("kyc.age.subtitle")}
        </p>
      </div>
      <ScrollPicker
        value={value}
        onChange={onChange}
        min={10}
        max={100}
        unit={t("kyc.age.unit")}
      />
    </div>
  );
}
