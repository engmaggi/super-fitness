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

export type ProfileDraft = Pick<AuthUser, "goal" | "activityLevel" | "weight">;

export type ProfileResponse = {
  message: string;
  user: Omit<AuthUser, "id">;
  error?: string;
};