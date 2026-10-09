import { useCallback, useEffect, useState } from "react";
import { getProfile } from "../api/get-profile";
import type { AuthUser } from "../types/profile-type";
import { updateProfile, type UpdateProfilePayload } from "../api/update-profile";

export function useProfile(enabled = true) {
  const [profile, setProfile] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const user = await getProfile();
      setProfile(user);
    } catch (cause) {
      setProfile(null);
      setError(
        cause instanceof Error ? cause.message : "Unable to load profile data.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveProfile = useCallback(async (updatedProfile: UpdateProfilePayload) => {
    setIsSaving(true);
    setSaveError(null);

    try {
      await updateProfile(updatedProfile);
      setProfile((currentProfile) =>
        currentProfile ? { ...currentProfile, ...updatedProfile } : currentProfile,
      );
      return true;
    } catch (cause) {
      setSaveError(
        cause instanceof Error ? cause.message : "Unable to save profile changes.",
      );
      return false;
    } finally {
      setIsSaving(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    void Promise.resolve().then(loadProfile);
  }, [enabled, loadProfile]);

  return {
    profile,
    isLoading,
    error,
    refetch: loadProfile,
    saveProfile,
    isSaving,
    saveError,
  };
}
