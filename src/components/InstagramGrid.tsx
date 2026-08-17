"use client";

import { useEffect, useState } from "react";
import type { InstagramPost } from "@/lib/instagram";

export function InstagramGrid({ initial }: { initial: InstagramPost[] }) {
  const [posts, setPosts] = useState(initial);

  useEffect(() => {
    if (initial.length >= 6) return;
    let cancelled = false;
    fetch("/api/instagram")
      .then((res) => res.json())
      .then((data: { posts?: InstagramPost[] }) => {
        if (!cancelled && data.posts?.length) setPosts(data.posts);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [initial.length]);

  if (!posts.length) return null;

  return (
    <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {posts.map((post) => (
        <a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block aspect-square overflow-hidden border border-ink/10 bg-cream"
        >
          <img
            src={post.image}
            alt={post.alt}
            className="h-full w-full object-cover opacity-100 transition duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <span className="pointer-events-none absolute inset-0 bg-ink/0 transition group-hover:bg-ink/20" />
        </a>
      ))}
    </div>
  );
}
