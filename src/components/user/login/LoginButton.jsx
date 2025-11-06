export default function LoginButton({ bgcolor, text }) {
  return (
    <button
      className={`text-[18px] py-[14px] px-[18px] rounded-[10px] flex justify-center items-center h-10 w-auto bg-${bgcolor}`}
    >
      {text}
    </button>
  );
}
