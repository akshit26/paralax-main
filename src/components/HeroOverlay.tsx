"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { EXPERIENCE_STAGE_EVENT, stageFromProgress, type SceneStage } from "./experienceConfig";

const CLIENT_NAMES = ["NovaGrid", "LumaForge", "OrbitIQ", "BluePeak", "SignalNest", "Northstar Labs"];
const CLIENT_STATS = [
  { value: "10+", label: "Industries" },
  { value: "100+", label: "Clients" },
  { value: "250+", label: "Campaigns" },
];
const INDUSTRY_TAGS = ["D2C", "SaaS", "Healthcare", "Education", "Hospitality", "Creators"];

const CASE_STUDIES = [
  {
    name: "NovaGrid",
    service: "Launch System",
    summary: "We rebuilt the funnel, clarified the offer, and gave paid traffic a sharper landing experience.",
    metricA: "+212%",
    metricALabel: "Qualified leads",
    metricB: "-38%",
    metricBLabel: "Cost per acquisition",
  },
  {
    name: "OrbitIQ",
    service: "Performance Media",
    summary: "Creative testing, tighter audience loops, and cleaner attribution pushed growth without burning efficiency.",
    metricA: "4.6x",
    metricALabel: "Average ROAS",
    metricB: "+61%",
    metricBLabel: "Repeat revenue",
  },
  {
    name: "SignalNest",
    service: "Content + Automation",
    summary: "We streamlined content ops and layered AI workflows so the team shipped faster with less manual drag.",
    metricA: "3x",
    metricALabel: "Output velocity",
    metricB: "+47%",
    metricBLabel: "Pipeline lift",
  },
];

const CONTACT_SERVICES = ["Website Design", "Performance Marketing", "Content Systems", "AI Automation", "Creative Direction"];

const FOOTER_NAV = ["Home", "Explore", "Services", "Case Studies", "Contact"];
const FOOTER_SERVICES = ["Web Experiences", "Paid Media", "Influencer Strategy", "Content Engines", "Automation Systems"];
const FOOTER_SOCIALS = ["Instagram", "LinkedIn", "YouTube", "X"];

function StageSection({
  stageKey,
  className,
  reduceMotion,
  children,
}: {
  stageKey: string;
  className: string;
  reduceMotion: boolean;
  children: ReactNode;
}) {
  return (
    <motion.section
      key={stageKey}
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.12, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

function ClientsStage({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <StageSection stageKey="clients-stage" className="clients-stage" reduceMotion={reduceMotion}>
      <motion.div
        className="clients-stage__shell"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.28, delay: 0.04 }}
      >
        <div className="clients-stage__astronaut-slot" aria-hidden="true" />

        <motion.div
          className="clients-stage__intro"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.28, delay: 0.08 }}
        >
          <p className="clients-stage__eyebrow">Our Stellar Clients</p>
          <h2 className="clients-stage__title">Bold brands trust us to turn attention into real growth.</h2>
          <p className="clients-stage__copy">
            Premium websites, sharper campaigns, smarter content systems, and AI-powered automation built to help brands scale with clarity.
          </p>
        </motion.div>

        <motion.div
          className="clients-stage__panel"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.3, delay: 0.12 }}
        >
          <div className="clients-stage__stats">
            {CLIENT_STATS.map((stat) => (
              <div key={stat.label} className="clients-stage__stat">
                <span className="clients-stage__stat-value">{stat.value}</span>
                <span className="clients-stage__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="clients-stage__chips">
            {INDUSTRY_TAGS.map((tag) => (
              <span key={tag} className="clients-stage__chip">
                {tag}
              </span>
            ))}
          </div>

          <div className="clients-stage__names">
            {CLIENT_NAMES.map((client) => (
              <span key={client} className="clients-stage__name">
                {client}
              </span>
            ))}
          </div>

          <p className="clients-stage__note">Client logos can replace these placeholders in the next pass.</p>
        </motion.div>
      </motion.div>
    </StageSection>
  );
}

function CaseStudiesStage({ reduceMotion }: { reduceMotion: boolean }) {
  const [featuredStudy, secondaryStudyA, secondaryStudyB] = CASE_STUDIES;

  return (
    <StageSection stageKey="case-studies-stage" className="case-studies-stage" reduceMotion={reduceMotion}>
      <motion.div
        className="case-studies-stage__shell"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.28, delay: 0.04 }}
      >
        <div className="case-studies-stage__intro">
          <p className="case-studies-stage__eyebrow">Selected Case Studies</p>
          <h2 className="case-studies-stage__title">Work that made traffic sharper, conversion stronger, and growth easier to scale.</h2>
          <p className="case-studies-stage__copy">
            Each engagement starts with clearer positioning and ends with measurable lift. These are strong placeholder stories for now, ready for your
            real brand wins in the next pass.
          </p>

          <div className="case-studies-stage__summary">
            <span className="case-studies-stage__summary-pill">Strategy-led builds</span>
            <span className="case-studies-stage__summary-pill">Creative that converts</span>
            <span className="case-studies-stage__summary-pill">Reporting that stays readable</span>
          </div>
        </div>

        <div className="case-studies-stage__grid">
          <article className="study-card study-card--featured">
            <div className="study-card__topline">
              <span className="study-card__service">{featuredStudy.service}</span>
              <span className="study-card__brand">{featuredStudy.name}</span>
            </div>
            <h3 className="study-card__title">From scattered traffic to a funnel people actually moved through.</h3>
            <p className="study-card__copy">{featuredStudy.summary}</p>
            <div className="study-card__metrics">
              <div className="study-card__metric">
                <span className="study-card__metric-value">{featuredStudy.metricA}</span>
                <span className="study-card__metric-label">{featuredStudy.metricALabel}</span>
              </div>
              <div className="study-card__metric">
                <span className="study-card__metric-value">{featuredStudy.metricB}</span>
                <span className="study-card__metric-label">{featuredStudy.metricBLabel}</span>
              </div>
            </div>
          </article>

          {[secondaryStudyA, secondaryStudyB].map((study) => (
            <article key={study.name} className="study-card study-card--compact">
              <div className="study-card__topline">
                <span className="study-card__service">{study.service}</span>
                <span className="study-card__brand">{study.name}</span>
              </div>
              <p className="study-card__copy">{study.summary}</p>
              <div className="study-card__compact-metrics">
                <div>
                  <strong>{study.metricA}</strong>
                  <span>{study.metricALabel}</span>
                </div>
                <div>
                  <strong>{study.metricB}</strong>
                  <span>{study.metricBLabel}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </motion.div>
    </StageSection>
  );
}

function ContactStage({ reduceMotion }: { reduceMotion: boolean }) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <StageSection stageKey="contact-stage" className="contact-stage" reduceMotion={reduceMotion}>
      <motion.div
        className="contact-stage__shell"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.28, delay: 0.04 }}
      >
        <div className="contact-stage__intro">
          <p className="contact-stage__eyebrow">Contact Us</p>
          <h2 className="contact-stage__title">Bring the next launch to us and we will shape the orbit around it.</h2>
          <p className="contact-stage__copy">
            Share the brief, the blockers, or the ambition. We can turn rough direction into a sharper roadmap for design, acquisition, content, and
            automation.
          </p>

          <div className="contact-stage__highlights">
            <div className="contact-stage__highlight">
              <span className="contact-stage__highlight-label">Response window</span>
              <strong>Within 24 hours</strong>
            </div>
            <div className="contact-stage__highlight">
              <span className="contact-stage__highlight-label">Best for</span>
              <strong>Growth-focused brands</strong>
            </div>
          </div>

          <div className="contact-stage__channels">
            <a className="contact-stage__channel" href="mailto:hello@zyflus.com">
              hello@zyflus.com
            </a>
            <a className="contact-stage__channel" href="tel:+910000000000">
              +91 00000 00000
            </a>
          </div>
        </div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.3, delay: 0.1 }}
        >
          <div className="contact-form__grid">
            <label className="contact-form__field">
              <span>Name</span>
              <input type="text" placeholder="Your name" />
            </label>

            <label className="contact-form__field">
              <span>Email</span>
              <input type="email" placeholder="name@brand.com" />
            </label>

            <label className="contact-form__field">
              <span>Company</span>
              <input type="text" placeholder="Brand or company" />
            </label>

            <label className="contact-form__field">
              <span>Budget</span>
              <select defaultValue="">
                <option value="" disabled>
                  Select budget range
                </option>
                <option value="starter">Starter launch</option>
                <option value="growth">Growth sprint</option>
                <option value="scale">Scale partner</option>
              </select>
            </label>

            <label className="contact-form__field contact-form__field--full">
              <span>Project scope</span>
              <textarea rows={5} placeholder="Tell us what you need, what is broken, and where you want to go next." />
            </label>
          </div>

          <div className="contact-form__services">
            {CONTACT_SERVICES.map((service) => (
              <span key={service} className="contact-form__service-pill">
                {service}
              </span>
            ))}
          </div>

          <div className="contact-form__footer">
            <p className="contact-form__note">A cleaner intake flow and CRM integration can be wired in once your final stack is locked.</p>
            <button type="submit" className="contact-form__button">
              Start the conversation
            </button>
          </div>
        </motion.form>
      </motion.div>
    </StageSection>
  );
}

function FooterStage({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <StageSection stageKey="footer-stage" className="footer-stage" reduceMotion={reduceMotion}>
      <motion.div
        className="footer-stage__shell"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.28, delay: 0.04 }}
      >
        <div className="footer-stage__brand">
          <p className="footer-stage__eyebrow">Ready To Launch</p>
          <h2 className="footer-stage__title">ZYFLUS builds attention systems that look sharp and pull their weight.</h2>
          <p className="footer-stage__copy">
            Websites, campaigns, content, and automation designed to feel premium, stay clear, and keep compounding after the first launch.
          </p>
          <a className="footer-stage__cta" href="mailto:hello@zyflus.com">
            hello@zyflus.com
          </a>
        </div>

        <div className="footer-stage__columns">
          <div className="footer-stage__column">
            <h3>Navigate</h3>
            {FOOTER_NAV.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}>
                {item}
              </a>
            ))}
          </div>

          <div className="footer-stage__column">
            <h3>Services</h3>
            {FOOTER_SERVICES.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className="footer-stage__column">
            <h3>Social</h3>
            {FOOTER_SOCIALS.map((item) => (
              <a key={item} href="#main-nav">
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-stage__bottom">
          <span>c 2026 ZYFLUS. Built for bold launches.</span>
          <span>Case studies, logos, and live integrations can drop in next.</span>
        </div>
      </motion.div>
    </StageSection>
  );
}

export default function HeroOverlay() {
  const [scrolled, setScrolled] = useState(false);
  const [activeStage, setActiveStage] = useState<SceneStage>(0);
  const reduceMotion = Boolean(useReducedMotion());

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      setScrolled(window.scrollY > 100);
      setActiveStage(stageFromProgress(progress));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawStage = params.get("debugStage");
    if (!rawStage) return;

    const parsedStage = Number.parseInt(rawStage, 10);
    if (!Number.isFinite(parsedStage) || parsedStage < 0 || parsedStage > 5) return;

    const scrollToStage = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const normalized = parsedStage / 5;
      window.scrollTo({ top: maxScroll * normalized, behavior: "auto" });
    };

    const timer = window.setTimeout(scrollToStage, 120);
    window.addEventListener("load", scrollToStage, { once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", scrollToStage);
    };
  }, []);

  useEffect(() => {
    const handleStageChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ stage: SceneStage }>;
      if (typeof customEvent.detail?.stage === "number") {
        setActiveStage(customEvent.detail.stage);
      }
    };

    window.addEventListener(EXPERIENCE_STAGE_EVENT, handleStageChange as EventListener);

    return () => window.removeEventListener(EXPERIENCE_STAGE_EVENT, handleStageChange as EventListener);
  }, []);

  return (
    <>
      <nav className="hero-nav" id="main-nav">
        <div className="nav-logo">ZYFLUS</div>
        <div className="nav-links">
          <a href="#home" className="nav-link">
            HOME
          </a>
          <a href="#explore" className="nav-link">
            EXPLORE
          </a>
          <a href="#services" className="nav-link">
            SERVICES
          </a>
          <a href="#contact" className="nav-link">
            CONTACT
          </a>
          <a href="#login" className="nav-link">
            LOGIN
          </a>
        </div>
      </nav>

      <div className={`scroll-indicator ${scrolled ? "scroll-indicator--hidden" : ""}`} id="scroll-indicator">
        <div className="scroll-chevron">&#8964;</div>
        <span className="scroll-label">SCROLL TO JOURNEY</span>
      </div>

      <AnimatePresence initial={false}>
        {activeStage === 2 ? <ClientsStage reduceMotion={reduceMotion} /> : null}
        {activeStage === 3 ? <CaseStudiesStage reduceMotion={reduceMotion} /> : null}
        {activeStage === 4 ? <ContactStage reduceMotion={reduceMotion} /> : null}
        {activeStage === 5 ? <FooterStage reduceMotion={reduceMotion} /> : null}
      </AnimatePresence>
    </>
  );
}
