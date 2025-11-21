/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
// 🔹 0) user가 없을 때 사용할 기본 유저
const FALLBACK_USER = {
  username: "User",
  nickname: "User",
  grade: "",
  phone: "",
};

// 1) Context 객체
const UserContext = createContext({
  user: null,
  setUser: () => {},
  error: null,
});

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_SERVER_URL;

// 2) Provider 컴포넌트
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // 프로필 정보 전체
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 1) 실제 APIDog 목 서버로 호출
        const res = await fetch(`${AUTH_BASE_URL}/users/me/profile`, {
          method: "GET",
        });

        console.log("[User] API 응답 객체:", res);

        if (!res.ok) {
          throw new Error(`status=${res.status}`);
        }

        // 2) JSON 파싱
        const body = await res.json();
        console.log("[User] API 응답 데이터:", body);

        // 3) 응답 구조에 따라 data 꺼내기
        //    (body 안에 data가 있으면 body.data, 없으면 body 그대로 사용)
        const data = body.data ?? body;

        // 4) 우리 컴포넌트에서 쓸 모양으로 정리
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
        setError("유저 정보를 불러오지 못했습니다.");
      }
    };
    //   const dummy = {
    //     username: "김준수",
    //     nickname: "쭈불",
    //     grade: "일반",
    //     phone: "010-1234-1234",
    //   };

    //   setUser(dummy);
    // } catch (e) {
    //   console.error("UserProvider fetchUser error:", e);
    //   setError("유저 정보를 불러오지 못했습니다.");
    // }

    fetchUser();
  }, []);

  // 🔹 항상 null이 아닌 user를 넘기도록 보정
  const safeUser = user ?? FALLBACK_USER;

  const value = {
    user: safeUser,
    setUser, // 나중에 닉네임 수정 등에서 쓸 수 있게 열어둠
    error,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// 3) 편하게 쓰기 위한 커스텀 훅
export function useUser() {
  return useContext(UserContext);
}
