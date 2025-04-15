export async function GET() {
  const res = await fetch(
    "https://api.interview.l-league.co.kr/api/v1/auth/logout",
    {
      method: "GET",
      credentials: "include",
    }
  );

  return new Response(null, { status: res.status });
}
