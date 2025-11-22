import imgGoogle from "../../../assets/Google.svg";
import React from "react";

const AUTH_SERVER = import.meta.env.VITE_AUTH_SERVER_URL;
const IS_PROD = import.meta.env.PROD;

export default function LoginGoogle({ disabled }) {
  const handleClick = () => {
    if (disabled) return;

    let loginUrl = "";

    if (IS_PROD) {
      // ✅ 배포 환경: AUTH 서버 도메인 사용
      if (!AUTH_SERVER) {
        console.error("VITE_AUTH_SERVER_URL이 설정되지 않았습니다.");
        alert(
          "AUTH 서버 URL이 설정되지 않았어요. .env의 VITE_AUTH_SERVER_URL을 확인해 주세요."
        );
        return;
      }

      const base = AUTH_SERVER.replace(/\/+$/, "");
      loginUrl = `${base}/auth/google/start`;
    } else {
      // ✅ 개발 환경: Vite 프록시 타도록 상대 경로 사용
      //  http://localhost:5177/auth/google/start → proxy → https://jjubul-auth.duckdns.org/auth/google/start
      loginUrl = "/auth/google/start";
    }

    console.log("Redirect to:", loginUrl);
    window.location.href = loginUrl;
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="flex justify-between cursor-pointer bg-[#FFFFFF] border border-gray-mid-b text-[18px] py-[10px] pl-[20px] pr-[100px] rounded-[10px] items-center w-auto font-[500]"
      style={{ opacity: disabled ? 0.6 : 1 }}
    >
      <div className="w-[30px]">
        <img src={imgGoogle} alt="Google" />
      </div>
      <p>구글로 로그인하기</p>
    </button>
  );
}
