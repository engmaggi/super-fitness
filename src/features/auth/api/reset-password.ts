import i18n from "@/lib/i18n";

// Base URL for the API
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Shape of the data this function needs to reset a password
type ResetPasswordPayload = {
  email: string;
  newPassword: string;
};

export async function resetPassword({ email, newPassword }: ResetPasswordPayload) {
  // TODO: swap this fetch for the shared axios instance once it's ready
  // await apiClient.post(`${BASE_URL}/auth/resetPassword`, { email, newPassword })

  // Send the new password to the backend
  const res = await fetch(`${BASE_URL}/auth/resetPassword`, {
    method: "PUT", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, newPassword }),
  });

  // If the request failed, stop here and let the caller show an error
  if (!res.ok) {
    throw new Error(i18n.t("auth.errors.resetPasswordFailed"));
  }

}