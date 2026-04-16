import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZYFLUS — Out of This World",
  description: "A cinematic 3D parallax scroll journey from the Milky Way down to Earth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fredoka:wght@400;600;700&family=Patrick+Hand&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-black text-white no-scrollbar">
        {children}
      </body>
    </html>
  );
}
