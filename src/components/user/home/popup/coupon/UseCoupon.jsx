export default function UseCoupon({ coupon, selected, onSelect }) {
  const dotClass = selected ? "bg-logo-fill" : "bg-[#D9D9D9]";

  // 백엔드에서 오는 필드 이름에 맞춰서 수정해줘
  const from = coupon?.validFrom ?? "25.09.01";
  const to = coupon?.validTo ?? "25.12.10";

  return (
    <button
      type="button"
      onClick={() => {
        console.log("쿠폰 클릭:", coupon?.id);
        onSelect?.(coupon?.id);
      }}
      className="w-[94px] flex flex-col gap-1 bg-white rounded-[10px] pl-[10px] pt-[5px] pb-[10px] shadow-md"
    >
      <div className="w-full flex justify-end pr-[6px]">
        <div className={`w-6 h-6 rounded-[100px] ${dotClass}`} />
      </div>
      <div className="text-[18px]">
        <p className="font-[600] leading-5 text-start">시즌 3</p>
        <p className="font-[500] text-[16px] text-start">선예약 쿠폰</p>
      </div>
      <div className="text-[14px] font-[300] px-1">
        {from} <br />~ {to}
      </div>
    </button>
  );
}
