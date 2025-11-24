export default function DetailList({
  index = 0,
  member = "한로로",
  count = "1",
  state = "예약접수",
}) {
  const displayName = member.length > 6 ? member.slice(0, 4) + "..." : member;
  const isEven = index % 2 === 1; // index: 0(1번째), 1(2번째) ...
  const rowBgClass = isEven ? "bg-sky-lightest-f" : "";

  const statusClass = state === "예약접수" ? "text-[#DC6007]" : "text-black-t";

  return (
    <div
      className={`grid grid-cols-3 px-[10px] py-[5px] text-center ${rowBgClass}`}
    >
      <div className="flex justify-center overflow-hidden">
        <div>{displayName}</div>
      </div>
      <div>
        <div>{count}</div>
      </div>
      <div>
        <div
          className={`flex justify-center items-center text-center ${statusClass}`}
        >
          {state}
        </div>
      </div>
    </div>
  );
}
