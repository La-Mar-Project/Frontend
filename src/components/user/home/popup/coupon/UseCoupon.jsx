export default function UseCoupon() {
  return (
    <div className="w-[94px] flex flex-col gap-1 bg-white rounded-[10px] pl-[10px] pt-[5px] pb-[10px] shadow-md">
      <div className="w-full flex justify-end pr-[6px]">
        <div className="w-6 h-6 rounded-[100px] bg-[#D9D9D9]"></div>
      </div>
      <div className="text-[18px]">
        <p className="font-[600] leading-5">시즌 3</p>
        <p className="font-[500] text-[16px]">선예약 쿠폰</p>
      </div>
      <div className="text-[14px] font-[300] px-1">
        25.09.01 <br />~ 25.12.10
      </div>
    </div>
  );
}
