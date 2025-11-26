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
        const params = new URLSearchParams(location.search);
        const jwt = params.get("jwt");

        if (jwt) {
          navigate(`/signup?jwt=${encodeURIComponent(jwt)}`, {
            replace: true,
          });
          return;
        }

        const accessToken = await refreshAccessToken();
        if (!accessToken) {
          console.error("[LoginCallback] refresh 실패, accessToken 없음");
          navigate("/", { replace: true });
          return;
        }

        if (!API_BASE_URL) {
          console.warn(
            "VITE_API_BASE_URL 이 설정되지 않아 프로필 조회를 건너뜁니다."
          );
        } else {
          const profileRes = await fetch(
            `${API_BASE_URL.replace(/\/+$/, "")}/users/me/profile`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          console.log("[LoginCallback] profile status:", profileRes.status);
          if (profileRes.ok) {
            const profileBody = await profileRes.json();
            const data = profileBody.data ?? profileBody;

            const userFromApi = {
              username: data.username,
              nickname: data.nickname,
              grade: data.grade,
              phone: data.phone,
            };

            console.log("[LoginCallback] userFromApi:", userFromApi);
            setUser(userFromApi);
          } else {
            console.warn(
              "[LoginCallback] 프로필 조회 실패, Guest 유지:",
              profileRes.status
            );
          }
        }

        navigate("/home", { replace: true });
      } catch (err) {
        console.error("LoginCallback error:", err);
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
