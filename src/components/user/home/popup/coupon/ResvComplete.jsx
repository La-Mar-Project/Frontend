import Logo from "../../../../../assets/Logo.svg";
import LogoBlue from "../../../../../assets/LogoBlue.svg";
import Terms from "../../../../../assets/Terms.png";

export default function ResvComplete({
  date,
  priceText,
  onClose,
  username,
  nickname,
  phone,
  headCount,
  request,
}) {
  return (
    <div className="bg-white rounded-[10px] w-[870px] shadow-xl max-h-[85vh] flex flex-col translate-x-40">
      <div className="flex-1 overflow-y-auto flex flex-col gap-[88px]">
        <div className="pt-[110px] px-[108px]">
          <div className="flex flex-col justify-center items-center gap-[6px] px-[100px] pt-[30px] pb-[50px] bg-sky-lightest-f rounded-[30px] drop-shadow-lg">
            <div className="w-[72px]">
              <img src={Logo} />
            </div>
            <p className="flex justify-center items-center text-[32px] text-black-t font-semibold text-center">
              예약이 접수되었습니다!
            </p>
            <p className="text-center text-gray-sub-t text-[18px] font-[400] leading-[1.5]">
              카카오뱅크 3333-11-4774597로 입금해야 예약이 완료됩니다.
              <br />
              마이페이지에서 예약 진행단계를 확인할 수 있습니다.
            </p>
          </div>
        </div>
        <div className="px-[18px] flex flex-col justify-center">
          <div className="px-[310px]">
            <div className="rounded-t-[10px] px-[30px] pt-[15px] pb-[11px] text-[18px] font-[600] flex justify-center bg-sky-mid-s">
              내 예약정보 다시보기
            </div>
          </div>
          <section className="flex flex-col items-start border-2 border-sky-mid-s rounded-[20px] text-black-t gap-[35px] py-[50px] px-[63px] text-[18px] text-center">
            <div className="flex gap-[123px]">
              <p className="text-[22px] font-[600]">예약정보</p>
              <div className="flex flex-col gap-[15px] w-[400px] justify-between shrink-0">
                <div className="flex gap-[90px]">
                  <p className="font-[500] text-start w-[80px]">출항일</p>
                  <p className="px-[10p] w-[280px] text-start">{date}</p>
                </div>
                <div className="flex gap-[90px]">
                  <p className="font-[500] text-start w-[80px]">예약자명</p>
                  <p className="px-[10p] w-[280px] text-start">{username}</p>
                </div>
                <div className="flex gap-[90px]">
                  <p className="font-[500] text-start w-[80px]">닉네임</p>
                  <p className="px-[10p] w-[280px] text-start">{nickname}</p>
                </div>
                <div className="flex gap-[90px]">
                  <p className="font-[500] text-start w-[80px]">연락처</p>
                  <p className="px-[10p] w-[280px] text-start">{phone}</p>
                </div>
                <div className="flex gap-[90px]">
                  <p className="font-[500] text-start w-[80px]">예약인원</p>
                  <p className="px-[10p] w-[280px] text-start">{headCount}명</p>
                </div>
              </div>
            </div>
            <div className="flex gap-[160px]">
              <p className="text-[22px] font-[600]">쿠폰</p>
              <div className="flex w-[380px] justify-between shrink-0">
                <div className="flex gap-[7px]">
                  시즌3 선예약 쿠폰 <p className="text-5 font-[500]">1</p>매
                  사용
                </div>
              </div>
            </div>
            <div className="flex gap-[123px]">
              <p className="text-[22px] font-[600]">결제금액</p>

              <span className="flex gap-[6px] text-[24px] text-red-notifi-t font-bold">
                {priceText}
                <p className="text-black-t">원</p>
              </span>
            </div>
            <div className="flex gap-[123px]">
              <p className="text-[22px] font-[600]">입금계좌</p>
              <div className="flex flex-col w-[500px] justify-between shrink-0">
                <div className="text-[18px] font-[400] flex justify-start items-center gap-[9px]">
                  입금계좌 1010101010101010
                </div>
                <p className="text-[14px] text-start">
                  * 입금이 확인되면 문자로 알려드립니다. 또는 예약달력에서
                  확인해볼 수 있습니다.
                </p>
              </div>
            </div>
            <div className="flex gap-[160px]">
              <p className="text-[22px] font-[600]">메모</p>
              <div className="flex w-[500px] justify-between shrink-0">
                <p className="font-[500 text-start w-[400px]]">
                  {request || "메모가 없습니다."}
                </p>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <img src={Terms} className="w-[774px]" />
            </div>
          </section>
          <div className="flex flex-col">
            <div className="flex flex-col mt-[100px] mb-[120px] px-[223px]">
              <button
                onClick={onClose}
                className="cursor-pointer bg-logo-fill text-white flex justify-center items-center h-[67px] rounded-lg text-[20px]"
              >
                확인
              </button>
            </div>
            <div className="flex justify-center items-center w-full mb-[200px]">
              <img src={LogoBlue} className="w-[108px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
