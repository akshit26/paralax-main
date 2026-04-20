import type { Metadata } from "next";

import LoginPanel from "@/components/site/LoginPanel";
import SiteShell from "@/components/site/SiteShell";
import { LOGIN_PAGE } from "@/data/sitePages";

export const metadata: Metadata = {
  title: "Login | ZYFLUS",
  description: "Client portal entry for ZYFLUS reports, roadmaps, and launch notes.",
};

export default function LoginPage() {
  return (
    <SiteShell>
      <section className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#b7cdf6]">{LOGIN_PAGE.eyebrow}</p>
          <h1 className="text-4xl font-semibold leading-[0.92] tracking-[-0.05em] text-white sm:text-6xl">{LOGIN_PAGE.title}</h1>
          <p className="max-w-2xl text-base leading-8 text-white/68">{LOGIN_PAGE.copy}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            {LOGIN_PAGE.features.map((feature) => (
              <article key={feature} className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-white/72">
                {feature}
              </article>
            ))}
          </div>

          <div className="grid gap-4">
            {LOGIN_PAGE.support.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 text-sm text-white transition hover:border-white/20"
              >
                <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/46">{item.label}</span>
                <span className="mt-2 block">{item.value}</span>
              </a>
            ))}
          </div>
        </div>

        <LoginPanel />
      </section>
    </SiteShell>
  );
}
