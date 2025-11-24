import GuestButton from "../../../../components/user/login/GuestButton";
import LoginGoogle from "../../../../components/user/login/LoginGoogle";
import LoginKakao from "../../../../components/user/login/LoginKakao";
import Logo from "../../../../assets/Logo.svg";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-svh bg-white">
      <div className="flex items-center gap-[166px]">
        <div className="w-[286px] h-[286px] flex justify-center items-center">
          <img src={Logo} />
        </div>
        <section className="gap-[26px] flex flex-col px-10 py-15 w-[438px]">
          <div className="text-[22px]">
            <p className="font-[400]">간편하게 로그인하고</p>
            <p className="font-[600]">쭈불에서 즐거운 시간을 보내세요!</p>
          </div>
          <div className="flex flex-col gap-[41px]">
            <div className="flex flex-col gap-[10px]">
              <LoginGoogle />
              <LoginKakao />
              <p>네이버 로그인 버튼</p>
            </div>
            <div onClick={() => navigate("/home")}>
              <GuestButton />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
