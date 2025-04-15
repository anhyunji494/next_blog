"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const data = await login(email, password);
      localStorage.setItem("accessToken", data.access);
      router.push("/");
    } catch (err) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-start h-screen bg-white">
      <div className="w-full h-screen max-w-sm pt-14">
        <h1 className="mb-8 text-xl font-extrabold text-center text-orange-400">
          BLOG
        </h1>

        <div className="mb-6">
          <label htmlFor="id" className="block mb-2 text-gray-400">
            아이디
          </label>
          <input
            id="id"
            type="text"
            placeholder="이메일을 입력해주세요."
            className="w-full p-3 bg-gray-100 rounded-xl"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="pw" className="block mb-2 text-gray-400">
            비밀번호
          </label>
          <input
            id="pw"
            type="password"
            placeholder="-제외"
            className="w-full p-3 bg-gray-100 rounded-xl"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>

      {error && <div className="mb-2 text-sm text-red-500">{error}</div>}

      <button
        className="fixed bottom-0 left-0 w-full p-3 mx-auto text-sm text-white bg-gray-300 rounded-xl sm:static sm:mt-8"
        onClick={handleSubmit}
      >
        로그인
      </button>
    </div>
  );
}
