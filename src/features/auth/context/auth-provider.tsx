import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  AUTH_SESSION_CLEARED_EVENT,
  clearAuthToken,
  getAuthToken,
} from "@/lib/auth-token";
import { getProfile } from "../../profile/api/get-profile";
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

  const logout = useCallback(() => {
    clearAuthToken();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null);
    setError(null);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!getAuthToken()) return;

    void Promise.resolve()
      .then(refreshUser)
      .catch((profileError: Error) => {
        console.error("Failed to restore the authenticated user", profileError);
      });
  }, [refreshUser]);

  useEffect(() => {
    const handleSessionCleared = () => {
      setUser(null);
      setError(null);
      setIsLoading(false);
    };

    window.addEventListener(AUTH_SESSION_CLEARED_EVENT, handleSessionCleared);
    return () =>
      window.removeEventListener(AUTH_SESSION_CLEARED_EVENT, handleSessionCleared);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, error, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
