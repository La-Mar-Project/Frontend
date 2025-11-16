export default function MyCoupon() {
  return (
    <div className="flex flex-col gap-1 bg-white rounded-[10px] pl-[14px] pr-[18px] pt-[32px] pb-[18px] shadow-md">
      <div className="text-[20px]">
        <p className="font-[600] leading-5">시즌 3</p>
        <p className="font-[500]">선예약 쿠폰</p>
      </div>
      <div className="text-[14px] font-[300] px-1">
        25.09.01 <br />~ 25.12.10
      </div>
    </div>
  );
}
