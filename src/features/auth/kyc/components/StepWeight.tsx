import { useTranslation } from "react-i18next";
import { ScrollPicker } from "./ScrollPicker";

// ─── Step 3: Weight ───────────────────────────────────────────────────────────

export function StepWeight({
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
          {t("kyc.weight.title")}
        </h2>
        <p className="mt-2 font-heading text-sm text-muted-foreground">
          {t("kyc.weight.subtitle")}
        </p>
      </div>
      <ScrollPicker
        value={value}
        onChange={onChange}
        min={30}
        max={200}
        unit={t("kyc.weight.unit")}
      />
    </div>
  );
}
