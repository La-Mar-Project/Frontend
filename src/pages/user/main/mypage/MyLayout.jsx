import Info from "./Info";
import Logoblue from "../../../../assets/LogoBlue.svg";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../../../contexts/UserContext";

export default function MyLayout() {
  const base = "hover:underline hover:font-semibold cursor-pointer";
  const [menu, setMenu] = useState("info");
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useUser();

  // 로컬스토리지 토큰 + 컨텍스트 유저로 상태 판단
  const accessToken = localStorage.getItem("accessToken");
  const isGuest = !user || user.username === "Guest";

  const sectionIds = {
    info: "section-info",
    coupon: "section-coupon",
    history: "section-history",
  };

  const scrollToKey = useCallback((key) => {
    setMenu(key);

    const id = sectionIds[key];
    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = 100;
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }, []); // state setter는 안정적이라 deps 비워도 됨

  const itemClass = (key) =>
    menu === key ? `${base} font-semibold underline` : base;

  useEffect(() => {
    if (!accessToken && isGuest) {
      alert(
        "마이페이지는 로그인 후 이용 가능합니다.\n로그인 또는 회원가입을 먼저 진행해 주세요."
      );
      navigate("/", { replace: true });
    }
  }, [accessToken, isGuest, navigate]);

  useEffect(() => {
    const scrollTo = location.state?.scrollTo;
    if (scrollTo !== "history") return;

    // 섹션 DOM 렌더링 이후에 스크롤하도록 다음 틱에 실행
    const timer = setTimeout(() => {
      scrollToKey("history");
    }, 0);

    return () => clearTimeout(timer);
  }, [location.state, scrollToKey]);

  // 리다이렉트 중에는 화면 렌더링 안 함
  if (!accessToken && isGuest) {
    return null;
  }
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
