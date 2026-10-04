// Base URL for the API
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Shape of the data this function needs to reset a password
type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  gender: string;
  height: number;
  weight: number;
  age: number;
  goal: string;
  activityLevel: string;
};

export async function register({ firstName, lastName, email, password, rePassword, gender, height, weight, age, goal, activityLevel }: RegisterPayload) {
  // TODO: swap this fetch for the shared axios instance once it's ready
  // await apiClient.post(`${BASE_URL}/auth/resetPassword`, { email, newPassword })

  // Send the new password to the backend
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, password, rePassword, gender, height, weight, age, goal, activityLevel }),
  });

  const data = await res.json().catch(() => null);

  // If the request failed, stop here and let the caller show an error
  if (!res.ok) {
    throw new Error(data?.error || data?.message || "Failed to register");
  }

  return data;
}