export const createBlog = async (data) => {
  const token = localStorage.getItem("accessToken");

  const res = await fetch("/api/blog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("블로그 생성 실패");

  return await res.json();
};
