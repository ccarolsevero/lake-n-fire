import { getInstagramPosts } from "@/lib/instagram";
import { SITE } from "@/lib/site";
import { InstagramGrid } from "./InstagramGrid";

export async function InstagramFeed() {
  const posts = await getInstagramPosts();

  return (
    <section id="instagram" className="border-t border-ink/8 bg-cream-deep py-20 sm:py-24">
      <div className="section-pad">
        <div className="container-site">
          <p className="text-[0.7rem] tracking-[0.22em] text-ember uppercase">
            Instagram
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-medium">
            {SITE.instagramHandle}
          </h2>
          <p className="mt-4 max-w-lg text-bark/70">
            O fogo, a mesa e o dia a dia da casa, direto do nosso Instagram.
          </p>

          <InstagramGrid initial={posts} />

          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost mt-10"
          >
            Ver no Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
