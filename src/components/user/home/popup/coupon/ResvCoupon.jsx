export default function ResvCoupon({ coupons }) {
  // coupons: [{ couponId, type, expiresAt }, ...]

  if (!coupons || coupons.length === 0) {
    return (
      <div className="text-[16px]">사용 가능한 선예약 쿠폰이 없습니다.</div>
    );
  }

  return (
    <div className="flex text-[18px] w-[380px] justify-between shrink-0">
      <div className="flex gap-[7px]">
        시즌3 선예약 쿠폰 <p className="text-[18px] font-[500]">1</p>매 사용
      </div>
    </div>
  );
}
