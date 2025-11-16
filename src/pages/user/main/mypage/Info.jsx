import MyCoupon from "../../../../components/user/mypage/MyCoupon";
import BookCancel from "../../../../components/user/mypage/BookCancel";
import MyInfo from "../../../../components/user/mypage/MyInfo";
import Button from "../../../../components/user/mypage/Button";

export default function Info() {
  return (
    <div className="flex flex-col pt-[95px] pb-[200px] pr-[110px] gap-[80px] text-[26px] font-[600] text-titleblack">
      <section className="flex flex-col gap-[60px]">
        <p className="pl-[75px]">내 정보</p>
        <div className="pl-[336px]">
          <MyInfo />
        </div>
      </section>
      <section className="flex flex-col gap-[60px] w-auto pb-[30px]">
        <p className="pl-[75px]">내 쿠폰</p>
        <div className="pl-[115px]">
          <div className="rounded-[10px] px-[30px] py-[25px] grid grid-cols-6 justify-center items-center gap-[12px] bg-sky-mid-s">
            <MyCoupon />
            <MyCoupon />
            <MyCoupon />
            <MyCoupon />
            <MyCoupon />
            <MyCoupon />
            <MyCoupon />
            <MyCoupon />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-[60px] w-auto">
        <p className="pl-[75px]">예약/취소 내역</p>
        <section className="flex flex-col gap-6 pl-[115px]">
          <div className="flex gap-3">
            <Button text="전체 내역 보기" />
            <Button text="예약 내역만 보기" />
            <Button text="취소 내역만 보기" />
          </div>
          <div className="flex flex-col">
            <BookCancel />
          </div>
        </section>
      </section>
    </div>
  );
}
