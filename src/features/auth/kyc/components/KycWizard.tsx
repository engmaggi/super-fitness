/**
 * KycWizard – 6-step KYC flow that collects fitness profile data.
 *
 * Steps:
 *  1. Gender
 *  2. Age
 *  3. Weight (kg)
 *  4. Height (cm)
 *  5. Goal
 *  6. Activity Level
 *
 * On completion the caller receives a `KycData` object that is merged
 * with the register form fields before POSTing to the server.
 */

import { useState } from "react";
import { cn } from "cn";
import { useTranslation } from "react-i18next";
import { ChevronLeft } from "lucide-react";
import { ProgressRing } from "./ProgressRing";
import { StepGender } from "./StepGender";
import { StepAge } from "./StepAge";
import { StepWeight } from "./StepWeight";
import { StepHeight } from "./StepHeight";
import { StepGoal } from "./StepGoal";
import { StepActivity } from "./StepActivity";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface KycData {
  gender: "male" | "female";
  age: number;
  weight: number;
  height: number;
  goal: string;
  activityLevel: string;
}

interface KycWizardProps {
  /** Called when the user completes all 6 steps */
  onComplete: (data: KycData) => void;
  /** Called when user navigates back from step 1 to the register form */
  onBack?: (data?: KycData) => void;
  /** Optional: start values (e.g. from localStorage) */
  initialData?: Partial<KycData>;
  className?: string;
}

const TOTAL_STEPS = 6;

// ─── Main Wizard ──────────────────────────────────────────────────────────────

export function KycWizard({
  onComplete,
  onBack,
  initialData,
  className,
}: KycWizardProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<KycData>({
    gender: initialData?.gender ?? "male",
    age: initialData?.age ?? 25,
    weight: initialData?.weight ?? 70,
    height: initialData?.height ?? 170,
    goal: initialData?.goal ?? "",
    activityLevel: initialData?.activityLevel ?? "",
  });

  const patch = <K extends keyof KycData>(key: K, val: KycData[K]) =>
    setData((prev) => ({ ...prev, [key]: val }));

  const canNext = (): boolean => {
    if (step === 1) return data.gender !== ("" as string);
    if (step === 5) return data.goal !== "";
    if (step === 6) return data.activityLevel !== "";
    return true;
  };

  const next = () => {
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
    else onComplete(data);
  };

  const back = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    } else if (onBack) {
      onBack(data);
    }
  };

  const buttonLabel = step === TOTAL_STEPS ? t("kyc.done") : t("kyc.next");

  return (
    <div
      className={cn(
        "relative flex min-h-[520px] w-full max-w-sm flex-col items-center justify-between rounded-2xl px-6 py-8",
        className,
      )}
    >
      {/* Top back button */}
      {(step > 1 || !!onBack) && (
        <button
          type="button"
          id="kyc-top-back-btn"
          onClick={back}
          aria-label={t("kyc.back")}
          className="absolute top-6 left-6 flex size-9 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
        >
          <ChevronLeft className="size-5 rtl:rotate-180" />
        </button>
      )}

      {/* Progress */}
      <div className="flex w-full flex-col items-center gap-6">
        <ProgressRing step={step} total={TOTAL_STEPS} />

        {/* Step content */}
        <div className="flex w-full flex-col items-center">
          {step === 1 && (
            <StepGender
              value={data.gender}
              onChange={(v) => patch("gender", v)}
            />
          )}
          {step === 2 && (
            <StepAge value={data.age} onChange={(v) => patch("age", v)} />
          )}
          {step === 3 && (
            <StepWeight
              value={data.weight}
              onChange={(v) => patch("weight", v)}
            />
          )}
          {step === 4 && (
            <StepHeight
              value={data.height}
              onChange={(v) => patch("height", v)}
            />
          )}
          {step === 5 && (
            <StepGoal value={data.goal} onChange={(v) => patch("goal", v)} />
          )}
          {step === 6 && (
            <StepActivity
              value={data.activityLevel}
              onChange={(v) => patch("activityLevel", v)}
            />
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex w-full max-w-xs flex-col items-center gap-3">
        <button
          type="button"
          id="kyc-next-btn"
          disabled={!canNext()}
          onClick={next}
          className={cn(
            "h-12 w-full rounded-full font-heading text-sm font-extrabold transition-all",
            canNext()
              ? "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]"
              : "cursor-not-allowed bg-secondary text-muted-foreground",
          )}
        >
          {buttonLabel}
        </button>

        {(step > 1 || !!onBack) && (
          <button
            type="button"
            id="kyc-back-btn"
            onClick={back}
            className="font-heading text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors cursor-pointer"
          >
            {t("kyc.back")}
          </button>
        )}
      </div>
    </div>
  );
}
