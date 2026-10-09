import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/context/use-auth";
import { useProfile } from "../hooks/use-profile";
import type { AuthUser, ProfileDraft } from "../types/profile-type";
import { ProfileEditForm } from "./profile-edit-form";
import { ProfileErrorState, ProfileLoadingState } from "./profile-feedback";
import { ProfileGuestState } from "./profile-guest-state";
import { ProfileSettingsGrid } from "./profile-settings-grid";

function createProfileDraft(profile: AuthUser): ProfileDraft {
  return {
    goal: profile.goal,
    activityLevel: profile.activityLevel,
    weight: profile.weight,
  };
}

export default function ProfileGrid() {
  const { t } = useTranslation();
  const { user, isLoading: isAuthLoading } = useAuth();
  const {
    profile,
    isLoading,
    error,
    refetch,
    saveProfile,
    isSaving,
    saveError,
  } = useProfile(user !== null || isAuthLoading);
  const [draft, setDraft] = useState<ProfileDraft | null>(null);

  if (isAuthLoading && !user) return <ProfileLoadingState />;
  if (!user) return <ProfileGuestState />;
  if (isLoading) return <ProfileLoadingState />;
  if (error || !profile) {
    return (
      <ProfileErrorState error={error} onRetry={() => void refetch()} />
    );
  }

  const activeDraft = draft ?? createProfileDraft(profile);
  const isDirty =
    activeDraft.goal !== profile.goal ||
    activeDraft.activityLevel !== profile.activityLevel ||
    activeDraft.weight !== profile.weight;

  async function handleSave() {
    if (!profile) return;

    const saved = await saveProfile({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      gender: profile.gender,
      age: profile.age,
      height: profile.height,
      ...activeDraft,
    });

    if (saved) {
      setDraft(null);
      toast.success(t("profile.saved"));
    }
  }

  return (
    <main className="relative flex flex-1 flex-col items-center overflow-hidden px-5 pb-16 pt-24 sm:px-8 sm:pt-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_18%_22%,rgba(255,255,255,0.16),transparent_24%),radial-gradient(ellipse_at_83%_38%,rgba(255,106,0,0.08),transparent_30%),radial-gradient(ellipse_at_50%_85%,rgba(255,255,255,0.08),transparent_34%)]"
      />
      <div className="relative z-10 w-full max-w-4xl">
        <ProfileEditForm
          draft={activeDraft}
          isDirty={isDirty}
          isSaving={isSaving}
          saveError={saveError}
          onDraftChange={setDraft}
          onSave={() => void handleSave()}
        />
        <ProfileSettingsGrid />
      </div>
    </main>
  );
}
