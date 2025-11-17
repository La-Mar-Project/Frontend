/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

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
    // 🔹 지금은 더미 데이터만 세팅
    //    나중에 여기에서 /api/users/me/profile 호출로 교체하면 됨
    const fetchUser = async () => {
      try {
        // TODO: 백엔드 살아나면 실제 API 호출로 바꾸기
        // const res = await fetch("/api/users/me/profile");
        // const body = await res.json();
        // const data = body.data;

        const dummy = {
          username: "김준수",
          nickname: "쭈불",
          grade: "일반",
          phone: "010-1234-1234",
        };

        setUser(dummy);
      } catch (e) {
        console.error("UserProvider fetchUser error:", e);
        setError("유저 정보를 불러오지 못했습니다.");
      }
    };

    fetchUser();
  }, []);

  const value = {
    user,
    setUser, // 나중에 닉네임 수정 등에서 쓸 수 있게 열어둠
    error,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// 3) 편하게 쓰기 위한 커스텀 훅
export function useUser() {
  return useContext(UserContext);
}
