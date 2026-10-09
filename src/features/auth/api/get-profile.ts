import axios from "axios";
import { apiClient } from "@/lib/api-client";
import { clearAuthToken } from "@/lib/auth-token";

export type AuthUser = {
  id: string;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  activityLevel: string;
  goal: string;
  photo: string;
  createdAt: string;
};

type ProfileResponse = {
  message: string;
  user: Omit<AuthUser, "id">;
  error?: string;
};

export async function getProfile(): Promise<AuthUser> {
  try {
    const { data } = await apiClient.get<ProfileResponse>(
      "/v1/auth/profile-data",
    );

    if (!data.user?._id) {
      throw new Error(data.error || "Profile response did not include a user ID");
    }

    return { ...data.user, id: data.user._id };
  } catch (error) {
    if (axios.isAxiosError<ProfileResponse>(error)) {
      if (error.response?.status === 401) {
        clearAuthToken();
      }

      throw new Error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to load user profile",
      );
    }

    throw error;
  }
}
