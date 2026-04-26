/**
 * Direct Express base URL (server-side `fetch` only — never mixed-content in the browser).
 * Set `API_URL` in production, or `NEXT_PUBLIC_API_URL`, or rely on dev default.
 */
export function getServerApiBaseUrl(): string {
  const a = process.env.API_URL?.replace(/\/$/, "");
  if (a) return a;
  const b = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (b) return b;
  if (process.env.NODE_ENV === "development") {
    return "http://127.0.0.1:5000";
  }
  return "";
}

/**
 * @deprecated Use `getServerApiBaseUrl` for RSC. Kept for older imports in server code.
 */
export function getApiBaseUrl(): string {
  return getServerApiBaseUrl();
}

/**
 * In the browser, calls the API without mixed-content: same-origin `/_pnews_api/*` rewrites
 * to Express in dev, or your HTTPS `NEXT_PUBLIC_API_URL` in production.
 */
export function getBrowserApiPath(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (typeof window === "undefined") {
    return `${getServerApiBaseUrl()}${p}`;
  }
  const fromEnv = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  const pageIsHttps = window.location.protocol === "https:";
  const envIsHttp = fromEnv?.startsWith("http://");
  if (pageIsHttps && (envIsHttp || !fromEnv)) {
    return `/_pnews_api${p}`;
  }
  if (fromEnv) {
    return `${fromEnv}${p}`;
  }
  if (pageIsHttps) {
    return `/_pnews_api${p}`;
  }
  if (!fromEnv) {
    return `http://127.0.0.1:5000${p}`;
  }
  return `${fromEnv}${p}`;
}
