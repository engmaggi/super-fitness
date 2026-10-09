import axios from "axios";
import { apiClient } from "@/lib/api-client";
import { setAuthToken } from "@/lib/auth-token";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  message?: string;
  token?: string;
  error?: string;
};

export async function login({ email, password }: LoginPayload) {
  try {
    const { data } = await apiClient.post<LoginResponse>("/v1/auth/signin", {
      email,
      password,
    });

    if (!data.token) {
      throw new Error(data.error || data.message || "Failed to login");
    }

    setAuthToken(data.token);
    return data;
  } catch (err) {
    if (axios.isAxiosError<LoginResponse>(err)) {
      throw new Error(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to login",
      );
    }
    throw err;
  }
}