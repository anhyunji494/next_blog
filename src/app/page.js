"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth";

export default function HomePage() {
  const router = useRouter();

  // 검색어 & 카테고리 & 페이지
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);

  // 한번에 10개씩
  const pageSize = 10;

  // 블로그 목록 + 페이지 정보
  const [blogs, setBlogs] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [pageCnt, setPageCnt] = useState(1);

  // 더보기 메뉴 state
  const [menuOpenId, setMenuOpenId] = useState(null);

  // 카테고리 탭 정보
  const categories = [
    { label: "전체", value: "" },
    { label: "일상생활", value: "1" },
    { label: "맛집소개", value: "2" },
    { label: "제품후기", value: "3" },
    { label: "IT정보", value: "4" },
  ];

  const topList = [
    { image: "/top1.jpg", rank: 1, title: "타이틀1" },
    { image: "/top2.jpg", rank: 2, title: "타이틀2" },
    { image: "/top3.jpg", rank: 3, title: "타이틀3" },
  ];

  // ===========================
  // 블로그 목록 불러오기 함수
  // ===========================
  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const qs = new URLSearchParams();
      if (selectedCategory) qs.append("category_id", selectedCategory);
      if (searchTerm) qs.append("title", searchTerm);
      qs.append("page", page);
      qs.append("page_size", pageSize);

      const res = await fetch(
        `https://api.interview.l-league.co.kr/api/v1/blog?${qs.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("블로그 목록 조회 실패");
      const data = await res.json();

      setBlogs(data.data || []);
      setTotalCnt(data.totalCnt || 0);
      setPageCnt(data.pageCnt || 1);
    } catch (err) {
      console.error(err);
      alert("블로그 목록을 불러오지 못했습니다.");
    }
  };

  // 상태가 바뀔 때마다 재조회
  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, searchTerm, page]);

  // 로그아웃
  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("accessToken");
      router.push("/login");
    } catch (err) {
      alert("로그아웃에 실패했습니다.");
    }
  };

  // 삭제
  const handleDelete = async (id) => {
    const confirmed = confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return;
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `https://api.interview.l-league.co.kr/api/v1/blog/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("삭제 실패");

      alert("삭제 완료");
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert("삭제 실패");
      console.error(err);
    }
  };

  // 페이지네이션
  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1);
  };
  const handleNext = () => {
    if (page < pageCnt) setPage((p) => p + 1);
  };

  return (
    <div className="w-full max-w-md px-4 pt-5 pb-32 mx-auto">
      {/* 상단 헤더 */}
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-extrabold text-orange-400">BLOG</h1>
        <button>
          <i className="fas fa-bell"></i>
        </button>
      </header>

      {/* 공지 */}
      <div className="flex items-center px-3 py-2 mb-3 text-xs text-orange-500 bg-orange-100 rounded-lg">
        <span className="bg-white flex  gap-1 px-2 py-0.5 rounded-full text-[10px] mr-2">
          <img src="/icons/icon_tip.svg" alt="팁 아이콘" />
          <span className="text-orange-500"></span>공지
        </span>
        앱 출시 기념 각종 이벤트 진행 예정(공지사항 참고)
      </div>

      {/* TOP 10 슬라이더 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-semibold">🏆 조회수 TOP 10</div>
          <button className="text-xs text-gray-400">{">"}</button>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {topList.map((item) => (
            <div
              key={item.rank}
              className="relative w-[130px] h-[130px] rounded-xl overflow-hidden shrink-0"
            >
              <img
                src={item.image}
                className="object-cover w-full h-full"
                alt={`top${item.rank}`}
              />
              <span className="absolute text-3xl font-bold text-white top-1 left-1 drop-shadow">
                {item.rank}
              </span>
              <span className="absolute text-xs text-white bottom-1 left-2">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 카테고리 탭 (탭 방식) */}
      <div className="flex gap-4 mb-4 text-sm font-medium border-b border-gray-200">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => {
              setSelectedCategory(cat.value);
              setPage(1);
            }}
            className={`pb-2 ${
              selectedCategory === cat.value
                ? "border-b-2 border-orange-400 text-orange-500"
                : "text-gray-400"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 블로그 리스트 */}
      <div className="flex flex-col gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="relative flex items-start gap-3">
            {blog.main_image ? (
              <img
                src={blog.main_image}
                alt="thumbnail"
                className="object-cover w-20 h-20 rounded-md"
              />
            ) : (
              <div className="flex items-center justify-center w-20 h-20 text-xs text-gray-400 bg-gray-100 rounded-md">
                No Image
              </div>
            )}
            <div className="flex-1">
              <button
                className="text-sm font-semibold text-left"
                onClick={() => router.push(`/blog/${blog.id}`)}
              >
                {blog.title}
              </button>
              <div className="mt-1 text-xs text-gray-500 line-clamp-2">
                {blog.content}
              </div>
              <div className="text-[10px] text-gray-400 mt-1">
                작성일 : {new Date(blog.created_at).toLocaleDateString()}
              </div>
            </div>
            <button
              className="text-xl text-gray-400"
              onClick={() =>
                setMenuOpenId(menuOpenId === blog.id ? null : blog.id)
              }
            >
              ⋮
            </button>
            {menuOpenId === blog.id && (
              <div className="absolute right-0 z-10 p-2 text-sm bg-white border border-b-2 border-gray-200 rounded shadow top-8">
                <button
                  className="block px-2 py-1 hover:text-orange-500"
                  onClick={() => router.push(`/edit/${blog.id}`)}
                >
                  수정
                </button>
                <button
                  className="block px-2 py-1 text-red-500 hover:underline"
                  onClick={() => handleDelete(blog.id)}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-center gap-2 mt-4 text-sm">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page <= 1}
          className="px-2 py-1 border border-b-2 border-gray-200 rounded"
        >
          이전
        </button>
        <div>
          {page} / {pageCnt} (총 {totalCnt}건)
        </div>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= pageCnt}
          className="px-2 py-1 border border-b-2 border-gray-200 rounded"
        >
          다음
        </button>
      </div>

      {/* 검색창을 맨 하단으로 (페이지네이션 뒤) */}
      <div className="flex mt-4">
        <input
          className="flex-1 p-2 mr-2 text-sm border border-b-2 border-gray-200 rounded"
          placeholder="제목 검색"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />
        <button
          className="px-3 py-2 text-sm bg-gray-100 border border-b-2 border-gray-200 rounded"
          onClick={() => {
            fetchBlogs();
          }}
        >
          검색
        </button>
      </div>

      {/* FAB 버튼 */}
      <button
        className="fixed w-12 h-12 text-2xl text-white bg-orange-400 rounded-full shadow-md bottom-24 right-6"
        onClick={() => router.push("/write")}
      >
        ✎
      </button>

      {/* 하단 네비게이션 */}
      <nav className="fixed bottom-0 left-0 flex justify-around w-full py-3 text-xs text-gray-400 bg-white border-t">
        <button className="flex flex-col items-center">
          <img src="/icons/page_home.svg" alt="홈 아이콘" />
        </button>
        <button className="flex flex-col items-center">
          <img src="/icons/page_chat.svg" alt="페이지 아이콘" />
        </button>
        <button className="flex flex-col items-center">
          <img src="/icons/page_rank.svg" alt="랭크 아이콘" />
        </button>
        <button className="flex flex-col items-center" onClick={handleLogout}>
          <img src="/icons/page_user.svg" alt="마이페이지 아이콘" />
        </button>
      </nav>
    </div>
  );
}
