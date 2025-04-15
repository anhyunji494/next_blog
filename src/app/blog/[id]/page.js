"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        // 백엔드 직접 호출
        const res = await fetch(
          `https://api.interview.l-league.co.kr/api/v1/blog/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("블로그 데이터를 불러오지 못했습니다.");

        const data = await res.json();
        setBlog(data);
      } catch (err) {
        alert(err.message);
        console.error(err);
        router.replace("/"); // 오류 시 메인으로 이동
      }
    };

    fetchBlog();
  }, [id, router]);

  if (!blog) {
    return <div className="p-4 text-sm text-gray-400">로딩 중...</div>;
  }

  return (
    <div className="w-full max-w-md px-4 pt-6 pb-10 mx-auto">
      {/* 상단 제목 및 수정 버튼 */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-base font-semibold">{blog.title}</h1>
        <button
          className="text-sm text-gray-500"
          onClick={() => router.push(`/edit/${blog.id}`)}
        >
          수정
        </button>
      </div>

      {/* 대표 이미지 */}
      {blog.main_image && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <img
            src={blog.main_image}
            alt="대표 이미지"
            className="object-cover w-full h-auto"
          />
        </div>
      )}

      {/* 작성일 */}
      <div className="mb-2 text-xs text-gray-400">
        작성일시 : {new Date(blog.created_at).toLocaleString()}
      </div>

      {/* 내용 */}
      <div className="text-sm leading-relaxed text-gray-600 whitespace-pre-line">
        {blog.content}
      </div>
    </div>
  );
}
