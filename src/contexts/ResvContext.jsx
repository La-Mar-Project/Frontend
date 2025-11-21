/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

// ✅ 나중에 API 응답이랑 구조만 맞추면 됨
const DUMMY_SCHEDULES = [
  {
    id: 1,
    departure: "2025-11-18", // YYYY-MM-DD
    remainingHeadCount: 5,
    tide: 3,
    fishType: "광어",
    price: 80000,
    status: "예약가능",
    type: "OPEN",
  },
  {
    id: 1,
    departure: "2025-11-22", // YYYY-MM-DD
    remainingHeadCount: 17,
    tide: 2,
    fishType: "쭈갑",
    price: 90000,
    status: "선예약가능",
    type: "OPEN",
  },
  {
    id: 1,
    departure: "2025-11-27", // YYYY-MM-DD
    remainingHeadCount: 0,
    tide: 1,
    fishType: "한우",
    price: 80000,
    status: "선예약마감",
    type: "CLOSED",
  },
  {
    id: 2,
    departure: "2025-11-16",
    remainingHeadCount: 0,
    tide: 4,
    fishType: "우럭",
    price: 90000,
    status: "예약마감",
    type: "CLOSED",
  },
];

const ResvContext = createContext(null);

export function ResvProvider({ children }) {
  // 🔹 지금은 더미데이터, 나중에 여기 state에 API 응답을 넣으면 됨
  const [schedules, setSchedules] = useState(DUMMY_SCHEDULES);

  // from/to 조합해서 fetch 후 setSchedules(...) 하면 됨
  // useEffect(() => {
  //   async function fetchSchedules() {
  //     const res = await fetch(`/api/...`);
  //     const data = await res.json();
  //     setSchedules(data);
  //   }
  //   fetchSchedules();
  // }, []);

  // YYYY-MM-DD 문자열 기준으로 스케줄 찾기
  const getScheduleByDate = (dateStr) =>
    schedules.find((s) => s.departure.slice(0, 10) === dateStr) ?? null;

  const value = {
    schedules,
    setSchedules, // 필요하면 외부에서 업데이트 가능
    getScheduleByDate,
  };

  return <ResvContext.Provider value={value}>{children}</ResvContext.Provider>;
}

export function useResv() {
  const ctx = useContext(ResvContext);
  if (!ctx) throw new Error("useResv must be used within ResvProvider");
  return ctx;
}
