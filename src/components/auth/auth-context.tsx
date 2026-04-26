"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiPath, clientFetch, getStoredToken, setStoredToken } from "@/lib/api-client";

export type NewsUser = {
  id: string;
  name: string;
  email?: string;
  picture?: string;
};

type AuthState = {
  user: NewsUser | null;
  ready: boolean;
  loading: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

function getAppId() {
  return process.env.NEXT_PUBLIC_FACEBOOK_APP_ID?.trim() ?? "";
}

let fbInitPromise: Promise<void> | null = null;

function ensureFacebookSdk() {
  if (fbInitPromise) return fbInitPromise;
  const appId = getAppId();
  if (!appId) {
    fbInitPromise = Promise.reject(new Error("NEXT_PUBLIC_FACEBOOK_APP_ID is not set"));
    return fbInitPromise;
  }
  if (typeof window === "undefined") {
    return Promise.reject(new Error("no window"));
  }
  if (window.FB) {
    return Promise.resolve();
  }
  fbInitPromise = new Promise<void>((resolve, reject) => {
    (window as unknown as { fbAsyncInit: () => void }).fbAsyncInit = () => {
      try {
        window.FB.init({
          appId,
          cookie: true,
          xfbml: false,
          version: "v19.0",
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    };
    if (document.getElementById("facebook-jssdk")) {
      reject(new Error("Facebook script already present but FB not ready"));
      return;
    }
    const s = document.createElement("script");
    s.id = "facebook-jssdk";
    s.async = true;
    s.defer = true;
    s.crossOrigin = "anonymous";
    s.src = "https://connect.facebook.net/en_US/sdk.js";
    s.onerror = () => reject(new Error("Facebook script failed to load"));
    document.body.appendChild(s);
  });
  return fbInitPromise;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<NewsUser | null>(null);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMe = useCallback(async (token: string) => {
    const res = await fetch(apiPath("/api/auth/me"), {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    });
    if (!res.ok) {
      setStoredToken(null);
      setUser(null);
      return;
    }
    const data = (await res.json()) as { user: NewsUser | null };
    setUser(data.user);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const t = getStoredToken();
      if (t) {
        try {
          await loadMe(t);
        } catch {
          if (!cancelled) setStoredToken(null);
        }
      }
      if (!cancelled) {
        setLoading(false);
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loadMe]);

  const login = useCallback(() => {
    if (typeof window !== "undefined" && window.location.protocol === "http:") {
      setError(
        "Facebook Login requires HTTPS. Use the dev script (HTTPS) and open https://localhost:3000 (accept the self-signed warning once)."
      );
      return;
    }
    if (!getAppId()) {
      setError("Facebook App ID is not configured.");
      return;
    }
    setError(null);
    setLoading(true);
    void (async () => {
      try {
        await ensureFacebookSdk();
        await new Promise<void>((resolve) => {
          window.FB.login(
            (r) => {
              void (async () => {
                if (r.status === "connected" && r.authResponse?.accessToken) {
                  const out = await clientFetch<{ token: string; user: NewsUser }>(
                    "/api/auth/facebook",
                    {
                      method: "POST",
                      body: JSON.stringify({ accessToken: r.authResponse.accessToken }),
                    }
                  );
                  if (!out.ok || !out.data) {
                    setError(out.error ?? "Login failed");
                    setLoading(false);
                    resolve();
                    return;
                  }
                  setStoredToken(out.data.token);
                  setUser(out.data.user);
                  setLoading(false);
                  resolve();
                  return;
                }
                setError("Facebook login was cancelled or not approved.");
                setLoading(false);
                resolve();
              })();
            },
            { scope: "public_profile,email" }
          );
        });
      } catch (e) {
        setError((e as Error).message);
        setLoading(false);
      }
    })();
  }, []);

  const logout = useCallback(() => {
    setStoredToken(null);
    setUser(null);
    if (window.FB) {
      window.FB.logout(() => undefined);
    }
  }, []);

  const value = useMemo<AuthState>(
    () => ({ user, ready, loading, error, login, logout }),
    [user, ready, loading, error, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const v = useContext(AuthContext);
  if (!v) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return v;
}
