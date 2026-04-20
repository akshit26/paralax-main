import type { Metadata } from "next";
import "./globals.css";

import { SITE_INFO } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: {
    default: "ZYFLUS | Web Development, Performance Marketing & AI Automation",
    template: "%s | ZYFLUS",
  },
  description: SITE_INFO.description,
  keywords: [
    "web development agency",
    "performance marketing agency",
    "influencer marketing agency",
    "content marketing agency",
    "AI automation agency",
    "Shopify development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-black text-white no-scrollbar">{children}</body>
    </html>
  );
}
