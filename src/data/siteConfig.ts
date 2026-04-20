// -----------------------------------------------------------------
// SITE CONFIGURATION - CENTRALIZED DYNAMIC CONTENT
// All website content, copy, and configuration lives here
// -----------------------------------------------------------------

export const SITE_INFO = {
  name: "ZYFLUS",
  tagline: "OUT OF THIS WORLD",
  description:
    "ZYFLUS is a web development, performance marketing, influencer marketing, content marketing, and AI automation agency for growth-focused brands.",
  email: "hello@zyflus.com",
  phone: "+91 8708321935",
  address: "Mumbai, India",
  company: "Part of Sinpedroz Pvt Ltd",
  responseTime: "Within 24 hours",
  targetAudience: "Growth-focused brands",
  copyrightYear: 2026,
  copyrightTagline: "Built for bold launches.",
};

export const NAVIGATION = {
  links: [
    { label: "HOME", href: "/" },
    { label: "EXPLORE", href: "/explore" },
    { label: "SERVICES", href: "/services" },
    { label: "BLOG", href: "/blog" },
    { label: "CONTACT", href: "/contact" },
  ],
  login: { label: "LOGIN", href: "/login" },
};

export const HERO = {
  title: SITE_INFO.name,
  tagline: SITE_INFO.tagline,
  scrollLabel: "SCROLL TO JOURNEY",
};

export const SERVICES = {
  planets: [
    {
      id: "ai-automation",
      labelLines: ["AI", "AUTOMATION"],
      description: "AI automation systems that remove repetitive work, speed up operations, and improve lead flow.",
      modelUrl: "/planet1.glb",
      semiMajor: 10.6,
      semiMinor: 6.4,
      phase: 2.15,
      orbitSpeed: 0.016,
      scale: 2.1,
      zOffset: 0.7,
      labelWidth: 220,
    },
    {
      id: "web-development",
      labelLines: ["WEB", "DEVELOPMENT"],
      description: "SEO-ready, high-conversion websites built to load fast, rank cleanly, and drive action.",
      modelUrl: "/planet2.glb",
      semiMajor: 18.8,
      semiMinor: 10.8,
      phase: 3.92,
      orbitSpeed: 0.01,
      scale: 2.35,
      zOffset: 1.1,
      labelWidth: 240,
    },
    {
      id: "performance-marketing",
      labelLines: ["PERFORMANCE", "MARKETING"],
      description: "Performance marketing that sharpens targeting, creative testing, and return on ad spend.",
      modelUrl: undefined,
      proceduralVariant: "signal" as const,
      semiMajor: 14.8,
      semiMinor: 8.3,
      phase: 5.24,
      orbitSpeed: 0.013,
      scale: 2.15,
      zOffset: 1.05,
      labelWidth: 250,
      hasRing: true,
    },
    {
      id: "content-marketing",
      labelLines: ["CONTENT", "MARKETING"],
      description: "Content marketing systems that help brands publish consistently, rank organically, and compound attention.",
      modelUrl: "/planet4.glb",
      semiMajor: 21.5,
      semiMinor: 12.4,
      phase: 0.46,
      orbitSpeed: 0.008,
      scale: 2.95,
      zOffset: 1.35,
      labelWidth: 260,
    },
  ],
};

export const CLIENTS = {
  eyebrow: "Our Stellar Clients",
  title: "Brands trust ZYFLUS to turn traffic, content, and campaigns into measurable growth.",
  copy:
    "We build SEO-friendly websites, performance campaigns, creator programs, and AI automation systems that help brands grow faster with less operational drag.",
  stats: [
    { value: "16+", label: "Industries" },
    { value: "100+", label: "Clients" },
    { value: "250+", label: "Campaigns" },
  ],
  industries: [
    "Fashion",
    "Beauty",
    "Skincare",
    "Wellness",
    "Healthcare",
    "FinTech",
    "E-Commerce",
    "Retail",
    "Tech",
    "SaaS",
    "Food & Beverage",
    "Fitness",
    "Travel",
    "Real Estate",
    "Education",
    "Gaming",
  ],
  logos: [
    { name: "Smaaash", src: "/smaaash.png", sectors: ["F&B", "Arcade"] },
    { name: "Soulflower", src: "/soulflower.png", sectors: ["Cosmetics", "Skincare"] },
    { name: "The Ordinary", src: "/theordinary.png", sectors: ["Cosmetics", "Skincare"] },
    { name: "Bioderma", src: "/bioderma.png", sectors: ["Cosmetics", "Skincare"] },
    { name: "Starstruck", src: "/starstruck.png", sectors: ["Cosmetics", "Skincare"] },
    { name: "Sanfe", src: "/sanfe.png", sectors: ["Cosmetics", "Skincare"] },
  ],
  note: "Work across healthcare, fintech, e-commerce, fashion, beauty, wellness, SaaS, travel, education, gaming, and real estate.",
};

type CaseStudyMetric = {
  value: string;
  label: string;
};

type CaseStudyDetail = {
  label: string;
  value: string;
};

type CaseStudyLink = {
  label: string;
  href: string;
};

type CaseStudyData = {
  id: string;
  name: string;
  service: string;
  headline: string;
  summary: string;
  metrics: CaseStudyMetric[];
  campaignDetails: CaseStudyDetail[];
  insights: string[];
  topContentHref: string | null;
  topContentLabel: string | null;
  showcaseLinks?: CaseStudyLink[];
};

export const CASE_STUDIES: {
  eyebrow: string;
  title: string;
  copy: string;
  items: CaseStudyData[];
} = {
  eyebrow: "Recent Case Studies",
  title: "Case studies across influencer marketing, product development, and e-commerce growth.",
  copy:
    "Explore campaign wins, product outcomes, and commerce builds with clear metrics, execution notes, and proof assets.",
  items: [
    {
      id: "health2mumma",
      name: "Health2Mumma",
      service: "Healthcare App",
      headline: "A holistic pregnancy and baby-care app supported 150K+ mothers with guided wellness journeys.",
      summary:
        "Health2Mumma is a pregnancy and baby-care companion app built around holistic wellness support. We created a mobile-first product with expert-led pregnancy guidance, trimester-specific workouts, nutrition plans, pelvic floor recovery, mental health support, baby-care resources, and community features that helped support 150K+ mothers and deliver 500K+ guided workouts with a 4.8-star rating.",
      metrics: [
        { value: "150K+", label: "Mothers supported" },
        { value: "500K+", label: "Guided workouts" },
        { value: "4.8/5", label: "App rating" },
        { value: "85%", label: "Faster recovery reported" },
      ],
      campaignDetails: [
        { label: "The challenge", value: "Expecting mothers needed a single, personalized support system across pregnancy, recovery, postpartum wellness, and baby care" },
        { label: "Our solution", value: "Built a holistic app with 20+ expert guides, trimester-specific workouts, nutrition support, recovery exercises, mental health resources, baby-care tips, and community forums" },
        { label: "Technologies used", value: "React Native, workout programs, nutrition database, content management, community forums, progress tracking, and mobile app infrastructure" },
        { label: "Impact", value: "Supported 150K+ mothers, delivered 500K+ guided workouts, achieved a 4.8-star rating, and helped 85% of users report faster postpartum recovery" },
      ],
      insights: [
        "The strongest value came from combining physical recovery, mental wellness, and baby-care guidance in one experience.",
        "Structured expert content turned the app into an everyday companion instead of a one-time resource.",
        "The high app rating shows the product delivered trust at a sensitive life stage where retention depends on utility and empathy.",
      ],
      topContentHref: "https://health2mama.com/",
      topContentLabel: "Visit Live Platform",
    },
    {
      id: "easecare",
      name: "EaseCare",
      service: "Telemedicine Platform",
      headline: "A secure telemedicine app enabled 50K+ virtual consultations while cutting wait times by 60%.",
      summary:
        "EaseCare is a telemedicine app focused on remote consultations and patient health record management. We built a secure, HIPAA-compliant care experience with video consultations, electronic health records, prescription management, and patient-doctor communication that enabled 50,000+ virtual consultations, reduced wait times by 60%, and improved patient satisfaction by 85%.",
      metrics: [
        { value: "50,000+", label: "Virtual consultations" },
        { value: "60%", label: "Reduced wait time" },
        { value: "85%", label: "Patient satisfaction" },
        { value: "5", label: "Core platform modules" },
      ],
      campaignDetails: [
        { label: "The challenge", value: "Healthcare providers needed a secure telemedicine system for remote consultations and record management during a high-demand period" },
        { label: "Our solution", value: "Developed a HIPAA-compliant platform with video consultations, electronic records, prescription management, and secure patient-doctor communication" },
        { label: "Technologies used", value: "React Native, Node.js, WebRTC, AWS, and HIPAA-compliant infrastructure patterns" },
        { label: "Impact", value: "50,000+ virtual consultations, 60% shorter wait times, and 85% stronger patient satisfaction outcomes" },
      ],
      insights: [
        "Clinical utility improved because consultation, records, and communication were handled inside the same flow.",
        "Compliance requirements were treated as product infrastructure, not as an afterthought.",
        "Reducing wait time created a direct patient-experience win while also improving provider throughput.",
      ],
      topContentHref: "https://easecare.co/",
      topContentLabel: "Visit Live Platform",
    },
    {
      id: "complyany",
      name: "ComplyAny",
      service: "Compliance SaaS",
      headline: "An AI-powered compliance platform cut prep time by 70% and improved audit readiness across 200+ organizations.",
      summary:
        "ComplyAny is a real-time compliance scoring and risk intelligence platform for cybersecurity teams. We developed an AI-powered GRC product that automated multi-framework compliance monitoring, centralized policies, generated audit-ready reports, and delivered real-time risk intelligence, helping 200+ organizations save 70% of compliance-preparation time and improve audit readiness by 85%.",
      metrics: [
        { value: "70%", label: "Time saved" },
        { value: "+85%", label: "Audit readiness" },
        { value: "200+", label: "Organizations" },
        { value: "Multi", label: "Framework coverage" },
      ],
      campaignDetails: [
        { label: "The challenge", value: "Manual compliance tracking across ISO, SOC2, GDPR, and other frameworks was slow, fragmented, and expensive" },
        { label: "Our solution", value: "Built an AI-powered GRC platform for automated monitoring, real-time risk scoring, centralized policy management, and audit-ready reporting" },
        { label: "Technologies used", value: "React, AI/ML workflows, security analytics, compliance automation, risk assessment systems, and audit management tooling" },
        { label: "Impact", value: "Reduced compliance preparation time by 70%, improved audit readiness by 85%, and supported 200+ organizations with continuous compliance" },
      ],
      insights: [
        "The product translated complex compliance operations into a clearer decision system for security teams.",
        "Real-time scoring shifted compliance from periodic review into an always-on operating layer.",
        "The strongest value was operational leverage: fewer manual handoffs and faster audit readiness.",
      ],
      topContentHref: "https://complyan.com/",
      topContentLabel: "Visit Live Platform",
    },
    {
      id: "banksathi",
      name: "Banksathi",
      service: "FinTech App",
      headline: "A unified wealth platform managed $50M+ in assets while outperforming market benchmarks.",
      summary:
        "Banksathi is a finance and wealth-management application built for users who need a clearer picture across accounts and investment decisions. We created a unified platform with account aggregation, AI-powered recommendations, and automated financial planning that grew to 25,000+ active users, managed $50M+ in assets, and delivered average returns 15% above market benchmarks.",
      metrics: [
        { value: "$50M+", label: "Assets under management" },
        { value: "25,000+", label: "Active users" },
        { value: "+15%", label: "Returns vs market" },
        { value: "Unified", label: "Portfolio view" },
      ],
      campaignDetails: [
        { label: "The challenge", value: "Users struggled to manage multiple financial accounts and lacked clear, personalized investment guidance" },
        { label: "Our solution", value: "Built a unified wealth-management platform with account aggregation, automated planning, and AI-powered investment recommendations" },
        { label: "Technologies used", value: "React, Python, Plaid API, machine learning, and secure authentication systems" },
        { label: "Impact", value: "Managed $50M+ in assets, served 25,000+ active users, and delivered average returns 15% above market benchmarks" },
      ],
      insights: [
        "A single financial view reduced decision friction for users managing multiple accounts.",
        "Recommendation quality mattered because the product blended planning discipline with portfolio convenience.",
        "The strongest proof point is that product adoption and portfolio performance both moved in the right direction.",
      ],
      topContentHref: "https://www.banksathi.com/",
      topContentLabel: "Visit Live Platform",
    },
    {
      id: "steve-madden",
      name: "Steve Madden",
      service: "E-Commerce Platform",
      headline: "A global fashion commerce platform drove 2M+ app downloads and $100M+ in online sales.",
      summary:
        "For Steve Madden, we built an omnichannel fashion-commerce experience spanning mobile and web. The platform handled large product catalogs, international shipping, multi-currency checkout, real-time inventory, and personalized shopping flows, helping deliver 2M+ app downloads, $100M+ in global sales, and a 65% lift in mobile conversions across 50+ countries.",
      metrics: [
        { value: "2M+", label: "App downloads" },
        { value: "$100M+", label: "Global sales" },
        { value: "+65%", label: "Mobile conversions" },
        { value: "50+", label: "Markets served" },
      ],
      campaignDetails: [
        { label: "The challenge", value: "Build a unified mobile and web shopping experience across 50+ countries while managing scale, currency, shipping, and brand consistency" },
        { label: "Our solution", value: "Developed native mobile apps and a connected e-commerce stack with advanced search, inventory sync, international shipping, multi-currency checkout, and product recommendations" },
        { label: "Technologies used", value: "React Native, e-commerce platform tooling, payment integration, global shipping systems, inventory management, and multi-currency support" },
        { label: "Impact", value: "2M+ app downloads, $100M+ in global online sales, 65% stronger mobile conversions, and expansion across 50+ international markets" },
      ],
      insights: [
        "The commerce system scaled because operational complexity and customer experience were solved together.",
        "Mobile conversion lift shows the app experience was not just broader, but materially better.",
        "Global fashion commerce needed infrastructure depth as much as front-end polish.",
      ],
      topContentHref: "https://www.stevemadden.com/",
      topContentLabel: "Visit Live Platform",
    },
    {
      id: "shopify-websites",
      name: "Shopify Websites",
      service: "Shopify Development",
      headline: "A 29-store Shopify portfolio spans fashion, wellness, jewelry, and specialty DTC commerce.",
      summary:
        "Our Shopify portfolio includes 29 successful e-commerce stores across fashion, wellness, jewelry, nutrition, gifting, decor, and specialty retail. Instead of a one-brand case, this portfolio reflects repeatable Shopify delivery across multiple verticals, helping brands launch faster, present better, and sell with cleaner storefront experiences.",
      metrics: [
        { value: "29", label: "Shopify stores" },
        { value: "6+", label: "Commerce verticals" },
        { value: "100%", label: "Shopify builds" },
        { value: "Global + India", label: "Market spread" },
      ],
      campaignDetails: [
        { label: "Portfolio focus", value: "Shopify website design and development across DTC, fashion, jewelry, wellness, gifting, and specialty retail" },
        { label: "What this represents", value: "A repeatable capability stack for launching, redesigning, and scaling e-commerce storefronts across multiple product categories" },
        { label: "Delivery pattern", value: "Conversion-minded storefront builds with clear merchandising, cleaner UX, and launch-ready store architecture" },
        { label: "Proof set", value: "29 live brand sites are linked below on the detail page" },
      ],
      insights: [
        "The portfolio shows repeatability, not a one-off success story.",
        "Cross-category Shopify work suggests the process adapts well to very different brand voices and product catalogs.",
        "A broad live-site set gives stronger proof than a single flagship build.",
      ],
      topContentHref: null,
      topContentLabel: null,
      showcaseLinks: [
        { label: "kisna.com", href: "https://kisna.com/" },
        { label: "bigmusclesnutrition.com", href: "https://bigmusclesnutrition.com/" },
        { label: "mymuse.in", href: "https://mymuse.in/" },
        { label: "menhood.in", href: "https://menhood.in/" },
        { label: "pantone.com", href: "https://www.pantone.com/" },
        { label: "bajaao.com", href: "https://www.bajaao.com/" },
        { label: "consciouschemist.com", href: "https://consciouschemist.com/" },
        { label: "anushreereddydesign.com", href: "https://anushreereddydesign.com/" },
        { label: "handicraftstown.com", href: "https://handicraftstown.com/" },
        { label: "sheetalbatra.com", href: "https://sheetalbatra.com/" },
        { label: "devnaagri.com", href: "https://www.devnaagri.com/" },
        { label: "pomchajaipur.com", href: "https://www.pomchajaipur.com/" },
        { label: "bagrustore.com", href: "https://www.bagrustore.com/" },
        { label: "mohabygeetanjali.com", href: "https://mohabygeetanjali.com/" },
        { label: "ambraee.com", href: "https://ambraee.com/" },
        { label: "jaipurkurti.com", href: "https://www.jaipurkurti.com/" },
        { label: "ratanjaipur.com", href: "https://www.ratanjaipur.com/" },
        { label: "kesajewels.com", href: "https://kesajewels.com/" },
        { label: "devijaipur.com", href: "https://www.devijaipur.com/" },
        { label: "satvikstore.in", href: "https://www.satvikstore.in/" },
        { label: "indianvirasat.com", href: "https://indianvirasat.com/" },
        { label: "khaticraft.com", href: "https://www.khaticraft.com/" },
        { label: "artmansha.com", href: "https://www.artmansha.com/" },
        { label: "twentyonejewels.com", href: "https://www.twentyonejewels.com/" },
        { label: "pujacelebrations.com", href: "https://www.pujacelebrations.com/" },
        { label: "ethnicadda.com", href: "https://www.ethnicadda.com/" },
        { label: "kashmirloom.com", href: "https://kashmirloom.com/" },
        { label: "aartihandicraft.com", href: "https://www.aartihandicraft.com/" },
        { label: "rajasthanfabric.com", href: "https://rajasthanfabric.com/" },
      ],
    },
    {
      id: "healthspace-afiya",
      name: "HealthSpace (Afiya)",
      service: "Healthcare Platform",
      headline: "A telemedicine and EHR platform connected patients and providers across 15 MENA countries.",
      summary:
        "HealthSpace (Afiya) is a comprehensive telemedicine platform connecting doctors and patients across the MENA region. We helped shape an all-in-one EHR, telemedicine, and practice management experience that facilitated 300K+ teleconsultations, connected 5,000+ healthcare providers, and served patients across 15 MENA countries.",
      metrics: [
        { value: "300K+", label: "Teleconsultations" },
        { value: "5,000+", label: "Healthcare providers" },
        { value: "15", label: "MENA countries" },
        { value: "75%", label: "Access time reduction" },
      ],
      campaignDetails: [
        { label: "The challenge", value: "Healthcare access across the MENA region was limited by geography, long wait times, and fragmented systems" },
        { label: "Our solution", value: "Built an all-in-one EHR, telemedicine, appointment, prescription, and payment platform tailored for the MENA region" },
        { label: "Technologies used", value: "React, WebRTC, EHR system, appointment management, prescription system, multi-language support, and cloud infrastructure" },
        { label: "Impact", value: "300K+ teleconsultations, 5,000+ healthcare providers, 15 countries served, and 75% faster healthcare access" },
      ],
      insights: [
        "The platform solved both patient access and provider workflow friction in the same product system.",
        "Multi-language, telemedicine, and payment infrastructure made the platform workable at regional scale.",
        "The result was not just higher adoption, but materially faster access to care across MENA markets.",
      ],
      topContentHref: "https://healthspace.africa/",
      topContentLabel: "Visit Live Platform",
    },
    {
      id: "bioderma-india",
      name: "Bioderma India",
      service: "Beauty Brand Marketing",
      headline: "Dermatologist-backed education and digital awareness work drove 8.5M impressions in India.",
      summary:
        "For Bioderma India, we built digital brand awareness around dermatologist-recommended skincare while competing against larger beauty conglomerates. The campaign delivered 8.5M impressions, lifted brand recall by 45%, and drove a 3.2x increase in website traffic through programmatic advertising, content marketing, and influencer partnerships.",
      metrics: [
        { value: "8.5M", label: "Impressions" },
        { value: "+45%", label: "Brand recall" },
        { value: "3.2x", label: "Website traffic" },
        { value: "3", label: "Service lines" },
      ],
      campaignDetails: [
        { label: "Services provided", value: "Programmatic advertising, content marketing, and influencer partnerships" },
        { label: "The challenge", value: "Educate Indian consumers about dermatologist-recommended skincare while competing with larger beauty brands with bigger budgets" },
        { label: "Our approach", value: "Created educational content with dermatologists and skincare experts, backed by targeted programmatic media for skincare-conscious audiences" },
        { label: "Result", value: "Established Bioderma as a trusted skincare authority in India with massive reach and stronger brand recall" },
      ],
      insights: [
        "Medical credibility was turned into a scalable content and media advantage.",
        "Programmatic distribution helped educational skincare content reach consumers at high-intent moments.",
        "The campaign grew both awareness and trust, not just top-line reach.",
      ],
      topContentHref: null,
      topContentLabel: null,
    },
    {
      id: "sugar-cosmetics",
      name: "Sugar Cosmetics",
      service: "Content + Performance Marketing",
      headline: "A faster content engine cut production load while improving creative output and media efficiency.",
      summary:
        "Sugar Cosmetics needed scalable content production to support aggressive growth without losing brand consistency. We built an AI-assisted content production pipeline and rigorous creative testing framework that reduced content production overhead by 40%, increased ad creative output 3x, and lowered CPM by 28%.",
      metrics: [
        { value: "-40%", label: "Content production" },
        { value: "3x", label: "Ad creative output" },
        { value: "28%", label: "CPM reduction" },
        { value: "3", label: "Service lines" },
      ],
      campaignDetails: [
        { label: "Services provided", value: "Content production, performance marketing, and creative strategy" },
        { label: "The challenge", value: "Produce high-volume, high-quality creative while preserving brand consistency and reducing production costs" },
        { label: "Our approach", value: "Built AI-assisted production workflows and paired them with disciplined A/B testing for rapid creative iteration" },
        { label: "Result", value: "Lowered production overhead, increased output, and improved paid media efficiency at the same time" },
      ],
      insights: [
        "Creative scale improved because the production system got smarter, not just faster.",
        "AI-assisted workflows reduced operational drag without sacrificing brand control.",
        "The stronger testing cadence translated directly into better media economics.",
      ],
      topContentHref: null,
      topContentLabel: null,
    },
    {
      id: "shiseido-india",
      name: "Shiseido India",
      service: "Luxury Beauty Marketing",
      headline: "Luxury positioning and heritage storytelling helped Shiseido grow premium awareness in India.",
      summary:
        "Shiseido India needed to establish premium brand positioning while educating consumers about Japanese beauty philosophy and skincare benefits. We combined luxury brand strategy, premium content production, and targeted campaigns to drive 65% growth in brand awareness, reach 2.1M premium consumers, and sustain a 6.2% engagement rate.",
      metrics: [
        { value: "+65%", label: "Brand awareness" },
        { value: "2.1M", label: "Premium audience reach" },
        { value: "6.2%", label: "Engagement rate" },
        { value: "3", label: "Service lines" },
      ],
      campaignDetails: [
        { label: "Services provided", value: "Brand strategy, luxury marketing, and content production" },
        { label: "The challenge", value: "Build luxury relevance in India while communicating Japanese beauty philosophy and premium skincare value" },
        { label: "Our approach", value: "Developed an aspirational brand narrative using Japanese heritage storytelling, localized premium content, and high-value influencer partnerships" },
        { label: "Result", value: "Positioned Shiseido as a leading luxury skincare brand among premium beauty audiences in India" },
      ],
      insights: [
        "Luxury positioning worked because the storytelling stayed culturally rich but locally relevant.",
        "Premium audience targeting was paired with content built for aspiration, not mass reach alone.",
        "The campaign helped the brand move from awareness building into luxury authority.",
      ],
      topContentHref: null,
      topContentLabel: null,
    },
    {
      id: "the-ordinary",
      name: "The Ordinary",
      service: "Science-led Skincare Marketing",
      headline: "Ingredient education and community building turned skincare science into stronger growth.",
      summary:
        "For The Ordinary, the challenge was making science-backed skincare feel clear and approachable to mainstream consumers. We built educational content, community-led engagement, and performance campaigns that drove 180% community growth, 12% content engagement, and a 4.8% conversion rate.",
      metrics: [
        { value: "180%", label: "Community growth" },
        { value: "12%", label: "Content engagement" },
        { value: "4.8%", label: "Conversion rate" },
        { value: "3", label: "Service lines" },
      ],
      campaignDetails: [
        { label: "Services provided", value: "Content marketing, community building, and performance marketing" },
        { label: "The challenge", value: "Educate consumers about active ingredients while simplifying complex skincare science for wider appeal" },
        { label: "Our approach", value: "Created ingredient education series, built a routine-focused skincare community, and targeted enthusiasts with performance campaigns" },
        { label: "Result", value: "Built a stronger skincare community and translated education into both awareness and sales growth" },
      ],
      insights: [
        "Ingredient education became a growth lever instead of just an awareness tactic.",
        "Community building made science-led skincare feel more usable and less intimidating.",
        "The campaign linked educational credibility with measurable conversion performance.",
      ],
      topContentHref: null,
      topContentLabel: null,
    },
    {
      id: "starstruck-by-sunny-leone",
      name: "StarStruck by Sunny Leone",
      service: "Social + Performance Marketing",
      headline: "End-to-end social and performance work turned a celebrity beauty brand into a fast-growth digital story.",
      summary:
        "For StarStruck by Sunny Leone, we handled end-to-end social media marketing, performance marketing, and influencer strategy for the celebrity beauty brand. The campaign drove a 292% follower increase, 3.8x ROAS, and an 8.5% engagement rate while helping the brand scale e-commerce sales without losing authenticity.",
      metrics: [
        { value: "292%", label: "Follower increase" },
        { value: "3.8x", label: "ROAS" },
        { value: "8.5%", label: "Engagement rate" },
        { value: "3", label: "Service lines" },
      ],
      campaignDetails: [
        { label: "Services provided", value: "Social media marketing, performance marketing, and influencer strategy" },
        { label: "The challenge", value: "Build stronger digital presence and drive consistent e-commerce sales while keeping the brand authentic and leveraging celebrity influence effectively" },
        { label: "Our approach", value: "Combined influencer marketing, performance ads, engaging social content, user-generated content campaigns, and data-led Meta plus Google optimization" },
        { label: "Result", value: "Helped turn StarStruck into one of India's fastest-growing celebrity beauty brands" },
      ],
      insights: [
        "Follower growth and ROAS moved together instead of trading one for the other.",
        "The campaign balanced celebrity-led awareness with performance marketing discipline.",
        "UGC-style storytelling helped the brand stay authentic while scaling sales.",
      ],
      topContentHref: null,
      topContentLabel: null,
    },
    {
      id: "sanfe",
      name: "Sanfe",
      service: "Influencer Marketing",
      headline: "A 136-creator push delivered 10.95M views and scaled community response fast.",
      summary:
        "The Sanfe campaign activated 136 influencers and delivered 10,951,539 total views, 81,509 total likes, and 146,134 total comments. The size of the creator roster and the response volume made it one of the strongest large-scale visibility and engagement campaigns in the current library.",
      metrics: [
        { value: "136", label: "Influencers" },
        { value: "10,951,539", label: "Total views" },
        { value: "81,509", label: "Total likes" },
        { value: "146,134", label: "Total comments" },
      ],
      campaignDetails: [
        { label: "Creator footprint", value: "136 influencers" },
        { label: "Reach scale", value: "10,951,539 total views" },
        { label: "Engagement snapshot", value: "81,509 likes and 146,134 comments" },
        { label: "Proof asset", value: "Top-performing Instagram reel linked below" },
      ],
      insights: [
        "The campaign combined a very large creator footprint with strong total reach.",
        "Comment volume suggests the content sparked active audience response rather than passive reach alone.",
        "The top-performing reel gives the campaign a clear showcase asset for Explore.",
      ],
      topContentHref: "https://www.instagram.com/reels/DU-fLiIkUVM/",
      topContentLabel: "Top Performing Video",
    },
    {
      id: "pee-safe",
      name: "Pee Safe",
      service: "Influencer Marketing",
      headline: "A 65-video barter campaign built hygiene visibility with repeat creator touchpoints.",
      summary:
        "Pee Safe, an Indian hygiene brand spanning toilet hygiene, menstrual care, intimate care, grooming, and sexual wellness, used a 65-video barter campaign to grow visibility and educate audiences around personal hygiene. The campaign delivered average views of 3,052, average likes of 115, and total views of 198,373.5 while reinforcing the brand's focus on safety, innovation, and well-being.",
      metrics: [
        { value: "3,052", label: "Average views" },
        { value: "115", label: "Average likes" },
        { value: "65", label: "Videos" },
        { value: "198,373.5", label: "Total views" },
      ],
      campaignDetails: [
        { label: "Brand context", value: "Indian hygiene brand across toilet hygiene, menstrual care, intimate care, grooming, and sexual wellness" },
        { label: "Activation model", value: "65-video barter campaign with digital creators" },
        { label: "Campaign objective", value: "Increase visibility and educate audiences about personal hygiene" },
        { label: "Proof asset", value: "Top-performing Instagram reel linked below" },
      ],
      insights: [
        "The barter model helped the brand build repeat content without a heavy media structure.",
        "Creator-led storytelling supported both education and visibility for hygiene products.",
        "The campaign fits well as a taboo-breaking awareness play built around authentic product usage.",
      ],
      topContentHref: "https://www.instagram.com/reels/DCEqLDtSqzW/",
      topContentLabel: "Top Performing Video",
    },
    {
      id: "smaaash",
      name: "Smaaash",
      service: "Influencer Marketing",
      headline: "A high-volume creator push drove 5.67M views and more than 312K engagements.",
      summary:
        "The Smaaash campaign delivered 5,671,387 total views and 312,225 total engagements on a total spend of 205,500. The scale of reach plus the engagement volume made it one of the strongest creator-led proof points in the current case-study library.",
      metrics: [
        { value: "5,671,387", label: "Total views" },
        { value: "312,225", label: "Total engagement" },
        { value: "205,500", label: "Total spend" },
        { value: "55.6", label: "Views per spend unit" },
      ],
      campaignDetails: [
        { label: "Campaign scale", value: "5,671,387 total views" },
        { label: "Engagement volume", value: "312,225 total engagements" },
        { label: "Media outlay", value: "205,500 total spend" },
        { label: "Proof asset", value: "Top-performing Instagram reel linked below" },
      ],
      insights: [
        "The campaign paired large-scale reach with strong engagement depth.",
        "Spend efficiency stayed compelling relative to the total view volume delivered.",
        "The strongest reel gives the campaign a clean top-performing proof asset.",
      ],
      topContentHref: "https://www.instagram.com/reels/DI_As8PTqAN/",
      topContentLabel: "Top Performing Video",
    },
    {
      id: "forum-malls",
      name: "Forum Malls",
      service: "Influencer Marketing",
      headline: "Four videos held a 104K average view line and cleared 417K total views.",
      summary:
        "The Forum Malls campaign ran across four videos and averaged 104,250 views with 1,257 average likes, resulting in 417,000 total views. The campaign gives a compact but clear retail-footfall style creator case with a strong top-performing reel.",
      metrics: [
        { value: "104,250", label: "Average views" },
        { value: "1,257", label: "Average likes" },
        { value: "4", label: "Videos" },
        { value: "417,000", label: "Total views" },
      ],
      campaignDetails: [
        { label: "Content volume", value: "4 campaign videos" },
        { label: "Average performance", value: "104,250 average views and 1,257 average likes" },
        { label: "Total reach", value: "417,000 total views" },
        { label: "Proof asset", value: "Top-performing Instagram reel linked below" },
      ],
      insights: [
        "A small video set still held a strong average-view baseline.",
        "The campaign works as a clean retail and destination-marketing creator example.",
        "The strongest reel anchors the content proof for the campaign.",
      ],
      topContentHref: "https://www.instagram.com/reels/DCtxqjNNH_Q/",
      topContentLabel: "Top Performing Video",
    },
    {
      id: "yes-madam",
      name: "Yes Madam",
      service: "Influencer Marketing",
      headline: "A 12-video creator set delivered 667K total views with steady per-video performance.",
      summary:
        "The Yes Madam campaign ran across 12 videos and delivered 667,395 total views, with average views of 54,325 and average likes of 1,015. The content set built repeat visibility through a larger video volume while keeping performance consistent enough to support the campaign story.",
      metrics: [
        { value: "54,325", label: "Average views" },
        { value: "1,015", label: "Average likes" },
        { value: "12", label: "Videos" },
        { value: "667,395", label: "Total views" },
      ],
      campaignDetails: [
        { label: "Content volume", value: "12 campaign videos" },
        { label: "Average performance", value: "54,325 average views and 1,015 average likes" },
        { label: "Total reach", value: "667,395 total views" },
        { label: "Proof asset", value: "Top-performing content link can be added when available" },
      ],
      insights: [
        "The 12-video content set created repeated visibility instead of a one-off spike.",
        "Average view and like rates stayed stable enough to support the wider campaign rollout.",
        "This works well as a higher-volume beauty and consumer-services creator case.",
      ],
      topContentHref: null,
      topContentLabel: null,
    },
    {
      id: "hilary-rohda",
      name: "Hilary Rohda",
      service: "Influencer Marketing",
      headline: "Six creators pushed the campaign past 1.74M views and kept engagement moving.",
      summary:
        "We ran an influencer marketing campaign for Hilary Rohda with a six-creator roster. The campaign delivered 1,742,380 total views, 15,069 likes, and 1,322 comments, with the strongest reel becoming the clearest proof point.",
      metrics: [
        { value: "6", label: "Influencers" },
        { value: "1,742,380", label: "Total views" },
        { value: "15,069", label: "Total likes" },
        { value: "1,322", label: "Total comments" },
      ],
      campaignDetails: [
        { label: "Creator footprint", value: "6 influencers" },
        { label: "View volume", value: "1,742,380 total views" },
        { label: "Engagement snapshot", value: "15,069 likes and 1,322 comments" },
        { label: "Proof asset", value: "Top-performing Instagram reel linked below" },
      ],
      insights: [
        "A lean creator roster still cleared more than 1.74M total views.",
        "Reach and engagement together make the campaign a strong proof point.",
        "The lead reel works as the clearest sample asset for the campaign.",
      ],
      topContentHref: "https://www.instagram.com/reels/DC_IvFdyja-/",
      topContentLabel: "Top Performing Video",
    },
    {
      id: "lenskart",
      name: "Lenskart",
      service: "Influencer Marketing",
      headline: "Fourteen creators drove 1.25M views with standout share and engagement signals.",
      summary:
        "We ran a 14-influencer campaign for Lenskart that delivered 1,255,847 views, 23,617 likes, 173 comments, 2,542 shares, and 26,332 total engagements. The strongest reel now anchors the proof point for the campaign.",
      metrics: [
        { value: "14", label: "Influencers" },
        { value: "1,255,847", label: "Views" },
        { value: "26,332", label: "Total engagement" },
        { value: "2,542", label: "Shares" },
      ],
      campaignDetails: [
        { label: "Creator footprint", value: "14 influencers" },
        { label: "Engagement mix", value: "23,617 likes, 173 comments, and 2,542 shares" },
        { label: "Total engagement", value: "26,332" },
        { label: "Proof asset", value: "Top-performing Instagram reel linked below" },
      ],
      insights: [
        "Share volume gave the campaign a clear virality signal.",
        "The 14-creator roster still kept engagement above 26K.",
        "The lead reel gives the campaign a clean proof asset for explore.",
      ],
      topContentHref: "https://www.instagram.com/reels/DPjUvSSki9U/",
      topContentLabel: "Top Performing Video",
    },
    {
      id: "new-me",
      name: "New Me",
      service: "Influencer Marketing",
      headline: "Sixty hyperlocal creators carried the activation to 586K views across two cities.",
      summary:
        "The New Me campaign activated 60 creators across Surat and Siliguri, with 30 creators in each city. It delivered 586,688 total views at a CPV of 0.16, showed strong Gen-Z resonance, steady view delivery across all profiles, strong virality signals, better in-store B1G1 visibility, and excellent ROI from a low-cost barter activation.",
      metrics: [
        { value: "60", label: "Creators" },
        { value: "586,688", label: "Total views" },
        { value: "0.16", label: "CPV" },
        { value: "30 + 30", label: "City split" },
      ],
      campaignDetails: [
        { label: "City distribution", value: "Surat: 30 creators | Siliguri: 30 creators" },
        { label: "Creator footprint", value: "60 hyperlocal creators" },
        { label: "Activation model", value: "Low-cost barter activation" },
        { label: "Retail signal", value: "Hyperlocal creators increased in-store B1G1 visibility" },
      ],
      insights: [
        "Strong Gen-Z resonance showed up across both cities.",
        "High share volume pointed to strong virality potential.",
        "View delivery stayed steady across all 60 profiles.",
        "The low-cost barter structure still delivered excellent ROI.",
      ],
      topContentHref: "https://www.instagram.com/reels/DRevGs0k5ci/",
      topContentLabel: "Top Performing Video",
    },
  ],
};

export const HOME_CASE_STUDIES = {
  eyebrow: "Recent Case Studies",
  title: "Real creator campaigns with clear reach, engagement, and market signal.",
  copy:
    "Scan our influencer marketing highlights here, then open Explore for creator mix, campaign strategy, performance metrics, and proof assets.",
  featuredId: "smaaash",
  secondaryId: "forum-malls",
  mobileIds: ["smaaash", "forum-malls", "pee-safe", "sanfe", "hilary-rohda", "lenskart", "new-me"],
};

export const CASE_STUDY_FACETS: Record<string, { category: string; industry: string }> = {
  health2mumma: { category: "Product Build", industry: "Healthcare" },
  easecare: { category: "Product Build", industry: "Healthcare" },
  complyany: { category: "Product Build", industry: "SaaS" },
  banksathi: { category: "Product Build", industry: "FinTech" },
  "steve-madden": { category: "Commerce Build", industry: "Fashion" },
  "shopify-websites": { category: "Commerce Build", industry: "E-Commerce" },
  "healthspace-afiya": { category: "Product Build", industry: "Healthcare" },
  "bioderma-india": { category: "Growth Marketing", industry: "Beauty" },
  "sugar-cosmetics": { category: "Growth Marketing", industry: "Beauty" },
  "shiseido-india": { category: "Growth Marketing", industry: "Luxury Beauty" },
  "the-ordinary": { category: "Growth Marketing", industry: "Skincare" },
  "starstruck-by-sunny-leone": { category: "Growth Marketing", industry: "Beauty" },
  sanfe: { category: "Creator Campaign", industry: "Wellness" },
  "pee-safe": { category: "Creator Campaign", industry: "Wellness" },
  smaaash: { category: "Creator Campaign", industry: "Entertainment" },
  "forum-malls": { category: "Creator Campaign", industry: "Retail" },
  "yes-madam": { category: "Creator Campaign", industry: "Beauty" },
  "hilary-rohda": { category: "Creator Campaign", industry: "Beauty" },
  lenskart: { category: "Creator Campaign", industry: "Fashion" },
  "new-me": { category: "Creator Campaign", industry: "Fashion" },
};

export const CONTACT = {
  eyebrow: "Contact Us",
  title: "Need a website, campaign, or AI workflow that drives growth?",
  copy:
    "Tell us what you need: web development, performance marketing, influencer campaigns, content systems, or AI automation. We will turn the brief into a sharper growth plan.",
  highlights: [
    { label: "Response window", value: "Within 24 hours" },
    { label: "Best for", value: "Growth-focused brands" },
  ],
  channels: [
    { type: "email", value: SITE_INFO.email, href: `mailto:${SITE_INFO.email}` },
    { type: "phone", value: SITE_INFO.phone, href: `tel:${SITE_INFO.phone.replace(/\s/g, "")}` },
    {
      type: "address",
      value: `${SITE_INFO.address} - ${SITE_INFO.company}`,
      href: "https://maps.google.com/?q=Mumbai, India",
    },
  ],
  formFields: [
    { name: "name", label: "Name", type: "text", placeholder: "Your name", required: true },
    { name: "email", label: "Email", type: "email", placeholder: "name@brand.com", required: true },
    { name: "company", label: "Company", type: "text", placeholder: "Brand or company", required: false },
    {
      name: "budget",
      label: "Budget",
      type: "select",
      placeholder: "Select budget range",
      required: false,
      options: [
        { value: "starter", label: "Starter launch" },
        { value: "growth", label: "Growth sprint" },
        { value: "scale", label: "Scale partner" },
      ],
    },
    {
      name: "scope",
      label: "Project scope",
      type: "textarea",
      placeholder: "Tell us what you need, what is broken, and where you want to go next.",
      rows: 5,
      required: true,
    },
  ],
  services: ["Website Design", "Performance Marketing", "Content Systems", "AI Automation", "Creative Direction"],
  submitButton: "Start the conversation",
  note: "Form actions, CRM routing, and qualification logic can be connected once your final stack is locked.",
};

export const FOOTER = {
  eyebrow: "Ready To Launch",
  title: "ZYFLUS builds websites, campaigns, and AI systems that earn attention and drive action.",
  copy:
    "From SEO-ready websites to paid media, creator campaigns, and automation, we build growth systems designed to perform after launch.",
  cta: { label: SITE_INFO.email, href: `mailto:${SITE_INFO.email}` },
  navigate: [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  services: ["Web Experiences", "Paid Media", "Influencer Strategy", "Content Engines", "Automation Systems"],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "X", href: "https://x.com" },
  ],
  legal: [
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
  bottomLeft: `Copyright ${SITE_INFO.copyrightYear} ZYFLUS. ${SITE_INFO.copyrightTagline}`,
  bottomRight: "Web development, performance marketing, influencer strategy, content systems, and AI automation.",
};

// Responsive breakpoints (in pixels)
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
  ultraWide: 1920,
};

// Typography scale
export const TYPOGRAPHY = {
  hero: {
    mobile: { size: "3.6rem", lineHeight: 1 },
    tablet: { size: "5rem", lineHeight: 1 },
    desktop: { size: "8rem", lineHeight: 1 },
  },
  tagline: {
    mobile: { size: "0.9rem", lineHeight: 1.4 },
    tablet: { size: "1.2rem", lineHeight: 1.4 },
    desktop: { size: "1.55rem", lineHeight: 1.4 },
  },
  sectionTitle: {
    mobile: { size: "1.6rem", lineHeight: 1.2 },
    tablet: { size: "2.4rem", lineHeight: 1.1 },
    desktop: { size: "4.6rem", lineHeight: 0.92 },
  },
  body: {
    mobile: { size: "0.84rem", lineHeight: 1.6 },
    tablet: { size: "0.95rem", lineHeight: 1.7 },
    desktop: { size: "1.14rem", lineHeight: 1.75 },
  },
};

// Spacing scale (based on 8px grid)
export const SPACING = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
};

export type SiteConfig = typeof SITE_INFO;
export type Navigation = typeof NAVIGATION;
export type Service = (typeof SERVICES.planets)[0];
export type Client = typeof CLIENTS;
export type CaseStudy = CaseStudyData;
export type Contact = typeof CONTACT;
export type Footer = typeof FOOTER;

export function getCaseStudyFacet(slug: string) {
  return CASE_STUDY_FACETS[slug] ?? { category: "Growth Marketing", industry: "General" };
}

export function getCaseStudyBySlug(slug: string) {
  return CASE_STUDIES.items.find((study) => study.id === slug);
}
