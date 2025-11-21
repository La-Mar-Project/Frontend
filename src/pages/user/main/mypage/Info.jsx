import { useEffect, useState, useMemo } from "react";

import MyCoupon from "../../../../components/user/mypage/MyCoupon";
import BookCancel from "../../../../components/user/mypage/BookCancel";
import MyInfo from "../../../../components/user/mypage/MyInfo";
import Button from "../../../../components/user/mypage/Button";

import ResvPopup from "../../../../components/user/mypage/ResvPopup";
import CancelPopup from "../../../../components/user/mypage/CancelPopup";

const TABS = { ALL: "all", RESERVE: "reserve", CANCEL: "cancel" };
const RESERVE_SET = new Set(["RESERVE_COMPLETED", "DEPOSIT_COMPLETED"]);
const CANCEL_SET = new Set(["CANCEL_REQUESTED", "CANCEL_COMPLETED"]);

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_SERVER_URL;

export default function Info() {
  const [tab, setTab] = useState(TABS.ALL);

  // ✅ 서버에서 받아온 예약/취소 내역 리스트
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ 어떤 항목을 선택했는지
  const [selectedItem, setSelectedItem] = useState(null);
  // ✅ 어떤 팝업을 열지: "reserve" | "cancel" | null
  const [popupType, setPopupType] = useState(null);

  // 1) 처음에 한 번 전체 목록만 가져오기
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${AUTH_BASE_URL}/users/me/reservations`);
        if (!res.ok) {
          throw new Error(`예약 내역 불러오기 실패 (${res.status})`);
        }

        const body = await res.json();
        console.log("예약 API 응답:", body);

        const rawList = Array.isArray(body?.data?.content)
          ? body.data.content
          : [];

        const states = [
          "RESERVE_COMPLETED",
          "DEPOSIT_COMPLETED",
          "CANCEL_REQUESTED",
          "CANCEL_COMPLETED",
        ];

        const normalizedList = rawList.map((item, idx) => {
          // 진짜 process 문자열이 있으면 그걸 우선 쓰고
          if (typeof item.process === "string") {
            const up = item.process.trim().toUpperCase();
            if (states.includes(up)) {
              return { ...item, process: up };
            }
          }

          // 🔹 그게 아니면 UI 테스트용으로 상태를 번갈아가면서 할당
          return {
            ...item,
            process: states[idx % states.length],
          };
        });

        setItems(normalizedList);
      } catch (e) {
        console.error(e);
        if (e.name !== "AbortError") {
          setError(e.message ?? "알 수 없는 에러가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []); // ← tab 의존성 제거

  // 2) 탭에 따라 프론트에서 필터링
  const filtered = useMemo(() => {
    if (tab === TABS.ALL) return items;
    if (tab === TABS.RESERVE)
      return items.filter((i) => RESERVE_SET.has(i.process));
    if (tab === TABS.CANCEL)
      return items.filter((i) => CANCEL_SET.has(i.process));
    return items;
  }, [tab, items]);

  const handleDetailClick = async (item) => {
    const res = await fetch(
      `${AUTH_BASE_URL}/reservations/${item.reservationId}`
    );
    const body = await res.json();
    const detail = body.data; // { ship, reservation, schedule }

    setSelectedItem(detail);

    if (RESERVE_SET.has(detail.reservation.process)) {
      setPopupType("reserve");
    } else if (CANCEL_SET.has(detail.reservation.process)) {
      setPopupType("cancel");
    } else {
      setPopupType(null);
    }
  };

  const closePopup = () => {
    setPopupType(null);
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
            {!loading && !error && filtered.length === 0 && (
              <p className="text-[20px] text-gray-500">내역이 없습니다.</p>
            )}

            {filtered.map((it) => (
              <BookCancel
                key={it.reservationId} // ✅ 백엔드 필드명에 맞춤
                process={it.process} // 상태값 (RESERVE_COMPLETED 등)
                scheduleDeparture={it.scheduleDeparture}
                shipFishType={it.shipFishType}
                totalPrice={it.totalPrice}
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
        detail={selectedItem}
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
