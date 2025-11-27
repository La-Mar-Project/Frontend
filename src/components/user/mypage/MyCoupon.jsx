export default function MyCoupon({ title, from, to }) {
  return (
    <div className="flex flex-col gap-1 bg-white rounded-[10px] pl-[14px] pr-[18px] pt-[32px] pb-[18px] shadow-md">
      <div className="text-[20px]">
        <p className="font-[600] leading-5">{title?.split(" ")[0] ?? "쿠폰"}</p>
        <p className="font-[500]">
          {title?.split(" ").slice(1).join(" ") || ""}
        </p>
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
