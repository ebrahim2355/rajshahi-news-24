type FacebookUser = {
  id: string;
  name: string;
  email?: string;
  picture?: { data?: { url?: string } };
};

/**
 * Verifies a short‑lived user access token from the Facebook JavaScript SDK.
 * If FACEBOOK_APP_ID + FACEBOOK_APP_SECRET are set, uses debug_token; otherwise uses /me.
 */
export async function verifyFacebookAccessToken(
  accessToken: string
): Promise<FacebookUser | null> {
  const appId = process.env.FACEBOOK_APP_ID;
  const appSecret = process.env.FACEBOOK_APP_SECRET;

  if (appId && appSecret) {
    const debugUrl = new URL("https://graph.facebook.com/v19.0/debug_token");
    debugUrl.searchParams.set("input_token", accessToken);
    debugUrl.searchParams.set("access_token", `${appId}|${appSecret}`);
    const dbg = await fetch(debugUrl);
    const dbgData = (await dbg.json()) as { data?: { is_valid?: boolean; user_id?: string } };
    if (!dbgData.data?.is_valid) return null;
  }

  const meUrl = new URL("https://graph.facebook.com/v19.0/me");
  meUrl.searchParams.set("fields", "id,name,email,picture.type(large)");
  meUrl.searchParams.set("access_token", accessToken);
  const me = await fetch(meUrl);
  if (!me.ok) return null;
  return (await me.json()) as FacebookUser;
}
