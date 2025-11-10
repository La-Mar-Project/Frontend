import Footer from "../../components/user/Footer";
import Header from "../../components/user/Header";
import Notice from "./main/mainnotice/Notice";

export default function Main() {
  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <section className="grid-rows-[auto_159px_1fr] text-title grid grid-cols-[1.5fr_repeat(5,1fr)] divide-x-2 divide-y-2 divide-linecolor flex-1">
        <div className="bg-skylight">광고배너</div>
        <button className="hover:bg-linecolor hover:text-white px-[25px] py-5 text-[22px] font-regular border-t-2">
          중요공지 확인하기
        </button>
        <button className="hover:bg-linecolor hover:text-white  px-[25px] py-5 text-[22px] font-regular border-t-2">
          쭈불 둘러보기
        </button>
        <button className="hover:bg-linecolor hover:text-white  px-[25px] py-5 text-[22px] font-regular border-t-2">
          조과글 확인하기
        </button>
        <button className="hover:bg-linecolor hover:text-white  px-[25px] py-5 text-[22px] font-regular border-t-2">
          마이페이지
        </button>
        <button className="hover:bg-linecolor hover:text-white  border-r-0 border-b-2 px-[25px] py-5 text-[22px] font-regular border-t-2">
          쭈불 예약하기
        </button>
        <div className="col-span-6 border-b-0 border-r-0 row-span-2">
          <Notice />
        </div>
      </section>
      <Footer />
    </div>
  );
}
