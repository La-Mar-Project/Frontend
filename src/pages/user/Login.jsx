import LoginButton from "../../components/user/login/LoginButton";

export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-svh bg-blue-primary">
      <div className="flex items-center gap-[166px]">
        <div className="rounded-full w-[286px] h-[286px] bg-gray-300 flex justify-center items-center">
          Logo
        </div>
        <sectiion className="gap-7 flex flex-col px-10 py-15 w-[438px] h-[435px] bg-blue-login rounded-[20px]">
          <p>
            간편하게 로그인하고
            <br />
            쭈불에서 즐거운 시간을 보내세요!
          </p>
          <button className="flex flex-col gap-[10px]">
            <LoginButton text="카카오로 로그인하기" bgcolor="blue-500" />
            <LoginButton text="비회원으로 확인할래요" bgcolor="blue-500" />
          </button>
        </sectiion>
      </div>
    </div>
  );
}
