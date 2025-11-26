import GuestButton from "../../../../components/user/login/GuestButton";
import LoginGoogle from "../../../../components/user/login/LoginGoogle";
import LoginKakao from "../../../../components/user/login/LoginKakao";
import LoginNaver from "../../../../components/user/login/LoginNaver";
import Logo from "../../../../assets/Logo.svg";
import LoginDesign1 from "../../../../assets/LoginDesign1.svg";
import LoginDesign2 from "../../../../assets/LoginDesign2.svg";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../contexts/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleGuestClick = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null); // 비회원이므로 user 날려주기

    navigate("/home");
  };

  return (
    <div className="flex flex-col min-h-svh bg-white">
      <img src={LoginDesign1} alt="Login Design 1" />
      <div className="flex justify-center items-center gap-[166px]">
        <div className="w-[286px] h-[286px] flex justify-center items-center">
          <img src={Logo} />
        </div>
        <section className="gap-[26px] flex flex-col px-10 py-auto w-[438px]">
          <div className="text-[22px]">
            <p className="font-[400]">간편하게 로그인하고</p>
            <p className="font-[600]">쭈불에서 즐거운 시간을 보내세요!</p>
          </div>
          <div className="flex flex-col gap-[41px]">
            <div className="flex flex-col gap-[10px]">
              <LoginGoogle />
              <LoginKakao />
              <LoginNaver />
            </div>
            <div onClick={() => navigate("/home")}>
              <GuestButton onClick={handleGuestClick} />
            </div>
          </div>
        </section>
      </div>
      <img
        src={LoginDesign2}
        alt="Login Design 2"
        className="absolute bottom-0 left-0 w-full"
      />
    </div>
  );
}
