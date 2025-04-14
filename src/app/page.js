"use client";
import React from "react";

const HomePage = () => {
  return (
    <div className="w-full max-w-md px-4 pt-5 pb-32 mx-auto">
      {/* 상단 헤더 */}
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-extrabold text-orange-400">BLOG</h1>
        <button>
          <i className="fas fa-bell"></i> {/* 알림 아이콘 자리 */}
        </button>
      </header>

      {/* 공지 */}
      <div className="flex items-center px-3 py-2 mb-3 text-xs text-orange-500 bg-orange-100 rounded-lg">
        <span className="bg-orange-500 text-white px-2 py-0.5 rounded-full text-[10px] mr-2">
          공지
        </span>
        행사 기념 각종 이벤트 진행 예정(공지사항 참고)
      </div>

      {/* TOP 10 슬라이더 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-semibold">🏆 조회수 TOP 10</div>
          <button className="text-xs text-gray-400">{">"}</button>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="relative min-w-[100px] h-[120px] rounded-xl overflow-hidden shrink-0"
            >
              <img
                src={`/top${num}.jpg`}
                className="object-cover w-full h-full"
                alt={`top${num}`}
              />
              <span className="absolute text-3xl font-bold text-white top-1 left-1 drop-shadow">
                {num}
              </span>
              <span className="absolute text-xs text-white bottom-1 left-2">
                타이틀{num}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 카테고리 탭 */}
      <div className="flex gap-4 mb-4 text-sm font-medium border-b border-gray-200">
        {["전체", "일상생활", "맛집소개", "제품후기", "IT정보"].map(
          (cat, i) => (
            <button
              key={cat}
              className={`pb-2 ${
                i === 0
                  ? "border-b-2 border-orange-400 text-orange-500"
                  : "text-gray-400"
              }`}
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/* 블로그 리스트 */}
      <div className="flex flex-col gap-6">
        {[1, 2, 3, 4].map((id) => (
          <div key={id} className="flex items-start gap-3">
            <img
              src={`/thumb${id}.jpg`}
              alt="thumbnail"
              className="object-cover w-20 h-20 rounded-md"
            />
            <div className="flex-1">
              <div className="text-sm font-semibold">블로그 글 타이틀</div>
              <div className="mt-1 text-xs text-gray-500 line-clamp-2">
                블로그 글 내용 어쩌고 저쩌고 이러쿵 저러쿵 많아요 신나요
                asdfasdfasdfasdfasdfasdfasdf...
              </div>
              <div className="text-[10px] text-gray-400 mt-1">
                작성일 : 2025.04.07 12:00
              </div>
            </div>
            <button className="text-xl text-gray-400">⋮</button>
          </div>
        ))}
      </div>

      {/* FAB 버튼 */}
      <button className="fixed w-12 h-12 text-2xl text-white bg-orange-400 rounded-full shadow-md bottom-24 right-6">
        ✎
      </button>

      {/* 하단 네비게이션 */}
      <nav className="fixed bottom-0 left-0 flex justify-around w-full py-3 text-xs text-gray-400 bg-white border-t">
        <button className="flex flex-col items-center">
          <i className="text-lg fas fa-home"></i>
          <span>홈</span>
        </button>
        <button className="flex flex-col items-center">
          <i className="text-lg fas fa-comment"></i>
          <span>피드</span>
        </button>
        <button className="flex flex-col items-center">
          <i className="text-lg fas fa-trophy"></i>
          <span>랭킹</span>
        </button>
        <button className="flex flex-col items-center">
          <i className="text-lg fas fa-user"></i>
          <span>마이</span>
        </button>
      </nav>
    </div>
  );
};

export default HomePage;
