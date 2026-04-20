import { CASE_STUDIES, CLIENTS, CONTACT, SERVICES, SITE_INFO } from "./siteConfig";

export const EXPLORE_PAGE = {
  eyebrow: "Explore",
  title: "Move from the homepage snapshot into a cleaner case-study and strategy library.",
  copy:
    "Explore is where the lighter homepage signals open up into fuller case studies, clearer campaign context, and a more usable strategy view across launches, creator programs, and growth systems.",
  pillars: [
    {
      title: "Positioning Audit",
      copy: "We review the offer, the message, and the moments where attention is currently leaking before any design or media push starts.",
    },
    {
      title: "Growth Loop Mapping",
      copy: "Traffic, retention, and conversion are treated as one system so the next sprint compounds instead of resetting every month.",
    },
    {
      title: "Content Readiness",
      copy: "We pressure-test whether the brand can keep publishing with clarity once campaigns, launches, and creator asks pile up.",
    },
    {
      title: "Automation Scope",
      copy: "We isolate the manual drag first, then choose where AI or workflow automation will actually buy the team more speed.",
    },
  ],
  checkpoints: [
    { step: "01", title: "Map the gap", copy: "Clarify what is blocked, what is underperforming, and what the next launch needs to prove." },
    { step: "02", title: "Shape the system", copy: "Turn the findings into a sharper website, funnel, content loop, and workflow plan." },
    { step: "03", title: "Launch with signal", copy: "Ship a cleaner experience with enough structure to keep improving after the first push." },
  ],
};

export const SERVICES_PAGE = {
  eyebrow: "Services",
  title: "Execution lanes built to hold attention, convert cleanly, and scale without chaos.",
  copy:
    "Each service is designed as a working system, not an isolated deliverable. That means better creative alignment, cleaner reporting, and fewer handoff gaps between launch and growth.",
  process: [
    {
      title: "Strategy Sprint",
      copy: "We align offer clarity, audience signal, and the growth goal so the work has a clear target before design or media begins.",
    },
    {
      title: "Build + Test",
      copy: "Pages, campaigns, content systems, and workflows are created with testing hooks instead of one-off polished assets.",
    },
    {
      title: "Refine + Compound",
      copy: "We tighten what performs, simplify what drags, and leave the team with a system that can keep learning after launch.",
    },
  ],
};

export const BLOG_PAGE = {
  eyebrow: "Blog",
  title: "Field notes on launches, growth systems, and the small decisions that change outcomes.",
  copy:
    "This space is for practical thinking: clearer positioning, sharper websites, better campaign structure, and the operational habits that stop brands from rebuilding the same problems every quarter.",
};

export const BLOG_POSTS = [
  {
    slug: "launch-pages-that-convert-under-pressure",
    category: "Web Strategy",
    title: "Launch Pages That Still Convert When Campaign Traffic Gets Messy",
    excerpt:
      "A strong launch page is not just attractive. It needs to keep clarity when paid traffic, creator mentions, and returning users all arrive with different intent.",
    publishedAt: "April 17, 2026",
    readTime: "6 min read",
    author: "ZYFLUS Studio",
    body: [
      "Launch pages break when they are built for a perfect visitor instead of the mixed traffic they actually get. The same page has to work for warm clicks, distracted paid traffic, repeat visitors, and people forwarding the link internally.",
      "That means the first screen should clarify the offer fast, the next section should reduce uncertainty, and the rest of the page should let the visitor self-sort without forcing them through a single rigid story.",
      "The best fix is usually structural. Sharpen the promise, compress the friction, and make sure every section earns its place. Design polish helps, but hierarchy is what rescues performance under pressure.",
    ],
    takeaways: [
      "Lead with a promise that survives low-intent traffic.",
      "Use the second screen to remove friction, not add flair.",
      "Treat the page like a sorting system, not a brochure.",
    ],
  },
  {
    slug: "paid-media-gets-better-when-the-landing-system-is-clean",
    category: "Performance Marketing",
    title: "Paid Media Gets Better When the Landing System Is Cleaner",
    excerpt:
      "Most ad accounts are carrying problems that were created on the landing page. Better creative helps, but cleaner page logic often unlocks efficiency faster.",
    publishedAt: "April 10, 2026",
    readTime: "5 min read",
    author: "ZYFLUS Studio",
    body: [
      "When campaigns stall, teams usually reach for more testing inside the ad platform first. Sometimes that is right. Often the faster win is fixing the page the traffic lands on.",
      "If the offer is unclear, proof is weak, or the CTA arrives before confidence does, the media team ends up paying for confusion. That makes the account look like a targeting problem even when it is really a conversion story problem.",
      "A cleaner landing system gives the media team better feedback loops. Costs settle, learning becomes easier to trust, and creative testing starts compounding instead of masking structural issues.",
    ],
    takeaways: [
      "Fix conversion logic before blaming the channel.",
      "Sharper proof often beats more traffic.",
      "Creative and landing pages should be tested as one system.",
    ],
  },
  {
    slug: "content-ops-need-systems-not-heroics",
    category: "Content Ops",
    title: "Content Ops Need Systems, Not Heroics",
    excerpt:
      "Publishing consistency is usually an operations problem. Teams do not need more panic energy. They need fewer manual steps and clearer reuse paths.",
    publishedAt: "April 3, 2026",
    readTime: "4 min read",
    author: "ZYFLUS Studio",
    body: [
      "A lot of content calendars fail because the workflow is held together by memory and urgency. A teammate chases approvals, someone rebuilds the same format again, and the system only works when everybody overextends.",
      "Content operations improve when the team has reusable structures: templates, clearer review loops, faster editing passes, and a simple idea of what gets repurposed where.",
      "Automation helps once the system is understandable. If the workflow is still messy, automation just accelerates confusion. Clean the process first, then automate the drag.",
    ],
    takeaways: [
      "Consistency comes from repeatable structure.",
      "Repurposing works best when formats are designed in advance.",
      "Automate only after the manual flow makes sense.",
    ],
  },
] as const;

export const LOGIN_PAGE = {
  eyebrow: "Login",
  title: "Client access for reports, roadmaps, and launch notes.",
  copy:
    "Use this page as the entry point for your future client portal. The UI is ready for sign-in flows, but the live authentication layer still needs to be connected to your chosen stack.",
  features: [
    "Campaign snapshots and reporting dashboards",
    "Live task boards and sprint priorities",
    "Content calendars, approvals, and asset handoff",
    "Automation requests, launch notes, and support tickets",
  ],
  support: [
    { label: "Need portal access?", value: SITE_INFO.email, href: `mailto:${SITE_INFO.email}` },
    { label: "Prefer a kickoff call?", value: CONTACT.channels[1].value, href: CONTACT.channels[1].href },
  ],
};

export const LEGAL_DOCUMENTS = {
  terms: {
    eyebrow: "Terms & Conditions",
    title: "Ground rules for using the ZYFLUS site and engaging the studio.",
    updatedAt: "Updated April 17, 2026",
    sections: [
      {
        heading: "Use of the site",
        paragraphs: [
          "This site is intended to share studio information, service positioning, and contact routes. You may browse, reference, and share site content for standard business evaluation purposes.",
          "You may not misuse the site, attempt to disrupt it, scrape protected material at scale, or represent ZYFLUS work as your own.",
        ],
      },
      {
        heading: "Project discussions",
        paragraphs: [
          "Any proposal, estimate, or scope shared through the site or by email remains informational until both sides agree in writing.",
          "Timelines, deliverables, and commercial terms are finalized inside a separate project agreement, statement of work, or invoice-backed approval flow.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "Unless a separate agreement says otherwise, the site design, branding, copy, and showcase material remain the intellectual property of ZYFLUS or the relevant client owners.",
          "You may not reuse protected assets, source files, or proprietary methods without written permission.",
        ],
      },
    ],
  },
  privacy: {
    eyebrow: "Privacy Policy",
    title: "How contact information and business inquiry data are handled.",
    updatedAt: "Updated April 17, 2026",
    sections: [
      {
        heading: "What we collect",
        paragraphs: [
          "If you contact the studio, we may receive details such as your name, email address, company name, inquiry notes, and any files or links you voluntarily share.",
          "Basic analytics, browser information, and device-level usage signals may also be collected to understand site performance and demand.",
        ],
      },
      {
        heading: "How it is used",
        paragraphs: [
          "Inquiry details are used to respond to requests, prepare estimates, evaluate project fit, and improve how services are presented.",
          "We do not sell inquiry data. Information may be shared only with the internal team or trusted service providers needed to operate communication, analytics, or project workflows.",
        ],
      },
      {
        heading: "Retention and control",
        paragraphs: [
          "Inquiry data is kept only as long as it is relevant for communication, compliance, or project history purposes.",
          "You can request updates or deletion of personal inquiry data by contacting hello@zyflus.com.",
        ],
      },
    ],
  },
  cookies: {
    eyebrow: "Cookie Policy",
    title: "How lightweight tracking and preference storage may be used.",
    updatedAt: "Updated April 17, 2026",
    sections: [
      {
        heading: "Essential behavior",
        paragraphs: [
          "Basic browser storage may be used to support navigation, remember interface preferences, or improve stability across visits.",
          "These small utilities help the site behave more consistently but are not intended to build invasive user profiles.",
        ],
      },
      {
        heading: "Analytics cookies",
        paragraphs: [
          "Analytics or performance tools may use cookies or similar identifiers to understand visits, traffic quality, and page-level interest.",
          "If deeper marketing attribution is added later, this policy should be updated to reflect the exact tools and consent flow in use.",
        ],
      },
      {
        heading: "Your choices",
        paragraphs: [
          "You can manage cookies through your browser settings and clear stored site data at any time.",
          "If the site adopts a dedicated consent banner later, those controls should be treated as the primary preference tool.",
        ],
      },
    ],
  },
} as const;

export const HOME_PAGE_SUMMARY = {
  services: SERVICES.planets,
  clients: CLIENTS,
  caseStudies: CASE_STUDIES.items,
};

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
