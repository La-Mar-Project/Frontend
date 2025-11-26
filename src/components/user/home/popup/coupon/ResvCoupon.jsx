import UseCoupon from "./UseCoupon";

export default function ResvCoupon({ selectedCouponId, onSelectCoupon }) {
  const coupons = [
    { id: "c1", title: "시즌 3 선예약 쿠폰", period: "25.09.01 ~ 25.12.10" },
  ];

  return (
    <div className="rounded-[10px] px-[20px] py-[18px] grid grid-cols-6 gap-[12px] bg-sky-mid-s">
      {coupons.map((c) => (
        <UseCoupon
          key={c.id}
          coupon={c}
          selected={selectedCouponId === c.id}
          onSelect={() => onSelectCoupon?.(c.id)}
        />
      ))}
    </div>
  );
}
