export async function POST(req) {
  const body = await req.json();
  const token = req.headers.get("authorization"); // 클라이언트에서 보낸 토큰 받기

  const res = await fetch(
    "https://api.interview.l-league.co.kr/api/v1/aws/upload",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
