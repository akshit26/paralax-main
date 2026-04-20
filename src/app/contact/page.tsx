import type { Metadata } from "next";

import ContactPageForm from "@/components/site/ContactPageForm";
import SiteShell from "@/components/site/SiteShell";
import { CONTACT } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact ZYFLUS for web development, SEO websites, performance marketing, influencer campaigns, content systems, and AI automation.",
  keywords: [
    "contact web development agency",
    "contact performance marketing agency",
    "influencer marketing contact",
    "AI automation agency contact",
  ],
};

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#b7cdf6]">{CONTACT.eyebrow}</p>
          <h1 className="text-4xl font-semibold leading-[0.92] tracking-[-0.05em] text-white sm:text-6xl">{CONTACT.title}</h1>
          <p className="max-w-2xl text-base leading-8 text-white/68">{CONTACT.copy}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            {CONTACT.highlights.map((highlight) => (
              <article key={highlight.label} className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/50">{highlight.label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{highlight.value}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-4">
            {CONTACT.channels.map((channel) => (
              <a
                key={channel.type}
                href={channel.href}
                className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 text-sm text-white transition hover:border-white/20"
              >
                {channel.value}
              </a>
            ))}
          </div>
        </div>

        <ContactPageForm />
      </section>
    </SiteShell>
  );
}
