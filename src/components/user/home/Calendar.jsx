import { useRef, useImperativeHandle, forwardRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import icalendarPlugin from "@fullcalendar/icalendar";
import ResvButton from "./ResvButton";
import ResvPopup from "./popup/ResvPopup";

// 1) 헬퍼: 날짜를 YYYY-MM-DD로
const toYMD = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

const Calendar = forwardRef(function Calendar({ onDatesChange, icsUrl }, ref) {
  const calendarRef = useRef(null);
  const lastYM = useRef({ year: null, month: null });
  const [selected, setSelected] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupDate, setPopupDate] = useState(null);

  const openPopupFor = (dateStr) => {
    setPopupDate(dateStr);
    setPopupOpen(true);
    setSelected(dateStr); // 선택 스타일도 함께
  };
  const closePopup = () => {
    setPopupOpen(false);
  };

  // 외부에서 쓸 수 있는 제어 함수들
  useImperativeHandle(ref, () => ({
    prevMonth() {
      calendarRef.current?.getApi().prev();
    },
    nextMonth() {
      calendarRef.current?.getApi().next();
    },
    prevYear() {
      const api = calendarRef.current?.getApi();
      if (!api) return;
      const d = api.getDate();
      d.setFullYear(d.getFullYear() - 1);
      api.gotoDate(d);
    },
    nextYear() {
      const api = calendarRef.current?.getApi();
      if (!api) return;
      const d = api.getDate();
      d.setFullYear(d.getFullYear() + 1);
      api.gotoDate(d);
    },
    today() {
      calendarRef.current?.getApi().today();
    },
    gotoYM(year, month) {
      // month: 1~12, DST 방지용 정오 지정
      calendarRef.current
        ?.getApi()
        .gotoDate(new Date(year, month - 1, 1, 12, 0, 0));
    },
  }));

  return (
    <div className="calendarWrap mb-[131px]">
      <FullCalendar
        dateClick={(info) => {
          setSelected(info.dateStr), openPopupFor(info.dateStr);
        }} // 클릭 시 선택
        dayCellClassNames={(arg) =>
          toYMD(arg.date) === selected ? ["is-selected"] : []
        }
        eventDidMount={(info) => {
          if (info.event.extendedProps?.isHoliday) {
            const start = info.event.startStr?.slice(0, 10); // YYYY-MM-DD
            if (start) {
              const cell = document.querySelector(
                `.calendarWrap .fc-daygrid-day[data-date="${start}"]`
              );
              cell?.classList.add("is-holiday");
            }
          }
        }}
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin, icalendarPlugin]}
        initialView="dayGridMonth"
        headerToolbar={false}
        locales={[koLocale]}
        locale="ko"
        height="auto"
        selectable
        dayMaxEvents
        // daygrid에서 '일' 빼기
        dayCellContent={(arg) => (
          <div className="cursor-pointer flex flex-col gap-[15px] pt-2">
            <div className="flex justify-between items-center px-2">
              <span className="text-[20px] font-semibold">
                {arg.date.getDate()}
              </span>
              <span className=" text-[18px] font-[400] text-titleblack">
                N물
              </span>
            </div>
            <div className="text-titleblack flex flex-col text-[16px] font-[400] px-[15px]">
              <p>쭈갑</p>
              <p>90,000원</p>
            </div>
            <div className="flex justify-center items-center py-[10px]">
              <ResvButton />
            </div>
          </div>
        )}
        datesSet={() => {
          const api = calendarRef.current?.getApi();
          if (!api) return;
          document
            .querySelectorAll(".calendarWrap .fc-daygrid-day.is-holiday")
            .forEach((el) => el.classList.remove("is-holiday"));
          const center = api.getDate(); // ✅ 현재 활성 월의 날짜
          const next = {
            year: center.getFullYear(),
            month: center.getMonth() + 1,
          };

          if (
            next.year !== lastYM.current.year ||
            next.month !== lastYM.current.month
          ) {
            lastYM.current = next;
            onDatesChange?.(next);
          }
        }}
        eventSources={
          icsUrl
            ? [
                {
                  url: icsUrl,
                  format: "ics",
                  eventDataTransform: (e) => ({
                    ...e,
                    title: "", // 텍스트 제거
                    display: "background", // 배경 이벤트로
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                    classNames: [...(e.classNames || []), "kr-holiday"],
                    extendedProps: {
                      ...(e.extendedProps || {}),
                      isHoliday: true,
                    },
                  }),
                },
              ]
            : []
        }
      />
      <ResvPopup
        isOpen={popupOpen}
        date={popupDate}
        onClose={closePopup}
        onConfirm={(d) => {
          // TODO: 예약 확정 로직
          console.log("예약 확정:", d);
          closePopup();
        }}
      />
      <style>{`
        .calendarWrap .fc-daygrid-body td {
            border-color: #E7E7E7;
            border-bottom-width: 2px; /* 가로: 내부 + 맨 아래 줄 */
            border-right-width: 2px;  /* 세로: 내부 줄들 */
            border-style: solid;
            }

            /* 바깥 오른쪽 테두리는 굵지 않게(기본 두께로 복원) */
            .calendarWrap .fc-daygrid-body tr > td:last-child {
            border-right-width: 1px; /* 테마 기본 두께에 맞춰 조정 */
            }
        .calendarWrap {
        .fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events {
    min-height: 0em;
    position: relative;
}
            .fc-daygrid-day.fc-day-other { background-color: var(--color-gray-lightest-b); }
            .fc-daygrid-day.fc-day-other .fc-daygrid-day-top,
            .fc-daygrid-day.fc-day-other .fc-daygrid-day-number,
            .fc-daygrid-day.fc-day-other .fc-daygrid-event { opacity: 1;, padding: 0px }

            .fc-toolbar-title { font-size: 10px; font-weight: 600; }
            .fc-button { border-radius: 10px; padding: 6px 10px; }

            .fc-scrollgrid,

            .fc-theme-standard td,
            .fc-theme-standard th { border-color: var(--color-gray-calandar-s); }

            /* 요일 헤더  */
            .fc-col-header-cell { 
            font-weight: 400; 
            background-color: #F2F2F2;
            border: none;
            padding: 10px;
            }
            
            /* daygrid */
            .fc-daygrid-day-number {
                width: 156px; 
                height: 198px; 
                padding: 15px 15px 2px; 
                font-size: 20px;
                display: inline-block;
                padding: 8px 10px;
                font-size: 20px;
            }
            .fc-daygrid { font-size: 20px; font-weight: 600; }
            .fc-daygrid-day.fc-day-today { background-color: white }
            .fc-day-today { background: #DFE7F4;}
            .fc-day-sun a { color: var(--color-red-notifi-t); }
            .fc-day-sat a { color: #2754DA; }
        }
        /* 공휴일 빨간색 */
        .calendarWrap .fc-daygrid-day.is-holiday .fc-daygrid-day-number { color:#ED2626; }
        /* 기본 호버(연한 노랑) */
        .calendarWrap .fc-daygrid-day:not(.is-selected):hover {
          background: #fcf7cd; /* 연노랑 */
        }

        /* 클릭 선택(진한 노랑) */
        .calendarWrap .fc-daygrid-day.is-selected {
          background: var(--color-yellow-notifi-b); /* 진한 노랑 */
        }
          .calendarWrap .fc {
  --fc-highlight-color: transparent;  }


 
      `}</style>
    </div>
  );
});

export default Calendar;
