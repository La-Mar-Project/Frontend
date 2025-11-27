import UseCoupon from "./UseCoupon";

export default function ResvCoupon({
  coupons,
  selectedCouponId,
  onSelectCoupon,
}) {
  // coupons: [{ couponId, type, expiresAt }, ...]

  if (!coupons || coupons.length === 0) {
    return (
      <div className="text-[16px]">사용 가능한 선예약 쿠폰이 없습니다.</div>
    );
  }

  return (
    <div className="rounded-[10px] px-[20px] py-[18px] grid grid-cols-6 gap-[12px] bg-sky-mid-s">
      {coupons.map((c) => (
        <UseCoupon
          key={c.couponId}
          coupon={c}
          selected={selectedCouponId === c.couponId}
          onSelect={() => onSelectCoupon?.(c.couponId)}
        />
      ))}
    </div>
  );
}
