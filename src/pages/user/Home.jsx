import Header from "../../components/user/Header";
import Logoblue from "../../assets/LogoBlue.svg";
import Logo from "../../assets/Logo.svg";
import Yearleft from "../../assets/Yearleft.svg";
import Yearright from "../../assets/Yearright.svg";
import Monthleft from "../../assets/Monthleft.svg";
import Monthright from "../../assets/Monthright.svg";
import Toggle from "../../assets/Toggle.svg";
import Footer from "../../components/user/Footer";
import Calendar from "../../components/user/home/Calendar";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useMemo } from "react";
import { useUser } from "../../contexts/UserContext";
import { useResv } from "../../contexts/ResvContext";

import DetailPopup from "../../components/user/home/popup/detailpopup/DetailPopup";

export default function Home() {
  const { user } = useUser();
  const { loadSchedules } = useResv();

  const navigate = useNavigate();
  const calRef = useRef(null);
  const now = useMemo(() => new Date(), []);
  const [ym, setYm] = useState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  });

  const [openYear, setOpenYear] = useState(false);
  const [openMonth, setOpenMonth] = useState(false);

  const years = useMemo(() => {
    const now = new Date().getFullYear();
    return Array.from({ length: 13 }, (_, i) => now - 6 + i); // now-6 ~ now+6
  }, []);
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);

  const pickYear = (year) => {
    setOpenYear(false);
    const month = ym.month || new Date().getMonth() + 1;
    calRef.current?.gotoYM(year, month);
  };
  const pickMonth = (month) => {
    setOpenMonth(false);
    const year = ym.year || new Date().getFullYear();
    calRef.current?.gotoYM(year, month);
  };

  const Textstyle =
    "hover:bg-sky-light-f hover:text-logocolor cursor-pointer text-[30px] text-logocolor p-3 border border-logocolor border-2 bg-white flex justify-center items-center rounded-[20px] w-auto h-auto";

  return (
    <div className="min-h-svh">
      <Header showLogo={false} actionsAlign="right" />

      <div className="gap-[50px] px-[96px] py-[45px] flex w-full bg-[#F6F7FF]">
        <div className="flex justify-center items-center">
          <img src={Logo} className="h-[350px] w-auto" />
        </div>
        <div className="flex flex-col gap-[26px] font-[400] w-full">
          <div className="flex flex-col items-start text-[24px]">
            <div className="flex gap-2 text-[26px] items-end">
              안녕하세요
              <div className="flex items-end">
                <p className="text-[28px] font-semibold">
                  {user.username ?? "User"}
                </p>
                님!
              </div>
            </div>
            출항할 준비가 되셨나요?
          </div>
          <section className="grid grid-cols-3 gap-3 h-[96px] w-auto">
            <div className={Textstyle} onClick={() => navigate("/main/notice")}>
              중요공지 확인하기
            </div>
            <div className={Textstyle}>쭈불 카페가기</div>
            <div className="text-logocolor row-span-2 flex flex-col text-center p-3 border border-logocolor border-2 bg-white flex justify-center items-center rounded-[20px] w-auto h-auto">
              <p className="text-[26px]">예약 정보 조회</p>
              <p className="text-[22px] font-[400] text-black-t px-10">
                예약 정보 조회 및 취소는010-XXXX-XXXX에 <br />
                문자로 요청해주세요
              </p>
              <p className="text-[20px] font-[400] text-black-t">
                * 출조 중이나 업무 중에는 답변이 늦을 수 있음을 양해부탁드립니다
              </p>
            </div>
            <div className={Textstyle}>조과글 확인하기</div>
            <div className={Textstyle} onClick={() => navigate("/main/mypage")}>
              마이페이지
            </div>
          </section>
        </div>
      </div>
      <section className="grid grid-cols-[1fr_3.5fr] grid-rows-[382px_1fr]">
        <div className="flex flex-col justify-center items-center col-span-2 h-[382px] gap-[18px]">
          <div className="flex justify-center items-end text-[40px] font-[500] pb-5">
            🗓️ 예약 달력
          </div>
          <div className="flex justify-center items-center gap-[58px]">
            <button
              onClick={() => calRef.current?.prevYear()}
              className="h-[41px] w-[104px] cursor-pointer flex justify-center gap-[6px] items-center pl-3 pr-4 py-[10px] rounded-[10px] bg-[#EEF4FF] text-[18px] font-[500]"
            >
              <div>
                <img src={Yearleft} />
              </div>
              이전해
            </button>
            <div className="relative">
              <button
                onClick={() => {
                  setOpenYear((v) => !v);
                  setOpenMonth(false);
                }}
                className="cursor-pointer flex justify-center gap-[10px] items-center pl-[15px] pr-[12px] py-[5px] text-[30px]"
                aria-haspopup="listbox"
                aria-expanded={openYear}
              >
                <div className="w-[100px] flex justify-end items-center">
                  {ym.year ? `${ym.year}년` : "년도 선택"}
                </div>
                <div>
                  <img src={Toggle} />
                </div>
              </button>
              {openYear && (
                <ul
                  className="cursor-pointer absolute top-full mt-2 left-1/2 -translate-x-1/2 z-10 w-30 max-h-60 overflow-auto rounded-[10px] border border-sky-light-f bg-white shadow"
                  role="listbox"
                >
                  {years.map((y) => (
                    <li
                      key={y}
                      role="option"
                      aria-selected={ym.year === y}
                      onClick={() => pickYear(y)}
                      className={`px-3 py-2 cursor-pointer hover:bg-sky-light-f ${
                        ym.year === y ? "bg-sky-light-f" : ""
                      }`}
                    >
                      {y}년
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={() => calRef.current?.nextYear()}
              className="h-[41px] w-[104px] cursor-pointer flex justify-center gap-[6px] items-center pl-4 pr-3 py-[10px] rounded-[10px] bg-[#EEF4FF] text-[18px] font-[500]"
            >
              다음해
              <div>
                <img src={Yearright} />
              </div>
            </button>
          </div>

          <div className="flex justify-center items-center gap-[67.5px]">
            <button
              onClick={() => calRef.current?.prevMonth()}
              className="h-[41px] w-[104px] cursor-pointer flex justify-center gap-[6px] items-center px-4 py-[10px] rounded-[10px] bg-[#EEF4FF] text-[18px] font-[500]"
            >
              <div>
                <img src={Monthleft} />
              </div>
              이전달
            </button>

            <div className="relative">
              <button
                onClick={() => {
                  setOpenMonth((v) => !v);
                  setOpenYear(false);
                }}
                className="cursor-pointer flex justify-center items-center gap-[10px] pr-[16px] pl-[12px] py-[5px] text-[40px] font-[500]"
                aria-haspopup="listbox"
                aria-expanded={openMonth}
              >
                <div className="w-[80px] flex justify-end items-center">
                  {ym.month ? `${ym.month}월` : "월 선택"}
                </div>
                <div className="cursor-pointer">
                  <img src={Toggle} />
                </div>
              </button>
              {openMonth && (
                <ul
                  className="cursor-pointer absolute top-full mt-2 left-1/2 -translate-x-1/2 z-10 w-30 max-h-60 overflow-auto rounded-[10px] border border-sky-light-f bg-white shadow"
                  role="listbox"
                >
                  {months.map((m) => (
                    <li
                      key={m}
                      role="option"
                      aria-selected={ym.month === m}
                      onClick={() => pickMonth(m)}
                      className={`px-3 py-2 cursor-pointer hover:bg-sky-light-f ${
                        ym.month === m ? "bg-sky-light-f" : ""
                      }`}
                    >
                      {m}월
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={() => calRef.current?.nextMonth()}
              className="h-[41px] w-[104px] cursor-pointer flex justify-center gap-[6px] items-center px-4 py-[10px] rounded-[10px] bg-[#EEF4FF] text-[18px] font-[500]"
            >
              다음달
              <div>
                <img src={Monthright} />
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-rows-[69px_1fr_auto] border-r-2 border-linecolor h-full overflow-hidden">
          <div className="bg-sky-light-f h-[69px]">광고배너</div>
          <div className="flex flex-col justify-between h-full pt-[120px]">
            <DetailPopup />
            {/* <div className="flex flex-col gap-[57px]">
              <div className="gap-[15px] flex flex-col justify-center items-center">
                <div className="w-[156px] h-[124px]">
                  <img src={CalendarExplain} />
                </div>
                <div className="flex flex-col justify-center items-center">
                  달력의 날짜를 누르면
                  <div className="flex gap-1">
                    해당일의
                    <div className="flex">
                      <p className="font-[500]">상세정보</p>가
                    </div>
                    뜹니다!
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[22px] justify-center items-center">
                <div className="shrink-0 rounded-[5px] text-white w-[84px] h-[59px] flex flex-col justify-center items-center py-[10px] px-[10px] bg-logocolor2">
                  <p className="text-[16px] font-[600]">예약하기</p>
                  <p className="text-[14px]">(잔여 17)</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  예약하기를 누르면
                  <div className="flex gap-1">
                    해당일의
                    <div className="flex">
                      <p className="font-[500]">예약창</p>이
                    </div>
                    뜹니다!
                  </div>
                </div>
              </div>
            </div> */}
            <div className="py-[50px] px-[80px] flex justify-center items-center">
              <img src={Logoblue} alt="logo" className="max-w-full h-auto" />
            </div>
          </div>
        </div>
        <div>
          <Calendar
            icsUrl="/ics/kr"
            ref={calRef}
            onDatesChange={(next) => {
              // 1) 년/월 상태 업데이트 (기존 로직 유지)
              setYm((prev) =>
                prev.year === next.year && prev.month === next.month
                  ? prev
                  : { year: next.year, month: next.month }
              );

              // 2) 해당 년/월 기준으로 from, to 만들어서 스케줄 로드
              const mm = String(next.month).padStart(2, "0");

              // next.month 의 말일 계산 (예: 11 → 30, 2 → 28/29)
              const lastDay = new Date(next.year, next.month, 0).getDate();
              const dd = String(lastDay).padStart(2, "0");

              const from = `${next.year}-${mm}-01`;
              const to = `${next.year}-${mm}-${dd}`;

              console.log("[Home] from/to =>", from, to);
              loadSchedules(from, to);
            }}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}
