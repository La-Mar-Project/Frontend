/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { apiGetNoRefresh } from "../utils/api.js";

const FALLBACK_USER = {
  username: "Guest",
  nickname: "Guest",
  grade: "",
  phone: "",
};

// 1) Context 객체
const UserContext = createContext({
  user: null,
  setUser: () => {},
  error: null,
});

// 2) Provider 컴포넌트
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // 프로필 정보 전체
  const [error, setError] = useState(null);

  const loadUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.log("[UserProvider] accessToken 없음 → Guest");
        setUser(null);
        setError(null);
        return;
      }

      const res = await apiGetNoRefresh("/users/me/profile");
      console.log("[UserProvider] /users/me/profile status:", res.status);

      if (!res.ok) {
        throw new Error(`status=${res.status}`);
      }

      const body = await res.json();
      console.log("[UserProvider] 응답 데이터:", body);

      const data = body.data ?? body;

      const userFromApi = {
        username: data.username,
        nickname: data.nickname,
        grade: data.grade,
        phone: data.phone,
      };

      setUser(userFromApi);
      setError(null);
    } catch (e) {
      console.error("[UserProvider] loadUser error:", e);
      setUser(null);
      setError(e);
    }
  };

  useEffect(() => {
    // 1) 앱 최초 마운트 시 한 번
    loadUser();

    // 2) 🔥 accessToken 이 바뀔 때마다 다시 로딩
    const handler = () => {
      console.log("[UserProvider] access-token-changed 이벤트 수신 → reload");
      loadUser();
    };
    window.addEventListener("access-token-changed", handler);

    return () => {
      window.removeEventListener("access-token-changed", handler);
    };
  }, []); // loadUser는 내부에서 정의된 함수라 여기 deps 비워도 OK (lint 끄는 중)

  const safeUser = user ?? FALLBACK_USER;

  const value = {
    user: safeUser,
    setUser,
    error,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
