/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { apiGet } from "../utils/api";

const ResvContext = createContext(null);

export function ResvProvider({ children }) {
  const [schedules, setSchedules] = useState([]);

  // from / to: "2025-11-01" 이런 문자열
  const loadSchedules = async (from, to) => {
    try {
      const fromParam = `${from}T00:00:00`;
      const toParam = `${to}T23:59:59`;
      const endpoint = `/schedules/main?from=${fromParam}&to=${toParam}`;
      console.log("[Resv] 요청 endpoint:", endpoint);

      const res = await apiGet(endpoint);

      if (!res.ok) {
        console.error(
          "[Resv] 메인 스케줄 조회 실패",
          res.status,
          res.statusText
        );
        setSchedules([]);
        return;
      }

      const body = await res.json();
      console.log("[Resv] 메인 스케줄 응답 raw:", body);

      // ✅ 실제 스케줄 배열만 뽑기
      const list = Array.isArray(body?.data?.schedules)
        ? body.data.schedules
        : [];

      console.log("[Resv] 최종 스케줄 리스트:", list);
      setSchedules(list);
    } catch (err) {
      console.error("[Resv] 스케줄 요청 에러:", err);
      setSchedules([]);
    }
  };

  // YYYY-MM-DD 기준으로 일정 1개 찾기
  const getScheduleByDate = (dateStr) => {
    if (!Array.isArray(schedules)) {
      console.warn("[Resv] schedules가 배열이 아님:", schedules);
      return null;
    }

    return (
      schedules.find(
        // departure: "2025-11-22T06:00:00" 이런 형태라고 가정
        (s) => (s.departure || "").slice(0, 10) === dateStr
      ) ?? null
    );
  };

  const value = {
    schedules,
    loadSchedules,
    getScheduleByDate,
  };

  return <ResvContext.Provider value={value}>{children}</ResvContext.Provider>;
}

export function useResv() {
  const ctx = useContext(ResvContext);
  if (!ctx) throw new Error("useResv must be used within ResvProvider");
  return ctx;
}
