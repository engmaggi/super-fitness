import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getAuthToken } from "@/lib/auth-token";
import { getProfile } from "../api/get-profile";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Awaited<ReturnType<typeof getProfile>> | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(() => Boolean(getAuthToken()));
  const [error, setError] = useState<Error | null>(null);

  const refreshUser = useCallback(async () => {
    if (!getAuthToken()) {
      setUser(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      setUser(await getProfile());
    } catch (cause) {
      const profileError =
        cause instanceof Error
          ? cause
          : new Error("Failed to load user profile");
      setUser(null);
      setError(profileError);
      throw profileError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!getAuthToken()) return;

    void Promise.resolve()
      .then(refreshUser)
      .catch((profileError: Error) => {
        console.error("Failed to restore the authenticated user", profileError);
      });
  }, [refreshUser]);

  return (
    <AuthContext.Provider value={{ user, isLoading, error, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
