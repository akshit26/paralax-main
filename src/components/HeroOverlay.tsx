"use client";

import Link from "next/link";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import {
  EXPERIENCE_STAGE_COUNT,
  EXPERIENCE_STAGE_EVENT,
  progressFromStage,
  stageFromProgress,
  type SceneStage,
  type ViewportMode,
} from "./experienceConfig";
import { CASE_STUDIES, CLIENTS, CONTACT, FOOTER, HERO, HOME_CASE_STUDIES, SERVICES, getCaseStudyBySlug } from "@/data/siteConfig";

type ContactField = (typeof CONTACT.formFields)[number];
type CaseStudy = (typeof CASE_STUDIES.items)[number];

function scrollToExperienceStage(stage: SceneStage, behavior: ScrollBehavior = "smooth") {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return;

  window.scrollTo({
    top: maxScroll * progressFromStage(stage),
    behavior,
  });
}

function ContactFieldControl({
  field,
  compact,
}: {
  field: ContactField;
  compact: boolean;
}) {
  if (field.type === "select") {
    return (
      <label className="contact-form__field">
        <span>{field.label}</span>
        <select defaultValue="" required={Boolean(field.required)} name={field.name}>
          <option value="" disabled>
            {field.placeholder}
          </option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <label className="contact-form__field contact-form__field--full">
        <span>{field.label}</span>
        <textarea
          name={field.name}
          rows={compact ? Math.min(field.rows ?? 5, 4) : field.rows ?? 5}
          placeholder={field.placeholder}
          required={Boolean(field.required)}
        />
      </label>
    );
  }

  return (
    <label className="contact-form__field">
      <span>{field.label}</span>
      <input name={field.name} type={field.type} placeholder={field.placeholder} required={Boolean(field.required)} />
    </label>
  );
}

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

function CaseStudyExploreLink({
  study,
  label = "Open in Explore",
}: {
  study: CaseStudy;
  label?: string;
}) {
  return (
    <Link
      className="study-card__action"
      href={`/explore/${study.id}`}
    >
      {label}
    </Link>
  );
}

function getCuratedHomeStudies() {
  const curatedStudies = HOME_CASE_STUDIES.mobileIds
    .map((id) => getCaseStudyBySlug(id))
    .filter((study): study is CaseStudy => Boolean(study));

  if (curatedStudies.length > 0) {
    return curatedStudies;
  }

  return CASE_STUDIES.items;
}

function ClientsStage({ reduceMotion }: { reduceMotion: boolean }) {
  const clientNames = CLIENTS.logos.map((client) => client.name);

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
          <p className="clients-stage__eyebrow">{CLIENTS.eyebrow}</p>
          <h2 className="clients-stage__title">{CLIENTS.title}</h2>
          <p className="clients-stage__copy">{CLIENTS.copy}</p>
        </motion.div>

        <motion.div
          className="clients-stage__panel"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.3, delay: 0.12 }}
        >
          <div className="clients-stage__stats">
            {CLIENTS.stats.map((stat) => (
              <div key={stat.label} className="clients-stage__stat">
                <span className="clients-stage__stat-value">{stat.value}</span>
                <span className="clients-stage__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="clients-stage__chips">
            {CLIENTS.industries.map((tag) => (
              <span key={tag} className="clients-stage__chip">
                {tag}
              </span>
            ))}
          </div>

          <div className="clients-stage__names">
            {clientNames.map((client) => (
              <span key={client} className="clients-stage__name">
                {client}
              </span>
            ))}
          </div>

          <p className="clients-stage__note">{CLIENTS.note}</p>
        </motion.div>
      </motion.div>
    </StageSection>
  );
}

function ServicesStage({
  reduceMotion,
  viewport,
}: {
  reduceMotion: boolean;
  viewport: ViewportMode;
}) {
  if (viewport !== "mobile") {
    return null;
  }

  return (
    <StageSection stageKey="services-stage" className="services-stage" reduceMotion={reduceMotion}>
      <motion.div
        className="services-stage__shell"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.28, delay: 0.04 }}
      >
        <div className="services-stage__intro">
          <p className="services-stage__eyebrow">Core Services</p>
          <h2 className="services-stage__title">Pick the orbit that matches where you want growth to go next.</h2>
          <p className="services-stage__copy">
            Smaller screens get the quick version here so the experience stays easy to scan.
          </p>
        </div>

        <div className="services-stage__grid">
          {SERVICES.planets.map((service, index) => (
            <article key={service.id} className="services-stage__card">
              <span className="services-stage__index">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="services-stage__card-title">{service.labelLines.join(" ")}</h3>
              <p className="services-stage__card-copy">{service.description}</p>
            </article>
          ))}
        </div>
      </motion.div>
    </StageSection>
  );
}

function CaseStudiesStage({
  reduceMotion,
  viewport,
}: {
  reduceMotion: boolean;
  viewport: ViewportMode;
}) {
  const [mobileStudyIndex, setMobileStudyIndex] = useState(0);
  const isMobile = viewport === "mobile";
  const homeStudies = getCuratedHomeStudies();
  const fallbackStudy = homeStudies[0] ?? CASE_STUDIES.items[0];

  if (!fallbackStudy) {
    return null;
  }

  const featuredStudy = getCaseStudyBySlug(HOME_CASE_STUDIES.featuredId) ?? fallbackStudy;
  const secondaryStudy = getCaseStudyBySlug(HOME_CASE_STUDIES.secondaryId) ?? homeStudies[1] ?? fallbackStudy;
  const mobileStudy = homeStudies[mobileStudyIndex] ?? featuredStudy;
  const featuredMetric = featuredStudy.metrics[0];
  const secondaryMetrics = secondaryStudy.metrics.slice(0, 2);

  const setVisibleMobileStudy = (nextIndex: number) => {
    const normalizedIndex = (nextIndex + homeStudies.length) % homeStudies.length;
    setMobileStudyIndex(normalizedIndex);
  };

  return (
    <StageSection stageKey="case-studies-stage" className="case-studies-stage" reduceMotion={reduceMotion}>
      <motion.div
        className="case-studies-stage__shell"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.28, delay: 0.04 }}
      >
        <div className="case-studies-stage__intro">
          <div className="case-studies-stage__intro-main">
            <p className="case-studies-stage__eyebrow">{HOME_CASE_STUDIES.eyebrow}</p>
            <h2 className="case-studies-stage__title">{HOME_CASE_STUDIES.title}</h2>
          </div>
          <p className="case-studies-stage__copy">{HOME_CASE_STUDIES.copy}</p>
        </div>

        {!isMobile ? (
          <div className="case-studies-stage__showcase">
            <article className="study-card study-card--featured">
              <div className="study-card__visual study-card__visual--featured" aria-hidden="true">
                <div className="study-card__signal-bars">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="study-card__signal-arc study-card__signal-arc--one" />
                <div className="study-card__signal-arc study-card__signal-arc--two" />
              </div>
              <div className="study-card__body study-card__body--featured">
                <h3 className="study-card__headline">{featuredStudy.headline}</h3>
              </div>
              <div className="study-card__footer study-card__footer--featured">
                <div className="study-card__spotlight-metric">
                  <span className="study-card__spotlight-value">{featuredMetric?.value ?? "-"}</span>
                  <span className="study-card__spotlight-label">{featuredMetric?.label ?? "Performance signal"}</span>
                </div>
                <CaseStudyExploreLink study={featuredStudy} label="Explore case studies" />
              </div>
            </article>

            <article className="study-card study-card--secondary">
              <div className="study-card__visual study-card__visual--secondary" aria-hidden="true">
                <div className="study-card__signal-bars">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="study-card__signal-arc study-card__signal-arc--three" />
              </div>

              <div className="study-card__body study-card__body--secondary">
                <div className="study-card__topline study-card__topline--secondary">
                  <span className="study-card__service">{secondaryStudy.service}</span>
                  <span className="study-card__brand">{secondaryStudy.name}</span>
                </div>
                <h3 className="study-card__headline study-card__headline--secondary">{secondaryStudy.headline}</h3>
              </div>

              <div className="study-card__metric-strip">
                {secondaryMetrics.map((metric) => (
                  <div key={metric.label} className="study-card__metric-tile">
                    <span className="study-card__metric-value">{metric.value}</span>
                    <span className="study-card__metric-label">{metric.label}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        ) : (
          <div className="case-studies-stage__mobile-shell">
            <div className="case-studies-stage__mobile-header">
              <div className="case-studies-stage__mobile-meta">
                <span className="case-studies-stage__mobile-brand">{mobileStudy.name}</span>
                <span className="case-studies-stage__mobile-count">
                  {String(mobileStudyIndex + 1).padStart(2, "0")} / {String(homeStudies.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div className="case-studies-stage__mobile-tabs">
              {homeStudies.map((study, index) => (
                <button
                  key={study.id}
                  type="button"
                  className={`case-studies-stage__mobile-tab ${index === mobileStudyIndex ? "case-studies-stage__mobile-tab--active" : ""}`}
                  onClick={() => setVisibleMobileStudy(index)}
                >
                  {study.name}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={mobileStudy.id}
                className="study-card study-card--mobile"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -14 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
              >
                <div className="study-card__visual study-card__visual--mobile" aria-hidden="true">
                  <div className="study-card__signal-bars">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="study-card__signal-arc study-card__signal-arc--three" />
                </div>
                <div className="study-card__topline study-card__topline--secondary">
                  <span className="study-card__service">{mobileStudy.service}</span>
                  <span className="study-card__brand">{mobileStudy.name}</span>
                </div>
                <h3 className="study-card__headline study-card__headline--mobile">{mobileStudy.headline}</h3>
                <div className="study-card__metric-strip">
                  {mobileStudy.metrics.slice(0, 2).map((metric) => (
                    <div key={metric.label} className="study-card__metric-tile">
                      <span className="study-card__metric-value">{metric.value}</span>
                      <span className="study-card__metric-label">{metric.label}</span>
                    </div>
                  ))}
                </div>
                <CaseStudyExploreLink study={mobileStudy} label="Explore case studies" />
              </motion.article>
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </StageSection>
  );
}

function ContactStage({
  reduceMotion,
  viewport,
}: {
  reduceMotion: boolean;
  viewport: ViewportMode;
}) {
  const compactForm = viewport === "mobile";
  const visibleChannels = compactForm ? CONTACT.channels.slice(0, 2) : CONTACT.channels;

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
          <p className="contact-stage__eyebrow">{CONTACT.eyebrow}</p>
          <h2 className="contact-stage__title">{CONTACT.title}</h2>
          <p className="contact-stage__copy">{CONTACT.copy}</p>

          <div className="contact-stage__highlights">
            {CONTACT.highlights.map((highlight) => (
              <div key={highlight.label} className="contact-stage__highlight">
                <span className="contact-stage__highlight-label">{highlight.label}</span>
                <strong>{highlight.value}</strong>
              </div>
            ))}
          </div>

          <div className="contact-stage__channels">
            {visibleChannels.map((channel) => (
              <a key={channel.type} className="contact-stage__channel" href={channel.href}>
                {channel.value}
              </a>
            ))}
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
            {CONTACT.formFields.map((field) => (
              <ContactFieldControl key={field.name} field={field} compact={compactForm} />
            ))}
          </div>

          {!compactForm ? (
            <div className="contact-form__services">
              {CONTACT.services.map((service) => (
                <span key={service} className="contact-form__service-pill">
                  {service}
                </span>
              ))}
            </div>
          ) : null}

          <div className="contact-form__footer">
            {!compactForm ? <p className="contact-form__note">{CONTACT.note}</p> : null}
            <button type="submit" className="contact-form__button">
              {CONTACT.submitButton}
            </button>
          </div>
        </motion.form>
      </motion.div>
    </StageSection>
  );
}

function FooterStage({
  reduceMotion,
  viewport,
}: {
  reduceMotion: boolean;
  viewport: ViewportMode;
}) {
  const compact = viewport === "mobile";

  return (
    <StageSection stageKey="footer-stage" className="footer-stage" reduceMotion={reduceMotion}>
      <motion.div
        className="footer-stage__shell"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.28, delay: 0.04 }}
      >
        <div className="footer-stage__brand">
          <p className="footer-stage__eyebrow">{FOOTER.eyebrow}</p>
          <h2 className="footer-stage__title">{FOOTER.title}</h2>
          <p className="footer-stage__copy">{FOOTER.copy}</p>
          <a className="footer-stage__cta" href={FOOTER.cta.href}>
            {FOOTER.cta.label}
          </a>
        </div>

        <div className="footer-stage__columns">
          <div className="footer-stage__column">
            <h3>Navigate</h3>
            {FOOTER.navigate.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          {!compact ? (
            <div className="footer-stage__column">
              <h3>Services</h3>
              {FOOTER.services.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ) : null}

          {!compact ? (
            <div className="footer-stage__column">
              <h3>Social</h3>
              {FOOTER.socials.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              ))}
            </div>
          ) : null}

          <div className="footer-stage__column">
            <h3>Legal</h3>
            {FOOTER.legal.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-stage__bottom">
          <span>{FOOTER.bottomLeft}</span>
          {!compact ? <span>{FOOTER.bottomRight}</span> : null}
        </div>
      </motion.div>
    </StageSection>
  );
}

export default function HeroOverlay({ viewport }: { viewport: ViewportMode }) {
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
    if (!Number.isFinite(parsedStage) || parsedStage < 0 || parsedStage >= EXPERIENCE_STAGE_COUNT) return;

    const scrollToStage = () => {
      scrollToExperienceStage(parsedStage as SceneStage, "auto");
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
      <button
        type="button"
        className={`scroll-indicator ${scrolled ? "scroll-indicator--hidden" : ""}`}
        id="scroll-indicator"
        onClick={() => scrollToExperienceStage(1)}
      >
        <div className="scroll-chevron">&#8964;</div>
        <span className="scroll-label">{HERO.scrollLabel}</span>
      </button>

      <AnimatePresence initial={false}>
        {activeStage === 1 ? <ServicesStage reduceMotion={reduceMotion} viewport={viewport} /> : null}
        {activeStage === 2 ? <ClientsStage reduceMotion={reduceMotion} /> : null}
        {activeStage === 3 ? <CaseStudiesStage reduceMotion={reduceMotion} viewport={viewport} /> : null}
        {activeStage === 4 ? <ContactStage reduceMotion={reduceMotion} viewport={viewport} /> : null}
        {activeStage === 5 ? <FooterStage reduceMotion={reduceMotion} viewport={viewport} /> : null}
      </AnimatePresence>
    </>
  );
}
