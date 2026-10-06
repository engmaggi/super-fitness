import axios from "axios";
import { apiClient } from "@/lib/api-client"; // adjust path if different
import i18n from "@/lib/i18n";

// Shape of the data this function needs to change a password
type ChangePasswordPayload = {
  password: string;
  newPassword: string;
};

export async function changePassword({ password, newPassword }: ChangePasswordPayload) {
  try {
    await apiClient.patch("/v1/auth/change-password", { password, newPassword });
  } catch (err) {
    const message = axios.isAxiosError(err) ? err.response?.data?.error : undefined;
    throw new Error(message ?? i18n.t("auth.errors.changePasswordFailed"));
  }
}