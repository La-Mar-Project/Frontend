/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { apiGet } from "../utils/api";

const ResvContext = createContext(null);

export function ResvProvider({ children }) {
  const [schedules, setSchedules] = useState([]);

  // from / to: "2025-11-01" 이런 문자열
  const loadSchedules = async (from, to) => {
    try {
      const fromDate = new Date(`${from}T00:00:00`);
      const toDate = new Date(`${to}T23:59:59`);

      const params = new URLSearchParams({
        from: fromDate.toISOString().slice(0, 19), // "2025-10-24T00:00:00"
        to: toDate.toISOString().slice(0, 19),
      });

      const endpoint = `/schedules/main?${params.toString()}`;
      console.log("[Resv] 요청 endpoint:", endpoint);

      const res = await apiGet(endpoint);

      if (!res.ok) {
        let errorBody = null;

        console.error(
          "[Resv] 메인 스케줄 조회 실패",
          res.status,
          res.statusText,
          "에러 바디:",
          errorBody
        );
        setSchedules([]);
        return;
      }

      const body = await res.json();
      console.log("[Resv] 메인 스케줄 응답 raw:", body);

      // 🔥 여기부터 백엔드 새 스펙에 맞게 수정
      let rawList = [];

      // 1) 지금 스펙: 응답이 바로 배열인 경우
      if (Array.isArray(body)) {
        rawList = body;
      }
      // 2) 혹시 예전처럼 { data: { schedules: [...] } } 구조로 올 수도 있으니 대비
      else if (Array.isArray(body?.data?.schedules)) {
        rawList = body.data.schedules;
      }

      console.log("[Resv] raw 첫 번째 스케줄:", rawList[0]);

      const list = rawList.map((s) => ({
        ...s,
        // 옛날에는 schedulePublicId였고, 지금은 id만 있을 수 있으니까 둘 다 고려
        publicId: s.schedulePublicId ?? s.id,
      }));

      console.log("[Resv] 최종 스케줄 리스트 (publicId 포함):", list);
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
