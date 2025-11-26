import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AUTH_SERVER = import.meta.env.VITE_AUTH_SERVER_URL;

export default function LoginCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const run = async () => {
      try {
        // 혹시 jwt 가 여기로 들어올 일 있으면 바로 회원가입으로 보내기 (방어코드)
        const params = new URLSearchParams(location.search);
        const jwt = params.get("jwt");
        if (jwt) {
          navigate(`/signup?jwt=${encodeURIComponent(jwt)}`, {
            replace: true,
          });
          return;
        }

        if (!AUTH_SERVER) {
          console.error("VITE_AUTH_SERVER_URL 이 설정되어 있지 않습니다.");
          navigate("/", { replace: true });
          return;
        }

        const base = AUTH_SERVER.replace(/\/+$/, "");
        const refreshUrl = `${base}/auth/token/refresh`;

        const res = await fetch(refreshUrl, {
          method: "POST",
          credentials: "include", // 쿠키 꼭 같이 보내기
        });

        console.log("[LoginCallback] refresh status:", res.status);

        if (!res.ok) {
          console.error("token refresh 실패:", res.status);
          navigate("/", { replace: true });
          return;
        }

        const body = await res.json();
        console.log("[LoginCallback] refresh 응답:", body);

        // 백엔드 응답 형태에 따라 유연하게 파싱
        const accessToken =
          body.data?.accessToken ??
          body.accessToken ??
          body.access_token ??
          null;

        if (!accessToken) {
          console.error("refresh 응답에 accessToken 없음");
          navigate("/", { replace: true });
          return;
        }

        localStorage.setItem("accessToken", accessToken);

        // UserProvider 가 /users/me/profile 을 다시 불러와서 user 채움
        navigate("/home", { replace: true });
      } catch (err) {
        console.error("LoginCallback error:", err);
        navigate("/", { replace: true });
      }
    };

    run();
  }, [location.search, navigate]);

  return (
    <div className="w-full min-h-svh flex items-center justify-center">
      <p className="text-[18px]">구글 계정으로 로그인 처리 중...</p>
    </div>
  );
}
