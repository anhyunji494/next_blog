"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPage() {
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onPopState = (e) => {
      e.preventDefault();
      if (!confirm("작성 중인 내용이 삭제됩니다.")) {
        window.history.pushState(null, "", window.location.href);
      }
      // else: 유저가 '확인' → 실제 뒤로가기 진행
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", onPopState);

    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // 기존 글 정보 불러오기
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(
          `https://api.interview.l-league.co.kr/api/v1/blog/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("블로그를 불러오지 못했습니다.");

        const data = await res.json();
        setTitle(data.title || "");
        setContent(data.content || "");
        setCategory(data.category?.id || "");
        setLoading(false);
      } catch (err) {
        alert(err.message);
        console.error(err);
        router.back();
      }
    };

    fetchBlog();
  }, [id, router]);

  const handleSubmit = async () => {
    const confirmed = confirm("정말 수정하시겠습니까?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `https://api.interview.l-league.co.kr/api/v1/blog/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            content,
            category: Number(category),
          }),
        }
      );

      if (!res.ok) throw new Error("수정 실패");

      const updated = await res.json();
      alert("수정이 완료되었습니다!");
      router.replace(`/blog/${updated.id}`); // 수정 완료 후 상세페이지로 이동
    } catch (err) {
      alert(err.message || "수정에 실패했습니다.");
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-4">로딩 중...</div>;
  }

  return (
    <div className="w-full max-w-md px-4 pt-6 pb-10 mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => {
            // 수동 뒤로가기 시에도 confirm
            window.history.back();
          }}
        >
          {`<`}
        </button>
        <h1 className="text-lg font-bold">글 수정</h1>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-semibold">제목</label>
        <input
          type="text"
          className="w-full p-3 bg-gray-100 rounded-xl"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-semibold">내용</label>
        <textarea
          rows={6}
          className="w-full p-3 bg-gray-100 rounded-xl"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-semibold">카테고리</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 text-sm text-gray-500 bg-gray-100 rounded-xl"
        >
          <option value="">카테고리 선택</option>
          <option value="1">일상생활</option>
          <option value="2">맛집소개</option>
          <option value="3">제품후기</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-3 font-semibold text-white bg-orange-400 rounded-xl"
      >
        수정 완료
      </button>
    </div>
  );
}
