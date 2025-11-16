export default function ResvButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 rounded-[5px] text-white w-[84px] h-[59px] flex flex-col justify-center items-center py-[10px] px-[10px] bg-logocolor2"
    >
      <p className="text-[16px] font-[600]">예약하기</p>
      <p className="text-[14px]">(잔여 17)</p>
    </button>
  );
}
