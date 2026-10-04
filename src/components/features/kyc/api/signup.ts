export interface SignupPayload {
  firstName: string
  lastName: string
  email: string
  password: string
  rePassword: string
  gender: "male" | "female"
  height: number
  weight: number
  age: number
  goal: string
  activityLevel: string
}

export interface SignupResponse {
  message: string
  token?: string
}

export async function signup(payload: SignupPayload): Promise<SignupResponse> {
  const res = await fetch("https://fitness.elevateegy.com/api/v1/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const data = (await res.json()) as SignupResponse

  if (!res.ok) {
    throw new Error((data as { message?: string }).message ?? "Signup failed")
  }

  return data
}
