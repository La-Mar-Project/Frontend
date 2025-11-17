import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
      navigate("/home", { replace: true }); // 로그인 후 보낼 페이지
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="w-full min-h-svh flex items-center justify-center">
      <p className="text-[18px]">구글 계정으로 로그인 처리 중...</p>
    </div>
  );
}
