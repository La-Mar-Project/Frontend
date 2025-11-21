import Kakao from "../../../assets/Kakao.png";
import React from "react";

const AUTH_SERVER = import.meta.env.VITE_AUTH_SERVER_URL;
console.log("AUTH_SERVER >>>", AUTH_SERVER); // 👈 이 줄 추가

export default function LoginKakao({ disabled }) {
  const handleClick = () => {
    if (disabled) return;

    if (!AUTH_SERVER) {
      console.error("VITE_AUTH_SERVER_URL이 설정되지 않았습니다.");
      alert(
        "AUTH 서버 URL이 설정되지 않았어요. .env의 VITE_AUTH_SERVER_URL을 확인해 주세요."
      );
      return;
    }

    // 인가 서버 문서: GET /auth/{provider}/start
    // provider = "google"
    const loginUrl = `${AUTH_SERVER}/auth/google/start`;

    console.log("Redirect to:", loginUrl);
    // 외부 도메인으로 바로 이동 → React Router 경로 매칭 안 건드림
    window.location.href = loginUrl;
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="flex justify-center"
    >
      <img src={Kakao} alt="Google" />
    </button>
  );
}
