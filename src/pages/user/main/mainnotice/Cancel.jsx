import Maincompoenent from "../../../../components/user/main/Maincomponent";

export default function Cancel() {
  return (
    <div>
      <div className="px-[70px]">
        <div className="text-textblack pt-[45px] pb-10 pl-[58px] pr-[27px] flex flex-col justify-center h-[159px] border-b-2 border-linecolor2">
          <p className="text-[30px]">취소/환불 안내글</p>
          <div className="text-[20px] flex justify-between">
            <p>꼼꼼히 읽은 후에 문의 부탁드립니다!</p>
            <p className="text-gray">최종수정 : 2025.11.26</p>
          </div>
        </div>
      </div>
      <section className="flex flex-col gap-[30px] pl-[70px] pr-[27px] pt-[50px] pb-[150px]">
        <Maincompoenent
          num="1"
          title="취소 방법 안내"
          text={
            <p>
              예약자의 휴대폰으로 관리자에게{" "}
              <span className="font-[500] text-logo-fill">문자</span>(전화X)
              주시면{" "}
              <span className="font-[500] text-logo-fill">
                직접 취소해드립니다.
              </span>{" "}
              <br />* 관리자 연락처:{" "}
              <span className="font-[500] text-logo-fill">010-1234-5678</span>{" "}
              <br />* 라마르는 예약 시 휴대폰번호 외의 개인정보를 아무 것도 받지
              않으므로, <br />
              본인 확인은 휴대폰번호로만 가능합니다~ <br />* 출조 중이나 업무
              중에는 답변이 늦을 수 있음을 양해부탁드립니다
            </p>
          }
        />
      </section>
    </div>
  );
}
