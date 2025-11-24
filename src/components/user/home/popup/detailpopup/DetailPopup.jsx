import { useEffect, useState } from "react";
import ResvButtonDetail from "../../ResvButtonDetail";
import DetailList from "./DetailPopupList";
import { apiGet } from "../../../../../utils/api";

export default function DetailPopup({ schedule, onReserveClick }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!schedule?.publicId) return; // 필드명이 다르면 여기를 맞춰줘 (예: schedule.schedulePublicId)

    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await apiGet(`/schedules/${schedule.publicId}`);
        const json = await res.json(); // { success, code, message, data }

        if (!json.success) {
          throw new Error(
            json.message || "출항 일정 상세 조회에 실패했습니다."
          );
        }

        // 실제 응답 구조에 맞춰서 reservations 위치만 맞춰주면 됨
        setReservations(json.data.reservations ?? []);
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [schedule?.publicId]);

  if (!schedule) return null;

  // 날짜 포맷팅은 나중에 따로 helper 빼도 좋음
  const [, m, d] = schedule.date.split("-");
  const label = `${Number(m)}월 ${Number(d)}일`;

  const statusLabelMap = {
    RESERVE_REQUESTED: "예약접수",
    RESERVE_COMPLETED: "예약완료",
    DEPOSIT_COMPLETED: "입금확인",
    CANCEL_REQUESTED: "취소접수",
    CANCEL_COMPLETED: "취소완료",
  };
  const toStatusLabel = (status) => statusLabelMap[status] ?? status;
  const formatPriceMan = (price) => `${price / 10000}만원`;
  return (
    <div>
      <div className="flex items-center justify-between px-[27px] pt-[25px] pb-[15px] gap-[25px]">
        <p className="text-black-t text-[30px] font-[600]">{label}</p>
        <p className="text-[14px]">
          {schedule.tide}물 {schedule.fishType} {formatPriceMan(schedule.price)}
          <br />
          {schedule.description ?? "쭈꾸미 위주의 낚시"}
        </p>
      </div>
      <div className="text-center grid grid-cols-3 bg-sky-lightest-f px-[30px] py-[16px] justify-between gap-[40px] text-black-t text-[16px] font-[500]">
        <p>예약자</p>
        <p>예약인원</p>
        <p>진행현황</p>
      </div>
      <section className="flex flex-col">
        {loading && (
          <div className="px-[30px] py-[16px] text-sm text-gray-500">
            예약 내역을 불러오는 중입니다...
          </div>
        )}

        {error && (
          <div className="px-[30px] py-[16px] text-sm text-red-500">
            {error}
          </div>
        )}

        {!loading && !error && reservations.length === 0 && (
          <div className="px-[30px] py-[16px] text-sm text-gray-500">
            아직 예약 내역이 없습니다.
          </div>
        )}

        {!loading &&
          !error &&
          reservations.map((item, index) => (
            <DetailList
              key={item.reservationPublicId ?? item.id}
              index={index}
              member={item.name ?? item.bookerName}
              count={String(item.headCount ?? item.people ?? 0)}
              state={toStatusLabel(item.process ?? item.status)}
            />
          ))}
      </section>
      <div className="flex justify-center items-center pt-[20px] px-[30px]">
        <ResvButtonDetail
          canReserve={schedule.remainingHeadCount > 0}
          status={schedule.remainingHeadCount > 0 ? "예약하기" : "예약마감"}
          remainingHeadCount={schedule.remainingHeadCount}
          onClick={onReserveClick}
        />
      </div>
    </div>
  );
}
