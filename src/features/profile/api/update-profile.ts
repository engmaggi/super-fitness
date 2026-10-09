import axios from "axios";
import { apiClient } from "@/lib/api-client";
import { clearAuthToken } from "@/lib/auth-token";
import type { AuthUser } from "../types/profile-type";

export type UpdateProfilePayload = Pick<
  AuthUser,
  | "firstName"
  | "lastName"
  | "email"
  | "gender"
  | "age"
  | "weight"
  | "height"
  | "activityLevel"
  | "goal"
>;

type UpdateProfileResponse = {
  message?: string;
  error?: string;
};

export async function updateProfile(
  profile: UpdateProfilePayload,
): Promise<void> {
  try {
    await apiClient.put<UpdateProfileResponse>("/v1/auth/editProfile", profile);
  } catch (error) {
    if (axios.isAxiosError<UpdateProfileResponse>(error)) {
      if (error.response?.status === 401) {
        clearAuthToken();
      }

      throw new Error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to update profile",
      );
    }

    throw error;
  }
}
