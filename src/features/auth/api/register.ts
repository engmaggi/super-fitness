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

type RegisterResponse = {
  message?: string;
  token?: string;
  error?: string;
};

export async function register(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  const res = await fetch(`${BASE_URL}/v1/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data: RegisterResponse | null = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || data?.message || "Failed to register");
  }

  return data ?? {};
}