import DetailList from "./DetailPopupList";

export default function DetailPopup() {
  return (
    <div>
      <div className="flex items-center px-[27px] pt-[25px] pb-[15px] gap-[25px]">
        <p className="text-black-t text-[30px] font-[600]">9월 17일</p>
        <p className="text-[14px]">
          3물 쭈갑 9만원 <br />
          쭈꾸미 위주의 낚시
        </p>
      </div>
      <div className="flex bg-sky-lightest-f px-[35px] py-[16px] justify-between gap-[47px] text-black-t text-[16px] font-[500]">
        <p>예약자</p>
        <p>예약인원</p>
        <p>진행현황</p>
      </div>
      <section className="flex flex-col">
        <DetailList />
        <DetailList />
        <DetailList />
        <DetailList />
        <DetailList />
        <DetailList />
        <DetailList />
        <DetailList />
        <DetailList />
        <DetailList />
        <DetailList />
        <DetailList />
        <DetailList />
        <DetailList />
        <DetailList />
        <DetailList />
        <DetailList />
        <DetailList />
      </section>
    </div>
  );
}
