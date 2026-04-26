export type FacebookAuthResponse = {
  accessToken: string;
  userID: string;
  expiresIn: number;
  signedRequest: string;
  graphDomain: string;
  data_access_expiration_time: number;
};

export type FbLoginStatus = "connected" | "not_authorized" | "unknown";

export type FacebookUser = { id: string; name: string; email?: string; picture?: { data: { url: string } } };

declare global {
  interface Window {
    FB: {
      init: (o: { appId: string; cookie: boolean; xfbml: boolean; version: string }) => void;
      login: (
        cb: (r: { authResponse?: FacebookAuthResponse; status: FbLoginStatus }) => void,
        o?: { scope: string; return_scopes?: boolean; auth_type?: string }
      ) => void;
      getLoginStatus: (cb: (r: { authResponse?: FacebookAuthResponse; status: FbLoginStatus }) => void) => void;
      logout: (cb: () => void) => void;
    };
  }
}

export {};
