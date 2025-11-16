export default function LoginGoogle({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="cursor-pointer text-[18px] py-[10px] px-[18px] rounded-[10px] flex justify-center items-center w-auto font-[450]"
    >
      Sign in with Google
    </button>
  );
}
