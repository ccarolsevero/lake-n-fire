export type InstagramPost = {
  id: string;
  permalink: string;
  image: string;
  alt: string;
};

const HANDLE = "lakenfire_";
const LIMIT = 6;
const REVALIDATE = 600;
const TIMEOUT_MS = 8000;

async function fetchText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      next: { revalidate: REVALIDATE },
      headers: {
        Accept: "application/json, application/xml, text/xml, */*",
        "User-Agent": "LakeNFire/1.0 (+https://www.instagram.com/lakenfire_/)",
      },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function firstMatch(source: string, patterns: RegExp[]) {
  for (const pattern of patterns) {
    const match = source.match(pattern);
    if (match?.[1]) return decodeXml(match[1]);
  }
  return "";
}

function postsFromRss(xml: string): InstagramPost[] {
  const chunks = xml.split(/<item[\s>]/i).slice(1);
  const posts: InstagramPost[] = [];
  for (const chunk of chunks) {
    const permalink = firstMatch(chunk, [
      /<link>([^<]+)<\/link>/i,
      /<guid[^>]*>([^<]+)<\/guid>/i,
    ]);
    const image = firstMatch(chunk, [
      /<media:thumbnail[^>]+url=["']([^"']+)["']/i,
      /<media:content[^>]+url=["']([^"']+)["']/i,
      /<enclosure[^>]+url=["']([^"']+)["']/i,
      /<img[^>]+src=["']([^"']+)["']/i,
    ]);
    if (!permalink || !image) continue;
    const title =
      firstMatch(chunk, [
        /<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i,
        /<title>([^<]+)<\/title>/i,
      ]) || "Lake 'n Fire no Instagram";
    posts.push({
      id: permalink,
      permalink,
      image,
      alt: title.slice(0, 140),
    });
    if (posts.length >= LIMIT) break;
  }
  return posts;
}

async function fromGraph(token: string): Promise<InstagramPost[]> {
  const url =
    "https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,thumbnail_url,media_type&limit=6&access_token=" +
    encodeURIComponent(token);
  const body = await fetchText(url);
  if (!body) return [];
  try {
    const data = JSON.parse(body) as {
      data?: Array<{
        id: string;
        caption?: string;
        media_url?: string;
        permalink?: string;
        thumbnail_url?: string;
        media_type?: string;
      }>;
    };
    return (data.data ?? [])
      .map((item) => {
        const image =
          item.media_type === "VIDEO"
            ? item.thumbnail_url || item.media_url
            : item.media_url || item.thumbnail_url;
        if (!image || !item.permalink) return null;
        return {
          id: item.id,
          permalink: item.permalink,
          image,
          alt: (item.caption || "Lake 'n Fire no Instagram").slice(0, 140),
        };
      })
      .filter((post): post is InstagramPost => Boolean(post))
      .slice(0, LIMIT);
  } catch {
    return [];
  }
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  try {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
    if (token) {
      const graph = await fromGraph(token);
      if (graph.length) return graph;
    }

    const feeds = [
      `https://rsshub.app/instagram/user/${HANDLE}`,
      `https://rsshub.app/picuki/profile/${HANDLE}`,
    ];
    for (const feed of feeds) {
      const xml = await fetchText(feed);
      if (!xml) continue;
      const posts = postsFromRss(xml);
      if (posts.length) return posts;
    }
  } catch {
    return [];
  }
  return [];
}
