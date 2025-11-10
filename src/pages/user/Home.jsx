import Header from "../../components/user/Header";
import Logoblue from "../../assets/LogoBlue.svg";
import Footer from "../../components/user/Footer";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const Textstyle =
    "hover:bg-skylight hover:text-logocolor cursor-pointer text-[30px] text-logocolor border border-logocolor border-2 bg-white flex justify-center items-center rounded-[20px] w-auto h-auto";

  return (
    <div className="min-h-svh">
      <Header showLogo={false} actionsAlign="right" />

      <div className="gap-[50px] px-[96px] py-[45px] flex h-[382px] w-full bg-skylighest">
        <div className="flex justify-center items-center">
          <img src={Logoblue} className="h-[94px] w-auto" />
        </div>
        <div className="flex flex-col gap-[26px] font-[400] w-full">
          <div className="flex flex-col items-start text-[24px]">
            <div className="flex gap-2 text-[26px] items-end">
              안녕하세요
              <div className="flex items-end">
                <p className="text-[28px] font-semibold">User</p>
                님!
              </div>
            </div>
            출항할 준비가 되셨나요?
          </div>
          <section className="grid grid-cols-3 gap-3 h-[204px] w-auto">
            <div className={Textstyle} onClick={() => navigate("/main/notice")}>
              중요공지 확인하기
            </div>
            <div className={Textstyle}>쭈불 카페가기</div>
            <div
              className={`${Textstyle} row-span-2`}
              onClick={() => navigate("/main/mypage/history")}
            >
              예약 정보 조회
            </div>
            <div className={Textstyle}>조과글 확인하기</div>
            <div className={Textstyle} onClick={() => navigate("/main/mypage")}>
              마이페이지
            </div>
          </section>
        </div>
      </div>
      <section className="grid grid-cols-[1fr_3.5fr]">
        <div className="flex justify-center items-center col-span-2 h-[382px] py-[48px]">
          예약 달력
        </div>
        <div className="border-r-2 border-linecolor">
          <div className="bg-skymid">광고배너</div>
          <div className="py-[50px] px-[110px] flex justify-center items-center">
            <img src={Logoblue} alt="logo" />
          </div>
        </div>
        <div>Calendar</div>
      </section>
      <Footer />
    </div>
  );
}
