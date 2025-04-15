import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const token = req.headers.get("authorization");

  const res = await fetch("https://api.interview.l-league.co.kr/api/v1/blog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET(req) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  const res = await fetch("https://api.interview.l-league.co.kr/api/v1/blog", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return new NextResponse("블로그 목록 불러오기 실패", { status: 500 });
  }

  const data = await res.json();

  return NextResponse.json(data);
}
