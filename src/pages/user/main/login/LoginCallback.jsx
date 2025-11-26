import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../../../contexts/UserContext";
import { refreshAccessToken, apiGet } from "../../../../utils/api";

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

        try {
          const profileRes = await apiGet("/users/me/profile");
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
            setUser(userFromApi); // ✅ 여기서 UserContext 갱신
          } else {
            console.warn(
              "[LoginCallback] 프로필 조회 실패, Guest 유지:",
              profileRes.status
            );
          }
        } catch (e) {
          console.error("[LoginCallback] 프로필 조회 중 에러:", e);
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
