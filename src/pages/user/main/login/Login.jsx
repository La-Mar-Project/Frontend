import LoginGoogle from "../../../../components/user/login/LoginGoogle";
import LoginKakao from "../../../../components/user/login/LoginKakao";

const API = import.meta.env.VITE_REST_URL;

export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-svh bg-white">
      <div className="flex items-center gap-[166px]">
        <div className="rounded-full w-[286px] h-[286px] bg-gray-300 flex justify-center items-center">
          Logo
        </div>
        <section className="gap-[26px] flex flex-col px-10 py-15 w-[438px]">
          <p className="text-[22px]">
            <p className="font-[400]">간편하게 로그인하고</p>
            <p className="font-[600]">쭈불에서 즐거운 시간을 보내세요!</p>
          </p>
          <div className="flex flex-col gap-[41px]">
            <div className="flex flex-col gap-[10px]">
              <LoginGoogle />
              <LoginKakao />
              <p>네이버 로그인 버튼</p>
            </div>
            비회원로그인 버튼 추후 추가
          </div>
        </section>
      </div>
    </div>
  );
}
