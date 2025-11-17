import { useEffect, useState } from "react";
import { useUser } from "../../../contexts/UserContext";

export default function MyInfo() {
  const { user } = useUser(); // UserContext에서 가져오기
  const [nickname, setNickname] = useState("");

  // user가 바뀔 때 nickname 초기값 세팅
  useEffect(() => {
    if (user?.nickname) {
      setNickname(user.nickname);
    }
  }, [user]);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  // const handleNicknameUpdate = () => {
  //   // TODO: 나중에 닉네임 수정 API + UserContext 업데이트 연결
  //   console.log("닉네임 수정하기 클릭:", nickname);
  // };

  return (
    <div className="flex flex-col gap-5 text-[22px] font-[500]">
      <section className="flex justify-between w-[420px]">
        성명
        <div className="text-[20px] font-[400] rounded-[10px] flex justify-start items-center w-[291px] h-[34px] px-[10px] py-[5px]">
          {user.username ?? "-"}
        </div>
      </section>
      <section className="flex justify-between w-[420px]">
        닉네임
        <div className="border border-[#828BC0] text-[20px] font-[400] rounded-[10px] flex justify-start items-center w-[291px] h-[34px] px-[10px] py-[5px]">
          <input
            className="focus:outline-none w-[204px] text-[16px]"
            placeholder="닉네임을 입력해주세요."
            value={nickname}
            onChange={handleNicknameChange}
          />
          <button className="cursor-pointer shrink-0 bg-sky-mid-s rounded-[10px] px-2 flex justify-center items-center text-[14px] font-[400x]">
            수정하기
          </button>
        </div>
      </section>
      <section className="flex justify-between w-[420px]">
        등급
        <div className="text-[20px] font-[400] rounded-[10px] flex justify-start items-center w-[291px] h-[34px] px-[10px] py-[5px]">
          {user.grade ?? "-"}
        </div>
      </section>
      <section className="flex justify-between w-[420px]">
        전화번호
        <div className="text-[20px] font-[400] rounded-[10px] flex justify-start items-center w-[291px] h-[34px] px-[10px] py-[5px]">
          {user.phone ?? "-"}
        </div>
      </section>
    </div>
  );
}
