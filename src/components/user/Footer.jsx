export default function Footer() {
  return (
    <div>
      <div className="px-12 py-12 bg-[#F2F2F2] flex flex-col gap-[14px]">
        <section>유의사항</section>
        <section>취소/환불 규정</section>
      </div>
      <div className="py-8 bg-logocolor text-white text-[14px] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-1">
          <p>사업자번호 : 123-45-67890</p>
          <p>서강대학교</p>
          <p>전화문의: 010-1234-1234</p>
          <p>COPYRIGHT © 키위바나나 ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </div>
  );
}
