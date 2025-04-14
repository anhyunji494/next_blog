"use client";
import React from "react";

const Write = () => {
  return (
    <div className="w-full max-w-md px-4 pt-6 pb-32 mx-auto">
      {/* 상단 헤더 */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <button>{"<"}</button>
          <h1 className="text-lg font-bold">글 등록</h1>
        </div>
        <div className="px-3 py-2 mt-3 text-sm text-orange-500 bg-orange-100 rounded-md">
          🧠 욕설 및 비방글 작성 시 계정 삭제
        </div>
      </div>

      {/* 제목 입력 */}
      <div className="mb-5">
        <label className="block mb-1 text-sm font-semibold">
          제목(30자 이내) <span className="text-orange-500">*</span>
        </label>
        <input
          type="text"
          placeholder="타이틀을 입력해주세요."
          className="w-full p-3 bg-gray-100 rounded-xl placeholder:text-sm"
        />
      </div>

      {/* 사진 등록 */}
      <div className="mb-5">
        <label className="block mb-2 text-sm font-semibold">
          사진 <span className="text-orange-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center justify-center text-3xl text-gray-400 bg-gray-100 rounded-lg aspect-square">
            +
          </div>
          <div className="flex items-center justify-center text-3xl text-gray-400 bg-gray-100 rounded-lg aspect-square">
            +
          </div>
        </div>
        <div className="flex justify-between px-1 mt-1 text-sm text-gray-400">
          <span>대표사진</span>
          <span>서브</span>
        </div>
      </div>

      {/* 카테고리 선택 */}
      <div className="mb-5">
        <label className="block mb-1 text-sm font-semibold">
          카테고리 <span className="text-orange-500">*</span>
        </label>
        <select className="w-full p-3 text-sm text-gray-500 bg-gray-100 rounded-xl">
          <option>카테고리 선택</option>
        </select>
      </div>

      {/* 내용 작성 */}
      <div className="mb-5">
        <label className="block mb-1 text-sm font-semibold">
          내용(10자 이상) <span className="text-orange-500">*</span>
        </label>
        <textarea
          placeholder="블로그 글을 작성해주세요."
          rows={5}
          className="w-full p-3 text-sm bg-gray-100 resize-none rounded-xl"
        />
      </div>

      {/* 체크박스 */}
      <div className="flex items-start mb-24 text-sm">
        <input id="agree" type="checkbox" className="mt-1 mr-2" />
        <label htmlFor="agree">
          <span className="text-gray-600">
            Blog 이용 정책 위반 시 글 삭제에 동의합니다.
          </span>{" "}
          <span className="text-orange-500">(필수)</span>
        </label>
      </div>

      {/* 하단 고정 제출 버튼 */}
      <div className="fixed bottom-0 left-0 w-full px-4 py-3 bg-white border-t">
        <button className="w-full py-3 font-semibold text-white bg-orange-400 rounded-xl">
          제출
        </button>
      </div>
    </div>
  );
};

export default Write;
