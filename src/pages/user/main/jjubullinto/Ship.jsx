import Maincompoenent from "../../../../components/user/main/Maincomponent";

export default function Ship() {
  return (
    <div>
      <div className="px-[70px]">
        <div className="text-textblack pt-[45px] pb-10 pl-[58px] pr-[27px] flex flex-col justify-center h-[159px] border-b-2 border-linecolor2">
          <p className="text-[30px]">선박 둘러보기</p>
          <div className="text-[20px] flex justify-between">
            <p>공식계정에서 선박을 구경해보세요!</p>
            <p className="text-gray">최종수정 : 2025.11.26</p>
          </div>
        </div>
      </div>
      <section className="flex flex-col gap-[30px] pl-[70px] pr-[27px] pt-[50px] pb-[150px]">
        <Maincompoenent
          num="1"
          title="선박 둘러보기"
          text="선박 내부와 외부를 공식계정에서 확인해보세요!"
          link="https://www.instagram.com/jjubull?igsh=MXFrNHR4d2FwMThwMQ=="
        />
      </section>
    </div>
  );
}
