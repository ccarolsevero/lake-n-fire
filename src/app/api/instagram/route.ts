import { NextResponse } from "next/server";
import { getInstagramPosts } from "@/lib/instagram";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const posts = await getInstagramPosts();
    return NextResponse.json(
      { ok: true, count: posts.length, posts },
      { headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400" } },
    );
  } catch {
    return NextResponse.json({ ok: false, count: 0, posts: [] });
  }
}
