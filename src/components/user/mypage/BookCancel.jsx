import PopupButton from "../../../assets/PopupButton.svg";

export default function BookCancel() {
  return (
    <div className="gap-[13px] flex flex-col border-2 border-[#B9BFDC] bg-white w-full rounded-[10px] px-[27px] py-[22px] gap-[12px]">
      <div className="text-center w-[87px] px-3 py-[5px] text-[18px] bg-[#FE9850] rounded-[10px]">
        예약접수
      </div>
      <div className="flex flex-col gap-[10px]">
        <p className="text-[22px]">09.13(토) 출조 · 쭈갑 </p>
        <div className="text-logocolor text-[20px]  flex justify-between">
          <p className="">금액: 90,000원</p>
          <button className="flex font-[400] gap-2">
            상세보기 <img src={PopupButton} />
          </button>
        </div>
      </div>
    </div>
  );
}
