import Maincompoenent from "../../../../components/user/main/Maincomponent";

export default function Info() {
  return (
    <>
      <div className="px-[70px]">
        <div className="text-textblack pt-[45px] pb-10 pl-[58px] pr-[27px] flex flex-col justify-center h-[159px] border-b-2 border-linecolor2">
          <p className="text-[30px]">내 정보</p>
          <div className="text-[20px] flex justify-between">
            <p>꼼꼼히 읽어주시고 승선 부탁드립니다!</p>
            <p className="text-gray">최종수정 : 2025.00.00</p>
          </div>
        </div>
      </div>

      <section className="flex flex-col gap-[30px] pl-[70px] pr-[79px] pt-[50px] pb-[150px]">
        <Maincompoenent
          num="1"
          title="쭈불 카페"
          text="중요한 공지사항은 카페를 통해 안내하고 있습니다."
          link="http://cafe.naver.com/lamarfishing"
        />
      </section>
    </>
  );
}
