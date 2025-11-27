/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { apiGetNoRefresh, refreshAccessToken } from "../utils/api.js";

const FALLBACK_USER = {
  username: "Guest",
  nickname: "Guest",
  grade: "",
  phone: "",
  coupons: [],
};

// 1) Context 객체
const UserContext = createContext({
  user: null,
  setUser: () => {},
  error: null,
  reloadUser: () => {},
});

// 2) Provider 컴포넌트
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // 프로필 정보 전체
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      // 1) 먼저 localStorage에서 accessToken 확인
      let token = localStorage.getItem("accessToken");

      // 2) 없으면 한 번만 refresh 시도 (쿠키에 refresh_token 있으면 새 토큰 내려옴)
      if (!token) {
        console.log("[User] localStorage에 accessToken 없음 → refresh 시도");
        token = await refreshAccessToken();

        // refresh도 실패하면 진짜 비로그인 상태로 처리
        if (!token) {
          console.log("[User] refreshAccessToken 실패 → Guest 상태 유지");
          setUser(null);
          setError(null);
          return;
        }
      }

      // 3) 여기까지 왔으면 localStorage 에도 토큰 저장돼 있음
      const res = await apiGetNoRefresh("/users/me/profile");
      console.log("[User] /users/me/profile status:", res.status);

      if (!res.ok) {
        // (선택) 401 이면 토큰도 같이 정리해도 됨
        if (res.status === 401) {
          localStorage.removeItem("accessToken");
        }
        throw new Error(`status=${res.status}`);
      }

      const body = await res.json();
      console.log("[User] API 응답 데이터:", body);

      const data = body.data ?? body;

      console.log("[User] profile.nickname:", data.nickname);

      const userFromApi = {
        username: data.username,
        nickname: data.nickname,
        grade: data.grade,
        phone: data.phone,
        coupons: Array.isArray(data.coupons) ? data.coupons : [],
      };

      setUser(userFromApi);
      setError(null);
    } catch (e) {
      console.error("UserProvider fetchUser error:", e);
      setUser(null);
      setError(null);
    }
  }, []);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const safeUser = user ?? FALLBACK_USER;

  const value = {
    user: safeUser,
    setUser,
    error,
    reloadUser: fetchUser, // 👈 밖에서 다시 부를 수 있게 노출
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
