import { useEffect, useMemo, useRef, useState } from "react";

function PeopleSelect({ value, onChange, min = 1, max = 10 }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const popRef = useRef(null);

  const options = useMemo(
    () => Array.from({ length: max - min + 1 }, (_, i) => i + min),
    [min, max]
  );

  // 바깥 클릭으로 닫기
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (
        !btnRef.current?.contains(e.target) &&
        !popRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", handler);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", handler);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative inline-block">
      {/* 토글 버튼 */}
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="h-[34px] min-w-[56px] px-3 rounded-[10px] border border-[#828BC0] text-[16px] flex items-center justify-center gap-1 bg-white"
      >
        <span>{value}</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 111.06 1.06l-4.24 3.36a.75.75 0 01-.94 0L5.21 8.29a.75.75 0 01.02-1.08z" />
        </svg>
      </button>

      {/* 옵션 팝업 */}
      {open && (
        <div
          ref={popRef}
          className="absolute z-50 mt-2 w-[160px] max-h-[200px] overflow-auto rounded-[10px] border border-[#D3D8F0] bg-white shadow-md"
          role="listbox"
        >
          {options.map((n) => {
            const active = n === value;
            return (
              <button
                key={n}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange?.(n);
                  setOpen(false);
                }}
                className={[
                  "w-full text-left px-3 py-2 text-[16px]",
                  active
                    ? "bg-logo-fill text-white"
                    : "hover:bg-gray-50 text-[#2B2B2B]",
                ].join(" ")}
              >
                {n}명
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ResvInfo({
  date,
  username,
  nickname,
  phone,
  headCount,
  onChangeField,
  minPeople = 1,
  maxPeople = 10,
}) {
  return (
    <div className="flex flex-col gap-5 text-[20px] font-[400]">
      {/* 출항일 */}
      <section className="flex justify-between w-[415px]">
        출항일
        <div className="text-[20px] font-[400] rounded-[10px] flex justify-start items-center w-[291px] h-[34px] px-[10px] py-[5px]">
          {date}
        </div>
      </section>

      {/* 예약자명 */}
      <section className="flex justify-between w-[420px]">
        예약자명
        <div className="border border-[#828BC0] rounded-[10px] flex items-center w-[291px] h-[34px] px-[10px]">
          <input
            className="focus:outline-none w-full text-[16px]"
            placeholder="이름을 입력해주세요."
            value={username}
            onChange={(e) => onChangeField?.("username", e.target.value)}
          />
        </div>
      </section>

      {/* 닉네임 */}
      <section className="flex justify-between w-[456px]">
        닉네임
        <div className="flex flex-col gap-1">
          <div className="border border-[#828BC0] rounded-[10px] flex items-center w-[291px] h-[34px] px-[10px]">
            <input
              className="focus:outline-none w-full text-[16px]"
              placeholder="닉네임을 입력해주세요."
              value={nickname}
              onChange={(e) => onChangeField?.("nickname", e.target.value)}
            />
          </div>
          <p className="text-[14px]">
            * 달력에서 닉네임으로 예약 진행단계를 확인할 수 있습니다.
          </p>
        </div>
      </section>

      {/* 연락처 */}
      <section className="flex justify-between w-[420px]">
        연락처
        <div className="flex flex-col gap-1">
          <div className="border border-[#828BC0] rounded-[10px] flex items-center w-[291px] h-[34px] px-[10px]">
            <input
              className="focus:outline-none w-full text-[16px]"
              placeholder="010-0000-0000"
              value={phone}
              onChange={(e) => onChangeField?.("phone", e.target.value)}
            />
          </div>
          <p className="text-[14px]">
            * 출조 안내를 위해 필요하므로 정확히 기재해주세요.
          </p>
        </div>
      </section>

      {/* 예약인원 - 드롭다운 토글 */}
      <section className="flex gap-[60px] justify-start w-[300px]">
        예약인원
        <div className="flex items-center gap-2">
          <PeopleSelect
            value={headCount}
            onChange={(n) => onChangeField?.("headCount", n)}
            min={minPeople}
            max={maxPeople}
          />
          <span className="text-[18px]">명</span>
        </div>
      </section>
    </div>
  );
}
