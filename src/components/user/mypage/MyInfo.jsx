import { useEffect, useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import { apiPatch } from "../../../utils/api";

function formatPhoneDisplay(phone) {
  if (!phone) return "-";

  const digits = String(phone).replace(/\D/g, ""); // 숫자만 남기기
  if (!digits) return "-";

  if (digits.length <= 3) return digits;
  if (digits.length <= 7) {
    // 3 - 나머지
    return digits.slice(0, 3) + "-" + digits.slice(3);
  }
  // 3 - 4 - 나머지(최대 4자리)
  return (
    digits.slice(0, 3) + "-" + digits.slice(3, 7) + "-" + digits.slice(7, 11)
  );
}

export default function MyInfo() {
  const { user, setUser } = useUser(); // UserContext에서 가져오기
  const [nickname, setNickname] = useState("");
  const [saving, setSaving] = useState(false);

  // user가 바뀔 때 nickname 초기값 세팅
  useEffect(() => {
    if (user?.nickname) {
      setNickname(user.nickname);
    }
  }, [user]);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleNicknameUpdate = async () => {
    const trimmed = nickname.trim();

    if (!trimmed) {
      alert("닉네임을 입력해 주세요.");
      return;
    }

    if (!user) {
      alert("로그인 후 이용해 주세요.");
      return;
    }

    if (trimmed === (user.nickname ?? "")) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    try {
      setSaving(true);

      const res = await apiPatch("/users/me/profile-nickname", {
        nickname: trimmed,
      });

      if (!res.ok) {
        throw new Error(`닉네임 수정 실패 (${res.status})`);
      }

      // const body = await res.json(); // 필요하면 응답도 사용

      // ✅ 전역 user 상태도 같이 업데이트
      setUser((prev) =>
        prev
          ? {
              ...prev,
              nickname: trimmed,
            }
          : prev
      );

      alert("닉네임이 수정되었습니다.");
    } catch (e) {
      console.error(e);
      alert(e.message ?? "닉네임 수정 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };
  const phoneDisplay = user?.phone ? formatPhoneDisplay(user.phone) : "-";

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
          <button
            className="cursor-pointer shrink-0 bg-sky-mid-s rounded-[10px] px-2 flex justify-center items-center text-[14px] font-[400x] disabled:opacity-60"
            onClick={handleNicknameUpdate}
            disabled={saving}
          >
            {saving ? "저장 중..." : "수정하기"}
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
          {phoneDisplay}
        </div>
      </section>
    </div>
  );
}
