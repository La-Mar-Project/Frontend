export default function CancelPopup({ isOpen, onClose }) {
  // isOpen이 false면 아무것도 렌더하지 않음
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    // 오버레이(바깥 검은 영역)를 클릭했을 때만 닫기
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div className="w-[890px]">
        <div className="bg-white rounded-[10px] w-full max-w-[90vw] shadow-xl">
          {/* 헤더 */}
          <div className="rounded-t-[10px] bg-sky-mid-s flex items-start justify-between">
            <h2 className="text-[24px] font-semibold pl-[53px] py-[27px]">
              상세보기
            </h2>
            <button
              onClick={() => onClose?.()}
              className="py-3 px-4 text-[20px]"
              aria-label="Close"
            >
              <div className="bg-logocolor text-white px-[9px] rounded-[6px]">
                X
              </div>
            </button>
          </div>

          {/* 내용 영역 - 필요에 따라 selectedItem에서 정보 내려서 채우면 됨 */}
          <div className="px-7 text-[20px] font-[400] text-textblack flex flex-col">
            <section className="flex flex-col gap-[9px] px-[26px] py-[17px] border-b borer-[#454545]">
              <div className="text-[22px] font-[600]">취소 1매</div>
              <div className="flex flex-col gap-[11px]">
                <div className="flex gap-[11px]">
                  <p>취소 완료</p>
                  <p>기상악화로 인한 출항 취소</p>
                </div>
                <p>09.13(토) 쭈갑 </p>
                <p>90,000원</p>
              </div>
            </section>
            <section className="flex flex-col gap-[9px] px-[26px] py-[17px] border-b borer-[#454545]">
              <div className="text-[22px] font-[600]">취소 신청 정보</div>
              <div className="flex flex-col gap-[11px]">
                <div className="flex gap-[11px]">
                  <p>신청 일시</p>
                  <p>2025.09.10 09:35:14</p>
                </div>
                <div className="flex gap-[11px]">
                  <p>완료 일시</p>
                  <p>2025.09.10 09:35:14</p>
                </div>
                <div className="flex gap-[11px]">
                  <p>취소 사유</p>
                  <p>기상악화로 인한 출항 취소</p>
                </div>
              </div>
            </section>
            <section className="flex flex-col gap-[9px] px-[26px] py-[17px] pb-[30px]">
              <div className="text-[22px] font-[600]">환불 정보</div>
              <div className="flex flex-col gap-[11px]">
                <div className="flex gap-[106px]">
                  <p>결제 금액</p>
                  <p>90,000원</p>
                </div>
                <div className="flex gap-[66px]">
                  <p>환불 예정 금액</p>
                  <p>90,000원</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
