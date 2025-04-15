// src/app/api/auth/login/route.js
export async function POST(req) {
  console.log("/api/auth/login 라우트 호출됨");

  const body = await req.json();

  const res = await fetch(
    "https://api.interview.l-league.co.kr/api/v1/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    }
  );

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
