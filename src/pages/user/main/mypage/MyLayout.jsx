import { NavLink, Outlet } from "react-router-dom";
import Logoblue from "../../../../assets/LogoBlue.svg";

export default function MyLayout() {
  const base = "hover:underline hover:font-semibold cursor-pointer";
  const active = ({ isActive }) =>
    isActive ? `${base} font-semibold underline` : base;

  return (
    <div className="grid grid-cols-[1.5fr_5fr] grid-rows-[159px_1fr]">
      <div className="flex justify-center items-center border-r-2 border-b-2 text-center text-[30px] font-[700] px-14 py-14 text-logocolor">
        마이페이지
      </div>

      <div className="row-span-2">
        <Outlet />
      </div>

      <div className="flex flex-col border-r-2 justify-between">
        <div className="text-[20px] text-textblack py-5 pl-10 flex flex-col justify-center items-start gap-[6px]">
          <div className="flex gap-4">
            <p>•</p>
            <NavLink to="." end className={active}>
              내 정보
            </NavLink>
          </div>
          <div className="flex gap-4">
            <p>•</p>
            <NavLink to="coupon" className={active}>
              내 쿠폰
            </NavLink>
          </div>
          <div className="flex gap-4">
            <p>•</p>
            <NavLink to="history" className={active}>
              예약/취소 내역
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
