"use client";

import { useEffect, useState } from "react";

export default function HeroOverlay() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="hero-nav" id="main-nav">
        <div className="nav-logo">ZYFLUS</div>
        <div className="nav-links">
          <a href="#home" className="nav-link">HOME</a>
          <a href="#explore" className="nav-link">EXPLORE</a>
          <a href="#services" className="nav-link">SERVICES</a>
          <a href="#contact" className="nav-link">CONTACT</a>
        </div>
      </nav>

      {/* ── SCROLL INDICATOR ── */}
      <div
        className={`scroll-indicator ${scrolled ? "scroll-indicator--hidden" : ""}`}
        id="scroll-indicator"
      >
        <div className="scroll-chevron">&#8964;</div>
        <span className="scroll-label">SCROLL TO JOURNEY</span>
      </div>


    </>
  );
}
