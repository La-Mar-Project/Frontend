export default function UseCoupon({ coupon, selected, onSelect }) {
  const dotClass = selected ? "bg-logo-fill" : "bg-[#D9D9D9]";

  const kind =
    coupon?.type === "WEEKEND" ? "주말 선예약 쿠폰" : "평일 선예약 쿠폰";

  // "2025-12-10T00:00:00" → "25.12.10"
  const expires = coupon?.expiresAt
    ? coupon.expiresAt.slice(2, 10).replace(/-/g, ".")
    : "";

  return (
    <button
      type="button"
      onClick={() => {
        console.log("쿠폰 클릭:", coupon?.couponId);
        onSelect?.(coupon?.couponId);
      }}
      className="w-[94px] flex flex-col gap-1 bg-white rounded-[10px] pl-[10px] pt-[5px] pb-[10px] shadow-md"
    >
      <div className="w-full flex justify-end pr-[6px]">
        <div className={`w-6 h-6 rounded-[100px] ${dotClass}`} />
      </div>
      <div className="text-[18px]">
        <p className="font-[600] leading-5 text-start">시즌 3</p>
        <p className="font-[500] text-[16px] text-start">{kind}</p>
      </div>
      <div className="text-[14px] font-[300] px-1">
        {expires && <>~ {expires}</>}
      </div>
    </button>
  );
}
