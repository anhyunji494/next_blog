export const login = async (email, password) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("로그인 실패");
  }

  return await res.json(); // { access, refresh }
};

export const logout = async () => {
  const res = await fetch("/api/auth/logout", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("로그아웃 실패");
  }
};
