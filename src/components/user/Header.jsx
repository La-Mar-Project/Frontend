import Logoblue from "../../assets/LogoBlue.svg";

const justifyMap = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

export default function Header({ showLogo = true, actionsAlign = "right" }) {
  return (
    <div className="grid grid-cols-3">
      <div />

      {showLogo && (
        <div className="h-[250px] w-full flex justify-center items-center">
          <img src={Logoblue} alt="Logo" className="w-[347px] h-auto" />
        </div>
      )}

      <div
        className={[
          !showLogo ? "col-start-3" : "",
          "my-[11px] mr-5 shrink-0 flex items-start text-[18px] gap-[15px]",
          justifyMap[actionsAlign] ?? justifyMap.right,
        ].join(" ")}
      >
        <button className="p-[10px]">마이페이지</button>
        <button className="p-[10px]">로그아웃</button>
        <button className="p-[10px]">회원가입</button>
      </div>
    </div>
  );
}
