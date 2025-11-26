import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../../../contexts/UserContext";
import { refreshAccessToken } from "../../../../utils/api";

const AUTH_SERVER = import.meta.env.VITE_AUTH_SERVER_URL;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function LoginCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUser();

  useEffect(() => {
    const run = async () => {
      try {
        console.log("[CB] 시작, location.search =", location.search);

        const params = new URLSearchParams(location.search);
        const jwt = params.get("jwt");

        // 1) 신규 유저 → 회원가입으로
        if (jwt) {
          console.log("[CB] jwt 감지 → signup으로 이동");
          navigate(`/signup?jwt=${encodeURIComponent(jwt)}`, {
            replace: true,
          });
          return;
        }

        // 2) 기존 유저 → refresh 로 accessToken 발급
        const accessToken = await refreshAccessToken();
        console.log("[CB] refresh 결과 accessToken 존재?", !!accessToken);

        if (!accessToken) {
          console.error("[CB] refresh 실패, accessToken 없음");
          navigate("/", { replace: true });
          return;
        }

        // 3) 순수 fetch 로 프로필 조회 (자동 refresh 절대 안 돌림)
        const base = API_BASE_URL.replace(/\/+$/, "");
        const profileUrl = `${base}/users/me/profile`;
        console.log("[CB] profile 요청 URL:", profileUrl);

        try {
          const profileRes = await fetch(profileUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });

          console.log("[CB] profile status:", profileRes.status);

          if (profileRes.ok) {
            const profileBody = await profileRes.json();
            console.log("[CB] profile body:", profileBody);

            const data = profileBody.data ?? profileBody;

            const userFromApi = {
              username: data.username,
              nickname: data.nickname,
              grade: data.grade,
              phone: data.phone,
            };

            console.log("[CB] setUser:", userFromApi);
            setUser(userFromApi);
          } else {
            console.warn(
              "[CB] 프로필 조회 실패, Guest 유지:",
              profileRes.status
            );
          }
        } catch (e) {
          console.error("[CB] 프로필 fetch 중 에러:", e);
        }

        // 4) 홈으로 이동
        console.log("[CB] /home 으로 navigate");
        navigate("/home", { replace: true });
      } catch (err) {
        console.error("[CB] 전체 에러:", err);
        navigate("/", { replace: true });
      }
    };

    run();
  }, [location.search, navigate, setUser]);

  return (
    <div className="w-full min-h-svh flex items-center justify-center">
      <p className="text-[18px]">구글 계정으로 로그인 처리 중...</p>
    </div>
  );
}
