"use client";

import { S } from "../styles/theme";

// Layout Components
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// Section Components
import Hero from "../components/sections/Hero";
import Pillars from "../components/sections/Pillars";
import Scoring from "../components/sections/Scoring";
import Lifecycle from "../components/sections/Lifecycle";
import Proof from "../components/sections/Proof";
import Integration from "../components/sections/Integration";
import Privacy from "../components/sections/Privacy";
import Cta from "../components/sections/Cta";

/* Hardcoded accent greens — progressively darker as you scroll down */
function accentVars(r: number, g: number, b: number): React.CSSProperties {
  const rgb = `${r},${g},${b}`;
  return {
    "--accent": `rgb(${rgb})`,
    "--accent-rgb": rgb,
    "--accent-dim": `rgba(${rgb},0.10)`,
    "--accent-glow": `rgba(${rgb},0.25)`,
    "--accent-03": `rgba(${rgb},0.03)`,
    "--accent-06": `rgba(${rgb},0.06)`,
    "--accent-08": `rgba(${rgb},0.08)`,
    "--accent-12": `rgba(${rgb},0.12)`,
    "--accent-15": `rgba(${rgb},0.15)`,
    "--accent-18": `rgba(${rgb},0.18)`,
    "--accent-20": `rgba(${rgb},0.20)`,
  } as React.CSSProperties;
}

export default function LandingPage() {
  const pad = { padding: "80px 0" };

  return (
    <div style={S.page}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <Navbar />

      {/* 1 — Hero (dark) — brightest green */}
      <div className="section-dark" style={accentVars(122, 245, 202)}>
        <Hero />
      </div>

      {/* 2 — Pillars (dark) */}
      <div className="section-dark" style={{ ...pad, ...accentVars(100, 215, 175) }}>
        <Pillars />
      </div>

      {/* 3 — Scoring (dark) */}
      <div className="section-dark" style={{ ...pad, ...accentVars(80, 185, 148) }}>
        <Scoring />
      </div>

      {/* 4 — Lifecycle (light) */}
      <div className="section-light" style={{ ...pad, ...accentVars(62, 158, 122) }}>
        <Lifecycle />
      </div>

      {/* 5 — Proof (light) */}
      <div className="section-light" style={{ ...pad, ...accentVars(50, 190, 120) }}>
        <Proof />
      </div>

      {/* 6 — Integration (light) */}
      <div className="section-light" style={{ ...pad, ...accentVars(34, 105, 76) }}>
        <Integration />
      </div>

      {/* 7 — Privacy (dark) */}
      <div className="section-dark" style={{ ...pad, ...accentVars(30, 160, 90) }}>
        <Privacy />
      </div>

      {/* 8 — CTA (dark) */}
      <div className="section-dark" style={{ ...pad, ...accentVars(40, 180, 100) }}>
        <Cta />
      </div>

      {/* Footer (dark) — darkest green */}
      <div className="section-dark" style={accentVars(14, 58, 38)}>
        <Footer />
      </div>
    </div>
  );
}
