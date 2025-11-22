import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../contexts/UserContext";
// 나중에 실제 API 붙일 때 사용할 수 있음
// import { apiPost } from "../../utils/api";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    nickname: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // 간단한 프론트 검증
    if (!form.username.trim() || !form.nickname.trim()) {
      setError("이름과 닉네임을 모두 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      // 🔻 실제 백엔드 회원가입 API 연동 시 이렇게 쓰면 됨 (엔드포인트는 협의 필요)
      /*
      const res = await apiPost("/users/me/profile", form);
      if (!res.ok) throw new Error("회원가입 실패");

      const body = await res.json();
      const profile = body.data; // 백엔드 응답 형태에 맞게 조정
      */

      const profile = {
        username: form.username,
        nickname: form.nickname,
      };

      console.log("회원가입 폼 제출:", form);

      setUser((prev) => ({
        ...(prev || {}),
        ...profile,
      }));

      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(err.message ?? "회원가입 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-svh flex items-center justify-center bg-[#F6F7FF]">
      <div className="bg-white rounded-2xl shadow-md px-10 py-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">회원가입</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-[16px] font-[500]">이름</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="이름을 입력해주세요"
              className="border border-gray-300 rounded-[10px] px-3 py-2 text-[16px] focus:outline-none focus:ring-2 focus:ring-sky-mid-s"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[16px] font-[500]">닉네임</label>
            <input
              name="nickname"
              value={form.nickname}
              onChange={handleChange}
              placeholder="닉네임을 입력해주세요"
              className="border border-gray-300 rounded-[10px] px-3 py-2 text-[16px] focus:outline-none focus:ring-2 focus:ring-sky-mid-s"
            />
          </div>

          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-logocolor text-white rounded-[10px] py-2 text-[16px] font-[500] disabled:opacity-60"
          >
            {loading ? "처리 중..." : "회원가입 완료"}
          </button>
        </form>
      </div>
    </div>
  );
}
