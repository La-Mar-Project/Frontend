const AUTH_SERVER = import.meta.env.VITE_AUTH_SERVER_URL || "";
const IS_PROD = import.meta.env.PROD;

export async function requestLogout() {
  const LOGOUT_PATH = "/auth/logout";

  let logoutUrl = "";

  if (IS_PROD && AUTH_SERVER) {
    const base = AUTH_SERVER.replace(/\/+$/, "");
    logoutUrl = `${base}${LOGOUT_PATH}`;
  } else {
    // dev: Vite proxy 로 auth 서버 타게
    logoutUrl = LOGOUT_PATH;
  }

  console.log("[Logout] 호출 URL:", logoutUrl);

  const res = await fetch(logoutUrl, {
    method: "POST",
    credentials: "include",
  });

  // 204 같은 빈 응답일 수도 있어서 body는 옵션
  let body = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }

  console.log("[Logout] status:", res.status, "body:", body);
  return { res, body };
}
