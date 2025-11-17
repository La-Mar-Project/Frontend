import { useMemo, useState } from "react";

import MyCoupon from "../../../../components/user/mypage/MyCoupon";
import BookCancel from "../../../../components/user/mypage/BookCancel";
import MyInfo from "../../../../components/user/mypage/MyInfo";
import Button from "../../../../components/user/mypage/Button";

import ResvPopup from "../../../../components/user/mypage/ResvPopup";
import CancelPopup from "../../../../components/user/mypage/CancelPopup";

const TABS = { ALL: "all", RESERVE: "reserve", CANCEL: "cancel" };
const RESERVE_SET = new Set(["RESERVE_COMPLETED", "DEPOSIT_COMPLETED"]);
const CANCEL_SET = new Set(["CANCEL_REQUESTED", "CANCEL_COMPLETED"]);

export default function Info() {
  const [tab, setTab] = useState(TABS.ALL);

  // ✅ 어떤 항목을 선택했는지
  const [selectedItem, setSelectedItem] = useState(null);
  // ✅ 어떤 팝업을 열지: "reserve" | "cancel" | null
  const [popupType, setPopupType] = useState(null);

  // 예시 데이터(나중에 API 데이터로 교체)
  const items = [
    { id: 1, process: "RESERVE_COMPLETED" },
    { id: 2, process: "DEPOSIT_COMPLETED" },
    { id: 3, process: "CANCEL_REQUESTED" },
    { id: 4, process: "CANCEL_COMPLETED" },
    { id: 5, process: "RESERVE_COMPLETED" },
    { id: 6, process: "DEPOSIT_COMPLETED" },
    { id: 7, process: "CANCEL_REQUESTED" },
    { id: 8, process: "CANCEL_COMPLETED" },
  ];

  // 탭에 따른 필터링
  const filtered = useMemo(() => {
    if (tab === TABS.ALL) return items;
    if (tab === TABS.RESERVE)
      return items.filter((i) => RESERVE_SET.has(i.process));
    if (tab === TABS.CANCEL)
      return items.filter((i) => CANCEL_SET.has(i.process));
    return items;
  }, [tab, items]);

  const handleDetailClick = (item) => {
    setSelectedItem(item);

    if (RESERVE_SET.has(item.process)) {
      setPopupType("reserve"); // 예약/입금 → ResvPopup
    } else if (CANCEL_SET.has(item.process)) {
      setPopupType("cancel"); // 취소 관련 → CancelPopup
    } else {
      setPopupType(null);
    }
  };

  const closePopup = () => {
    setPopupType(null);
    // 필요하면 selectedItem도 초기화
    // setSelectedItem(null);
  };

  return (
    <div className="flex flex-col pt-[95px] pb-[200px] pr-[110px] gap-[80px] text-[26px] font-[600] text-titleblack">
      <section id="section-info" className="flex flex-col gap-[60px]">
        <p className="pl-[75px]">내 정보</p>
        <div className="pl-[336px]">
          <MyInfo />
        </div>
      </section>
      <section
        id="section-coupon"
        className="flex flex-col gap-[60px] w-auto pb-[30px]"
      >
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
      <section id="section-history" className="flex flex-col gap-[60px] w-auto">
        <p className="pl-[75px]">예약/취소 내역</p>
        <section className="flex flex-col gap-6 pl-[115px]">
          <div className="flex gap-3">
            <Button
              text="전체 내역 보기"
              onClick={() => setTab(TABS.ALL)}
              active={tab === TABS.ALL}
            />
            <Button
              text="예약 내역만 보기"
              onClick={() => setTab(TABS.RESERVE)}
              active={tab === TABS.RESERVE}
            />
            <Button
              text="취소 내역만 보기"
              onClick={() => setTab(TABS.CANCEL)}
              active={tab === TABS.CANCEL}
            />
          </div>
          <div className="flex flex-col gap-3">
            {filtered.map((it) => (
              <BookCancel
                key={it.id}
                process={it.process}
                onDetail={() => handleDetailClick(it)}
              />
            ))}
          </div>
        </section>
      </section>
      {/* ✅ 예약/입금 관련 팝업 */}
      <ResvPopup
        isOpen={popupType === "reserve"}
        onClose={closePopup}
        // 나중에 date, 금액 등 props를 selectedItem에서 꺼내서 넘기면 됨
        // date={selectedItem?.something}
        // onConfirm={...}
      />

      {/* ✅ 취소 관련 팝업 */}
      <CancelPopup
        isOpen={popupType === "cancel"}
        onClose={closePopup}
        // 마찬가지로 selectedItem을 기반으로 상세 데이터 넘기면 됨
      />
    </div>
  );
}
