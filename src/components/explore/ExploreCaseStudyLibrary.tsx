"use client";

import Link from "next/link";
import { startTransition, useDeferredValue, useState } from "react";

import { getCaseStudyFacet, type CaseStudy } from "@/data/siteConfig";

type ExploreCaseStudyLibraryProps = {
  items: CaseStudy[];
};

function getSearchableText(study: CaseStudy) {
  const facet = getCaseStudyFacet(study.id);

  return [
    study.name,
    study.service,
    study.headline,
    study.summary,
    facet.category,
    facet.industry,
    ...study.metrics.map((metric) => metric.label),
    ...study.insights,
  ]
    .join(" ")
    .toLowerCase();
}

export default function ExploreCaseStudyLibrary({ items }: ExploreCaseStudyLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndustry, setActiveIndustry] = useState("All");

  const deferredSearchQuery = useDeferredValue(searchQuery);
  const normalizedSearch = deferredSearchQuery.trim().toLowerCase();

  const categories = ["All", ...new Set(items.map((study) => getCaseStudyFacet(study.id).category))];
  const industries = ["All", ...new Set(items.map((study) => getCaseStudyFacet(study.id).industry))];

  const filteredItems = items.filter((study) => {
    const facet = getCaseStudyFacet(study.id);
    const matchesCategory = activeCategory === "All" || facet.category === activeCategory;
    const matchesIndustry = activeIndustry === "All" || facet.industry === activeIndustry;
    const matchesSearch = normalizedSearch.length === 0 || getSearchableText(study).includes(normalizedSearch);

    return matchesCategory && matchesIndustry && matchesSearch;
  });

  const hasActiveFilters = normalizedSearch.length > 0 || activeCategory !== "All" || activeIndustry !== "All";

  return (
    <div className="grid gap-5">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="space-y-3">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#b7cdf6]">Find What Fits</p>
            <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">Filter case studies by category, industry, or brand</h3>
            <p className="max-w-2xl text-sm leading-7 text-white/66">
              Jump straight to influencer marketing, product development, Shopify, website, and growth work without scanning the full library.
            </p>
            <label className="block">
              <span className="sr-only">Search case studies</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  startTransition(() => {
                    setSearchQuery(nextValue);
                  });
                }}
                placeholder="Search by brand, service, metric, or keyword"
                className="w-full rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-white/34 focus:border-[#88b8ff]/40"
              />
            </label>
          </div>

          <div className="grid gap-4">
            <div className="space-y-3">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/48">Category</p>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => {
                  const categoryCount =
                    category === "All"
                      ? items.length
                      : items.filter((study) => getCaseStudyFacet(study.id).category === category).length;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition duration-200 ${
                        activeCategory === category
                          ? "border-[#ffc56f]/40 bg-[#ffc56f]/12 text-white"
                          : "border-white/10 bg-white/[0.04] text-white/72 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <span>{category}</span>
                      <span className="text-white/48">{categoryCount}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/48">Industry</p>
              <div className="flex flex-wrap gap-3">
                {industries.map((industry) => {
                  const industryCount =
                    industry === "All"
                      ? items.length
                      : items.filter((study) => getCaseStudyFacet(study.id).industry === industry).length;

                  return (
                    <button
                      key={industry}
                      type="button"
                      onClick={() => setActiveIndustry(industry)}
                      className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition duration-200 ${
                        activeIndustry === industry
                          ? "border-[#88b8ff]/40 bg-[#88b8ff]/12 text-white"
                          : "border-white/10 bg-white/[0.04] text-white/72 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <span>{industry}</span>
                      <span className="text-white/48">{industryCount}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.3rem] border border-white/10 bg-black/20 px-4 py-3">
              <p className="text-sm text-white/76">
                Showing <span className="font-semibold text-white">{filteredItems.length}</span> of{" "}
                <span className="font-semibold text-white">{items.length}</span> case studies
              </p>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                    setActiveIndustry("All");
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/82 transition duration-200 hover:border-white/20 hover:text-white"
                >
                  Clear Filters
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {filteredItems.length ? (
        <div className="grid gap-5 xl:grid-cols-3">
          {filteredItems.map((study) => {
            const facet = getCaseStudyFacet(study.id);

            return (
              <article key={study.id} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-[#ffc56f]/20 bg-[#ffc56f]/10 px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-white/80">
                    {facet.category}
                  </span>
                  <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-white/66">
                    {facet.industry}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-sm font-medium text-white">{study.name}</span>
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/48">{study.service}</span>
                </div>

                <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.03em] text-white">{study.headline}</h3>
                <p className="mt-3 text-sm leading-7 text-white/66">{study.summary}</p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {study.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-[1.3rem] border border-white/10 bg-black/20 p-4">
                      <div className="text-xl font-semibold text-white">{metric.value}</div>
                      <div className="mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-white/52">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-3">
                  {study.insights.slice(0, 2).map((insight) => (
                    <div key={insight} className="rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white/72">
                      {insight}
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`/explore/${study.id}`}
                    className="inline-flex items-center justify-center rounded-full border border-[#ffc56f]/30 bg-[#ffc56f]/12 px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition duration-200 hover:border-[#ffc56f]/50 hover:bg-[#ffc56f]/18"
                  >
                    View Full Case Study
                  </Link>
                  {study.topContentHref ? (
                    <a
                      href={study.topContentHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/82 transition duration-200 hover:border-white/20 hover:text-white"
                    >
                      {study.topContentLabel ?? "Top Performing Video"}
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#b7cdf6]">No Match Yet</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">No case studies match this filter combination.</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/66">
            Try a broader category, switch industries, or clear the search to open the full library again.
          </p>
        </div>
      )}
    </div>
  );
}
