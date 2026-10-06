import { useTranslation } from "react-i18next";
import { ScrollPicker } from "./ScrollPicker";

// ─── Step 4: Height ───────────────────────────────────────────────────────────

export function StepHeight({
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
          {t("kyc.height.title")}
        </h2>
        <p className="mt-2 font-heading text-sm text-muted-foreground">
          {t("kyc.height.subtitle")}
        </p>
      </div>
      <ScrollPicker
        value={value}
        onChange={onChange}
        min={100}
        max={250}
        unit={t("kyc.height.unit")}
      />
    </div>
  );
}
