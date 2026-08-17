import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOST =
  /(^|\.)cdninstagram\.com$|(^|\.)fbcdn\.net$|(^|\.)instagram\.com$/i;

const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

export const revalidate = 1800;

function allowedMediaUrl(raw: string) {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && ALLOWED_HOST.test(url.hostname);
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("url") ?? "";
  if (!allowedMediaUrl(raw)) {
    return new NextResponse("Invalid media url", { status: 400 });
  }

  try {
    const upstream = await fetch(raw, {
      signal: AbortSignal.timeout(12000),
      next: { revalidate: 1800 },
      headers: {
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        "User-Agent": BROWSER_UA,
        Referer: "https://www.instagram.com/",
      },
    });
    if (!upstream.ok) {
      return new NextResponse("Upstream error", { status: 502 });
    }
    const type = upstream.headers.get("content-type") || "image/jpeg";
    if (!type.startsWith("image/")) {
      return new NextResponse("Not an image", { status: 502 });
    }
    const body = await upstream.arrayBuffer();
    return new NextResponse(body, {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new NextResponse("Failed to load media", { status: 502 });
  }
}
