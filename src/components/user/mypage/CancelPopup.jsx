const PROCESS_LABEL = {
  CANCEL_REQUESTED: "취소 접수",
  CANCEL_COMPLETED: "취소 완료",
  RESERVE_COMPLETED: "예약 접수",
  DEPOSIT_COMPLETED: "입금 확인",
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

export default function CancelPopup({ isOpen, onClose, item }) {
  if (!isOpen || !item) return null;

  const { process, scheduleDeparture, shipFishType, totalPrice, headCount } =
    item;

  const statusText = PROCESS_LABEL[process] ?? process ?? "-";

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
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

          {/* 내용 */}
          <div className="px-7 text-[20px] font-[400] text-textblack flex flex-col">
            {/* 상단 취소 정보 */}
            <section className="flex flex-col gap-[9px] px-[26px] py-[17px] border-b borer-[#454545]">
              <div className="text-[22px] font-[600]">
                취소 {headCount ?? 1}매
              </div>
              <div className="flex flex-col gap-[11px]">
                <div className="flex gap-[11px]">
                  <p>{statusText}</p>
                  <p>-{/* cancelReason 있으면 여기 */}</p>
                </div>
                <p>
                  {formatDateShort(scheduleDeparture)} {shipFishType ?? ""}
                </p>
                <p>{formatMoney(totalPrice)}원</p>
              </div>
            </section>

            <section className="flex flex-col gap-[9px] px-[26px] py-[17px] pb-[30px]">
              <div className="text-[22px] font-[600]">환불 정보</div>
              <div className="flex flex-col gap-[11px]">
                <div className="flex gap-[106px]">
                  <p>결제 금액</p>
                  <p>{formatMoney(totalPrice)}원</p>
                </div>
                <div className="flex gap-[66px]">
                  <p>환불 예정 금액</p>
                  <p>{formatMoney(totalPrice)}원</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
