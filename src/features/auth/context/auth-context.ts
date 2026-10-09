import { createContext } from "react";
import type { AuthUser } from "../api/get-profile";

export type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  refreshUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
