export default function DetailList({
  member = "한로로",
  count = "1",
  state = "예약접수",
}) {
  return (
    <div className="flex justify-between px-[14px]">
      <div className="text-center">{member}</div>
      <div className="text-center">{count}</div>
      <div className="text-center">{state}</div>
    </div>
  );
}
