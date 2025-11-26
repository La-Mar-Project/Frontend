export default function ResvButton({
  canReserve,
  status, // "예약가능" / "예약마감" / "예약없음" 등
  remainingHeadCount,
  type = "NORMAL",
  onClick,
}) {
  // ✅ 1) 비회원/회원 판단 (accessToken 유무로)
  const hasAccessToken =
    typeof window !== "undefined" && !!localStorage.getItem("accessToken");

  // ✅ 2) 이 스케줄이 선예약 타입인지
  const isEarlyType = type === "EARLY";

  // ✅ 3) 최종 비활성 여부
  //  - 예약 자체가 불가능한 경우 (!canReserve)
  //  - 선예약 타입인데 비회원인 경우 (isEarlyType && !hasAccessToken)
  const isDisabled = !canReserve || (isEarlyType && !hasAccessToken);

  // ✅ 4) 배경/커서 스타일
  const bgClass = isDisabled
    ? "bg-gray-sub-t cursor-not-allowed"
    : "bg-logocolor2 cursor-pointer";

  // ✅ 5) 버튼에 보여줄 텍스트
  const displayText = (() => {
    // 비회원 + 선예약인 경우
    if (isEarlyType && !hasAccessToken) return "로그인 필요";

    // 그 외 비활성인 경우(예약없음/예약마감 등)
    if (isDisabled) return status;

    // 활성 + 선예약 타입이면 "선예약하기"
    if (isEarlyType) return "선예약하기";

    // 나머지는 기존 status 그대로
    return status;
  })();

  // ✅ 6) 클릭 핸들러
  const handleClick = () => {
    if (isDisabled) return; // 비활성 상태면 클릭 막기
    onClick?.(); // 활성일 때만 부모에서 넘겨준 onClick 실행
  };

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={handleClick}
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
