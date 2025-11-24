// src/pages/user/main/login/LoginCallback.jsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AUTH_SERVER = import.meta.env.VITE_AUTH_SERVER_URL;
const IS_PROD = import.meta.env.PROD;

export default function LoginCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const run = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");

      if (!code) {
        console.error("Google OAuth code 없음");
        navigate("/", { replace: true });
        return;
      }

      try {
        // dev/production 환경에 따라 콜백 URL 만들기
        let callbackUrl = "";
        if (IS_PROD) {
          const base = AUTH_SERVER.replace(/\/+$/, "");
          callbackUrl = `${base}/auth/google/callback?code=${encodeURIComponent(
            code
          )}`;
        } else {
          // Vite 프록시 타게 상대 경로
          callbackUrl = `/auth/google/callback?code=${encodeURIComponent(
            code
          )}`;
        }

        const res = await fetch(callbackUrl, {
          method: "GET",
          credentials: "include",
        });

        // 🔴 404 = 회원가입 안 된 유저
        if (res.status === 404) {
          let body = null;
          try {
            body = await res.json();
          } catch {
            body = null;
          }

          const provider = body?.provider;
          const sub = body?.sub;

          console.log("신규 소셜 유저:", body);

          // provider/sub를 들고 회원가입 페이지로 이동
          navigate("/signup", {
            replace: true,
            state: { provider, sub },
          });
          return;
        }

        // 그 외 에러
        if (!res.ok) {
          console.error("google callback error:", res.status);
          navigate("/", { replace: true });
          return;
        }

        // ✅ 기존 회원: 토큰 등 받기
        const data = await res.json();
        console.log("기존 회원 callback data:", data);

        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }
        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
        }

        // 필요하면 여기서 사용자 정보도 Context에 세팅 가능
        // setUser(data.profile) 같은 거

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
