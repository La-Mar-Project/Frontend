import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../../../contexts/UserContext";
import { refreshAccessToken } from "../../../../utils/api";

const AUTH_SERVER = import.meta.env.VITE_AUTH_SERVER_URL || "";

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

  const jwt = params.get("jwt");

  let jwtPayload = null;
  if (jwt) {
    try {
      const [, payloadBase64] = jwt.split(".");
      const normalized = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
      const decoded = atob(normalized);
      jwtPayload = JSON.parse(decoded);
    } catch (e) {
      console.error("JWT 디코딩 실패:", e);
    }
  }

  const provider =
    state.provider ?? jwtPayload?.provider ?? params.get("provider");
  const sub = state.sub ?? jwtPayload?.sub ?? params.get("sub");

  console.log("Signup location", {
    state,
    search: location.search,
    jwtPayload,
    provider,
    sub,
  });

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

    if (!jwt) {
      setError("소셜 로그인 정보가 없습니다. 처음부터 다시 로그인해주세요.");
      return;
    }

    setLoading(true);

    try {
      const signupBase = AUTH_SERVER.replace(/\/+$/, "");
      const signupUrl = `${signupBase}/signup`;
      // 바디로 보낼 데이터 (백엔드가 RequestBody 로 받는 값들)
      const payload = {
        jwt,
        username: form.username,
        nickname: form.nickname,
        phone: form.phonenumber,
      };

      console.log("[Signup] 요청 URL:", signupUrl);
      console.log("[Signup] payload (object):", payload);

      const signupRes = await fetch(signupUrl, {
        method: "POST",
        credentials: "include", // refresh 쿠키 등 필요하면 유지
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // JSON.stringify 말고 이걸 그대로 넣기
      });
      console.log(
        "[Signup] 응답 헤더 전체:",
        Object.fromEntries(signupRes.headers.entries())
      );
      if (!signupRes.ok) {
        const text = await signupRes.text();
        console.error("회원가입 API 실패:", signupRes.status, text);
        throw new Error("회원가입 실패");
      }

      const responsebody = await signupRes.json().catch(() => ({}));

      const profile = responsebody.data ?? {
        username: form.username,
        nickname: form.nickname,
        phone: form.phonenumber,
      };

      console.log("회원가입 폼 제출:", {
        ...profile,
        jwt,
      });
      try {
        const newToken = await refreshAccessToken();

        if (newToken) {
          console.log("[Signup] token refresh 성공, accessToken 저장됨");
        } else {
          console.warn("[Signup] token refresh 실패 (accessToken 없음)");
        }
      } catch (e) {
        console.warn("[Signup] token refresh 중 오류(그래도 진행):", e);
      }
      // 1) 헤더에서 access token 시도
      const headerAccessToken =
        signupRes.headers.get("access_token") || // access_token 헤더
        signupRes.headers.get("Access-Token") || // Access-Token 형태
        (() => {
          const auth = signupRes.headers.get("authorization"); // Authorization: Bearer xxx
          if (!auth) return null;
          const parts = auth.split(" ");
          return parts.length === 2 ? parts[1] : auth;
        })();

      // 2) 바디에서도 혹시 오면 같이 고려
      const signupAccessToken =
        headerAccessToken ||
        responsebody?.data?.accessToken ||
        responsebody?.accessToken ||
        responsebody?.access_token ||
        null;

      if (signupAccessToken) {
        console.log(
          "[Signup] accessToken 확보:",
          signupAccessToken.slice(0, 20),
          "..."
        );
        localStorage.setItem("accessToken", signupAccessToken);
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
