import cachedFeed from "../../public/instagram/feed.json";

export type InstagramPost = {
  id: string;
  permalink: string;
  image: string;
  alt: string;
};

const HANDLE = "lakenfire_";
const LIMIT = 6;
const REVALIDATE = 1800;
const TIMEOUT_MS = 5000;
const IG_APP_ID = "936619743392459";
const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

function proxiedImage(url: string) {
  return `/api/instagram/media?url=${encodeURIComponent(url)}`;
}

function withProxy(posts: InstagramPost[]): InstagramPost[] {
  return posts.slice(0, LIMIT).map((post) => ({
    ...post,
    image: proxiedImage(post.image),
  }));
}

async function fetchText(
  url: string,
  headers: Record<string, string>,
): Promise<string | null> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      next: { revalidate: REVALIDATE },
      headers,
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

async function fromGraph(token: string): Promise<InstagramPost[]> {
  const url =
    "https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,thumbnail_url,media_type&limit=6&access_token=" +
    encodeURIComponent(token);
  const body = await fetchText(url, {
    Accept: "application/json",
    "User-Agent": BROWSER_UA,
  });
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
      .filter((post): post is InstagramPost => Boolean(post));
  } catch {
    return [];
  }
}

type TimelineNode = {
  id?: string;
  shortcode?: string;
  is_video?: boolean;
  display_url?: string;
  thumbnail_src?: string;
  edge_media_to_caption?: {
    edges?: Array<{ node?: { text?: string } }>;
  };
};

async function fromWebProfile(): Promise<InstagramPost[]> {
  const body = await fetchText(
    `https://www.instagram.com/api/v1/users/web_profile_info/?username=${HANDLE}`,
    {
      Accept: "application/json",
      "User-Agent": BROWSER_UA,
      "X-IG-App-ID": IG_APP_ID,
      Referer: `https://www.instagram.com/${HANDLE}/`,
      "X-Requested-With": "XMLHttpRequest",
    },
  );
  if (!body) return [];
  try {
    const data = JSON.parse(body) as {
      data?: {
        user?: {
          edge_owner_to_timeline_media?: { edges?: Array<{ node?: TimelineNode }> };
        };
      };
    };
    const edges = data.data?.user?.edge_owner_to_timeline_media?.edges ?? [];
    const posts: InstagramPost[] = [];
    for (const edge of edges) {
      const node = edge.node;
      if (!node?.shortcode) continue;
      const image = node.display_url || node.thumbnail_src;
      if (!image) continue;
      const caption =
        node.edge_media_to_caption?.edges?.[0]?.node?.text ||
        "Lake 'n Fire no Instagram";
      posts.push({
        id: node.id || node.shortcode,
        permalink: `https://www.instagram.com/p/${node.shortcode}/`,
        image,
        alt: caption.slice(0, 140),
      });
      if (posts.length >= LIMIT) break;
    }
    return posts;
  } catch {
    return [];
  }
}

async function fromRsshubJson(): Promise<InstagramPost[]> {
  const feeds = [
    `https://rsshub.app/instagram/user/${HANDLE}?format=json`,
    `https://rsshub.app/picuki/profile/${HANDLE}?format=json`,
  ];
  for (const feed of feeds) {
    const body = await fetchText(feed, {
      Accept: "application/json, application/xml, text/xml, */*",
      "User-Agent": BROWSER_UA,
    });
    if (!body || body.trimStart().startsWith("<")) continue;
    try {
      const data = JSON.parse(body) as {
        items?: Array<{
          id?: string;
          url?: string;
          link?: string;
          title?: string;
          image?: string;
          enclosure?: { url?: string };
          description?: string;
        }>;
      };
      const posts: InstagramPost[] = [];
      for (const item of data.items ?? []) {
        const permalink = item.url || item.link;
        const imgMatch = item.description?.match(/<img[^>]+src=["']([^"']+)["']/i);
        const image = item.image || item.enclosure?.url || imgMatch?.[1];
        if (!permalink || !image) continue;
        posts.push({
          id: item.id || permalink,
          permalink,
          image,
          alt: (item.title || "Lake 'n Fire no Instagram").slice(0, 140),
        });
        if (posts.length >= LIMIT) break;
      }
      if (posts.length) return posts;
    } catch {
      continue;
    }
  }
  return [];
}

function fromStaticCache(): InstagramPost[] {
  return (cachedFeed as InstagramPost[])
    .filter((post) => post.image?.startsWith("/instagram/"))
    .slice(0, LIMIT);
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  try {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
    if (token) {
      const graph = await fromGraph(token);
      if (graph.length) return withProxy(graph);
    }

    const web = await fromWebProfile();
    if (web.length) return withProxy(web);

    const rss = await fromRsshubJson();
    if (rss.length) return withProxy(rss);
  } catch {
    return fromStaticCache();
  }
  return fromStaticCache();
}
