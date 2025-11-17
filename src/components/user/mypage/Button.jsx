export default function Button({ text, onClick, active = false }) {
  const base =
    "rounded-[100px] text-[18px] font-[400] border border-logocolor w-[158px] h-[37px] px-4 py-2 flex justify-center items-center";

  const normal = "bg-white text-logocolor hover:bg-logocolor hover:text-white";
  const selected = "bg-logocolor text-white";

  return (
    <button
      onClick={onClick}
      className={`${base} ${active ? selected : normal}`}
    >
      {text}
    </button>
  );
}
