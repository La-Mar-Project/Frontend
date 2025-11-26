import { Outlet, NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/user/Footer";
import Header from "../../components/user/Header";
import Advertisement from "../../assets/Advertisement.svg";

const base =
  "px-[25px] py-5 text-[22px] font-regular border-t-2 flex items-center justify-center text-center";
const active = "bg-linecolor text-white";
const hover = "hover:bg-sky-mid-s hover:text-linecolor";

const navClass = ({ isActive }) => `${base} ${hover} ${isActive ? active : ""}`;

export default function Main() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <section className="grid-rows-[auto_159px_1fr] text-title grid grid-cols-[1.2fr_repeat(4,1fr)] divide-x-2 divide-y-2 divide-linecolor flex-1">
        <div className="bg-sky-mid-s">
          <img src={Advertisement} className="h-full" />
        </div>

        <NavLink to="notice" className={navClass}>
          중요공지 확인하기
        </NavLink>

        <NavLink to="intro" className={navClass}>
          쭈불 둘러보기
        </NavLink>

        {/* <NavLink to="catch" className={navClass}>
          조과글 확인하기
        </NavLink> */}

        <NavLink to="mypage" className={navClass}>
          마이페이지
        </NavLink>

        <div
          onClick={() => navigate("/home")}
          className="cursor-pointer hover:bg-sky-mid-s hover:text-linecolor border-r-0 border-b-2 px-[25px] py-5 text-[22px] font-regular border-t-2 flex items-center justify-center text-center"
        >
          쭈불 예약하기
        </div>

        <div className="col-span-6 border-b-0 border-r-0 row-span-2">
          <Outlet />
        </div>
      </section>
      <Footer />
    </div>
  );
}
