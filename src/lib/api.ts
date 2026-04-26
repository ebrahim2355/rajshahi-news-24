/**
 * Public API base URL (browser or server). Set in `.env.local`:
 * `NEXT_PUBLIC_API_URL=http://localhost:5000`
 */
export function getApiBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:5000";
  }
  return "";
}
