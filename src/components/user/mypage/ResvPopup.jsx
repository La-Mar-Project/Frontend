import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_SERVER_URL || "/api";

const PROCESS_LABEL = {
  RESERVE_COMPLETED: "예약 접수",
  DEPOSIT_COMPLETED: "입금 확인",
  CANCEL_REQUESTED: "취소 접수",
  CANCEL_COMPLETED: "취소 완료",
};

const formatMoney = (v) => {
  if (typeof v === "number") return v.toLocaleString();
  if (!v) return "-";
  const n = Number(v);
  return Number.isNaN(n) ? String(v) : n.toLocaleString();
};

const formatDateShort = (value) => {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[d.getDay()];
  return `${mm}.${dd}(${weekday})`;
};

export default function ResvPopup({
  isOpen,
  onClose,
  item,
  onCancelRequested,
}) {
  const [localProcess, setLocalProcess] = useState(item?.process ?? null);
  useEffect(() => {
    setLocalProcess(item?.process ?? null);
  }, [item]);
  if (!isOpen || !item) return null;

  const {
    scheduleDeparture,
    shipFishType,
    totalPrice,
    headCount,
    reservationId,
  } = item;

  const statusText = PROCESS_LABEL[localProcess] ?? localProcess ?? "-";
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  const handleCancelRequest = async () => {
    if (!reservationId) {
      alert("예약 ID가 없어 취소 신청을 할 수 없습니다.");
      return;
    }

    const ok = window.confirm("정말로 이 예약에 대해 취소 신청을 하시겠어요?");
    if (!ok) return;

    try {
      const res = await fetch(
        `${API_BASE}/reservations/${reservationId}/cancel-request`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            // 필요하면 Authorization 추가
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            process: "CANCEL_REQUESTED",
          }),
        }
      );

      if (!res.ok) {
        throw new Error("취소 신청에 실패했습니다.");
      }

      setLocalProcess("CANCEL_REQUESTED");
      onCancelRequested?.(reservationId);

      alert("취소 신청이 완료되었습니다.");
      onClose?.(); // 팝업 닫기
      // 필요하면 부모에서 리스트 갱신하도록 콜백 추가해서 써도 됨
    } catch (err) {
      console.error(err);
      alert("취소 신청 중 오류가 발생했습니다.");
    }
  };

  const isCancelable =
    localProcess === "RESERVE_COMPLETED" ||
    localProcess === "DEPOSIT_COMPLETED";

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div className="w-[890px]">
        <div className="bg-white rounded-[10px] w-full max-w-[90vw] shadow-xl">
          {/* 헤더 */}
          <div className="rounded-t-[10px] bg-sky-mid-s flex items-start justify-between">
            <h2 className="text-[24px] font-semibold pl-[53px] py-[27px]">
              상세보기
            </h2>
            <button
              onClick={() => onClose?.()}
              className="py-3 px-4 text-[20px]"
              aria-label="Close"
            >
              <div className="bg-logocolor text-white px-[9px] rounded-[6px]">
                X
              </div>
            </button>
          </div>

          {/* 내용 */}
          <div className="px-7 text-[20px] font-[400] text-textblack flex flex-col">
            <section className="flex flex-col gap-[9px] px-[26px] py-[17px] ">
              <div className="text-[22px] font-[600]">
                예약 {headCount ?? 1}매
              </div>
              <div className="flex flex-col gap-[11px]">
                <p>{statusText}</p>
                <p>
                  {formatDateShort(scheduleDeparture)} {shipFishType ?? ""}
                </p>
                <p>{formatMoney(totalPrice)}원</p>
              </div>
            </section>

            <div className="px-[26px] pb-[24px] pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleCancelRequest}
                disabled={!isCancelable}
                className={`px-6 py-2 rounded-[8px] text-[18px] font-semibold border
                  ${
                    isCancelable
                      ? "bg-[#f54d4d] text-white border-[#FF6666] cursor-pointer"
                      : "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                  }`}
              >
                예약 취소 신청
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
