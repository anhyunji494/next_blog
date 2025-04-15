"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPresignedUrl } from "@/services/image";
import { createBlog } from "@/services/blog";

const Write = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mainImage, setMainImage] = useState(null); // 대표사진
  const [subImage, setSubImage] = useState(null); // 서브사진(선택)
  const [category, setCategory] = useState("");
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    const onBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "작성 중인 내용이 삭제됩니다.";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  // ===========================
  // 파일 업로드 + Presigned URL
  // ===========================
  const handleImageUpload = async (file) => {
    const { uploadURL, imageURL } = await getPresignedUrl(file.name);
    // S3에 PUT
    await fetch(uploadURL, {
      method: "PUT",
      body: file,
    });
    // 최종 업로드된 URL 반환
    return imageURL;
  };

  // ===========================
  // 등록 버튼
  // ===========================
  const handleSubmit = async () => {
    // 대표사진은 필수, 서브사진은 선택
    if (!title || !content || !mainImage || !category || !agree) {
      alert("모든 필수 항목(대표사진 포함)을 입력해주세요.");
      return;
    }

    try {
      // 대표사진 업로드
      const mainImageURL = await handleImageUpload(mainImage);

      // 서브사진 있으면 업로드, 없으면 null
      let subImageURL = null;
      if (subImage) {
        subImageURL = await handleImageUpload(subImage);
      }

      // 블로그 생성
      const blog = await createBlog({
        title,
        content,
        category: Number(category),
        main_image: mainImageURL,
        sub_image: subImageURL, // 없으면 null
      });

      router.replace(`/blog/${blog.id}`);
    } catch (err) {
      alert("등록에 실패했습니다.");
      console.error(err);
    }
  };

  // ===========================
  // 미리보기용 함수
  // ===========================
  const getPreview = (file) => {
    if (!file) return null;
    return URL.createObjectURL(file);
  };

  return (
    <div className="w-full max-w-md px-4 pt-6 pb-32 mx-auto">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const confirmLeave = confirm("작성 중인 내용이 삭제됩니다.");
              if (confirmLeave) router.back();
            }}
          >
            {"<"}
          </button>
          <h1 className="text-lg font-bold">글 등록</h1>
        </div>
        <div className="flex gap-1 px-3 py-2 mt-3 text-sm text-orange-500 bg-orange-100 rounded-md">
          <img src="/icons/icon_tip.svg" alt="팁 아이콘" className="w-4 h-4" />
          욕설 및 비방글 작성 시 계정 삭제
        </div>
      </div>

      {/* 제목 */}
      <div className="mb-5">
        <label className="block mb-1 text-sm font-semibold">
          제목(30자 이내) <span className="text-orange-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="타이틀을 입력해주세요."
          className="w-full p-3 bg-gray-100 rounded-xl placeholder:text-sm"
        />
      </div>

      {/* 사진 (대표, 서브) */}
      <div className="mb-5">
        <label className="block mb-2 text-sm font-semibold">
          사진 <span className="text-orange-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {/* 대표사진 (필수) */}
          <label className="relative flex items-center justify-center overflow-hidden bg-gray-100 rounded-lg cursor-pointer aspect-square">
            {/* 대표사진 미리보기 */}
            {mainImage ? (
              <img
                src={getPreview(mainImage)}
                alt="대표사진 미리보기"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-3xl text-gray-400">+</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setMainImage(e.target.files[0])}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
          </label>

          {/* 서브사진 (선택) */}
          <label className="relative flex items-center justify-center overflow-hidden bg-gray-100 rounded-lg cursor-pointer aspect-square">
            {subImage ? (
              <img
                src={getPreview(subImage)}
                alt="서브사진 미리보기"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-3xl text-gray-400">+</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSubImage(e.target.files[0])}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
          </label>
        </div>
        <div className="grid grid-cols-2 px-1 mt-1 text-sm text-gray-400">
          <span className="text-center">
            대표사진 <span className="text-orange-500">*</span>
          </span>
          <span className="text-center">서브(선택)</span>
        </div>
      </div>

      {/* 카테고리 */}
      <div className="mb-5">
        <label className="block mb-1 text-sm font-semibold">
          카테고리 <span className="text-orange-500">*</span>
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 text-sm text-gray-500 bg-gray-100 rounded-xl"
        >
          <option value="">카테고리 선택</option>
          <option value="1">일상생활</option>
          <option value="2">맛집소개</option>
          <option value="3">제품후기</option>
          <option value="3">IT정보</option>
        </select>
      </div>

      {/* 내용 */}
      <div className="mb-5">
        <label className="block mb-1 text-sm font-semibold">
          내용(10자 이상) <span className="text-orange-500">*</span>
        </label>
        <textarea
          placeholder="블로그 글을 작성해주세요."
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 text-sm bg-gray-100 resize-none rounded-xl"
        />
      </div>

      {/* 이용 정책 동의 */}
      <div className="flex items-start mb-24 text-sm">
        <input
          id="agree"
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-1 mr-2"
        />
        <label htmlFor="agree">
          <span className="text-gray-600">
            Blog 이용 정책 위반 시 글 삭제에 동의합니다.
          </span>{" "}
          <span className="text-orange-500">(필수)</span>
        </label>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 w-full px-4 py-3 bg-white">
        <button
          onClick={handleSubmit}
          className="w-full py-3 font-semibold text-white bg-orange-400 rounded-xl"
        >
          제출
        </button>
      </div>
    </div>
  );
};

export default Write;
