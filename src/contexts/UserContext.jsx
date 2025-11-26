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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          // 토큰이 아예 없으면 그냥 Guest 상태 유지
          setUser(null);
          setError(null);
          return;
        }

        // ✅ 여기서는 절대 refresh를 다시 부르면 안 되므로 apiGetNoRefresh 사용
        const res = await apiGetNoRefresh("/users/me/profile");
        console.log("[User] API 응답 객체:", res);

        if (!res.ok) {
          throw new Error(`status=${res.status}`);
        }

        const body = await res.json();
        console.log("[User] API 응답 데이터:", body);

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
        console.error("UserProvider fetchUser error:", e);
        setUser(null);
        setError(null);
      }
    };

    fetchUser();
  }, []);

  const safeUser = user ?? FALLBACK_USER;

  const value = {
    user: safeUser,
    setUser, // Signup에서 setUser 호출하면 여기 user가 바로 바뀜
    error,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// 3) 편하게 쓰기 위한 커스텀 훅
export function useUser() {
  return useContext(UserContext);
}
