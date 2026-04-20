import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteShell from "@/components/site/SiteShell";
import { BLOG_POSTS, getBlogPostBySlug } from "@/data/sitePages";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, post.title, "ZYFLUS blog", "growth strategy", "conversion"],
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <SiteShell>
      <article className="grid gap-8">
        <div className="space-y-5">
          <Link href="/blog" className="inline-flex text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#b7cdf6] transition hover:text-white">
            Back to Blog
          </Link>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#b7cdf6]">{post.category}</p>
          <h1 className="max-w-5xl text-4xl font-semibold leading-[0.92] tracking-[-0.05em] text-white sm:text-6xl">
            {post.title}
          </h1>
          <p className="text-sm uppercase tracking-[0.16em] text-white/48">
            {post.publishedAt} | {post.readTime} | {post.author}
          </p>
          <p className="max-w-3xl text-base leading-8 text-white/68">{post.excerpt}</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="space-y-5 text-sm leading-8 text-white/72">
              {post.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#ffc56f]">Key Takeaways</p>
            <div className="mt-5 space-y-4">
              {post.takeaways.map((takeaway, index) => (
                <div key={takeaway} className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/46">Point {index + 1}</p>
                  <p className="mt-2 text-sm leading-7 text-white/74">{takeaway}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </article>
    </SiteShell>
  );
}
