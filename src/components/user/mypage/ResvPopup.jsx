// ResvPopup.jsx
export default function ResvPopup({ isOpen, onClose, detail }) {
  // isOpen이 false면 아무것도 렌더하지 않음
  if (!isOpen || !detail) return null;
  const { ship, reservation, schedule } = detail ?? {};

  // 상태 텍스트 매핑 (enum -> 한글)
  const PROCESS_LABEL = {
    RESERVE_COMPLETED: "예약 접수",
    DEPOSIT_COMPLETED: "입금 확인",
    CANCEL_REQUESTED: "취소 접수",
    CANCEL_COMPLETED: "취소 완료",
  };

  const statusText =
    PROCESS_LABEL[reservation?.process] ?? reservation?.process ?? "-";

  // 금액 포맷 (90000 -> "90,000")
  const formatMoney = (v) => {
    if (typeof v === "number") return v.toLocaleString();
    if (!v) return "-";
    const n = Number(v);
    return Number.isNaN(n) ? String(v) : n.toLocaleString();
  };

  // YYYY-MM-DDTHH:mm:ss 형태 기준 포맷
  const formatDateTime = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value; // 이상한 값이면 있는 그대로
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd} ${hh}:${mi}:${ss}`;
  };

  // 출항일 텍스트: 09.13(토) 쭈갑 이런 느낌
  const formatDepartureShort = () => {
    if (!schedule?.departure) return "-";
    const d = new Date(schedule.departure);
    if (Number.isNaN(d.getTime())) {
      // 실패하면 그냥 백엔드 문자열 사용
      return `${schedule.departure} ${ship?.fishType ?? ""}`;
    }
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[d.getDay()];
    const fish = ship?.fishType ?? "";
    const tide =
      typeof schedule.tide === "number" && schedule.tide > 0
        ? `${schedule.tide}물 `
        : "";
    return `${mm}.${dd}(${weekday}) ${tide}${fish}`.trim();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

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

          {/* 내용 영역 - 필요에 따라 selectedItem에서 정보 내려서 채우면 됨 */}
          <div className="px-7 text-[20px] font-[400] text-textblack flex flex-col">
            <section className="flex flex-col gap-[9px] px-[26px] py-[17px] border-b borer-[#454545]">
              <div className="text-[22px] font-[600]">
                예약 {reservation?.headCount ?? 1}매
              </div>
              <div className="flex flex-col gap-[11px]">
                <p>{statusText}</p>
                <p>{formatDepartureShort()}</p>
                <p>{formatMoney(reservation?.totalPrice)}원</p>
              </div>
            </section>
            <section className="flex flex-col gap-[9px] px-[26px] py-[17px] pb-[30px]">
              <div className="text-[22px] font-[600]">예약 신청 정보</div>
              <div className="flex flex-col gap-[11px]">
                <div className="flex gap-[66px]">
                  <p>예약 일시</p>
                  <p>{formatDateTime(reservation?.reservedAt)}</p>
                </div>
                <div className="flex gap-[66px]">
                  <p>입금 일시</p>
                  <p>{formatDateTime(reservation?.depositCompletedAt)}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
