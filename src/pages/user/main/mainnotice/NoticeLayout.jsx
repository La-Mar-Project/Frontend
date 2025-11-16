import { NavLink, Outlet } from "react-router-dom";
import Logoblue from "../../../../assets/LogoBlue.svg";

export default function NoticeLayout() {
  const base = "hover:underline hover:font-semibold cursor-pointer";
  const active = ({ isActive }) =>
    isActive ? `${base} font-semibold underline` : base;

  return (
    <div className="grid grid-cols-[1.5fr_5fr] grid-rows-[159px_1fr]">
      <div className="flex justify-center items-center border-r-2 border-b-2 text-center text-[30px] font-[700] px-14 py-14 text-logocolor">
        중요공지 확인하기
      </div>

      <div className="row-span-2">
        <Outlet />
      </div>

      <div className="flex flex-col border-r-2 justify-between">
        <div className="text-[20px] text-textblack py-5 pl-10 flex flex-col justify-center items-start gap-[6px]">
          <div className="flex gap-4">
            <p>•</p>
            <NavLink to="." end className={active}>
              ⭐️ 중요 공지 확인 필수 ⭐️
            </NavLink>
          </div>
          <div className="flex gap-4">
            <p>•</p>
            <NavLink to="cancel" className={active}>
              취소/환불 안내글
            </NavLink>
          </div>
        </div>
        <div className="py-[50px] px-[80px] flex justify-center items-center">
          <img src={Logoblue} alt="logo" />
        </div>
      </div>
    </div>
  );
}
