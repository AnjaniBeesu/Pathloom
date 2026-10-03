import { NextRequest, NextResponse } from "next/server";

function invalidShareToken(token: string | null, username: string) {
  if (!token || token.length > 16000) return true;
  try {
    const normalized = token.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(token.length / 4) * 4, "=");
    const payload = JSON.parse(atob(normalized));
    return payload?.v !== 1 || payload?.username !== username || !["swe-intern", "apm-intern"].includes(payload?.goalId) || !Array.isArray(payload?.completedNodeIds) || typeof payload?.expiresAt !== "string" || Date.parse(payload.expiresAt) <= Date.now();
  } catch { return true; }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.endsWith("/opengraph-image")) return NextResponse.next();
  const username = pathname.split("/")[2] ?? "";
  if (invalidShareToken(request.nextUrl.searchParams.get("share"), username)) return new NextResponse("Not Found", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex, nofollow" } });
  return NextResponse.next();
}

export const config = { matcher: ["/u/:path*"] };
