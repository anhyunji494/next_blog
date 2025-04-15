export const getPresignedUrl = async (fileName) => {
  const token = localStorage.getItem("accessToken");

  const res = await fetch("/api/aws/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ file_name: fileName }),
  });

  if (!res.ok) throw new Error("이미지 업로드 URL 생성 실패");

  return await res.json();
};
