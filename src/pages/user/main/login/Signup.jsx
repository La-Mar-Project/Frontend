import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../../../contexts/UserContext";

const API_BASE = import.meta.env.VITE_API_SERVER_URL;

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    nickname: "",
    phonenumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUser();

  const state = location.state || {};
  const params = new URLSearchParams(location.search);

  const provider = state.provider ?? params.get("provider");
  const sub = state.sub ?? params.get("sub");

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

    if (
      !form.username.trim() ||
      !form.nickname.trim() ||
      !form.phonenumber.trim()
    ) {
      setError("이름과 닉네임, 전화번호를 모두 입력해주세요.");
      return;
    }

    if (!provider || !sub) {
      setError("소셜 로그인 정보가 없습니다. 처음부터 다시 로그인해주세요.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/user/oauth2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider,
          sub,
          username: form.username,
          nickname: form.nickname,
          phonenumber: form.phonenumber,
        }),
      });

      if (!res.ok) {
        throw new Error("회원가입 실패");
      }

      const body = await res.json();

      const profile = body.data ?? {
        username: form.username,
        nickname: form.nickname,
        phonenumber: form.phonenumber,
      };

      console.log("회원가입 폼 제출:", {
        ...profile,
        provider,
        sub,
      });

      if (body.accessToken) {
        localStorage.setItem("accessToken", body.accessToken);
      }

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

          <div className="flex flex-col gap-2">
            <label className="text-[16px] font-[500]">전화번호</label>
            <input
              name="phonenumber"
              value={form.phonenumber}
              onChange={handleChange}
              placeholder="010-0000-0000"
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
