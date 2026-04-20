import Link from "next/link";

import { FOOTER, SITE_INFO } from "@/data/siteConfig";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_2fr]">
          <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#b7cdf6]">{FOOTER.eyebrow}</p>
            <h2 className="max-w-xl text-3xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-4xl">
              {FOOTER.title}
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-white/68">{FOOTER.copy}</p>
            <p className="text-sm leading-7 text-white/56">
              {SITE_INFO.address} · {SITE_INFO.company}
            </p>
            <a
              href={FOOTER.cta.href}
              className="inline-flex items-center justify-center rounded-full border border-[#ffc56f]/30 bg-[#ffc56f]/10 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition duration-200 hover:border-[#ffc56f]/50 hover:bg-[#ffc56f]/16"
            >
              {FOOTER.cta.label}
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
              <h3 className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#b7cdf6]">Navigate</h3>
              <div className="flex flex-col gap-3">
                {FOOTER.navigate.map((item) => (
                  <Link key={item.href} href={item.href} className="text-sm text-white/76 transition hover:text-white">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
              <h3 className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#b7cdf6]">Services</h3>
              <div className="flex flex-col gap-3">
                {FOOTER.services.map((item) => (
                  <span key={item} className="text-sm text-white/72">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
              <h3 className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#b7cdf6]">Legal</h3>
              <div className="flex flex-col gap-3">
                {FOOTER.legal.map((item) => (
                  <Link key={item.href} href={item.href} className="text-sm text-white/76 transition hover:text-white">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
              <h3 className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#b7cdf6]">Connect</h3>
              <div className="flex flex-col gap-3">
                {FOOTER.socials.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/76 transition hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-5 text-xs uppercase tracking-[0.14em] text-white/48 sm:flex-row sm:items-center sm:justify-between">
          <span>{FOOTER.bottomLeft}</span>
          <span>{FOOTER.bottomRight}</span>
        </div>
      </div>
    </footer>
  );
}
