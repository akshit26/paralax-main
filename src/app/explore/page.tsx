import type { Metadata } from "next";
import Link from "next/link";

import ExploreCaseStudyLibrary from "@/components/explore/ExploreCaseStudyLibrary";
import SiteShell from "@/components/site/SiteShell";
import { CASE_STUDIES, CLIENTS } from "@/data/siteConfig";
import { EXPLORE_PAGE } from "@/data/sitePages";

export const metadata: Metadata = {
  title: "Explore | ZYFLUS",
  description: "Explore the strategy layers behind ZYFLUS launches, growth systems, and case-study signals.",
};

export default function ExplorePage() {
  return (
    <SiteShell>
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="space-y-5">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#b7cdf6]">{EXPLORE_PAGE.eyebrow}</p>
          <h1 className="max-w-5xl text-4xl font-semibold leading-[0.92] tracking-[-0.05em] text-white sm:text-6xl">
            {EXPLORE_PAGE.title}
          </h1>
          <p className="max-w-3xl text-base leading-8 text-white/68">{EXPLORE_PAGE.copy}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-[#ffc56f]/30 bg-[#ffc56f]/12 px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition duration-200 hover:border-[#ffc56f]/50 hover:bg-[#ffc56f]/18"
            >
              View Services
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/82 transition duration-200 hover:border-white/20 hover:text-white"
            >
              Start a Project
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {CLIENTS.stats.map((stat) => (
            <article key={stat.label} className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5">
              <span className="text-3xl font-semibold tracking-[-0.04em] text-white">{stat.value}</span>
              <p className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/54">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {EXPLORE_PAGE.pillars.map((pillar) => (
          <article key={pillar.title} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">{pillar.title}</h2>
            <p className="mt-3 text-sm leading-7 text-white/68">{pillar.copy}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-5">
        <div className="space-y-3">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#b7cdf6]">Case Study Library</p>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">Open the full breakdown behind each campaign</h2>
          <p className="max-w-3xl text-sm leading-7 text-white/64">
            The homepage keeps each card tight. Explore gives you the longer campaign story, stronger metric context, and a faster way to find the work that matches your brief.
          </p>
        </div>

        <ExploreCaseStudyLibrary items={CASE_STUDIES.items} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_1.1fr]">
        <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#b7cdf6]">Industry Signal</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {CLIENTS.industries.map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/72"
              >
                {industry}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm leading-7 text-white/66">
            The explore page is the strategic bridge between the cinematic home page and the execution-specific service pages.
          </p>
        </article>

        <div className="grid gap-4 sm:grid-cols-3">
          {EXPLORE_PAGE.checkpoints.map((checkpoint) => (
            <article key={checkpoint.step} className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5">
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#ffc56f]">{checkpoint.step}</span>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white">{checkpoint.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/66">{checkpoint.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
