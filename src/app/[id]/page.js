"use client";
import React from "react";

const PostDetailPage = () => {
  return (
    <div className="w-full max-w-md px-4 pt-6 pb-10 mx-auto">
      {/* 상단 제목 및 수정 */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-base font-semibold">블로그 글 타이틀</h1>
        <button className="text-sm text-gray-500">수정</button>
      </div>

      {/* 이미지 */}
      <div className="mb-4 overflow-hidden rounded-lg">
        <img
          src="/example-image.jpg"
          alt="대표 이미지"
          className="object-cover w-full h-auto"
        />
      </div>

      {/* 작성일 */}
      <div className="mb-2 text-xs text-gray-400">
        작성일시 : 2025.04.07 12:00
      </div>

      {/* 내용 */}
      <div className="text-sm leading-relaxed text-gray-600 line-clamp-4">
        블로그 글 내용 어쩌고 저쩌고! 이러쿵 저러쿵 많아요 신나요
        asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf...
      </div>
    </div>
  );
};

export default PostDetailPage;
