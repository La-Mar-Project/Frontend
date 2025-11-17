import PopupButton from "../../../assets/PopupButton.svg";

const PROCESS_LABEL = {
  RESERVE_COMPLETED: "예약접수",
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

export default function BookCancel({
  process = "RESERVE_COMPLETED",
  onDetail,
}) {
  const label = PROCESS_LABEL[process] ?? "상태";
  const badgeClass = PROCESS_BG[process] ?? "bg-gray-300";
  return (
    <div className="gap-[13px] flex flex-col border-2 border-[#B9BFDC] bg-white w-full rounded-[10px] px-[27px] py-[22px] gap-[12px]">
      <div
        className={`text-center w-[87px] px-3 py-[5px] text-[18px] rounded-[10px] ${badgeClass}`}
      >
        {label}
      </div>
      <div className="flex flex-col gap-[10px]">
        <p className="text-[22px]">09.13(토) 출조 · 쭈갑 </p>
        <div className="text-logocolor text-[20px]  flex justify-between">
          <p className="">금액: 90,000원</p>
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
