export default function GuestButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-[50px] bg-gray-lightest-b text-black-t rounded-[10px] text-[18px] font-[500]"
    >
      비회원으로 볼래요
    </button>
  );
}
