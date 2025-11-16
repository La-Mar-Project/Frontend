import imgGoogle from "../../../assets/Google.svg";

export default function LoginGoogle({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex justify-between cursor-pointer bg-[#FFFFFF] border text-[18px] py-[10px] pl-[20px] pr-[70px] rounded-[10px] flex items-center w-auto font-[450]"
      style={{ opacity: disabled ? 0.6 : 1 }}
    >
      <div className="w-[30px]">
        <img src={imgGoogle} alt="Google" />
      </div>
      <p>Sign in with Google</p>
    </button>
  );
}
