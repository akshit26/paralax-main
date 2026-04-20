import type { Metadata } from "next";
import Link from "next/link";

import SiteShell from "@/components/site/SiteShell";
import { BLOG_PAGE, BLOG_POSTS } from "@/data/sitePages";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read ZYFLUS insights on SEO web development, landing pages, performance marketing, content operations, and growth systems.",
  keywords: [
    "web development blog",
    "SEO blog",
    "performance marketing blog",
    "landing page conversion",
    "content operations",
  ],
};

export default function BlogPage() {
  const [featuredPost, ...morePosts] = BLOG_POSTS;

  return (
    <SiteShell>
      <section className="space-y-5">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#b7cdf6]">{BLOG_PAGE.eyebrow}</p>
        <h1 className="max-w-5xl text-4xl font-semibold leading-[0.92] tracking-[-0.05em] text-white sm:text-6xl">
          {BLOG_PAGE.title}
        </h1>
        <p className="max-w-3xl text-base leading-8 text-white/68">{BLOG_PAGE.copy}</p>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#ffc56f]">Featured Post</p>
        <div className="mt-5 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-4">
            <p className="text-sm text-white/56">
              {featuredPost.category} | {featuredPost.publishedAt} | {featuredPost.readTime}
            </p>
            <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-4xl">
              {featuredPost.title}
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-white/68">{featuredPost.excerpt}</p>
          </div>
          <div className="flex justify-start lg:justify-end">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="inline-flex items-center justify-center rounded-full border border-[#88b8ff]/30 bg-[#88b8ff]/12 px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition duration-200 hover:border-[#88b8ff]/50 hover:bg-[#88b8ff]/18"
            >
              Read Article
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        {morePosts.map((post) => (
          <article key={post.slug} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-white/56">
              {post.category} | {post.publishedAt}
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.03em] text-white">{post.title}</h2>
            <p className="mt-3 text-sm leading-7 text-white/66">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-5 inline-flex items-center text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#b7cdf6] transition hover:text-white"
            >
              Open Post
            </Link>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
