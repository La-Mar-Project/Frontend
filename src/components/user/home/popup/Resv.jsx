import { useEffect, useState } from "react";
import LogoBlue from "../../../../assets/LogoBlue.svg";
import ResvInfo from "./ResvInfo";
import ResvCoupon from "./coupon/ResvCoupon";
import Terms from "../../../../assets/Terms.png";
import ResvComplete from "./coupon/ResvComplete";
import { useUser } from "../../../../contexts/UserContext";
import { apiPost } from "../../../../utils/api";

export default function Resv({
  isOpen,
  date,
  schedule,
  onClose,
  onConfirm,
  defaultCouponId,
}) {
  const { user } = useUser();

  const MAX_TOTAL_HEADCOUNT = 18;

  const remaining = schedule?.remainingHeadCount ?? MAX_TOTAL_HEADCOUNT;

  const maxSelectableHeadCount = Math.min(MAX_TOTAL_HEADCOUNT, remaining);

  const normalizedType =
    typeof schedule?.type === "string"
      ? schedule.type.trim().toUpperCase()
      : "NORMAL";
  const isEarly = normalizedType === "EARLY";

  useEffect(() => {
    if (!isOpen) return;

    // 팝업 열릴 때마다 동의/단계 초기화
    setAgreed(false);
    setPhase("form");

    setForm((prev) => {
      const nextHeadCount = Math.min(
        prev.headCount || 1,
        maxSelectableHeadCount || 1
      );

      return {
        ...prev,
        username: user?.username ?? prev.username ?? "",
        nickname: user?.nickname ?? prev.nickname ?? "",
        phone: user?.phone ?? prev.phone ?? "",
        headCount: nextHeadCount,
        couponId: defaultCouponId ?? prev.couponId ?? null,
      };
    });
  }, [isOpen, user, maxSelectableHeadCount, defaultCouponId]);

  const formattedDepartLabel = (() => {
    if (!date) return "-";

    const [y, m, d] = date.split("-");
    const dt = new Date(Number(y), Number(m) - 1, Number(d));
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[dt.getDay()];

    const tide = schedule?.tide ? `${schedule.tide}물` : "";
    const fish = schedule?.fishType ?? "";

    // "11월 18일(화) 3물 광어" 형태
    return `${Number(m)}월 ${Number(d)}일(${weekday})${tide ? ` ${tide}` : ""}${
      fish ? ` ${fish}` : ""
    }`;
  })();

  const priceText =
    schedule?.price != null ? schedule.price.toLocaleString() : "0";

  const [form, setForm] = useState({
    username: "",
    nickname: "",
    phone: "",
    headCount: 1,
    request: "",
    couponId: null,
  });

  const [agreed, setAgreed] = useState(false);
  const [phase, setPhase] = useState("form");

  useEffect(() => {
    if (isOpen) {
      setAgreed(false);
      setPhase("form");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  const handleConfirm = async () => {
    if (!agreed) return; // 약관 동의 안 했으면 막기

    if (!schedule?.publicId) {
      alert("스케줄 정보가 없어 예약을 진행할 수 없습니다.");
      return;
    }

    // 1) 서버로 보낼 데이터 구성 (Postman에 적어둔 그 JSON 그대로)
    const payload = {
      username: form.username || null,
      nickname: form.nickname || null,
      phone: form.phone || null,
      headCount: form.headCount,
      request: form.request || null,
      couponId: form.couponId ?? null,
    };

    try {
      const res = await apiPost(
        `/schedules/${schedule.publicId}/reservation`,
        payload
      );

      if (!res.ok) {
        throw new Error(`예약 생성 실패 (${res.status})`);
      }

      const body = await res.json();
      console.log("[ResvPopup] 예약 생성 응답:", body);

      const created = body.data; // 백엔드가 data에 새 예약 정보를 넣어준다고 가정

      // 3) 필요하면 부모(Home)에 "예약 성공했다" 알려주기
      await onConfirm?.(created);

      // 4) 같은 팝업 안에서 완료 화면으로 전환
      setPhase("done");
    } catch (e) {
      console.error(e);
      alert(e.message || "예약 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      onClick={handleOverlay}
      role="dialog"
      aria-modal="true"
    >
      {phase === "form" ? (
        <div className="bg-white rounded-[10px] w-[870px] shadow-xl max-h-[85vh] flex flex-col translate-x-40">
          <div className="rounded-t-[10px] pb-[26px] bg-sky-mid-s flex flex-col items-center justify-center">
            <div className="flex justify-end w-full">
              <button
                onClick={onClose}
                className="pt-3 px-4 text-[20px]"
                aria-label="Close"
              >
                <div className="bg-logocolor text-white px-[9px] rounded-[6px]">
                  X
                </div>
              </button>
            </div>
            <h2 className="text-[24px] font-semibold">예약하기</h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-[80px]">
              <section className="mt-[30px] flex flex-col gap-[25px]">
                <p className="pl-[75px] text-[22px] font-semibold">
                  예약정보 입력
                </p>
                <div className="pl-[200px]">
                  <ResvInfo
                    date={formattedDepartLabel}
                    username={form.username}
                    nickname={form.nickname}
                    phone={form.phone}
                    headCount={form.headCount}
                    onChangeField={(key, value) =>
                      setForm((prev) => ({ ...prev, [key]: value }))
                    }
                    minPeople={1}
                    maxPeople={maxSelectableHeadCount}
                  />
                </div>
              </section>
              {isEarly && (
                <section className="flex gap-[25px]">
                  <p className="pl-[75px] text-[22px] font-semibold">쿠폰</p>
                  <div className="flex items-center px-[60px]">
                    <div className="flex w-full">
                      시즌3 선예약 쿠폰 1매 사용
                    </div>
                  </div>
                </section>
              )}
              <section className=" flex flex-col gap-[25px]">
                <p className="pl-[75px] text-[22px] font-semibold">인증코드</p>
              </section>
              <section className=" flex gap-[70px]">
                <p className="pl-[75px] text-[22px] font-semibold">결제금액</p>
                <div className="text-[24px] font-[700] flex justify-center items-center gap-[9px]">
                  <p className="text-red-notifi-t">{priceText}</p>원
                </div>
              </section>
              <section className="flex gap-[70px]">
                <p className="pl-[75px] text-[22px] font-semibold">입금계좌</p>
                <div className="mt-1 flex flex-col gap-2 ">
                  <div className="text-[18px] font-[400] flex justify-start items-center gap-[9px]">
                    입금계좌 1010101010101010
                  </div>
                  <p className="text-[14px]">
                    *입금이 확인되면 문자로 알려드립니다. 또는 예약달력에서
                    확인해볼 수 있습니다.
                  </p>
                </div>
              </section>
              <section className="flex gap-[106px] pr-[110px]">
                <p className="shrink-0 pl-[75px] text-[22px] font-semibold">
                  메모
                </p>
                <textarea
                  placeholder="메모 남겨주세요."
                  className="mt-1 w-full h-[110px] rounded-[10px] border border-[#828BC0] py-[10px] px-4"
                  value={form.request}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, request: e.target.value }))
                  }
                />
              </section>
              <section className="flex flex-col gap-[25px]">
                <div className="flex gap-[80px]">
                  <p className="pl-[75px] text-[22px] font-semibold">
                    약관동의
                  </p>
                  <p className="mt-1">* 약관동의를 확인해주세요</p>
                </div>
                <div className="px-[50px]">
                  <div className="w-full flex justify-center">
                    <img src={Terms} className="w-[774px]" />
                  </div>
                  <div className="mt-5 flex justify-end items-center gap-2 mr-[10px]">
                    <button
                      type="button"
                      onClick={() => setAgreed((v) => !v)}
                      className={[
                        "cursor-pointer h-[20px] w-[20px] rounded-[5px] text-[16px] border",
                        agreed
                          ? "bg-logo-fill text-white border-logo-fill"
                          : "bg-white text-titleblack border-[#828BC0]",
                      ].join(" ")}
                      aria-pressed={agreed}
                    >
                      {agreed ? "" : ""}
                    </button>
                    <p className="text-[14px] font-[500]">
                      위의 사항을 숙지하였으며, 동의합니다.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-[146px] space-y-2 px-[2]">
              <div className="flex flex-col">
                <div className="flex flex-col mb-[120px] px-[223px]">
                  <button
                    onClick={handleConfirm}
                    disabled={!agreed}
                    aria-disabled={!agreed}
                    className={[
                      "cursor-pointer flex justify-center items-center h-[67px] rounded-lg text-[20px]",
                      "transition",
                      agreed
                        ? "bg-logo-fill text-white"
                        : "bg-gray-300 text-white cursor-not-allowed opacity-60",
                    ].join(" ")}
                  >
                    예약하기
                  </button>
                </div>
                <div className="flex justify-center items-center w-full mb-[200px]">
                  <img src={LogoBlue} className="w-[108px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ResvComplete
          date={formattedDepartLabel}
          priceText={priceText}
          username={form.username}
          nickname={form.nickname}
          phone={form.phone}
          headCount={form.headCount}
          request={form.request}
          onClose={onClose}
          type={normalizedType}
        />
      )}
    </div>
  );
}
