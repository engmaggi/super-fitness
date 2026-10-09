import { useTranslation } from "react-i18next";
import type { ProfileDraft } from "../types/profile-type";

const goalKeys = [
  "gainWeight",
  "loseWeight",
  "getFitter",
  "moreFlexible",
  "learnBasics",
] as const;

const activityKeys = ["level1", "level2", "level3", "level4", "level5"] as const;

type ProfileEditFormProps = {
  draft: ProfileDraft;
  isDirty: boolean;
  isSaving: boolean;
  saveError: string | null;
  onDraftChange: (draft: ProfileDraft) => void;
  onSave: () => void;
};

export function ProfileEditForm({
  draft,
  isDirty,
  isSaving,
  saveError,
  onDraftChange,
  onSave,
}: ProfileEditFormProps) {
  const { t } = useTranslation();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSave();
      }}
    >
      <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
        <label className="flex flex-col items-center gap-2 text-center">
          <span className="font-heading text-xl font-bold">
            {t("profile.goal")}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {t("profile.tapToChange")}
          </span>
          <select
            aria-label={t("profile.goal")}
            value={draft.goal}
            onChange={(event) =>
              onDraftChange({ ...draft, goal: event.target.value })
            }
            className="w-full max-w-52 cursor-pointer appearance-none rounded-full border border-foreground/25 bg-primary px-4 py-2 text-xs font-medium text-primary-foreground outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            {!goalKeys.some(
              (key) => t(`kyc.goal.options.${key}`) === draft.goal,
            ) && <option value={draft.goal}>{draft.goal}</option>}
            {goalKeys.map((key) => {
              const value = t(`kyc.goal.options.${key}`);
              return (
                <option key={key} value={value}>
                  {value}
                </option>
              );
            })}
          </select>
        </label>

        <label className="flex flex-col items-center gap-2 text-center">
          <span className="font-heading text-xl font-bold">
            {t("profile.level")}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {t("profile.tapToChange")}
          </span>
          <select
            aria-label={t("profile.level")}
            value={draft.activityLevel}
            onChange={(event) =>
              onDraftChange({ ...draft, activityLevel: event.target.value })
            }
            className="w-full max-w-52 cursor-pointer appearance-none rounded-full border border-foreground/25 bg-primary px-4 py-2 text-xs font-medium text-primary-foreground outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            {!activityKeys.some((key) => key === draft.activityLevel) && (
              <option value={draft.activityLevel}>{draft.activityLevel}</option>
            )}
            {activityKeys.map((key) => (
              <option key={key} value={key}>
                {t(`kyc.activity.levels.${key}.label`)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col items-center gap-2 text-center">
          <span className="font-heading text-xl font-bold">
            {t("profile.weight")}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {t("profile.tapToChange")}
          </span>
          <span className="flex w-full max-w-52 items-center rounded-full border border-foreground/25 bg-primary px-4 py-1.5 text-primary-foreground focus-within:ring-2 focus-within:ring-foreground">
            <input
              aria-label={t("profile.weight")}
              type="number"
              min="1"
              step="0.1"
              required
              value={draft.weight}
              onChange={(event) =>
                onDraftChange({ ...draft, weight: Number(event.target.value) })
              }
              className="min-w-0 flex-1 bg-transparent text-xs font-medium outline-none"
            />
            <span className="text-xs">kg</span>
          </span>
        </label>
      </div>

      {isDirty && (
        <div className="mt-5 flex flex-col items-center gap-2">
          <button
            type="submit"
            disabled={isSaving || draft.weight <= 0}
            className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? t("profile.saving") : t("profile.saveChanges")}
          </button>
          {saveError && (
            <p role="alert" className="text-sm text-red-400">
              {saveError}
            </p>
          )}
        </div>
      )}
    </form>
  );
}
