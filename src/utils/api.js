/**
 * API 유틸리티 함수
 * 백엔드 API 호출을 위한 공통 함수들
 */
// === 기존 코드 상단 근처에 추가 ===

// 메인 API 말고, 인증 서버용
const AUTH_SERVER = import.meta.env.VITE_AUTH_SERVER_URL || "";
const IS_PROD = import.meta.env.PROD;

/**
 * refresh 토큰으로 accessToken 재발급 시도
 * 성공하면 새 accessToken 문자열을 리턴, 실패하면 null 리턴
 */
export const refreshAccessToken = async () => {
  try {
    let refreshUrl;
    if (IS_PROD && AUTH_SERVER) {
      const base = AUTH_SERVER.replace(/\/+$/, "");
      refreshUrl = `${base}/auth/token/refresh`; // prod
    } else {
      refreshUrl = "/auth/token/refresh"; // dev
    }
    console.log("[Auth] token refresh 요청:", refreshUrl);

    const res = await fetch(refreshUrl, {
      method: "POST",
      credentials: "include", // refresh 쿠키 보내야 함
    });

    console.log("[Auth] token refresh status:", res.status);

    if (!res.ok) {
      console.warn("token refresh 실패:", res.status);
      return null;
    }

    const data = await res.json().catch(() => ({}));
    console.log("[Auth] token refresh 응답 raw:", data);

    const headerToken = (() => {
      const auth =
        res.headers.get("authorization") || res.headers.get("Authorization");
      if (!auth) return null;
      const parts = auth.split(" ");
      return parts.length === 2 ? parts[1] : auth;
    })();

    const bodyToken =
      data?.data?.accessToken ??
      data?.accessToken ??
      data?.access_token ??
      null;

    const newToken = headerToken || bodyToken;

    if (!newToken) {
      console.warn(
        "token refresh 응답 어디에도 accessToken 없음 (헤더/바디 모두 없음)"
      );
      return null;
    }

    // 3) 로컬에 저장
    localStorage.setItem("accessToken", newToken);
    console.log(
      "[Auth] 새 accessToken 저장 완료:",
      newToken.slice(0, 20),
      "..."
    );
    return newToken;
  } catch (e) {
    console.error("token refresh 중 에러:", e);
    return null;
  }
};
// 환경 변수에서 API 기본 URL 가져오기
const API_BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_BASE_URL || ""
  : "/api";

/**
 * API 요청을 보내는 공통 함수
 * @param {string} endpoint - API 엔드포인트 (예: '/users/me/profile')
 * @param {object} options - fetch 옵션 (method, headers, body 등)
 *   - raw: true 이면 API_BASE_URL을 붙이지 않음
 * @returns {Promise<Response>}
 */
export const apiRequest = async (endpoint, options = {}) => {
  // raw 옵션 분리
  const { raw, _retry, withAuth = true, ...fetchOptions } = options;
  const method = (fetchOptions.method || "GET").toUpperCase();

  // 엔드포인트가 전체 URL이 아닌 경우 기본 URL 추가
  const url = endpoint.startsWith("http")
    ? endpoint
    : raw
    ? endpoint // raw === true → '/api' 안 붙임
    : `${API_BASE_URL}${endpoint}`;

  // 디버깅: API 요청 정보 출력
  console.log("[API Request]", {
    method,
    endpoint,
    url,
    API_BASE_URL,
    isProduction: import.meta.env.PROD,
    isDevelopment: import.meta.env.DEV,
  });

  // 기본 헤더 설정
  const defaultHeaders = {};

  if (fetchOptions.body != null) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  // 토큰이 있으면 Authorization 헤더 추가 (localStorage에서 가져오기)
  // api.js
  const token = withAuth ? localStorage.getItem("accessToken") : null;
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  // 옵션 병합
  const config = {
    ...fetchOptions,
    headers: {
      ...defaultHeaders,
      ...fetchOptions.headers,
    },
  };

  try {
    console.log("[API Request] 실제 요청 URL:", url);
    console.log("[API Request] 요청 설정:", config);
    console.log("[API Request] API_BASE_URL:", API_BASE_URL);

    let response = await fetch(url, config);
    console.log("[API Response]", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      url: response.url,
      headers: Object.fromEntries(response.headers.entries()),
    });
    // 위쪽은 그대로 두고, 401 처리 부분만 이렇게:

    if (response.status === 401 && !url.includes("/auth/token/refresh")) {
      console.warn("[API] 401 감지 → token refresh 시도");

      const newToken = await refreshAccessToken();

      if (newToken) {
        const retryConfig = {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${newToken}`,
          },
        };

        console.log("[API] 새 토큰으로 재시도:", url);
        response = await fetch(url, retryConfig);
      } else {
        console.warn("[API] token refresh 실패 → 원래 401 그대로 반환");
      }
    }
    // 응답 Content-Type 확인
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      // HTML 응답인 경우 (에러 페이지)
      if (contentType && contentType.includes("text/html")) {
        const text = await response.text();
        console.error(
          "API 서버가 HTML을 반환했습니다. 응답:",
          text.substring(0, 500)
        );
        throw new Error(
          `서버 오류: ${response.status} ${response.statusText}. API URL을 확인해주세요: ${url}`
        );
      }
    }

    return response;
  } catch (error) {
    console.error("API 요청 실패:", error);
    console.error("요청 URL:", url);
    console.error("API_BASE_URL:", API_BASE_URL);
    throw error;
  }
};

/**
 * GET 요청 (기본: /api prefix 붙음)
 */
export const apiGet = async (endpoint, headers = {}) => {
  return apiRequest(endpoint, {
    method: "GET",
    headers,
  });
};

export const apiGetPublic = async (endpoint, headers = {}) => {
  return apiRequest(endpoint, {
    method: "GET",
    headers,
    withAuth: false,
  });
};

/**
 * GET 요청 (raw: /api prefix 안 붙음, 프록시 타고 바로 서버로)
 *  예: apiGetRaw('/schedules/main?from=...&to=...')
 */
export const apiGetRaw = async (endpoint, headers = {}) => {
  return apiRequest(endpoint, {
    method: "GET",
    headers,
    raw: true,
  });
};

/**
 * POST 요청
 */
export const apiPost = async (endpoint, data, headers = {}) => {
  return apiRequest(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
};

/**
 * PUT 요청
 */
export const apiPut = async (endpoint, data, headers = {}) => {
  return apiRequest(endpoint, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });
};

/**
 * PATCH 요청
 */
export const apiPatch = async (endpoint, data, headers = {}) => {
  return apiRequest(endpoint, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  });
};

/**
 * DELETE 요청
 */
export const apiDelete = async (endpoint, headers = {}) => {
  return apiRequest(endpoint, {
    method: "DELETE",
    headers,
  });
};
