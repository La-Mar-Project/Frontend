export default function ResvButton({
  canReserve,
  status, // "예약가능" / "예약마감" / "예약없음" 등
  remainingHeadCount,
  type = "NORMAL",
  onClick,
}) {
  const isDisabled = !canReserve;
  const bgClass = isDisabled
    ? "bg-gray-sub-t cursor-not-allowed"
    : "bg-logocolor2 cursor-pointer";

  const displayText = (() => {
    if (isDisabled) return status; // 비활성일 땐 그대로
    if (type === "EARLY") return "선예약하기";
    return status; // NORMAL 등은 기존 그대로
  })();

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      className={
        "shrink-0 rounded-[5px] text-white w-[84px] h-[59px] flex flex-col justify-center items-center py-[10px] px-[7px] " +
        bgClass
      }
    >
      <p className="text-[16px] font-[600]">{displayText}</p>
      <p className="text-[14px] font-[500]">
        {remainingHeadCount == null ? "" : `(잔여 ${remainingHeadCount})`}
      </p>
    </button>
  );
}
