import imgGoogle from "../../../assets/Google.svg";

const AUTH_SERVER = import.meta.env.VITE_AUTH_SERVER_URL;
const IS_PROD = import.meta.env.PROD;

export default function LoginGoogle({ disabled }) {
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
      loginUrl = `${base}/auth/google/start`;
    } else {
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
