import Info from "./Info"; // 경로는 프로젝트 구조에 맞게 수정
import Logoblue from "../../../../assets/LogoBlue.svg";
import { useState, useRef } from "react";

export default function MyLayout() {
  const base = "hover:underline hover:font-semibold cursor-pointer";
  const [menu, setMenu] = useState("info");
  const contentRef = useRef(null);

  const sectionIds = {
    info: "section-info",
    coupon: "section-coupon",
    history: "section-history",
  };

  const scrollToKey = (key) => {
    setMenu(key);

    const id = sectionIds[key];
    const el = document.getElementById(id);
    if (!el) return;

    // 화면 전체 스크롤 위치 계산
    const headerOffset = 100; // 상단에 고정 헤더가 있으면 그 높이만큼 빼주면 됨
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  const itemClass = (key) =>
    menu === key ? `${base} font-semibold underline` : base;

  return (
    <div className="grid grid-cols-[1.5fr_5fr] grid-rows-[159px_1fr]">
      <div className="flex justify-center items-center border-r-2 border-b-2 text-center text-[30px] font-[700] px-14 py-14 text-logocolor">
        마이페이지
      </div>

      <div className="row-span-2" ref={contentRef}>
        <Info />
      </div>

      <div className="flex flex-col border-r-2 justify-between">
        <div className="text-[20px] text-textblack py-5 pl-10 flex flex-col justify-center items-start gap-[6px]">
          <div className="flex gap-4">
            <p>•</p>
            <button
              type="button"
              className={itemClass("info")}
              onClick={() => scrollToKey("info")}
            >
              내 정보
            </button>
          </div>
          <div className="flex gap-4">
            <p>•</p>
            <button
              type="button"
              className={itemClass("coupon")}
              onClick={() => scrollToKey("coupon")}
            >
              내 쿠폰
            </button>
          </div>
          <div className="flex gap-4">
            <p>•</p>
            <button
              type="button"
              className={itemClass("history")}
              onClick={() => scrollToKey("history")}
            >
              예약/취소 내역
            </button>
          </div>
        </div>
        <div className="py-[50px] px-[80px] flex justify-center items-center">
          <img src={Logoblue} alt="logo" />
        </div>
      </div>
    </div>
  );
}
