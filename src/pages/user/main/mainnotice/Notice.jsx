import Maincompoenent from "../../../../components/user/main/Maincomponent";
import ShipInfoLeft from "../../../../assets/ShipInfoLeft.png";
import ShipInfoRight from "../../../../assets/ShipInfoRight.png";

export default function Notice() {
  return (
    <>
      <div className="px-[70px]">
        <div className="text-textblack pt-[45px] pb-10 pl-[58px] pr-[27px] flex flex-col justify-center h-[159px] border-b-2 border-linecolor2">
          <p className="text-[30px]">⭐️ 중요 공지 확인 필수 ⭐️</p>
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
        />{" "}
        <Maincompoenent
          num="2"
          title="2025년 쭈불호 승선 전 필독 공지"
          link="http://cafe.naver.com/lamarfishing"
        />{" "}
        <Maincompoenent
          num="3"
          title="1일 전 자리번호 안내"
          link="http://cafe.naver.com/lamarfishing"
        />{" "}
        <Maincompoenent
          num="4"
          title="쭈갑예약 대기 관련"
          text={
            <p className="shrink-0">
              <span className="font-[500]">
                예약 대기는 받지 않고 있습니다.
              </span>{" "}
              7일전 취소건에 해당하는 경우에만 알려드리는 취소건 알리미방을
              운영하며, 그 외의 취소건은 별도 알림 없이 예약 프로그램에
              오픈해놓습니다. <br />
              <br />
              * 취소건 알리미방 가기 <br />
              010-5897-0560 으로 문자 주시면 링크와 비밀번호 안내드립니다!
            </p>
          }
        />{" "}
        <Maincompoenent
          num="5"
          title="자리 배정 방법, 시작번호 추천 알림"
          text="중요한 공지사항은 카페를 통해 안내하고 있습니다."
          link="http://cafe.naver.com/lamarfishing"
        />{" "}
        <Maincompoenent
          num="6"
          title="출조점 관련"
          text={
            <p className="shrink-0">
              쭈불호는 <span className="font-[500]">출조점 없이</span>{" "}
              운영합니다~ 승선명부 정보를 출조 1일전 오전 중으로 문자로
              보내주시면 되며, 당일에는 출항시간 5분전까지 남당항 슬로프로
              오셔서 바로 배에 타시면 됩니다.
            </p>
          }
        />{" "}
        <Maincompoenent
          num="7"
          title="자리 배치도"
          img1={ShipInfoLeft}
          img2={ShipInfoRight}
        />{" "}
        <Maincompoenent
          num="8"
          title="선예약 운영 관련 정보"
          link="http://cafe.naver.com/lamarfishing"
        />
      </section>
    </>
  );
}
