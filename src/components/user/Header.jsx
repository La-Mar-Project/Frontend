import Logoblue from "../../assets/LogoBlue.svg";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { setAccessToken } from "../../utils/api";

const justifyMap = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

const AUTH_SERVER = import.meta.env.VITE_AUTH_SERVER_URL || "";
const IS_PROD = import.meta.env.PROD;

const LOGOUT_PATH = "/auth/logout";

export default function Header({ showLogo = true, actionsAlign = "right" }) {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogout = async () => {
    try {
      // 1) 로그아웃 URL 만들기
      let logoutUrl = "";

      if (IS_PROD && AUTH_SERVER) {
        const base = AUTH_SERVER.replace(/\/+$/, "");
        logoutUrl = `${base}${LOGOUT_PATH}`;
      } else {
        logoutUrl = LOGOUT_PATH;
      }

      console.log("[Logout] 요청 URL:", logoutUrl);

      // 2) 로그아웃 요청 (쿠키 포함)
      const res = await fetch(logoutUrl, {
        method: "POST",
        credentials: "include", // 🔥 refresh_token 쿠키 같이 감
      });

      console.log("[Logout] status:", res.status);

      // 3) accessToken / user 상태 정리
      setAccessToken(null);
      setUser(null);

      // 4) 메인(로그인) 화면으로 보내기
      navigate("/", { replace: true });
    } catch (e) {
      console.error("로그아웃 요청 중 에러:", e);
      setAccessToken(null);
      setUser(null);
      navigate("/", { replace: true });
    }
  };
  return (
    <div className="grid grid-cols-3">
      <div />

      {showLogo && (
        <div className="h-[250px] w-full flex justify-center items-center">
          <img src={Logoblue} alt="Logo" className="w-[347px] h-auto" />
        </div>
      )}

      <div
        className={[
          !showLogo ? "col-start-3" : "",
          "my-[11px] mr-5 shrink-0 flex items-start text-[18px] gap-[15px]",
          justifyMap[actionsAlign] ?? justifyMap.right,
        ].join(" ")}
      >
        <button
          className="p-[10px] cursor-pointer shrink-0"
          onClick={() => navigate("/main/mypage")}
        >
          마이페이지
        </button>
        <button
          className="p-[10px] cursor-pointer shrink-0"
          onClick={handleLogout}
        >
          로그아웃
        </button>
        <button
          className="p-[10px] cursor-pointer shrink-0"
          onClick={() => navigate("/")}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
