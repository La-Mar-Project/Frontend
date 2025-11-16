import LoginGoogle from "../../components/user/login/LoginGoogle";

const API = import.meta.env.VITE_REST_URL;

export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-svh bg-blue-primary">
      <div className="flex items-center gap-[166px]">
        <div className="rounded-full w-[286px] h-[286px] bg-gray-300 flex justify-center items-center">
          Logo
        </div>
        <section className="gap-7 flex flex-col px-10 py-15 w-[438px] h-[435px] bg-blue-login rounded-[20px]">
          <p className="text-[22px]">
            <p className="font-light">간편하게 로그인하고</p>
            <p>쭈불에서 즐거운 시간을 보내세요!</p>
          </p>
          <div className="flex flex-col gap-[10px]">
            <LoginGoogle />
          </div>
          <div className="flex flex-col gap-[7px]">
            <p className="text-center text-[18px] font-[100]">
              라마르 피싱이 처음이라면?
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
