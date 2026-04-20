import type { Metadata } from "next";
import Link from "next/link";

import SiteShell from "@/components/site/SiteShell";
import { SERVICES } from "@/data/siteConfig";
import { SERVICES_PAGE } from "@/data/sitePages";

export const metadata: Metadata = {
  title: "Services | ZYFLUS",
  description: "Explore ZYFLUS services across web experiences, performance marketing, content systems, and AI automation.",
};

export default function ServicesPage() {
  return (
    <SiteShell>
      <section className="space-y-5">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#b7cdf6]">{SERVICES_PAGE.eyebrow}</p>
        <h1 className="max-w-5xl text-4xl font-semibold leading-[0.92] tracking-[-0.05em] text-white sm:text-6xl">
          {SERVICES_PAGE.title}
        </h1>
        <p className="max-w-3xl text-base leading-8 text-white/68">{SERVICES_PAGE.copy}</p>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        {SERVICES.planets.map((service, index) => (
          <article key={service.id} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#ffc56f]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-white/62">
                Orbit Lane
              </span>
            </div>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.04em] text-white">
              {service.labelLines.join(" ")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68">{service.description}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[0.66rem] uppercase tracking-[0.14em] text-white/58">
                Strategy-led
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[0.66rem] uppercase tracking-[0.14em] text-white/58">
                Launch-ready
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[0.66rem] uppercase tracking-[0.14em] text-white/58">
                Measurable next step
              </span>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {SERVICES_PAGE.process.map((step, index) => (
          <article key={step.title} className="rounded-[1.9rem] border border-white/10 bg-white/[0.04] p-6">
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#88b8ff]">
              Phase {index + 1}
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">{step.title}</h2>
            <p className="mt-3 text-sm leading-7 text-white/66">{step.copy}</p>
          </article>
        ))}
      </section>

      <section className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#b7cdf6]">Need a custom mix?</p>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white">Start with the lane that removes the biggest blocker first.</h2>
          <p className="max-w-2xl text-sm leading-7 text-white/66">
            Service pages are now separated from the home experience, so each offer can hold its own detail, proof, and CTA.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full border border-[#ffc56f]/30 bg-[#ffc56f]/12 px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition duration-200 hover:border-[#ffc56f]/50 hover:bg-[#ffc56f]/18"
        >
          Contact ZYFLUS
        </Link>
      </section>
    </SiteShell>
  );
}
