/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
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
  reloadUser: () => {},
});

// 2) Provider 컴포넌트
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // 프로필 정보 전체
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setUser(null);
        setError(null);
        return;
      }

      const res = await apiGetNoRefresh("/users/me/profile");
      console.log("[User] /users/me/profile status:", res.status);

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
