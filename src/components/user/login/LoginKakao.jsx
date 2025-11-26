import Kakao from "../../../assets/Kakao.svg";

const AUTH_SERVER = import.meta.env.VITE_AUTH_SERVER_URL;
const IS_PROD = import.meta.env.PROD;

export default function LoginKakao({ disabled }) {
  const handleClick = () => {
    if (disabled) return;

    let loginUrl = "";

    if (IS_PROD) {
      if (!AUTH_SERVER) {
        console.error("VITE_AUTH_SERVER_URL이 설정되지 않았습니다.");
        alert(".env의 VITE_AUTH_SERVER_URL을 확인해 주세요.");
        return;
      }

      const base = AUTH_SERVER.replace(/\/+$/, "");
      loginUrl = `${base}/auth/kakao/start`;
    } else {
      loginUrl = "/auth/kakao/start";
    }

    console.log("Redirect to:", loginUrl);
    window.location.href = loginUrl;
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="flex justify-between cursor-pointer bg-[#FEE500] text-[18px] py-[10px] pl-[24px] pr-[120px] rounded-[10px] items-center w-auto font-[500]"
      style={{ opacity: disabled ? 0.6 : 1 }}
    >
      <div className="w-[25px]">
        <img src={Kakao} alt="Kakao" />
      </div>
      <p>카카오 로그인</p>
    </button>
  );
}
