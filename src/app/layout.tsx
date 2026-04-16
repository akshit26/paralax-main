import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZYFLUS - Out of This World",
  description: "A cinematic 3D parallax scroll journey from the Milky Way down to Earth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white no-scrollbar">{children}</body>
    </html>
  );
}
