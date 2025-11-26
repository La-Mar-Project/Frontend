import Maincompoenent from "../../../../components/user/main/Maincomponent";

export default function Intro() {
  return (
    <>
      <div className="px-[70px]">
        <div className="text-textblack pt-[45px] pb-10 pl-[58px] pr-[27px] flex flex-col justify-center h-[159px] border-b-2 border-linecolor2">
          <p className="text-[30px]">쭈불 둘러보기</p>
          <div className="text-[20px] flex justify-between">
            <p>쭈불에 오신 것을 환영합니다!</p>
            <p className="text-gray">최종수정 : 2025.11.26</p>
          </div>
        </div>
      </div>

      <section className="flex flex-col gap-[30px] pl-[70px] pr-[79px] pt-[50px] pb-[150px]">
        <Maincompoenent
          num="1"
          title="쭈불 공식계정"
          text="쭈불 공식계정으로 다양한 소식과 정보를 받아보세요!"
          link="https://www.instagram.com/jjubull?igsh=MXFrNHR4d2FwMThwMQ=="
        />
      </section>
    </>
  );
}
