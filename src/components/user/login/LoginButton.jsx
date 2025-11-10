export default function LoginButton({
  bgcolor = "#1111",
  text = "#FFFF",
  textcolor,
}) {
  return (
    <button
      style={{
        backgroundColor: bgcolor.startsWith("#") ? bgcolor : `#${bgcolor}`,
        color: textcolor.startsWith("#") ? textcolor : `#${textcolor}`,
      }}
      className="text-[18px] py-[10px] px-[18px] rounded-[10px] flex justify-center items-center w-auto font-[450]"
    >
      {text}
    </button>
  );
}
