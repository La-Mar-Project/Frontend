export default function MyCoupon({ title, from, to }) {
  const parts = title ? title.split(" ") : [];

  // "시즌 3"
  const line1 =
    parts.length >= 2 ? parts.slice(0, 2).join(" ") : title || "쿠폰";
  // "평일 선예약" / "주말 선예약"
  const line2 =
    parts.length > 3 ? parts.slice(2, parts.length - 1).join(" ") : "";
  // "쿠폰"
  const line3 = parts.length >= 1 ? parts[parts.length - 1] : "";

  return (
    <div className="flex flex-col gap-1 bg-white rounded-[10px] pl-[14px] pr-[18px] pt-[32px] pb-[18px] shadow-md">
      <div className="text-[20px] leading-6">
        <p className="font-[600]">{line1}</p>
        <p className="font-[500]">{line2}</p>
        <p className="font-[500]">{line3}</p>
      </div>
      <div className="text-[14px] font-[300] px-1">
        {from && (
          <>
            {from}
            <br />
          </>
        )}
        {to && `~ ${to}`}
      </div>
    </div>
  );
}
