import { getBrowserApiPath } from "./api";
import { getOrCreateGuestId } from "./guest-id";

const TOKEN_KEY = "project-news-auth-token";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function apiPath(path: string) {
  return getBrowserApiPath(path);
}

/**
 * Client-side fetch to the Express API. Uses dev HTTPS proxy when the page is HTTPS.
 */
export async function clientFetch<T>(
  path: string,
  init?: RequestInit
): Promise<{ ok: boolean; data?: T; error?: string; status: number }> {
  const url = getBrowserApiPath(path);
  if (typeof window !== "undefined" && !url) {
    return { ok: false, error: "API path not configured", status: 0 };
  }
  const headers = new Headers(init?.headers);
  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const t = getStoredToken();
  if (t) headers.set("Authorization", `Bearer ${t}`);

  const res = await fetch(url, {
    ...init,
    headers,
    credentials: "include",
  });
  const status = res.status;
  if (res.status === 204) {
    return { ok: res.ok, status, data: undefined as T };
  }
  const text = await res.text();
  let json: unknown;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    return { ok: false, error: text || "Invalid response", status };
  }
  if (!res.ok) {
    const err = (json as { error?: string })?.error ?? `Request failed (${status})`;
    return { ok: false, error: err, status };
  }
  return { ok: true, data: json as T, status };
}

/**
 * `multipart/form-data` upload (e.g. admin images). Do not set `Content-Type`—browser sets boundary.
 */
export async function clientFormData<T>(path: string, form: FormData): Promise<{
  ok: boolean;
  data?: T;
  error?: string;
  status: number;
}> {
  const url = getBrowserApiPath(path);
  if (typeof window !== "undefined" && !url) {
    return { ok: false, error: "API path not configured", status: 0 };
  }
  const headers = new Headers();
  const t = getStoredToken();
  if (t) headers.set("Authorization", `Bearer ${t}`);

  const res = await fetch(url, {
    method: "POST",
    body: form,
    headers,
    credentials: "include",
  });
  const status = res.status;
  const text = await res.text();
  let json: unknown;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    return { ok: false, error: text || "Invalid response", status };
  }
  if (!res.ok) {
    const err = (json as { error?: string })?.error ?? `Request failed (${status})`;
    return { ok: false, error: err, status };
  }
  return { ok: true, data: json as T, status };
}

export async function postPollVote(pollId: string, optionId: string) {
  const body: { optionId: string; guestId?: string } = { optionId };
  if (!getStoredToken()) {
    body.guestId = getOrCreateGuestId();
  }
  return clientFetch<{
    poll: { id: string; question: string; options: { id: string; text: string; count: number }[] };
  }>(`/api/polls/${encodeURIComponent(pollId)}/vote`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
