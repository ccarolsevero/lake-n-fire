import { getInstagramPosts } from "@/lib/instagram";
import { SITE } from "@/lib/site";

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

          {posts.length > 0 ? (
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
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-ink/0 transition group-hover:bg-ink/20" />
                </a>
              ))}
            </div>
          ) : null}

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
