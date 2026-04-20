import type { Metadata } from "next";

import ExperienceShell from "@/components/ExperienceShell";

export const metadata: Metadata = {
  title: {
    absolute: "ZYFLUS | Web Development, Performance Marketing & AI Automation Agency",
  },
  description:
    "ZYFLUS helps brands grow with SEO-ready web development, performance marketing, influencer campaigns, content systems, and AI automation.",
  keywords: [
    "web development",
    "performance marketing",
    "influencer marketing",
    "content marketing",
    "AI automation",
    "growth agency",
  ],
};

export default function Home() {
  return <ExperienceShell />;
}
