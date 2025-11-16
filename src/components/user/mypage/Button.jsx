export default function Button({ text }) {
  return (
    <button className="rounded-[100px] text-[18px] text-logocolor font-[400] bg-white border border-logocolor hover:text-white  hover:bg-logocolor w-[158px] h-[37px] px-4 py-2 flex justify-center items-center">
      {text}
    </button>
  );
}
