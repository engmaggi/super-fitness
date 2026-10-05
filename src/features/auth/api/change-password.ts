import i18n from "@/lib/i18n";
import { getAuthToken } from "@/lib/auth-token";


// Base URL for the API
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Shape of the data this function needs to change a password
type ChangePasswordPayload = {
  password: string;
  newPassword: string;
};

export async function changePassword({ password, newPassword }: ChangePasswordPayload) {
  const token = getAuthToken();
  if (!token) {
    throw new Error(i18n.t("auth.errors.notAuthenticated"));
  }

  
  const res = await fetch(`${BASE_URL}/auth/change-password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password, newPassword }),
  });

  // If the request failed, stop here and let the caller show an error
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error ?? i18n.t("auth.errors.changePasswordFailed"));
  }
}
