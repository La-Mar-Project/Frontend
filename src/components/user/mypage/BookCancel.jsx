import PopupButton from "../../../assets/PopupButton.svg";

const PROCESS_LABEL = {
  RESERVE_COMPLETED: "예약완료",
  DEPOSIT_COMPLETED: "입금확인",
  CANCEL_REQUESTED: "취소접수",
  CANCEL_COMPLETED: "취소완료",
};

const PROCESS_BG = {
  RESERVE_COMPLETED: "bg-[#FE9850]",
  DEPOSIT_COMPLETED: "bg-sky-mid-s",
  CANCEL_REQUESTED: "bg-[#828BC0] text-white",
  CANCEL_COMPLETED: "bg-sky-mid-s text-black-t",
};

function formatDeparture(dateTimeStr) {
  if (!dateTimeStr) return "-";

  const [datePart] = dateTimeStr.split("T"); // "2025-12-09"
  const [y, m, d] = datePart.split("-"); // ["2025","12","09"]

  const dt = new Date(Number(y), Number(m) - 1, Number(d)); // 요일 계산용
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[dt.getDay()];

  const mm = String(m).padStart(2, "0");
  const dd = String(d).padStart(2, "0");

  return `${mm}.${dd}(${weekday})`;
}

export default function BookCancel({
  process = "RESERVE_COMPLETED",
  scheduleDeparture, // 출항일
  shipFishType, // 어종 / 출조 타입
  totalPrice, // 금액
  onDetail,
}) {
  console.log("BookCancel process 값:", process, typeof process);

  const normalized =
    typeof process === "string" ? process.trim().toUpperCase() : "";

  const label = PROCESS_LABEL[normalized] ?? (normalized || "상태"); // 모르겠는 값이면 그냥 그 문자열 보여주기

  const badgeClass = PROCESS_BG[normalized] ?? "bg-gray-300";

  const priceText =
    typeof totalPrice === "number"
      ? totalPrice.toLocaleString()
      : totalPrice ?? "-";

  const departureText = formatDeparture(scheduleDeparture);

  return (
    <div className="gap-[13px] flex flex-col border-2 border-[#B9BFDC] bg-white w-full rounded-[10px] px-[27px] py-[22px] gap-[12px]">
      <div
        className={`text-center w-[87px] px-3 py-[5px] text-[18px] rounded-[10px] ${badgeClass}`}
      >
        {label}
      </div>
      <div className="flex flex-col gap-[10px]">
        <p className="text-[22px]">
          {departureText} 출조 · {shipFishType ?? "-"}
        </p>
        <div className="text-logocolor text-[20px]  flex justify-between">
          <p className="">금액: {priceText}원</p>
          <button
            className="flex font-[400] gap-2"
            onClick={() => onDetail?.()}
          >
            상세보기 <img src={PopupButton} />
          </button>
        </div>
      </div>
    </div>
  );
}
