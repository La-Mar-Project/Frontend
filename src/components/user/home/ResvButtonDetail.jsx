export default function ResvButtonDetail({
  canReserve,
  status, // "예약가능" / "예약마감" / "예약없음" 등
  remainingHeadCount, // 숫자 또는 null
  type = "NORMAL",
  onClick,
}) {
  const isDisabled = !canReserve;
  const bgClass = isDisabled
    ? "bg-gray-sub-t cursor-not-allowed"
    : "bg-logocolor2 cursor-pointer";

  const normalizedType =
    typeof type === "string" ? type.trim().toUpperCase() : "NORMAL";
  const displayText = (() => {
    if (isDisabled) return status;
    if (normalizedType === "EARLY") return "선예약하기";
    return status;
  })();

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      className={
        "shrink-0 rounded-[5px] text-white w-full h-[67px] flex flex-col justify-center items-center py-[10px] px-[10px] " +
        bgClass
      }
    >
      <p className="text-[20px] font-[600]">{displayText}</p>
      <p className="text-[18px] font-[500]">
        {remainingHeadCount == null ? "" : `(잔여 ${remainingHeadCount})`}
      </p>
    </button>
  );
}
