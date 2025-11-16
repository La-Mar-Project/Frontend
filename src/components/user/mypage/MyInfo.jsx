export default function MyInfo() {
  return (
    <div className="flex flex-col gap-5 text-[22px] font-[500]">
      <section className="flex justify-between w-[420px]">
        성명
        <div className="text-[20px] font-[400] rounded-[10px] flex justify-start items-center w-[291px] h-[34px] px-[10px] py-[5px]">
          사용자 이름
        </div>
      </section>
      <section className="flex justify-between w-[420px]">
        닉네임
        <div className="border border-[#828BC0] text-[20px] font-[400] rounded-[10px] flex justify-start items-center w-[291px] h-[34px] px-[10px] py-[5px]">
          <input
            className="focus:outline-none w-[204px] text-[16px]"
            placeholder="닉네임을 입력해주세요."
          />
          <button className="cursor-pointer shrink-0 bg-skymid rounded-[10px] px-2 flex justify-center items-center text-[14px] font-[400x]">
            수정하기
          </button>
        </div>
      </section>
      <section className="flex justify-between w-[420px]">
        등급
        <div className="text-[20px] font-[400] rounded-[10px] flex justify-start items-center w-[291px] h-[34px] px-[10px] py-[5px]">
          등급
        </div>
      </section>
      <section className="flex justify-between w-[420px]">
        전화번호
        <div className="text-[20px] font-[400] rounded-[10px] flex justify-start items-center w-[291px] h-[34px] px-[10px] py-[5px]">
          전화번호
        </div>
      </section>
    </div>
  );
}
