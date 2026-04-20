"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAVIGATION, SITE_INFO } from "@/data/siteConfig";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return (
      <header className="legacy-home-header">
        <div className="legacy-home-nav">
          <Link href="/" className="legacy-home-nav__logo">
            {SITE_INFO.name}
          </Link>

          <nav className="legacy-home-nav__links" aria-label="Primary">
            {NAVIGATION.links.map((link) => {
              const active = isActivePath(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`legacy-home-nav__link ${active ? "legacy-home-nav__link--active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link href={NAVIGATION.login.href} className="legacy-home-nav__login">
            {NAVIGATION.login.label}
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/78 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="text-sm font-bold tracking-[0.32em] text-white transition-opacity duration-200 hover:opacity-80"
        >
          {SITE_INFO.name}
        </Link>

        <nav className="order-3 flex w-full gap-2 overflow-x-auto pb-1 no-scrollbar md:order-2 md:w-auto md:flex-1 md:justify-center md:pb-0">
          {NAVIGATION.links.map((link) => {
            const active = isActivePath(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-full border px-3 py-2 text-[0.68rem] font-semibold tracking-[0.18em] transition-all duration-200 ${
                  active
                    ? "border-[#ffc56f]/40 bg-[#ffc56f]/12 text-white"
                    : "border-white/10 bg-white/4 text-white/72 hover:border-white/20 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href={NAVIGATION.login.href}
          className={`order-2 ml-auto inline-flex items-center justify-center rounded-full border px-4 py-2 text-[0.68rem] font-semibold tracking-[0.18em] transition-all duration-200 md:order-3 md:ml-0 ${
            isActivePath(pathname, NAVIGATION.login.href)
              ? "border-[#88b8ff]/40 bg-[#88b8ff]/12 text-white"
              : "border-white/10 bg-white/4 text-white/78 hover:border-white/20 hover:text-white"
          }`}
        >
          {NAVIGATION.login.label}
        </Link>
      </div>
    </header>
  );
}
