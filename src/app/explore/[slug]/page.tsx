import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteShell from "@/components/site/SiteShell";
import { CASE_STUDIES, getCaseStudyBySlug, getCaseStudyFacet } from "@/data/siteConfig";

export function generateStaticParams() {
  return CASE_STUDIES.items.map((study) => ({ slug: study.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: "Case Study Not Found",
    };
  }

  const facet = getCaseStudyFacet(slug);
  const metricSummary = study.metrics
    .slice(0, 2)
    .map((metric) => `${metric.value} ${metric.label.toLowerCase()}`)
    .join(", ");

  return {
    title: `${study.name} Case Study`,
    description: `${study.name} case study by ZYFLUS covering ${facet.industry.toLowerCase()} ${study.service.toLowerCase()} work. Results include ${metricSummary}.`,
    keywords: [study.name, study.service, facet.category, facet.industry, "case study", "ZYFLUS"],
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const relatedStudies = CASE_STUDIES.items.filter((item) => item.id !== study.id);

  return (
    <SiteShell>
      <article className="grid gap-8">
        <div className="space-y-5">
          <Link
            href="/explore"
            className="inline-flex text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#b7cdf6] transition hover:text-white"
          >
            Back to explore
          </Link>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#b7cdf6]">Case Study</p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center justify-center rounded-full border border-[#ffc56f]/30 bg-[#ffc56f]/12 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white">
              {study.service}
            </span>
            <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/78">
              {study.name}
            </span>
          </div>
          <h1 className="max-w-5xl text-4xl font-semibold leading-[0.92] tracking-[-0.05em] text-white sm:text-6xl">
            {study.headline}
          </h1>
          <p className="max-w-3xl text-base leading-8 text-white/68">{study.summary}</p>
          <div className="flex flex-wrap gap-3">
            {study.topContentHref ? (
              <a
                href={study.topContentHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#ffc56f]/30 bg-[#ffc56f]/12 px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition duration-200 hover:border-[#ffc56f]/50 hover:bg-[#ffc56f]/18"
              >
                {study.topContentLabel ?? "Top Performing Video"}
              </a>
            ) : null}
            <Link
              href="/explore"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/82 transition duration-200 hover:border-white/20 hover:text-white"
            >
              Explore All Case Studies
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {study.metrics.map((metric) => (
            <article key={metric.label} className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5">
              <span className="text-3xl font-semibold tracking-[-0.04em] text-white">{metric.value}</span>
              <p className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/54">{metric.label}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#ffc56f]">Campaign Snapshot</p>
            <div className="mt-5 space-y-4">
              {study.campaignDetails.map((detail) => (
                <div key={detail.label} className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/46">{detail.label}</p>
                  <p className="mt-2 text-sm leading-7 text-white/74">{detail.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#b7cdf6]">Performance Insights</p>
            <div className="mt-5 space-y-4">
              {study.insights.map((insight, index) => (
                <div key={insight} className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/46">Insight {index + 1}</p>
                  <p className="mt-2 text-sm leading-7 text-white/74">{insight}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {study.showcaseLinks?.length ? (
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="space-y-3">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#b7cdf6]">Live Portfolio</p>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">Open the storefront portfolio</h2>
              <p className="max-w-3xl text-sm leading-7 text-white/66">
                This case study is a portfolio cluster rather than a single campaign. Each link below opens one of the live Shopify storefronts in the set.
              </p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {study.showcaseLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4 text-center text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/82 transition duration-200 hover:border-white/20 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        ) : null}

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#b7cdf6]">More Case Studies</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {relatedStudies.map((relatedStudy) => (
              <Link
                key={relatedStudy.id}
                href={`/explore/${relatedStudy.id}`}
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/78 transition duration-200 hover:border-white/20 hover:text-white"
              >
                {relatedStudy.name}
              </Link>
            ))}
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
