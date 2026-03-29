"use client";
import { useState, useEffect, MouseEvent } from "react";
import { S, palette } from "../../styles/theme";

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  
  useEffect(() => {
    const handleScroll = (): void => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavHoverIn = (e: MouseEvent<HTMLButtonElement>): void => {
    (e.target as HTMLButtonElement).style.transform = "scale(1.04)";
  };
  const handleNavHoverOut = (e: MouseEvent<HTMLButtonElement>): void => {
    (e.target as HTMLButtonElement).style.transform = "scale(1)";
  };

  return (
    <nav style={{ ...S.nav, borderColor: scrolled ? palette.border : "transparent" }}>
      <div style={S.logo}>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <circle cx="13" cy="13" r="5" fill={palette.accent} opacity="0.9" />
          <circle cx="5" cy="8" r="2.5" fill={palette.accent} opacity="0.45" />
          <circle cx="21" cy="8" r="2.5" fill={palette.accent} opacity="0.45" />
          <circle cx="5" cy="18" r="2.5" fill={palette.accent} opacity="0.45" />
          <circle cx="21" cy="18" r="2.5" fill={palette.accent} opacity="0.45" />
          <line x1="8" y1="10" x2="11" y2="12" stroke={palette.accent} strokeWidth="0.8" opacity="0.3" />
          <line x1="18" y1="10" x2="15" y2="12" stroke={palette.accent} strokeWidth="0.8" opacity="0.3" />
          <line x1="8" y1="16" x2="11" y2="14" stroke={palette.accent} strokeWidth="0.8" opacity="0.3" />
          <line x1="18" y1="16" x2="15" y2="14" stroke={palette.accent} strokeWidth="0.8" opacity="0.3" />
        </svg>
        <span style={{ fontWeight: 600, letterSpacing: "0.10em" }}>LLM Evaluator</span>
      </div>
      <div style={S.navLinks}>
        <a style={S.navLink} href="#pillars">Platform</a>
        <a style={S.navLink} href="#proof">Why Us</a>
        <a style={S.navLink} href="#integration">Docs</a>
        <a style={S.navLink} href="#privacy">Security</a>
        <button style={S.navCta} onMouseEnter={handleNavHoverIn} onMouseLeave={handleNavHoverOut}>
          Get Started
        </button>
      </div>
    </nav>
  );
}