import { useState } from "react";
import Maincompoenent from "../../../../components/user/main/Maincomponent";
import Logoblue from "../../../assets/LogoBlue.svg";
import Ship from "./Ship";

export default function Intro() {
  const [view, setView] = useState("Intro");

  return (
    <div className="grid grid-cols-[1.5fr_5fr] grid-rows-[159px_1fr]">
      <div className="flex justify-center items-center border-r-2 border-b-2 text-center text-[30px] font-[700] px-14 py-14 text-logocolor">
        중요공지 확인하기
      </div>

      <div className="row-span-2">
        {view === "Intro" ? (
          <>
            <div className="px-[70px]">
              <div className="text-textblack pt-[45px] pb-10 pl-[58px] pr-[27px] flex flex-col justify-center h-[159px] border-b-2 border-linecolor2">
                <p className="text-[30px]">⭐️ 중요 공지 확인 필수 ⭐️</p>
                <div className="text-[20px] flex justify-between">
                  <p>꼼꼼히 읽어주시고 승선 부탁드립니다!</p>
                  <p className="text-gray">최종수정 : 2025.00.00</p>
                </div>
              </div>
            </div>
            <section className="flex flex-col gap-[30px] pl-[70px] pr-[79px] pt-[50px] pb-[150px]">
              <Maincompoenent
                num="1"
                title="쭈불 카페"
                text="중요한 공지사항은 카페를 통해 안내하고 있습니다."
                link="http://cafe.naver.com/lamarfishing"
              />
              <Maincompoenent
                num="2"
                title="2025년 쭈불호 승선 전 필독 공지"
                text="중요한 공지사항은 카페를 통해 안내하고 있습니다."
                link="http://cafe.naver.com/lamarfishing"
              />
              <Maincompoenent
                num="3"
                title="1일 전 자리번호 안내"
                text="중요한 공지사항은 카페를 통해 안내하고 있습니다."
                link="http://cafe.naver.com/lamarfishing"
              />
              <Maincompoenent
                num="4"
                title="쭈갑예약 대기 관련"
                text="중요한 공지사항은 카페를 통해 안내하고 있습니다."
              />
              <Maincompoenent
                num="5"
                title="자리 배정 방법, 시작번호 추천 알림"
                text="중요한 공지사항은 카페를 통해 안내하고 있습니다."
                link="http://cafe.naver.com/lamarfishing"
              />
              <Maincompoenent
                num="6"
                title="출조점 관련"
                text="중요한 공지사항은 카페를 통해 안내하고 있습니다."
              />
              <Maincompoenent
                num="7"
                title="자리 배치도"
                text="중요한 공지사항은 카페를 통해 안내하고 있습니다."
              />
              <Maincompoenent
                num="8"
                title="선예약 운영 관련 정보"
                text="중요한 공지사항은 카페를 통해 안내하고 있습니다."
                link="http://cafe.naver.com/lamarfishing"
              />
            </section>
          </>
        ) : (
          <Ship />
        )}
      </div>

      <div className="flex flex-col border-r-2 justify-between">
        <div className="text-[20px] text-textblack py-5 pl-10 flex flex-col justify-center items-start gap-[6px]">
          <div className="flex gap-4">
            <p>•</p>
            <button
              type="button"
              onClick={() => setView("Intro")}
              className={`hover:underline hover:font-semibold cursor-pointer ${
                view === "Intro" ? "font-semibold underline" : ""
              }`}
            >
              ⭐️ 중요 공지 확인 필수 ⭐️
            </button>
          </div>
          <div className="flex gap-4">
            <p>•</p>
            <button
              type="button"
              onClick={() => setView("Ship")}
              className={`hover:underline hover:font-semibold cursor-pointer ${
                view === "Ship" ? "font-semibold underline" : ""
              }`}
            >
              취소/환불 안내글
            </button>
          </div>
        </div>
        <div className="py-[50px] px-[110px] flex justify-center items-center">
          <img src={Logoblue} alt="logo" />
        </div>
      </div>
    </div>
  );
}
